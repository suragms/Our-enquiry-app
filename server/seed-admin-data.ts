import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seedAdminData() {
    try {
        console.log('Seeding Analytics...');
        const today = new Date().toISOString().split('T')[0];
        await db.analytics.upsert({
            where: { date: today },
            update: { totalViews: 450, homeViews: 200, contactViews: 15, formSubmissions: 3 },
            create: { date: today, totalViews: 450, homeViews: 200, contactViews: 15, formSubmissions: 3 }
        });

        console.log('Seeding Enquiries...');
        await db.contactMessage.createMany({
            data: [
                {
                    name: 'Enterprise Client',
                    email: 'director@enterprise.com',
                    requirement: 'We need a highly available ERP system deployed for our 12 regional branches.',
                    companyName: 'Enterprise Holdings Co.',
                    isRead: false
                },
                {
                    name: 'Michael',
                    email: 'michael.startup@tech.co',
                    requirement: 'Looking to hire HexaStack for a multi-tenant SaaS buildout starting next quarter.',
                    isRead: true
                }
            ]
        });

        console.log('Seeding Portfolio Projects...');
        const p1 = await db.portfolio.create({
            data: {
                title: 'Global Retail POS',
                description: 'A robust multi-branch Point of Sale and inventory platform processing $5M daily transaction volume.',
                techStack: 'React, Node.js, PostgreSQL',
                projectUrl: 'https://hexastack.in',
                featured: true,
                displayOrder: 1
            }
        });

        console.log('Seeding Services...');
        await db.service.createMany({
            data: [
                {
                    name: 'Custom Business Software & ERP',
                    icon: '/logo-icon-white.png',
                    link: '/services',
                    isComingSoon: false,
                    displayOrder: 1
                },
                {
                    name: 'AI Workflow Integration',
                    icon: '/logo-icon-white.png',
                    link: '/services',
                    isComingSoon: false,
                    displayOrder: 2
                }
            ]
        });

        console.log('Seeding Products...');
        await db.product.createMany({
            data: [
                {
                    name: 'HexaBill',
                    description: 'Enterprise VAT billing software and comprehensive inventory tracking system.',
                    features: ['Multi-Branch Support', 'VAT Compliant', 'Offline Fallback', 'Deep CRM Analytics'],
                    link: '/products/hexabill',
                    isComingSoon: false,
                    displayOrder: 1
                },
                {
                    name: 'Hexa ATS Pro',
                    description: 'Data-driven applicant filtering system using LLM-based parsing constraints.',
                    features: ['Contextual Parsing', 'Recruiter Analytics', 'ATS Score Validator'],
                    link: 'https://www.hexacv.online/',
                    isComingSoon: true,
                    displayOrder: 2
                }
            ]
        });

        console.log('Admin Data Seeded Successfully!');
    } catch (err) {
        console.error('Failed to seed:', err);
    } finally {
        await db.$disconnect();
    }
}
seedAdminData();
