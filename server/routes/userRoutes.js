import {UserController} from "../controllers/usersController.js"

const _routes = [
    ['/users', UserController]
];

export const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    })
}