import process from 'process';
import { createWebSocketStream, WebSocket } from 'ws';
import { comandFront } from './config.js';
import {
  draw_circle,
  draw_rectangle,
  draw_square,
  mouse_down,
  mouse_left,
  mouse_position,
  mouse_right,
  mouse_up,
  prnt_scrn,
} from './servises.js';
import { Duplex } from 'stream';

export const handleSocket = (socket: WebSocket) => {
  const socketStrm: Duplex = createWebSocketStream(socket, {
    decodeStrings: false,
  });
  socketStrm.on('data', (chunk) => {
    const comandXY = chunk.toString();
    const ArraycomandXY = comandXY.split(' ');
    const comand: string = ArraycomandXY[0];
    const opt1: number = +ArraycomandXY[1] || 0;
    const opt2: number = +ArraycomandXY[2] || 0;
    //получаем данные от сервера
    process.stdout.write(`received: ${comandXY} `);
    switch (comand) {
      case comandFront.mouse_position:
        mouse_position(socketStrm, opt1, opt2);
        break;
      case comandFront.mouse_up:
        if (mouse_up(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.mouse_up}\0`);
        }
        break;
      case comandFront.mouse_down:
        if (mouse_down(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.mouse_down}\0`);
        }
        break;
      case comandFront.mouse_left:
        if (mouse_left(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.mouse_left}\0`);
        }
        break;
      case comandFront.mouse_right:
        if (mouse_right(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.mouse_right}\0`);
        }
        break;
      case comandFront.draw_square:
        if (draw_square(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.draw_square}\0`);
        }
        break;
      case comandFront.prnt_scrn:
        prnt_scrn(socketStrm, opt1, opt2);
        break;
      case comandFront.draw_circle:
        if (draw_circle(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.draw_circle}\0`);
        }
        break;
      case comandFront.draw_rectangle:
        if (draw_rectangle(socketStrm, opt1, opt2)) {
          socketStrm.write(`${comandFront.draw_rectangle}\0`);
        }
        break;

      default:
        break;
    }
  });
};
