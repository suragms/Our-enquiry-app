import express from 'express';
import { db } from '../db';

const router = express.Router();

// Track page view
router.post('/track', async (req, res) => {
    try {
        const { page } = req.body;
        const userAgent = req.headers['user-agent'] || null;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
        const referrer = req.headers['referer'] || null;

        // Store page view
        await db.pageView.create({
            data: {
                page: page || 'unknown',
                userAgent: userAgent?.slice(0, 500),
                ip: typeof ip === 'string' ? ip.split(',')[0].trim() : null,
                referrer: referrer?.slice(0, 500) || null,
            }
        });

        // Update daily analytics
        const today = new Date().toISOString().split('T')[0];
        const pageField = page === '/' ? 'homeViews' : 
                         page === '/work' ? 'workViews' :
                         page === '/contact' ? 'contactViews' : 'totalViews';

        await db.analytics.upsert({
            where: { date: today },
            create: {
                date: today,
                totalViews: 1,
                [pageField]: 1,
            },
            update: {
                totalViews: { increment: 1 },
                [pageField]: { increment: 1 },
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('[ANALYTICS_TRACK]', error);
        res.status(500).json({ error: 'Failed to track' });
    }
});

// Increment form submission count
router.post('/form-submit', async (_req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        await db.analytics.upsert({
            where: { date: today },
            create: {
                date: today,
                totalViews: 0,
                formSubmissions: 1,
            },
            update: {
                formSubmissions: { increment: 1 },
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('[ANALYTICS_FORM]', error);
        res.status(500).json({ error: 'Failed to track form' });
    }
});

// Get analytics stats
router.get('/stats', async (_req, res) => {
    try {
        // Get last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const dailyStats = await db.analytics.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo }
            },
            orderBy: { date: 'desc' },
            take: 30
        });

        // Calculate totals
        const totals = dailyStats.reduce((acc, day) => ({
            totalViews: acc.totalViews + day.totalViews,
            homeViews: acc.homeViews + day.homeViews,
            workViews: acc.workViews + day.workViews,
            contactViews: acc.contactViews + day.contactViews,
            formSubmissions: acc.formSubmissions + day.formSubmissions,
        }), { totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0 });

        // Get total enquiries count
        const totalEnquiries = await db.contactMessage.count();
        const unreadEnquiries = await db.contactMessage.count({ where: { isRead: false } });

        // Get recent page views (last 100)
        const recentViews = await db.pageView.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
            select: {
                page: true,
                referrer: true,
                createdAt: true,
            }
        });

        // Today's stats
        const today = new Date().toISOString().split('T')[0];
        const todayStats = dailyStats.find(d => d.date === today) || {
            totalViews: 0,
            homeViews: 0,
            workViews: 0,
            contactViews: 0,
            formSubmissions: 0
        };

        res.json({
            today: todayStats,
            last30Days: totals,
            dailyBreakdown: dailyStats,
            totalEnquiries,
            unreadEnquiries,
            recentViews: recentViews.slice(0, 20),
        });
    } catch (error) {
        console.error('[ANALYTICS_STATS]', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

export default router;
