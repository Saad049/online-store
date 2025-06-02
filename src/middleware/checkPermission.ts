import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db";
import { Role } from "../entities/Role";


import { Permission } from "../entities/Permissions";
import { In } from "typeorm";


export const checkPermission = (
  moduleName: string,
  permissionType: keyof Permission
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
    

      if (!user || !user.roles || user.roles.length === 0) {
        return res.status(403).json({ message: "Access denied: No roles found" });
      }

      console.log("User Roles from JWT:", user.roles); 
      const roleRepo = AppDataSource.getRepository(Role);
      
     
      const roles = await roleRepo.find({
  where: { name: In(user.roles) },
  relations: ["permissions"],
})
      console.log(roles[0]?.permissions);
      
      if (roles.length === 0) {
        return res.status(403).json({ message: "Access denied: No roles found" });
      }
      console.log("Roles with Permissions:", roles);

      const hasPermission = roles.some((role) =>
        role.permissions.some(
          (perm) =>
            perm.module.toLowerCase() === moduleName.toLowerCase() &&
            perm[permissionType]
        )
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: `Access denied: Missing ${permissionType} permission on ${moduleName}`,
        });
      }

      next();
    } catch (error) {
      console.error("Permission check failed:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}; 