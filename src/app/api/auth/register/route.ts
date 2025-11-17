import { createUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return Response.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    const user = await createUser(email, password, name, role);

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return Response.json({ error: 'User already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}