// middlewares/authenticate.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;
   
    };
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
 
    };

    req.user = {
      userId: decoded.userId,
     
    };

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
