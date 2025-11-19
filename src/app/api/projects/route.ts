import { db } from '@/lib/db';

export async function GET() {
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

    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, overview, techStack, status, createdById, media } = await request.json();

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

    return Response.json(project);
  } catch (error) {
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}