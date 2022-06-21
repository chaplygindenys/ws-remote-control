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
import { Duplex } from 'stream';

//--------------------------------------client
const client = new WebSocket('ws://localhost:5000');

client.addEventListener('open', () => {
  // send a message to the server
  client.on('upgrade', (data) => {
    console.log(`headers ${data}`);
  });

  client.send(
    JSON.stringify({
      type: 'hello from client',
      content: [3, '4'],
    })
  );
});

// receive a message from the server
// client.addEventListener('message', ({ data }) => {
//   const packet = JSON.parse(data.toString());

// switch (packet.type) {
//   case 'hello from server':
//     console.log('hello from server');
const duplexUtf8 = createWebSocketStream(client, { encoding: 'utf-8' });
duplexUtf8.pipe(process.stdout);
process.stdin.pipe(duplexUtf8);
//       break;
//   }
// });
