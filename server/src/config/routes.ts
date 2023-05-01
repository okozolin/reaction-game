import express from "express";
import {usersRouter} from "../users/users.controller";

export function init(app: express.Express) {
    const webApiRouter = express.Router();

    app.use("/", webApiRouter);
    webApiRouter.use("/users", usersRouter);
}
