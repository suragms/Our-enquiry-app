import express from 'express';
import { db } from '../db';
import { nanoid } from 'nanoid';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { projectId, name, company, content, rating } = req.body;

        if (!projectId || !name || !content || !rating) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const linkToken = nanoid(32);

        const feedback = await db.feedback.create({
            data: {
                projectId,
                name,
                company,
                content,
                rating,
                linkToken,
            },
            include: {
                project: {
                    select: { name: true },
                },
            },
        });

        res.json({
            feedback,
            feedbackLink: `/feedback/${linkToken}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create feedback link' });
    }
});

router.get('/', async (req, res) => {
    try {
        const includeAll = req.query.includeAll === 'true';

        const feedbacks = await db.feedback.findMany({
            where: includeAll
                ? undefined
                : { isApproved: true, isPublic: true },
            include: {
                project: {
                    select: { name: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
});

export default router;
