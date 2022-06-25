import process from 'process';
import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { handleSocket } from './controller.js';
import { EOL } from 'os';
const PORT = process.env.PORT ? +process.env.PORT : 8080;
const wss = new WebSocketServer({
    host: '127.0.0.1',
    port: PORT,
}, () => {
    console.log(`newwebsocet on port ${PORT} `);
});
wss.on('headers', (haders) => {
    process.stdout.write(`headers: ${haders}`);
});
wss.on('error', (data) => {
    process.stderr.write(`error ${data}`);
});
wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    const family = req.socket.remoteFamily;
    const port = req.socket.remotePort;
    if (ip) {
        process.stdout.write(`${EOL} Connected to IP: ${ip}:${port} ${EOL}`);
    }
    ws.on('close', () => {
        process.stdout.write('close', (e) => {
            if (e) {
                process.stdout.write(e.toString());
            }
        });
    });
    handleSocket(ws);
});
wss.on('close', () => {
    process.stdout.write('close');
});
