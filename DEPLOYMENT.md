# Netlify Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Database Setup (MongoDB)
- ✅ MongoDB Atlas cluster is running
- ✅ Database URL is configured: `mongodb+srv://suragms2000_db_user:ugBS8yGWq9yAbiCa@cluster0.drgmoo7.mongodb.net/consultant-app`
- ✅ Admin user has been seeded (email: admin@example.com, password: admin123)

### 2. Environment Variables Required

You **MUST** set these environment variables in Netlify Dashboard:

#### Navigate to: Site settings → Environment variables

Add the following variables:

```bash
DATABASE_URL="mongodb+srv://suragms2000_db_user:ugBS8yGWq9yAbiCa@cluster0.drgmoo7.mongodb.net/consultant-app?retryWrites=true&w=majority&appName=Cluster0"

JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-12345"

NODE_ENV="production"
```

### 3. Build Settings

The build settings are already configured in `netlify.toml`:

- **Build command:** `npm install && npx prisma generate && npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

## 📋 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Fix admin login and MongoDB configuration for Netlify"
git push origin main
```

### Step 2: Connect to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository: `https://github.com/suragms/Our-enquiry-app.git`
4. Select the `main` branch

### Step 3: Configure Environment Variables
1. Go to Site settings → Environment variables
2. Add all the environment variables listed above
3. Make sure to use the production URLs (not localhost)

### Step 4: Deploy
1. Netlify will automatically start building
2. Wait for the build to complete (usually 2-5 minutes)
3. Check the build logs for any errors

### Step 5: Seed Admin User (If Needed)
If the admin user doesn't exist in MongoDB, you can run this locally:

```bash
npx ts-node --project tsconfig.server.json server/fix-admin-config.ts
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Default company settings

## 🔍 Troubleshooting

### Admin Login Fails

**Problem:** Getting "Invalid credentials" or network errors

**Solutions:**
1. Check environment variables are set in Netlify
2. Verify DATABASE_URL is correct
3. Check build logs for Prisma generation errors
4. Test the health endpoint: `https://your-site.netlify.app/.netlify/functions/api/health`

### Database Connection Issues

**Problem:** "Failed to connect to database" errors

**Solutions:**
1. Verify MongoDB Atlas cluster is running
2. Check IP whitelist in MongoDB Atlas (set to 0.0.0.0/0 for Netlify)
3. Ensure DATABASE_URL environment variable is set correctly
4. Check MongoDB credentials are correct

### API Routes Not Working

**Problem:** 404 errors on API calls

**Solutions:**
1. Check redirects are configured in `netlify.toml`
2. Verify the API path uses `/.netlify/functions/api/...`
3. Check function deployment logs
4. Ensure all dependencies are installed

### Build Fails

**Problem:** Build process fails on Netlify

**Solutions:**
1. Check Node.js version compatibility
2. Verify all dependencies are in `package.json`
3. Check Prisma schema is valid
4. Look for TypeScript errors in build logs

## 🧪 Testing After Deployment

### 1. Health Check
```bash
curl https://your-site.netlify.app/.netlify/functions/api/health
```

Should return:
```json
{
  "status": "ok",
  "db": "connected",
  "userCount": 1,
  "env": "production",
  "mongoDbUrl": "Set"
}
```

### 2. Admin Login
1. Navigate to `https://your-site.netlify.app/admin/login`
2. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Should redirect to admin dashboard

### 3. API Endpoints
Test these endpoints to verify everything works:

- `/api/ping` - Basic connectivity
- `/api/health` - Database health check
- `/api/projects` - Project listing
- `/api/settings` - Company settings

## 📝 Post-Deployment

### Security Recommendations

1. **Change Default Admin Password**
   - Login to admin panel
   - Go to User Management
   - Change the password for admin@example.com

2. **Update JWT Secret**
   - Generate a strong random string: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Update JWT_SECRET in Netlify environment variables
   - Redeploy

3. **Configure MongoDB Security**
   - Review IP whitelist settings
   - Use strong database password
   - Enable MongoDB audit logs

### Performance Optimization

1. Enable Netlify CDN caching
2. Configure asset optimization
3. Monitor function execution times
4. Set up error tracking (e.g., Sentry)

## 🆘 Support

If you encounter issues:

1. Check Netlify function logs
2. Review MongoDB Atlas logs
3. Test API endpoints using the health check
4. Verify all environment variables are set

## Team Information

- **Lead Developer & Architect:** Anandu
- **Full Stack Developer & Project Manager:** Surag
