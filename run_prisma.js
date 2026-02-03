const { exec } = require('child_process');
const fs = require('fs');
console.log('Starting prisma generate...');
exec('npx prisma generate', (err, stdout, stderr) => {
    const logContent = `STDOUT: ${stdout}\nSTDERR: ${stderr}\nERR: ${err}`;
    console.log(logContent);
    fs.writeFileSync('prisma_log.txt', logContent);
    console.log('Log written to prisma_log.txt');
});
