import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  try {
    const { projectId, name, company, content, rating } = await request.json();

    if (!projectId || !name || !content || !rating) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const linkToken = nanoid(32);

    const feedback = await db.feedback.create({
      data: {
        projectId,
        name,
        company,
        content,
        rating,
        linkToken,
      },
      include: {
        project: {
          select: { name: true },
        },
      },
    });

    return Response.json({
      feedback,
      feedbackLink: `/feedback/${linkToken}`,
    });
  } catch (error) {
    return Response.json({ error: 'Failed to create feedback link' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const includeAll = url.searchParams.get('includeAll') === 'true';

    const feedbacks = await db.feedback.findMany({
      where: includeAll
        ? undefined
        : { isApproved: true, isPublic: true },
      include: {
        project: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(feedbacks);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}