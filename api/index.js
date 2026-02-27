const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const db = new PrismaClient();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/api/ping', (_req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.get('/api/health', async (_req, res) => {
    try {
        await db.$connect();
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// Analytics tracking
app.post('/api/analytics/track', async (req, res) => {
    try {
        const { page } = req.body;
        await db.pageView.create({
            data: {
                page: page || 'unknown',
                userAgent: (req.headers['user-agent'] || '').slice(0, 500),
                ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || null,
                referrer: (req.headers['referer'] || '').slice(0, 500) || null,
            }
        });
        
        const today = new Date().toISOString().split('T')[0];
        const pageField = page === '/' ? 'homeViews' : 
                         page === '/work' ? 'workViews' :
                         page === '/contact' ? 'contactViews' : 'totalViews';
        
        await db.analytics.upsert({
            where: { date: today },
            create: { date: today, totalViews: 1, [pageField]: 1 },
            update: { totalViews: { increment: 1 }, [pageField]: { increment: 1 } }
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error('[ANALYTICS_TRACK]', error);
        res.status(500).json({ error: 'Failed to track' });
    }
});

// Analytics stats
app.get('/api/analytics/stats', async (_req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const dailyStats = await db.analytics.findMany({
            where: { createdAt: { gte: thirtyDaysAgo } },
            orderBy: { date: 'desc' },
            take: 30
        });

        const totals = dailyStats.reduce((acc, day) => ({
            totalViews: acc.totalViews + day.totalViews,
            homeViews: acc.homeViews + day.homeViews,
            workViews: acc.workViews + day.workViews,
            contactViews: acc.contactViews + day.contactViews,
            formSubmissions: acc.formSubmissions + day.formSubmissions,
        }), { totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0 });

        const totalEnquiries = await db.contactMessage.count();
        const unreadEnquiries = await db.contactMessage.count({ where: { isRead: false } });
        
        const recentViews = await db.pageView.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
            select: { page: true, referrer: true, createdAt: true }
        });

        const today = new Date().toISOString().split('T')[0];
        const todayStats = dailyStats.find(d => d.date === today) || {
            totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0
        };

        res.json({ today: todayStats, last30Days: totals, totalEnquiries, unreadEnquiries, recentViews });
    } catch (error) {
        console.error('[ANALYTICS_STATS]', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, requirement, companyName, country, industry, serviceOrProduct, budget, timeline } = req.body;

        console.log('[CONTACT] Received:', { name, email, phone, requirement: requirement?.slice(0, 50), companyName, country, industry });

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!requirement || !requirement.trim()) {
            return res.status(400).json({ error: 'Project description is required' });
        }

        // More lenient email validation
        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }

        const message = await db.contactMessage.create({
            data: {
                name: name.trim().slice(0, 1000),
                email: email.trim().toLowerCase().slice(0, 1000),
                phone: phone ? phone.trim().slice(0, 1000) : null,
                requirement: requirement.trim().slice(0, 5000),
                companyName: companyName ? companyName.trim().slice(0, 200) : null,
                country: country ? country.trim().slice(0, 100) : null,
                industry: industry ? industry.trim().slice(0, 100) : null,
                serviceOrProduct: serviceOrProduct ? serviceOrProduct.trim().slice(0, 100) : null,
                budget: budget ? budget.trim().slice(0, 100) : null,
                timeline: timeline ? timeline.trim().slice(0, 100) : null,
            },
        });

        // Track form submission
        try {
            const today = new Date().toISOString().split('T')[0];
            await db.analytics.upsert({
                where: { date: today },
                create: { date: today, totalViews: 0, formSubmissions: 1 },
                update: { formSubmissions: { increment: 1 } }
            });
        } catch (e) { /* ignore */ }

        console.log(`[NEW_ENQUIRY] ${name} <${email}>`);
        res.json({ success: true, id: message.id });
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// Get all enquiries
app.get('/api/contact', async (_req, res) => {
    try {
        const messages = await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(messages);
    } catch (error) {
        console.error('[CONTACT_GET]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Update enquiry
app.patch('/api/contact/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isRead, isStarred } = req.body;
        const updateData = {};
        if (typeof isRead === 'boolean') updateData.isRead = isRead;
        if (typeof isStarred === 'boolean') updateData.isStarred = isStarred;
        const message = await db.contactMessage.update({ where: { id }, data: updateData });
        res.json(message);
    } catch (error) {
        console.error('[CONTACT_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Delete enquiry
app.delete('/api/contact/:id', async (req, res) => {
    try {
        await db.contactMessage.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) {
        console.error('[CONTACT_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Portfolio
app.get('/api/portfolio', async (_req, res) => {
    try {
        let projects = await db.portfolio.findMany({
            orderBy: { displayOrder: 'asc' },
            include: { media: true }
        });
        
        // Seed default projects if none exist
        if (projects.length === 0) {
            const defaultProjects = [
                {
                    title: 'Abu Dhabi Restaurant POS',
                    description: 'Complete restaurant management system with real-time order tracking, inventory management, and multi-location support.',
                    techStack: 'React, Node.js, MongoDB, Socket.io',
                    featured: true,
                    displayOrder: 0
                },
                {
                    title: 'Medical Lab Management',
                    description: 'Comprehensive laboratory information system handling patient records, test results, and automated reporting.',
                    techStack: 'React, Express, PostgreSQL',
                    featured: true,
                    displayOrder: 1
                },
                {
                    title: 'Business Process Automation',
                    description: 'Custom workflow automation reducing manual data entry by 80% for a logistics company.',
                    techStack: 'Python, React, AWS',
                    featured: false,
                    displayOrder: 2
                }
            ];
            
            for (const p of defaultProjects) {
                await db.portfolio.create({ data: p });
            }
            
            projects = await db.portfolio.findMany({
                orderBy: { displayOrder: 'asc' },
                include: { media: true }
            });
        }
        
        res.json(projects);
    } catch (error) {
        console.error('[PORTFOLIO_GET]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Create portfolio project
app.post('/api/portfolio', async (req, res) => {
    try {
        const { title, description, techStack, projectUrl, featured, imageUrl } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description required' });
        }
        
        const count = await db.portfolio.count();
        
        const project = await db.portfolio.create({
            data: {
                title,
                description,
                techStack: techStack || null,
                projectUrl: projectUrl || null,
                featured: featured || false,
                displayOrder: count,
                media: imageUrl ? {
                    create: { type: 'IMAGE', url: imageUrl }
                } : undefined
            },
            include: { media: true }
        });
        
        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_POST]', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Update portfolio project
app.patch('/api/portfolio/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, techStack, projectUrl, featured, displayOrder, imageUrl } = req.body;
        
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (techStack !== undefined) updateData.techStack = techStack;
        if (projectUrl !== undefined) updateData.projectUrl = projectUrl;
        if (featured !== undefined) updateData.featured = featured;
        if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
        
        const project = await db.portfolio.update({
            where: { id },
            data: updateData,
            include: { media: true }
        });
        
        // Handle image update
        if (imageUrl) {
            await db.portfolioMedia.deleteMany({ where: { portfolioId: id } });
            await db.portfolioMedia.create({
                data: { type: 'IMAGE', url: imageUrl, portfolioId: id }
            });
        }
        
        const updated = await db.portfolio.findUnique({
            where: { id },
            include: { media: true }
        });
        
        res.json(updated);
    } catch (error) {
        console.error('[PORTFOLIO_PATCH]', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete portfolio project
app.delete('/api/portfolio/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.portfolioMedia.deleteMany({ where: { portfolioId: id } });
        await db.portfolio.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Settings
app.get('/api/settings', async (_req, res) => {
    try {
        const settings = await db.companySettings.findFirst();
        res.json(settings || {});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

app.patch('/api/settings', async (req, res) => {
    try {
        const data = req.body;
        const first = await db.companySettings.findFirst();
        let settings;
        if (first) {
            settings = await db.companySettings.update({ where: { id: first.id }, data });
        } else {
            settings = await db.companySettings.create({ data });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.path });
});

module.exports = app;
