import {UserController} from "../controllers/usersController.js"
import {MessageController} from "../controllers/messagesController.js";

const _routes = [
    ['/users', UserController],
    ['/messages', MessageController]
];

export const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    })
}