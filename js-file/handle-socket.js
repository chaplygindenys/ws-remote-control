import robot from 'robotjs';
import { comandFront } from './config.js';
export const handleSocket = (socket) => {
    socket.on('message', (data) => {
        const comandXY = data.toString();
        const ArraycomandXY = comandXY.split(' ');
        const comand = ArraycomandXY[0];
        const XY = +ArraycomandXY[1] || 0;
        const widtXY = +ArraycomandXY[2] || 0;
        console.log(`${comandFront.mouse_position === comand}`);
        switch (comand) {
            case comandFront.mouse_position:
                () => {
                    const { x: X, y: Y } = robot.getMousePos();
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
