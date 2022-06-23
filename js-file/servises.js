import robot from 'robotjs';
import process from 'process';
import Jimp from 'jimp';
import { comandFront } from './config.js';
var mouse;
(function (mouse) {
    mouse["up"] = "up";
    mouse["down"] = "down";
    mouse["right"] = "right";
    mouse["left"] = "left";
})(mouse || (mouse = {}));
export const mouse_position = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    socket.send(`${comandFront.mouse_position} ${X},${Y}`, (e) => {
        if (e) {
            console.log(e);
        }
    });
};
export const mouse_up = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouse(X, Y - opt1);
    return 'ok';
};
export const mouse_upSlow = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouseSmooth(X, Y - opt1);
};
export const mouse_down = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouse(X, Y + opt1);
    return 'ok';
};
export const mouse_downSlow = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouseSmooth(X, Y + opt1);
};
export const mouse_left = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouse(X - opt1, Y);
    return 'ok';
};
export const mouse_leftSlow = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouseSmooth(X - opt1, Y);
};
export const mouse_right = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouse(X + opt1, Y);
    return 'ok';
};
export const mouse_rightSlow = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    robot.moveMouseSmooth(X + opt1, Y);
};
export const draw_square = (socket, opt1, opt2) => {
    robot.mouseToggle(mouse.down, mouse.left);
    robot.mouseToggle(mouse.down, mouse.left);
    mouse_rightSlow(socket, opt1, opt2);
    mouse_downSlow(socket, opt1, opt2);
    mouse_leftSlow(socket, opt1, opt2);
    mouse_upSlow(socket, opt1, opt2);
    robot.mouseToggle(mouse.up, mouse.left);
    return 'ok';
};
export const prnt_scrn = (socket, opt1, opt2) => {
    const { x: X, y: Y } = robot.getMousePos();
    const robotScreenPic = robot.screen.capture(X, Y, comandFront.prnt_scrn_x, comandFront.prnt_scrn_y);
    try {
        const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
        let pos = 0;
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
            image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
            image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
            image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
        });
        image.getBase64(Jimp.MIME_PNG, (err, str) => {
            if (err) {
                console.log(err);
            }
            process.stdout.write(`prnt_scrn ${str.slice(22)}\0`);
            socket.send(`prnt_scrn ${str.slice(22)}\0`, (e) => {
                if (e) {
                    console.log(e);
                }
            });
        });
    }
    catch (e) {
        console.error(e);
    }
    return;
};
export const draw_circle = (socket, opt1, opt2) => {
    const radius = +opt1;
    const mousePos = robot.getMousePos();
    const trueCentr = { x: mousePos.x - opt1, y: mousePos.y };
    robot.mouseToggle(mouse.down, mouse.left);
    robot.mouseToggle(mouse.down, mouse.left);
    for (let i = 0; i <= Math.PI * 2; i += 0.01 * Math.PI) {
        const x = trueCentr.x + radius * Math.cos(i);
        const y = trueCentr.y + radius * Math.sin(i);
        robot.moveMouseSmooth(x, y);
    }
    robot.mouseToggle(mouse.up, mouse.left);
    return 'ok';
};
export const draw_rectangle = (socket, opt1, opt2) => {
    robot.mouseToggle(mouse.down, mouse.left);
    robot.mouseToggle(mouse.down, mouse.left);
    mouse_rightSlow(socket, opt2, 0);
    mouse_downSlow(socket, opt1, 0);
    mouse_leftSlow(socket, opt2, 0);
    mouse_upSlow(socket, opt1, 0);
    robot.mouseToggle(mouse.up, mouse.left);
    return 'ok';
};
