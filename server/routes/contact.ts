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

// Send email notification to admin (using Web3Forms - free service)
const sendEmailNotification = async (name: string, email: string, phone: string | null, requirement: string) => {
    try {
        // Web3Forms is a free email API - no signup needed for basic usage
        // Alternative: User can replace with their own SMTP or email service
        const adminEmail = process.env.ADMIN_EMAIL || 'hexastack78@gmail.com';
        
        // Log the notification (email can be configured later)
        console.log(`\n========================================`);
        console.log(`NEW ENQUIRY NOTIFICATION`);
        console.log(`========================================`);
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${phone || 'Not provided'}`);
        console.log(`Requirement: ${requirement}`);
        console.log(`========================================`);
        console.log(`To enable email notifications, add SMTP settings to .env`);
        console.log(`========================================\n`);

        // If RESEND_API_KEY is configured, send email via Resend
        if (process.env.RESEND_API_KEY) {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: 'HexaStack <onboarding@resend.dev>',
                    to: adminEmail,
                    subject: `New Website Enquiry from ${name}`,
                    html: `
                        <h2>New Enquiry Received</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Requirement:</strong></p>
                        <p>${requirement}</p>
                        <hr>
                        <p><small>Sent from HexaStack AI Solutions website</small></p>
                    `,
                }),
            });
            
            if (response.ok) {
                console.log('[EMAIL] Notification sent to admin');
            }
        }
    } catch (error) {
        console.error('[EMAIL_ERROR]', error);
        // Don't throw - email failure shouldn't block enquiry submission
    }
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

        // Send email notification to admin (async, don't block response)
        sendEmailNotification(name, email, phone, requirement);

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
