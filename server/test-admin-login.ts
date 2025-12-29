import { authenticateUser, generateToken } from './utils/auth';
import { db } from './db';

async function testAdminLogin() {
    try {
        console.log('=== Testing Admin Login ===\n');

        // Test credentials
        const email = 'admin@example.com';
        const password = 'admin123';

        console.log('1. Testing database connection...');
        await db.$connect();
        console.log('✓ Database connected\n');

        console.log('2. Checking if admin user exists...');
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.error('✗ Admin user not found!');
            console.log('Run: npm run db:seed');
            process.exit(1);
        }

        console.log('✓ Admin user found:', {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
        console.log('');

        console.log('3. Testing authentication...');
        const authenticatedUser = await authenticateUser(email, password);

        if (!authenticatedUser) {
            console.error('✗ Authentication failed!');
            console.error('Password might be incorrect.');
            process.exit(1);
        }

        console.log('✓ Authentication successful\n');

        console.log('4. Testing token generation...');
        const token = generateToken(authenticatedUser.id, authenticatedUser.role);
        console.log('✓ Token generated:', token.substring(0, 50) + '...\n');

        console.log('=== All Tests Passed ===');
        console.log('Admin login should work with:');
        console.log('  Email:', email);
        console.log('  Password:', password);
        console.log('========================\n');

    } catch (error) {
        console.error('\n=== Test Failed ===');
        console.error('Error:', (error as Error).message);
        console.error('Stack:', (error as Error).stack);
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
}

testAdminLogin();
