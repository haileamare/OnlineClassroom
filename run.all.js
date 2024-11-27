import { spawn } from 'child_process';

const server = spawn('npx', ['nodemon'], { stdio: 'inherit' });
const client = spawn('bun', ['run', 'bun-server.js'], { stdio: 'inherit' });

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

client.on('close', (code) => {
  console.log(`Client process exited with code ${code}`);
});
