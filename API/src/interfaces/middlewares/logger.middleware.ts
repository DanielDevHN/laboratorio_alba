import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} - ${req.ip} - ${new Date().toISOString()}`);
    next();
}