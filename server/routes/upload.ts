import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import os from 'os';

const router = express.Router();

// Ensure upload directory exists
// Use /tmp in Netlify/Lambda environment to avoid Read-only file system crash
const isNetlify = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_VERSION;
const uploadDir = isNetlify
    ? path.join(os.tmpdir(), 'uploads')
    : path.join(process.cwd(), 'public/uploads');

try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (error) {
    console.warn('Failed to create upload directory:', error);
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    // Return URL relative to public
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
});

export default router;
