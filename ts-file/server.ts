import process from 'process';
import 'dotenv/config';
import {
  RawData,
  WebSocketServer,
  WebSocket,
  createWebSocketStream,
  errorMonitor,
} from 'ws';
import Jimp from 'jimp';
import robot from 'robotjs';

//---------------------------------------------------server

const server = new WebSocketServer({ port: 5000 });

server.on('headers', (data) => {
  console.log(`headers ${data}`);
});
server.on('connection', (socket) => {
  // send a message to the client
  socket.send(
    JSON.stringify({
      type: 'hello from server',
      content: [1, '2'],
    })
  );

  // receive a message from the client
  // socket.on('message', (data) => {
  //   const packet = JSON.parse(data.toString());

  // switch (packet.type) {
  //   case 'hello from client':
  //     console.log('hello from client');
  const duplexUtf8 = createWebSocketStream(socket, { encoding: 'utf-8' });
  duplexUtf8.pipe(process.stdout);
  process.stdin.pipe(duplexUtf8);
  //     break;
  // }
  // });
});
// // на сервере создаем новое WebSocket-соединение.
// const PORT = process.env.PORT ? +process.env.PORT : 4000;
// //сщздадим сервер
// const wss: WebSocketServer = new WebSocketServer(
//   {
//     host: '127.0.0.1',
//     port: PORT,
//   },
//   () => {
//     console.log('newwebsocet');
//   }
// );
// //подпишемся на конект на клиенте : close, connection,headers, error, listening
// wss.on('connection', (ws: WebSocket) => {
//   ws.send(
//     JSON.stringify({
//       type: 'hello from server',
//       content: [1, '2'],
//     })
//   );

//   // receive a message from the client
//   ws.on('message', (data: string) => {
//     const packet = JSON.parse(data);

//     switch (packet.type) {
//       case 'hello from client':
//         console.log('hello from client');
//         break;
//     }
//   });
//   //получаем обьект клиента и подписываемся на событие в нем
//   ws.on('message', (data: RawData) => {
//     //получаем данные от клиента
//     console.log('received:%s', data);
//   });
//   //отсылка запроса-данных
//   // ws.send('something');
// });

// wss.on('close', () => {
//   console.log('close');
//   //закрытие соединения
// });
