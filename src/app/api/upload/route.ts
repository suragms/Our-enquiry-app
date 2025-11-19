import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return Response.json({ error: 'File is required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return Response.json({ error: 'Empty file' }, { status: 400 });
    }

    if (buffer.length > MAX_FILE_SIZE) {
      return Response.json({ error: 'File exceeds maximum size (10MB)' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const originalName = file.name || 'upload';
    const extension = path.extname(originalName);
    const fileName = `${crypto.randomUUID()}${extension}`;
    const filePath = path.join(uploadsDir, fileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return Response.json({ url: publicUrl });
  } catch (error) {
    console.error('Failed to upload file:', error);
    return Response.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

