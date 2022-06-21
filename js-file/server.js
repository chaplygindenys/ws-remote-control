import process from 'process';
import 'dotenv/config';
import { WebSocketServer, createWebSocketStream, } from 'ws';
const server = new WebSocketServer({ port: 5000 });
server.on('headers', (data) => {
    console.log(`headers ${data}`);
});
server.on('connection', (socket) => {
    socket.send(JSON.stringify({
        type: 'hello from server',
        content: [1, '2'],
    }));
    const duplexUtf8 = createWebSocketStream(socket, { encoding: 'utf-8' });
    duplexUtf8.pipe(process.stdout);
    process.stdin.pipe(duplexUtf8);
});
