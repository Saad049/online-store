import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Permission } from "../entities/Permissions";



// Get all permissions
// Create a new permission
export const createPermission = async (req: Request, res: Response) => {
  const { module,canCreate, canUpdate, canDelete, canGet } = req.body;

  try {
    const permission = new Permission();
    permission.module = module;
  
    permission.canCreate = !!canCreate;
    permission.canUpdate = !!canUpdate;
    permission.canDelete = !!canDelete;
    permission.canGet = !!canGet;

    const savedPermission = await AppDataSource.getRepository(Permission).save(permission);
       res.status(200).json({ message: "Permission created successfully", permission });
    res.status(201).json(savedPermission);
  } catch (error) {
    console.error("Error creating permission:", error);
    res.status(500).json({ message: "Server error while creating permission." });
  }
};
export const getAllPermissions = async (_: Request, res: Response) => {
  try {
    const permissionRepo = AppDataSource.getRepository(Permission);
    const permissions = await permissionRepo.find(
      
    );
          
    const result = permissions.map(permission => ({
      id: permission.id,
      module: permission.module,
      canCreate: permission.canCreate,
      canUpdate: permission.canUpdate,
      canDelete: permission.canDelete,
      canGet: permission.canGet,
    }));

    res.json(result);


  

    
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Server error while fetching roles" });
  }
};
export const deletePermission = async (req: Request, res: Response) => {
  const permissionId  = parseInt(req.params.id);
  if (isNaN(permissionId)) {
    return res.status(400).json({ message: "Invalid permission ID" });
  }
  try {
    const permissionRepo = AppDataSource.getRepository(Permission);
    const permission = await permissionRepo.findOne({ where: { id: permissionId } });

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permissionRepo.remove(permission);
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    console.error("Error deleting permission:", error);
    res.status(500).json({ message: "Server error while deleting permission" });
  }
};
export const updatePermission = async (req: Request, res: Response) => {
  const permissionId = parseInt(req.params.id);
  if (isNaN(permissionId)) {
    return res.status(400).json({ message: "Invalid permission ID" });
  }
  try {
    const permissionRepo = AppDataSource.getRepository(Permission);
    const permission = await permissionRepo.findOne({ where: { id: permissionId } });

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // Update the permission properties
    Object.assign(permission, req.body);

    await permissionRepo.save(permission);
    res.status(200).json(permission);
  } catch (error) {
    console.error("Error updating permission:", error);
    res.status(500).json({ message: "Server error while updating permission" });
  }
};