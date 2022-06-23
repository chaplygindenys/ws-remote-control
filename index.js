import { httpServer } from './src/http_server/index.js';
import 'dotenv/config';
import { WebSocketServer } from 'ws';
import { handleSocket } from './js-file/controller.js';
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
