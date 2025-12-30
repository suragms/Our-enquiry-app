import express from 'express';
import { db } from '../db';

const router = express.Router();

// Get all portfolio projects
router.get('/', async (_req, res) => {
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

// Create project
router.post('/', async (req, res) => {
    try {
        const { title, description, techStack, projectUrl, featured, imageUrl } = req.body;
        
        const project = await db.portfolio.create({
            data: {
                title,
                description,
                techStack,
                projectUrl,
                featured: featured || false,
                displayOrder: 0,
                media: imageUrl ? {
                    create: { type: 'IMAGE', url: imageUrl }
                } : undefined
            },
            include: { media: true }
        });
        
        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_POST]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Update project
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, techStack, projectUrl, featured, imageUrl } = req.body;
        
        // Delete old media if new image provided
        if (imageUrl) {
            await db.portfolioMedia.deleteMany({ where: { portfolioId: id } });
        }
        
        const project = await db.portfolio.update({
            where: { id },
            data: {
                title,
                description,
                techStack,
                projectUrl,
                featured,
                media: imageUrl ? {
                    create: { type: 'IMAGE', url: imageUrl }
                } : undefined
            },
            include: { media: true }
        });
        
        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete media first
        await db.portfolioMedia.deleteMany({ where: { portfolioId: id } });
        
        // Delete project
        await db.portfolio.delete({ where: { id } });
        
        res.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

export default router;
