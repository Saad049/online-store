// middlewares/authenticate.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "../config/db";
import { BlacklistedToken } from "../entities/blackListToken";
import { User } from "../entities";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;

      roles: string[];
    };
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  try {
  
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      roles: string[] | string;

    
    };
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: decoded.userId });
      if (!user || user.isBlocked) {
      return res.status(403).json({ message: 'Account blocked or invalid user' });
    }
    

    req.user = {
      userId: decoded.userId,
    
      roles: Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles],
    };
 


    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
