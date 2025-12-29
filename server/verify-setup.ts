import { db } from './db';
import { verifyPassword } from './utils/auth';

async function verifySetup() {
    try {
        console.log('🔍 Verifying MongoDB Connection and Setup...\n');

        // Test 1: Database Connection
        console.log('1️⃣ Testing Database Connection...');
        await db.$connect();
        console.log('✅ Database connected successfully\n');

        // Test 2: Check Admin User
        console.log('2️⃣ Checking Admin User...');
        const adminUser = await db.user.findUnique({
            where: { email: 'admin@example.com' },
        });

        if (!adminUser) {
            console.log('❌ Admin user not found!');
            console.log('   Run: npx ts-node --project tsconfig.server.json server/fix-admin-config.ts\n');
            return;
        }

        console.log('✅ Admin user exists');
        console.log(`   Email: ${adminUser.email}`);
        console.log(`   Name: ${adminUser.name}`);
        console.log(`   Role: ${adminUser.role}\n`);

        // Test 3: Verify Admin Password
        console.log('3️⃣ Verifying Admin Password...');
        const isPasswordCorrect = await verifyPassword('admin123', adminUser.password);
        
        if (!isPasswordCorrect) {
            console.log('❌ Admin password is incorrect!');
            console.log('   Run: npx ts-node --project tsconfig.server.json server/fix-admin-config.ts\n');
            return;
        }
        
        console.log('✅ Admin password verified (admin123)\n');

        // Test 4: Check Company Settings
        console.log('4️⃣ Checking Company Settings...');
        const settings = await db.companySettings.findFirst();

        if (!settings) {
            console.log('⚠️ Company settings not found');
            console.log('   Run: npx ts-node --project tsconfig.server.json server/fix-admin-config.ts\n');
        } else {
            console.log('✅ Company settings exist');
            console.log(`   Company: ${settings.companyName}\n`);
        }

        // Test 5: Count All Records
        console.log('5️⃣ Database Statistics...');
        const [userCount, projectCount, feedbackCount, messageCount] = await Promise.all([
            db.user.count(),
            db.project.count(),
            db.feedback.count(),
            db.contactMessage.count(),
        ]);

        console.log(`   Users: ${userCount}`);
        console.log(`   Projects: ${projectCount}`);
        console.log(`   Feedbacks: ${feedbackCount}`);
        console.log(`   Messages: ${messageCount}\n`);

        // Test 6: Environment Variables
        console.log('6️⃣ Environment Variables Check...');
        console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Missing'}`);
        console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
        console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ ALL CHECKS PASSED!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n📋 Admin Login Credentials:');
        console.log('   Email: admin@example.com');
        console.log('   Password: admin123');
        console.log('\n🚀 Ready for deployment to Netlify!');
        console.log('   Follow DEPLOYMENT.md for next steps.\n');

    } catch (error) {
        console.error('\n❌ Setup Verification Failed!');
        console.error('Error:', (error as Error).message);
        console.error('\nTroubleshooting:');
        console.error('1. Check your .env file exists and has DATABASE_URL');
        console.error('2. Verify MongoDB connection string is correct');
        console.error('3. Ensure MongoDB Atlas cluster is running');
        console.error('4. Check IP whitelist in MongoDB Atlas\n');
    } finally {
        await db.$disconnect();
    }
}

verifySetup();
