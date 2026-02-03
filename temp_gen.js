const { execSync } = require('child_process');
try {
    console.log('Running prisma generate...');
    const output = execSync('npx prisma generate', { encoding: 'utf-8' });
    console.log('Output:', output);
} catch (e) {
    console.error('Error stdout:', e.stdout);
    console.error('Error stderr:', e.stderr);
}
