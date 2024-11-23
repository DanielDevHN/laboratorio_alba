import { Request, Response } from "express";
import { UserUseCase } from "../../application/usecases/user.usecase";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/user.repository.impl";

const userRepository = new UserRepositoryImpl();
const userUseCase = new UserUseCase(userRepository);

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await userUseCase.createUser(username, password);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
}

export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userUseCase.deactivateUser(id);
        res.status(204).json({ message: "User deactivated successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password} = req.body;
        const token = await userUseCase.authenticateUser(username, password);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
        
    }
}