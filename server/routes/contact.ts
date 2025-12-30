import express from 'express';
import { db } from '../db';

const router = express.Router();

// Email validation helper
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Sanitize input
const sanitize = (str: string): string => {
    return str.trim().slice(0, 1000); // Limit length
};

// Create new enquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, requirement } = req.body;

        // Validate required fields
        if (!name || !email || !requirement) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Please fill in all required fields.' 
            });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ 
                error: 'Invalid email',
                message: 'Please enter a valid email address.' 
            });
        }

        // Validate name length
        if (name.trim().length < 2) {
            return res.status(400).json({ 
                error: 'Name too short',
                message: 'Please enter your full name.' 
            });
        }

        // Create enquiry
        const message = await db.contactMessage.create({
            data: {
                name: sanitize(name),
                email: sanitize(email).toLowerCase(),
                phone: phone ? sanitize(phone) : null,
                requirement: sanitize(requirement),
            },
        });

        console.log(`[NEW_ENQUIRY] ${name} <${email}>`);

        res.json({ 
            success: true,
            message: 'Enquiry received successfully',
            id: message.id 
        });
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        res.status(500).json({ 
            error: 'Internal Error',
            message: 'Something went wrong. Please try again.' 
        });
    }
});

// Get all enquiries
router.get('/', async (req, res) => {
    try {
        const messages = await db.contactMessage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(messages);
    } catch (error) {
        console.error('[CONTACT_GET]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Update enquiry (mark as read)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isRead, isStarred } = req.body;

        const updateData: any = {};
        if (typeof isRead === 'boolean') updateData.isRead = isRead;
        if (typeof isStarred === 'boolean') updateData.isStarred = isStarred;

        const message = await db.contactMessage.update({
            where: { id },
            data: updateData,
        });

        res.json(message);
    } catch (error) {
        console.error('[CONTACT_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Delete enquiry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.contactMessage.delete({
            where: { id },
        });

        res.json({ success: true });
    } catch (error) {
        console.error('[CONTACT_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

export default router;
