import process from 'process';
import 'dotenv/config';
import { WebSocketServer, WebSocket } from 'ws';
import { handleSocket } from './controller.js';

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
wss.on('headers', (haders: string) => {
  console.log(`headers ${haders}`);
});
wss.on('error', (data) => {
  console.log(`error ${data}`);
});
wss.on('connection', (ws: WebSocket) => {
  //подпишемся на событие на клиенте
  ws.on('close', () => {
    console.log('close');
    //закрытие соединения клиента
  });
  handleSocket(ws);
});
wss.on('close', () => {
  console.log('close');
  //закрытие соединения сервера
});
