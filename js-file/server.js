import process from 'process';
import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { handleSocket } from './controller.js';
const PORT = process.env.PORT ? +process.env.PORT : 8080;
const wss = new WebSocketServer({
    host: '127.0.0.1',
    port: PORT,
}, () => {
    console.log(`newwebsocet on port ${PORT} `);
});
wss.on('headers', (haders) => {
    console.log(`headers ${haders}`);
});
wss.on('error', (data) => {
    console.log(`error ${data}`);
});
wss.on('connection', (ws) => {
    ws.on('close', () => {
        console.log('close');
    });
    handleSocket(ws);
});
wss.on('close', () => {
    console.log('close');
});
