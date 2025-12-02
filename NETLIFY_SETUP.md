# 🚀 Netlify Environment Variables Setup

## ⚠️ CRITICAL: You MUST set these in Netlify Dashboard

### How to Access Environment Variables in Netlify:

1. Login to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** for each one below

---

## 🔑 Required Environment Variables

### 1. DATABASE_URL
**Value:**
```
mongodb+srv://suragms2000_db_user:ugBS8yGWq9yAbiCa@cluster0.drgmoo7.mongodb.net/consultant-app?retryWrites=true&w=majority&appName=Cluster0
```

**Description:** MongoDB Atlas connection string
- Connects your app to the MongoDB database
- Contains credentials and database name
- Required for all database operations

---

### 2. JWT_SECRET
**Value:**
```
your-super-secret-jwt-key-change-this-in-production-12345
```

**Description:** Secret key for JWT token signing
- Used for authentication tokens
- Should be a long random string
- **IMPORTANT:** Generate a new secure random string for production!

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

### 3. NODE_ENV
**Value:**
```
production
```

**Description:** Environment mode
- Tells the app it's running in production
- Optimizes performance and disables debug logs
- Required for proper deployment

---

## 📋 Quick Copy-Paste Format

For your convenience, here are all variables in a format you can reference:

```env
DATABASE_URL=mongodb+srv://suragms2000_db_user:ugBS8yGWq9yAbiCa@cluster0.drgmoo7.mongodb.net/consultant-app?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

NODE_ENV=production
```

---

## ✅ Verification Steps

After setting all environment variables in Netlify:

### 1. Trigger a new deploy:
- Go to **Deploys** → **Trigger deploy** → **Deploy site**
- Or push a new commit to trigger automatic deploy

### 2. Check build logs:
- Watch for any errors during build
- Ensure Prisma generates successfully
- Verify all environment variables are loaded

### 3. Test the deployment:
Visit these URLs after deployment:

#### Health Check:
```
https://YOUR-SITE-NAME.netlify.app/.netlify/functions/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "db": "connected",
  "userCount": 1,
  "env": "production",
  "mongoDbUrl": "Set"
}
```

#### Admin Login:
```
https://YOUR-SITE-NAME.netlify.app/admin/login
```

**Test Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 🔒 Security Recommendations

### 1. Change Default Secrets
Before going to production, generate a new secure JWT secret:

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update this in Netlify environment variables.

### 2. Change Admin Password
After first login:
1. Go to User Management in admin panel
2. Change password for `admin@example.com`
3. Use a strong, unique password

### 3. MongoDB Security
In MongoDB Atlas:
1. Ensure IP whitelist includes Netlify (0.0.0.0/0 or specific IPs)
2. Use strong database password
3. Enable audit logs
4. Set up backup schedule

---

## 🐛 Troubleshooting

### Build Fails
**Check:**
- All environment variables are set
- No typos in variable names or values
- Build command in `netlify.toml` is correct

**Solution:**
- Review build logs in Netlify
- Check for Prisma generation errors
- Verify MongoDB connection string

### Admin Login Fails
**Check:**
- DATABASE_URL is set correctly
- Admin user exists in MongoDB
- JWT_SECRET is set

**Solution:**
```bash
# Run locally to verify admin user exists
npm run verify

# If needed, recreate admin user
npm run db:seed
```

### Database Connection Error
**Check:**
- MongoDB Atlas cluster is running
- IP whitelist in MongoDB Atlas
- Connection string is correct

**Solution:**
- Test connection locally with `node test-mongo.js`
- Verify credentials in MongoDB Atlas
- Check network access settings

### 404 on API Routes
**Check:**
- Redirects in `netlify.toml` are correct
- Function deployed successfully

**Solution:**
- Check function logs in Netlify
- Verify API routes are accessible
- Test with `/api/ping` endpoint

---

## 📞 Need Help?

If you encounter issues:

1. **Check Netlify Function Logs:**
   - Netlify Dashboard → Functions → View logs

2. **Check MongoDB Atlas:**
   - Login to MongoDB Atlas
   - Check cluster status
   - Review connection logs

3. **Test Locally:**
   ```bash
   npm run verify
   npm run build
   ```

4. **Review Documentation:**
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
   - [FIXES_SUMMARY.md](./FIXES_SUMMARY.md) - What was fixed
   - [README.md](./README.md) - General setup

---

## ✨ Success Indicators

You'll know everything is working when:

✅ Build completes without errors  
✅ Health check returns `"status": "ok"`  
✅ Admin login redirects to dashboard  
✅ All API endpoints respond correctly  
✅ No errors in function logs  

---

**Team:** Anandu (Lead Developer) & Surag (Full Stack Developer)  
**Last Updated:** December 2, 2025
