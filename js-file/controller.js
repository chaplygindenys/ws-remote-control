import { comandFront } from './config.js';
import { draw_circle, draw_rectangle, draw_square, mouse_down, mouse_left, mouse_position, mouse_right, mouse_up, prnt_scrn, } from './servises.js';
export const handleSocket = (socket) => {
    socket.on('message', (data) => {
        const comandXY = data.toString();
        const ArraycomandXY = comandXY.split(' ');
        const comand = ArraycomandXY[0];
        const opt1 = +ArraycomandXY[1] || 0;
        const opt2 = +ArraycomandXY[2] || 0;
        console.log(comand, 'opt1 ', opt1, 'opt2 ', opt2);
        switch (comand) {
            case comandFront.mouse_position:
                mouse_position(socket, opt1, opt2);
                break;
            case comandFront.mouse_up:
                if (mouse_up(socket, opt1, opt2)) {
                    socket.send(`${comandFront.mouse_up}\0`);
                }
                break;
            case comandFront.mouse_down:
                if (mouse_down(socket, opt1, opt2)) {
                    socket.send(`${comandFront.mouse_down}\0`);
                }
                break;
            case comandFront.mouse_left:
                if (mouse_left(socket, opt1, opt2)) {
                    socket.send(`${comandFront.mouse_left}\0`);
                }
                break;
            case comandFront.mouse_right:
                if (mouse_right(socket, opt1, opt2)) {
                    socket.send(`${comandFront.mouse_right}\0`);
                }
                break;
            case comandFront.draw_square:
                if (draw_square(socket, opt1, opt2)) {
                    socket.send(`${comandFront.draw_square}\0`);
                }
                break;
            case comandFront.prnt_scrn:
                prnt_scrn(socket, opt1, opt2);
                break;
            case comandFront.draw_circle:
                if (draw_circle(socket, opt1, opt2)) {
                    socket.send(`${comandFront.draw_circle}\0`);
                }
                break;
            case comandFront.draw_rectangle:
                if (draw_rectangle(socket, opt1, opt2)) {
                    socket.send(`${comandFront.draw_rectangle}\0`);
                }
                break;
            default:
                break;
        }
    });
};
