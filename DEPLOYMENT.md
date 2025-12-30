# Deployment Guide

This project is configured for deployment on **Vercel** (Recommended) or Netlify.

## 🚀 Vercel Deployment (Recommended)

### 1. Prerequisites
- GitHub account with the repository pushed
- Vercel account
- MongoDB Atlas cluster running

### 2. Environment Variables
You **MUST** set these environment variables in the Vercel Project Settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for authentication | `your-secure-random-string` |
| `NODE_ENV` | Environment mode | `production` |

### 3. Deploy from Vercel Dashboard

1.  **New Project**: Go to [Vercel Dashboard](https://vercel.com/new).
2.  **Import Git Repository**: Select `suragms/Our-enquiry-app`.
3.  **Project Name**: Enter `HexaStackAISolutions`.
4.  **Framework Preset**: Select `Vite`.
5.  **Root Directory**: Leave as `./`.
6.  **Build & Output Settings**: 
    - Build Command: `npm run build` (Default)
    - Output Directory: `dist` (Default)
7.  **Environment Variables**: Add the variables listed above.
8.  **Deploy**: Click "Deploy".

### 4. Post-Deployment Verification
- **Frontend**: Visit the provided Vercel URL (e.g., `https://hexastack-ai-solutions.vercel.app`).
- **Backend**: Test the API health check at `/api/health`.

---

## ☁️ Alternative: Netlify Deployment

See `NETLIFY_SETUP.md` for specific Netlify instructions.

## 🔧 Troubleshooting

### 1. Database Connection Failed
- Check `DATABASE_URL` in Vercel Environment Variables.
- Ensure "Add current IP address" is NOT selected in MongoDB Atlas (allow access from anywhere `0.0.0.0/0` for serverless deployment).

### 2. API 404 Errors
- Ensure `vercel.json` exists in the root directory.
- Verify `api/index.ts` exists and exports the Express app.

### 3. Admin Login Failed
- Ensure you have seeded the database or manually created an admin user.
- Default Admin: `admin@example.com` / `admin123`

## 👥 Team
- **Anandu** - Lead Developer & Architect
- **Surag** - Full Stack Developer & Project Manager
