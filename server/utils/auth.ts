import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string; role: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch {
        return null;
    }
}

export async function createUser(email: string, password: string, name: string, role: string = 'STAFF') {
    const hashedPassword = await hashPassword(password);
    return db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: role as any,
        },
    });
}

export async function authenticateUser(email: string, password: string) {
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) return null;

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return null;

    return user;
}
