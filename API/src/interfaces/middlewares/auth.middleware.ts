import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction ) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid or expired token" });
    }
}