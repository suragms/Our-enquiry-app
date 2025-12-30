import express from 'express';
import { db } from '../db';

const router = express.Router();

// Get all portfolio projects
router.get('/', async (req, res) => {
    try {
        const projects = await db.portfolio.findMany({
            include: {
                media: true,
            },
            orderBy: { displayOrder: 'asc' },
        });
        res.json(projects);
    } catch (error) {
        console.error('[PORTFOLIO_GET]', error);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

// Create new portfolio project
router.post('/', async (req, res) => {
    try {
        const { title, description, techStack, projectUrl, featured, displayOrder } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description required' });
        }

        const project = await db.portfolio.create({
            data: {
                title,
                description,
                techStack: techStack || null,
                projectUrl: projectUrl || null,
                featured: featured || false,
                displayOrder: displayOrder || 0,
            },
            include: { media: true },
        });

        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_POST]', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Update portfolio project
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, techStack, projectUrl, featured, displayOrder } = req.body;

        const project = await db.portfolio.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                techStack: techStack ?? undefined,
                projectUrl: projectUrl ?? undefined,
                featured: featured ?? undefined,
                displayOrder: displayOrder ?? undefined,
            },
            include: { media: true },
        });

        res.json(project);
    } catch (error) {
        console.error('[PORTFOLIO_PATCH]', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete portfolio project
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.portfolio.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Add media to portfolio project
router.post('/:id/media', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, url } = req.body;

        if (!type || !url) {
            return res.status(400).json({ error: 'Type and URL required' });
        }

        const media = await db.portfolioMedia.create({
            data: {
                type,
                url,
                portfolioId: id,
            },
        });

        res.json(media);
    } catch (error) {
        console.error('[PORTFOLIO_MEDIA_POST]', error);
        res.status(500).json({ error: 'Failed to add media' });
    }
});

// Delete media from portfolio project
router.delete('/media/:mediaId', async (req, res) => {
    try {
        const { mediaId } = req.params;
        await db.portfolioMedia.delete({ where: { id: mediaId } });
        res.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_MEDIA_DELETE]', error);
        res.status(500).json({ error: 'Failed to delete media' });
    }
});

export default router;
