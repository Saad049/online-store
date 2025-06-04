import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Role } from "../entities/Role";
import {  In } from "typeorm";  // Import In to use for filtering multiple roles
import { Permission } from "../entities/Permissions";
import { permissionRepo, roleRepo } from "../repositories";

export const createRoleWithPermissions = async (req: Request, res: Response) => {
  const { name, permissionIds } = req.body;

  if (!name || !Array.isArray(permissionIds) || permissionIds.length === 0) {
    return res.status(400).json({ message: "Name and permissionIds are required" });
  }

  try {



    const existingRole = await roleRepo.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

   
    const permissions = await permissionRepo.findBy({ id: In(permissionIds) });

    if (permissions.length !== permissionIds.length) {
      return res.status(404).json({ message: "One or more permissions not found" });
    }

    const role = roleRepo.create({ name, permissions });
    await roleRepo.save(role);

    res.status(201).json({
      message: "Role created with permissions",
      role: {
        id: role.id,
        name: role.name,
        permissions,
      }
    });

  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Server error while creating role" });
  }
};
export const getAllRolesWithPermissions = async (_: Request, res: Response) => {
  try {
    const roleRepo = AppDataSource.getRepository(Role);
    const roles = await roleRepo.find({
      relations: ["permissions"],
      select: ['id','name','permissions']
    });

    const result = roles.map(role => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Server error while fetching roles" });
  }
};
export const updateRoleWithPermissions = async (req: Request, res: Response) => {
  const roleId = parseInt(req.params.id); // Get ID from route
  const { name, permissionIds } = req.body; // Get updated name and permissions from body

  if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
    return res.status(400).json({ message: "`permissionIds` must be a non-empty array" });
  }

  try {


    const role = await roleRepo.findOne({
      where: { id: roleId },
      relations: ["permissions"],
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.name = name || role.name; 

    const permissions = await permissionRepo.findBy({ id: In(permissionIds) });

    if (permissions.length !== permissionIds.length) {
      return res.status(404).json({ message: "Some permissions not found" });
    }

    role.permissions = permissions;
    await roleRepo.save(role);

    res.json({
      message: "Role updated successfully",
      roleId: role.id,
      name: role.name,
      permissions,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Server error while updating role" });
  }
};
export const deleteRoleWithPermissions = async (req: Request, res: Response) => {
  const roleId = parseInt(req.params.id);

  try {


    const role = await roleRepo.findOne({
      where: { id: roleId },
      relations: ["permissions"],
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found because you already deleted this role" });
    }

    // Remove the role — this will also remove its relations
    await roleRepo.remove(role);

    res.json({ message: "Role and its permissions removed successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Server error while deleting role" });
  }
};


