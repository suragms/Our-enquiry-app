import { db } from './db';
import { hashPassword } from './utils/auth';

async function verifyAndSeedAdmin() {
    try {
        console.log('=== Admin User Verification & Seeding ===');
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Database URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No');

        // Test database connection
        console.log('\n1. Testing database connection...');
        await db.$connect();
        console.log('✓ Database connected successfully');

        // Check if admin user exists
        console.log('\n2. Checking for admin user...');
        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        let admin = await db.user.findUnique({
            where: { email: adminEmail },
        });

        if (admin) {
            console.log('✓ Admin user found:', {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            });

            // Update admin password to ensure it's correct
            console.log('\n3. Updating admin password...');
            const hashedPassword = await hashPassword(adminPassword);
            admin = await db.user.update({
                where: { email: adminEmail },
                data: {
                    password: hashedPassword,
                    role: 'SUPER_ADMIN',
                    name: 'Admin User',
                },
            });
            console.log('✓ Admin password updated');
        } else {
            console.log('✗ Admin user not found. Creating...');
            const hashedPassword = await hashPassword(adminPassword);
            admin = await db.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: 'Admin User',
                    role: 'SUPER_ADMIN',
                },
            });
            console.log('✓ Admin user created:', {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            });
        }

        // Verify company settings
        console.log('\n4. Checking company settings...');
        let settings = await db.companySettings.findFirst();

        if (!settings) {
            console.log('✗ Company settings not found. Creating...');
            settings = await db.companySettings.create({
                data: {
                    companyName: 'HexaStack Solutions',
                    primaryEmail: 'anandukrishnapa2000@gmail.com',
                    primaryWhatsApp: '+917591999365',
                    leadName1: 'Anandu Krishna',
                    leadEmail1: 'anandukrishnapa2000@gmail.com',
                    leadWhatsApp1: '+917591999365',
                    leadName2: 'Surag',
                    leadWhatsApp2: '+917012714150',
                    address: 'Kerala, India',
                    tagline: 'Building Digital Excellence',
                    description: 'We create innovative web applications.',
                },
            });
            console.log('✓ Company settings created');
        } else {
            console.log('✓ Company settings exist');
        }

        // Count all users
        console.log('\n5. Database statistics...');
        const userCount = await db.user.count();
        const projectCount = await db.project.count();
        const feedbackCount = await db.feedback.count();

        console.log('Total users:', userCount);
        console.log('Total projects:', projectCount);
        console.log('Total feedback:', feedbackCount);

        console.log('\n=== Verification Complete ===');
        console.log('Admin Credentials:');
        console.log('  Email:', adminEmail);
        console.log('  Password:', adminPassword);
        console.log('  Role: SUPER_ADMIN');
        console.log('=============================\n');

    } catch (error) {
        console.error('\n=== Verification Failed ===');
        console.error('Error:', error);
        console.error('Error details:', {
            name: (error as Error).name,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
}

verifyAndSeedAdmin();
