import express from 'express';
import { db } from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await db.project.findMany({
            include: {
                media: true,
                feedbacks: {
                    where: { isApproved: true, isPublic: true },
                },
                createdBy: {
                    select: { name: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, overview, techStack, status, createdById, media } = req.body;

        const mediaData = Array.isArray(media)
            ? media
                .filter(
                    (item: any) =>
                        item?.url &&
                        typeof item.url === 'string' &&
                        item?.type &&
                        ['IMAGE', 'VIDEO'].includes(item.type)
                )
                .map((item: any) => ({
                    type: item.type,
                    url: item.url,
                }))
            : [];

        const project = await db.project.create({
            data: {
                name,
                overview,
                techStack,
                status,
                createdById,
                media: mediaData.length
                    ? {
                        create: mediaData,
                    }
                    : undefined,
            },
            include: {
                media: true,
                feedbacks: true,
                createdBy: {
                    select: { name: true, email: true },
                },
            },
        });

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});

export default router;
