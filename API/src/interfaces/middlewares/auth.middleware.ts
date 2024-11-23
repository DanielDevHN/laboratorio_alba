import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Verifica si el encabezado de autorización está presente
    if (!authHeader) {
        res.status(401).send({ error: "No token provided" });
        return; 
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next(); 
    } catch (error) {
        res.status(401).send({ error: "Invalid or expired token" });
        return; 
    }
};
