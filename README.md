## Installation

1. Clone/download repo

2. `npm install`
   If you catch some ERROR with install robotjs(use this Readme: https://github.com/octalmage/robotjs)

## Usage

**Development**
-Terminal 1:`npm run start:front`
-Terminal 2:`npm run start:dev`

- App served @ `http://localhost:8080` with nodemon

**Production**
-Terminal 1:`npm run start:front`
-Terminal 2:`npm run start`

- App served @ `http://localhost:8080` without nodemon

---

**All commands**

| Command               | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `npm run dev`         | App served @ `http://localhost:8080` with nodemon         |
| `npm run start`       | App served @ `http://localhost:8080` without nodemon      |
| `npm run start:front` | App Http-server @ `http://localhost:3000` without nodemon |

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.

## Technical requirements

After starting the program displays websocket parameters:
-- Headers
-- IP
After program work finished Program type to terminal "close"
After each received command program push to display the command and result

## Navigation over the x and y axis

Move mouse up
<- mouse_up {y px}
Move mouse down
<- mouse_down {y px}
Move mouse left
<- mouse_left {x px}
Move mouse right
<- mouse_right {x px}
Send mouse coordinates
<- mouse_position
-> mouse_position {x px},{y px}
Drawing
Draw circle with pushed left button:
<- draw_circle {px}
Draw rectangle with pushed left button:
<- draw_rectangle {px} {px}
Draw square with pushed left button:
<- draw_square {px}
Print screen
Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
<- prnt_scrn
-> prnt_scrn {base64 string (png buf)}
