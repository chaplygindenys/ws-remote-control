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
                const { x: X, y: Y } = robot.getMousePos();
                socket.send(`${comandFront.mouse_position} ${X},${Y}`);
                break;
            default:
                break;
        }
    });
};
