import { db } from './db';
import { hashPassword } from './utils/auth';

async function resetAdminPassword() {
    try {
        const email = 'admin@example.com';
        const newPassword = 'admin123';

        console.log(`Resetting password for ${email}...`);

        const hashedPassword = await hashPassword(newPassword);

        const user = await db.user.update({
            where: { email },
            data: {
                password: hashedPassword,
            },
        });

        console.log('Password reset successful!');
        console.log('User:', user.email);
        console.log('New Password:', newPassword);
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await db.$disconnect();
    }
}

resetAdminPassword();
