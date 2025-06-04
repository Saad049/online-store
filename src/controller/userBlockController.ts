// controllers/adminController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities";


export const UserBlock = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked; 
    await userRepo.save(user);

    return res.status(200).json({
      message: `User has been ${user.isBlocked ? "blocked" : "unblocked"}`,
      userId: user.id,
      isBlocked: user.isBlocked,
    });
  } catch (err) {
    console.error("Error  user block:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
