import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Unexpected error ocurred" });
    }
}