import process from 'process';
import 'dotenv/config';
import { WebSocketServer, WebSocket } from 'ws';
import { handleSocket } from './controller.js';
import { EOL } from 'os';

//---------------------------сервер
const PORT = process.env.PORT ? +process.env.PORT : 8080;
const wss = new WebSocketServer(
  {
    host: '127.0.0.1',
    port: PORT,
  },
  () => {
    console.log(`newwebsocet on port ${PORT} `);
  }
);
// подпишемся на событие на сервере : close, connection,headers, error, listening
wss.on('headers', (haders: Headers) => {
  process.stdout.write(`headers: ${haders}`);
});
wss.on('error', (data) => {
  process.stderr.write(`error ${data}`);
});
wss.on('connection', (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  if (ip) {
    process.stdout.write(`${EOL} Connected to IP: ${ip}${EOL}`);
  }
  ws.on('close', () => {
    process.stdout.write('close', (e) => {
      if (e) {
        process.stdout.write(e.toString());
      }
    });
    //закрытие соединения клиента
  });
  handleSocket(ws);
});
wss.on('close', () => {
  process.stdout.write('close');
  //закрытие соединения сервера
});
