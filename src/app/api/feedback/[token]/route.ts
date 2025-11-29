import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;

    const feedback = await db.feedback.findUnique({
      where: { linkToken: token },
      include: {
        project: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!feedback) {
      return Response.json({ error: 'Feedback link not found' }, { status: 404 });
    }

    return Response.json(feedback);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const { name, company, content, rating } = await request.json();

    if (!name || !content || !rating) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedFeedback = await db.feedback.update({
      where: { linkToken: token },
      data: {
        name,
        company,
        content,
        rating,
        isApproved: false,
      },
      include: {
        project: {
          select: { name: true },
        },
      },
    });

    return Response.json(updatedFeedback);
  } catch (error) {
    return Response.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}