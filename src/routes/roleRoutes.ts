import { Router } from "express";
import { createRoleWithPermissions, deleteRoleWithPermissions, getAllRolesWithPermissions, updateRoleWithPermissions } from "../controller/roleController";
import { authenticate } from "../middleware/authentic";



const router = Router();

/**
 * @swagger
 * /roles/role-permission:
 *   post:
 *     summary: Create a new role with permissions
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - permissionIds
 *             properties:
 *               name:
 *                 type: string
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Missing fields or role already exists
 *       404:
 *         description: Permissions not found
 *       500:
 *         description: Server error
 */

router.post("/role-permission",authenticate,createRoleWithPermissions);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles with their permissions
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles with permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         module:
 *                           type: string
 */

router.get("/",authenticate,getAllRolesWithPermissions);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role and its permissions
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Role or permissions not found
 *       500:
 *         description: Server error
 */

router.put("/:id",authenticate,updateRoleWithPermissions);
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role and its associated permissions
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */

router.delete("/:id",authenticate,deleteRoleWithPermissions);



export default router;
