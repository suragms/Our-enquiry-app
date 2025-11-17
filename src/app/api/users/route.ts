import { db } from '@/lib/db';

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}