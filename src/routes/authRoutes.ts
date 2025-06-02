import express from "express";
import { signup, login } from "../controller/authController"; // ✅


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: saad Rao
 *               email:
 *                 type: string
 *                 format: email
 *                 example: saadrao34@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin123!3213
 *               confirmPassword:
 *                 type: string
 *                 example: Admin123!3213
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or missing fields
 *       500:
 *         description: Internal server error
 */

router.post("/signup", signup);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user and return JWT access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: saadrao34@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin123!3213
 *     responses:
 *       200:
 *         description: Login successful and returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid email or validation error
 *       401:
 *         description: Invalid password
 *       500:
 *         description: Server error
 */



router.post("/login",login);

export default router;
