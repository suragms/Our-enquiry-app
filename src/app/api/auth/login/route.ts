import { authenticateUser, generateToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await authenticateUser(email, password);
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user.id, user.role);

    return Response.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}