import { httpServer } from './src/http_server/index.js';
import 'dotenv/config';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { handleSocket } from './js-file/handle-socket.js';
const HTTP_PORT = 4000;
//NODE_DEBUG = ws node index.js
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

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
//подпишемся на конект на клиенте : close, connection,headers, error, listening
wss.on('headers', (data) => {
  console.log(`headers ${data}`);
});
wss.on('error', (data) => {
  console.log(`error ${data}`);
});
wss.on('connection', (ws) => {
  ws.on('close', () => {
    console.log('close');
    //закрытие соединения
  });

  handleSocket(ws);
  console.log(
    ` connection ws closed ${ws.CLOSED} prototcol ${ws.CLOSING} ${ws.CONNECTING} ${ws.OPEN}
    ${ws.binaryType}
    ${ws.bufferedAmount}
    ${ws}
    `
  );
  // const duplexUtf8 = createWebSocketStream(ws, { encoding: 'utf-8' });
  // duplexUtf8.pipe(process.stdout);
  // process.stdin.pipe(duplexUtf8);
  //получаем обьект клиента и подписываемся на событие в нем
  // ws.on('error', (data) => {
  //   //получаем данные от клиента
  //   console.log('received:%s', data);
  // });
  // ws.on('open', (data) => {
  //   //получаем данные от клиента
  //   console.log('received:%s', data);
  // });
  // ws.on('ping', (data) => {
  //   //получаем данные от клиента
  //   console.log('received:%s', data);
  // });
  // ws.on('pong', (data) => {
  //   //получаем данные от клиента
  //   console.log('received:%s', data);
  // });
});

wss.on('close', () => {
  console.log('close');
  //закрытие соединения
});
