import express from 'express';
import { db } from '../db';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const settings = await db.companySettings.findFirst();
        res.json(settings || {});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

router.patch('/', async (req, res) => {
    try {
        const data = req.body;
        const first = await db.companySettings.findFirst();

        let settings;
        if (first) {
            settings = await db.companySettings.update({
                where: { id: first.id },
                data,
            });
        } else {
            settings = await db.companySettings.create({
                data,
            });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

export default router;
