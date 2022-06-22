import robot from 'robotjs';
import process from 'process';
import Jimp from 'jimp';
import { WebSocket } from 'ws';
import { comandFront } from './config.js';
import {
  mouse_down,
  mouse_left,
  mouse_position,
  mouse_right,
  mouse_up,
} from './servises.js';

export const handleSocket = (socket: WebSocket) => {
  socket.on('message', (data) => {
    const comandXY = data.toString();
    const ArraycomandXY = comandXY.split(' ');
    const comand: string = ArraycomandXY[0];
    const x: number = +ArraycomandXY[1] || 0;
    const y: number = +ArraycomandXY[2] || 0;
    //получаем данные от сервера
    console.log(`${comandFront.mouse_position === comand}`);
    switch (comand) {
      case comandFront.mouse_position:
        mouse_position(socket, x, y);
        break;
      case comandFront.mouse_up:
        mouse_up(socket, x, y);
        break;
      case comandFront.mouse_down:
        mouse_down(socket, x, y);
        break;
      case comandFront.mouse_left:
        mouse_left(socket, x, y);
        break;
      case comandFront.mouse_right:
        mouse_right(socket, x, y);
        break;
      // case comandFront.draw_square:
      //   () => {
      //     const { x: X, y: Y } = robot.getMousePos();
      //     console.log(XY);
      //   };
      //   break;
      // case comandFront.prnt_scrn:
      //   () => {
      //     const { x: X, y: Y } = robot.getMousePos();
      //     console.log(comandFront.prnt_scrn);
      //   };
      //   break;
      // case comandFront.draw_circle:
      //   () => {
      //     const { x: X, y: Y } = robot.getMousePos();
      //     console.log(XY);
      //   };
      //   break;
      // case comandFront.draw_rectangle:
      //   () => {
      //     const { x: X, y: Y } = robot.getMousePos();
      //     console.log(widtXY);
      //   };
      //   break;

      default:
        break;
    }
  });
};
