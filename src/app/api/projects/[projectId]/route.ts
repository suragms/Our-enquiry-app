import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const { projectId } = params;
    const { name, overview, techStack, status, media } = await request.json();

    if (!name || !overview || !status) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    const project = await db.project.update({
      where: { id: projectId },
      data: {
        name,
        overview,
        techStack,
        status,
        media: {
          deleteMany: {},
          ...(mediaData.length
            ? {
                create: mediaData,
              }
            : {}),
        },
      },
      include: {
        media: true,
        feedbacks: {
          where: { isApproved: true, isPublic: true },
        },
        createdBy: {
          select: { name: true, email: true },
        },
      },
    });

    return Response.json(project);
  } catch (error) {
    console.error('Failed to update project:', error);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

