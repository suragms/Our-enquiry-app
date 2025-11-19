import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { feedbackId: string } }) {
  try {
    const { feedbackId } = params;
    const { isApproved, isPublic } = await request.json();

    const updateData: any = {};
    if (typeof isApproved === 'boolean') updateData.isApproved = isApproved;
    if (typeof isPublic === 'boolean') updateData.isPublic = isPublic;

    const feedback = await db.feedback.update({
      where: { id: feedbackId },
      data: updateData,
      include: {
        project: {
          select: { name: true },
        },
      },
    });

    return Response.json(feedback);
  } catch (error) {
    return Response.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { feedbackId: string } }) {
  try {
    const { feedbackId } = params;

    await db.feedback.delete({
      where: { id: feedbackId },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}