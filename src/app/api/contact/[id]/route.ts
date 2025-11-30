import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const { isRead, isStarred } = body;

        const message = await db.contactMessage.update({
            where: {
                id: params.id,
            },
            data: {
                isRead,
                isStarred,
            },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error('[CONTACT_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await db.contactMessage.delete({
            where: {
                id: params.id,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[CONTACT_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
