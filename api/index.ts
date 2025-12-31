import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

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
        res.status(500).json({ status: 'error', error: (error as Error).message });
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
                ip: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || null,
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
        const { name, email, phone, requirement } = req.body;

        if (!name || !email || !requirement) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const message = await db.contactMessage.create({
            data: {
                name: name.trim().slice(0, 1000),
                email: email.trim().toLowerCase().slice(0, 1000),
                phone: phone ? phone.trim().slice(0, 1000) : null,
                requirement: requirement.trim().slice(0, 5000),
            },
        });

        // Track form submission
        const today = new Date().toISOString().split('T')[0];
        await db.analytics.upsert({
            where: { date: today },
            create: { date: today, totalViews: 0, formSubmissions: 1 },
            update: { formSubmissions: { increment: 1 } }
        });

        console.log(`[NEW_ENQUIRY] ${name} <${email}>`);
        res.json({ success: true, id: message.id });
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        res.status(500).json({ error: 'Internal Error' });
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
        const updateData: Record<string, boolean> = {};
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
        const projects = await db.portfolio.findMany({
            orderBy: { displayOrder: 'asc' },
            include: { media: true }
        });
        res.json(projects);
    } catch (error) {
        console.error('[PORTFOLIO_GET]', error);
        res.status(500).json({ error: 'Internal Error' });
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

export default app;
