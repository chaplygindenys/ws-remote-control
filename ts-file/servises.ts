import robot from 'robotjs';
import process from 'process';
import Jimp from 'jimp';
import { WebSocket } from 'ws';
import { comandFront } from './config.js';

export const mouse_position = (socket, X, Y){
    const { x: X, y: Y } = robot.getMousePos();
    //   отсылка данных
    socket.send(`${comandFront.mouse_position} ${X},${Y}`);
};
export const mouse_up = (socket, X, Y){
    
        const { x: X, y: Y } = robot.getMousePos();
        robot.moveMouse(X, Y - XY);
    
}
export const mouse_down = (socket, X, Y){
  
        const { x: X, y: Y } = robot.getMousePos();
        robot.moveMouse(X, Y + XY);
  
}
export const mouse_left = (socket, X, Y){
    
        const { x: X, y: Y } = robot.getMousePos();
        robot.moveMouse(X - XY, Y);
}
          export const mouse_right = (socket, X, Y){
   
                  const { x: X, y: Y } = robot.getMousePos();
                  robot.moveMouse(X + XY, Y);
          }
export const draw_square = (socket, X, Y){
     
        const { x: X, y: Y } = robot.getMousePos();
        console.log(XY);
}
export const prnt_scrn = (socket, X, Y){
    
        const { x: X, y: Y } = robot.getMousePos();
        console.log(comandFront.prnt_scrn);
}
export const draw_circle = (socket, X, Y){
        const { x: X, y: Y } = robot.getMousePos();
        console.log(XY);
}
export const draw_rectangle = (socket, X, Y){
    
        const { x: X, y: Y } = robot.getMousePos();
        console.log(widtXY);
}