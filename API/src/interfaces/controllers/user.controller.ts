import { Request, Response } from "express";
import { UserService } from "../../application/services/user.service";
import jwt from "jsonwebtoken";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.status(201).json(user);
}

export const deactivateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.deactivateUser(id);
    res.status(204).json({ message: "User deactivated" });
}

export const login = async (req: Request, res: Response) => {
    const { username, password} = req.body;
    const user = await userService.authenticateUser(username, password);1
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
        expiresIn: "1h"
    });
    res.status(200).json({ token });
}