import robot from 'robotjs';
import process from 'process';
import Jimp from 'jimp';
import { WebSocket } from 'ws';
import { comandFront } from './config.js';

export const handleSocket = (socket: WebSocket) => {
  socket.on('message', (data) => {
    const comandXY = data.toString();
    const ArraycomandXY = comandXY.split(' ');
    const comand: string = ArraycomandXY[0];
    const XY: number = +ArraycomandXY[1] || 0;
    const widtXY: number = +ArraycomandXY[2] || 0;
    //получаем данные от сервера
    console.log(`${comandFront.mouse_position === comand}`);
    switch (comand) {
      case comandFront.mouse_position:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          //   отсылка данных
          socket.send(`${comandFront.mouse_position} ${X},${Y}`);
        };
        break;
      case comandFront.mouse_up:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          robot.moveMouse(X, Y - XY);
        };
        break;
      case comandFront.mouse_down:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          robot.moveMouse(X, Y + XY);
        };
        break;
      case comandFront.mouse_left:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          robot.moveMouse(X - XY, Y);
        };
        break;
      case comandFront.mouse_right:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          robot.moveMouse(X + XY, Y);
        };
        break;
      case comandFront.draw_square:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          console.log(XY);
        };
        break;
      case comandFront.prnt_scrn:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          console.log(comandFront.prnt_scrn);
        };
        break;
      case comandFront.draw_circle:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          console.log(XY);
        };
        break;
      case comandFront.draw_rectangle:
        () => {
          const { x: X, y: Y } = robot.getMousePos();
          console.log(widtXY);
        };
        break;

      default:
        break;
    }
  });
};
