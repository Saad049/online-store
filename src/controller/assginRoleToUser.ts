// controllers/userController.ts

import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/user";
import { Role } from "../entities/Role";

export const assignRoleToUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { roleId } = req.body;

  if (!roleId) {
    return res.status(400).json({ message: "roleId is required in body" });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);

     const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["roles"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await roleRepo.findOne({ where: { id: roleId }, relations: ['permissions'] });
    if (!role) return res.status(404).json({ message: "Role not found" });

    user.roles = [role];
    await userRepo.save(user);

    res.json({
      message: "Role assigned to user successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role.name,
        permissions: role.permissions
      }
    });
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).json({ message: "Server error while assigning role" });
  }
};
