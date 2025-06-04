import { Router } from "express";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  updatePermission,
} from "../controller/permissionController";
import { authenticate } from "../middleware/authentic";

const router = Router();

/**
 * @swagger
 * /permissions/create-permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *                 example: "User Management"
 *               canCreate:
 *                 type: boolean
 *                 example: true
 *               canUpdate:
 *                 type: boolean
 *                 example: false
 *               canDelete:
 *                 type: boolean
 *                 example: true
 *               canGet:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Permission created successfully
 */
router.post("/create-permissions", authenticate, createPermission);

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of permissions
 */
router.get("/", getAllPermissions);

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 */
router.delete("/:id", authenticate, deletePermission);

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Update a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *                 example: "Order Management"
 *               canCreate:
 *                 type: boolean
 *                 example: false
 *               canUpdate:
 *                 type: boolean
 *                 example: true
 *               canDelete:
 *                 type: boolean
 *                 example: false
 *               canGet:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Updated permission
 */
router.put("/:id", authenticate, updatePermission);

export default router;
