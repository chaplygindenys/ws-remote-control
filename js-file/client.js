import process from 'process';
import 'dotenv/config';
import { WebSocket, createWebSocketStream, } from 'ws';
const client = new WebSocket('ws://localhost:5000');
client.addEventListener('open', () => {
    client.on('upgrade', (data) => {
        console.log(`headers ${data}`);
    });
    client.send(JSON.stringify({
        type: 'hello from client',
        content: [3, '4'],
    }));
});
const duplexUtf8 = createWebSocketStream(client, { encoding: 'utf-8' });
duplexUtf8.pipe(process.stdout);
process.stdin.pipe(duplexUtf8);
