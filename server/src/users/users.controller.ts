import {Request, Response, Router} from "express";
import * as UserService from "./users.service";
import {User} from "./users.interface";
import {generateUserId} from "./users.utils";

export const usersRouter = Router();

const getUsers = (req: Request, res: Response) => {
    const users = UserService.getUsersFromFile()
    const sortedUsers = Object.values(users[0]).sort((a, b) => b.steps - a.steps)
    res.send(sortedUsers);
}
usersRouter.get("/", getUsers);

const createUser = async (req: Request, res: Response) => {
    const { name } = req.body;
    const gender = await UserService.getGenderByName(name)
    const richData = await UserService.getRichData(gender)
    const user: User = {
        id: generateUserId(),
        name,
        steps: 0,
        gender,
        richData,
    };
    const users = UserService.getUsersFromFile();
    UserService.saveUsers(users, user)
    res.send(user);
}
usersRouter.post("/", createUser);

const updateUser = (req: Request, res: Response) => {
    const { steps } = req.body;
    const id = req.params.userId;

    const users = UserService.getUsersFromFile();
    const user = users[0][id]
    user.steps+= steps
    UserService.saveUsers(users, user)
    res.send(user);
}

usersRouter.put("/:userId", updateUser);
