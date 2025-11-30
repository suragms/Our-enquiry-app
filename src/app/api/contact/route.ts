import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, requirement } = body;

        if (!name || !email || !requirement) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const message = await db.contactMessage.create({
            data: {
                name,
                email,
                phone,
                requirement,
            },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const messages = await db.contactMessage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('[CONTACT_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
