const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'prisma_debug.log');
fs.writeFileSync(logFile, 'Starting Prisma Generate...\n');

const child = exec('npx prisma generate', (error, stdout, stderr) => {
    let output = '';
    if (error) {
        output += `ERROR: ${error.message}\n`;
    }
    output += `STDOUT:\n${stdout}\n`;
    output += `STDERR:\n${stderr}\n`;
    fs.appendFileSync(logFile, output);
    console.log('Done.');
});

child.on('exit', (code) => {
    fs.appendFileSync(logFile, `Process exited with code ${code}\n`);
});
