import { Router } from 'express';


import { upload } from '../middleware/uploads';
import { createProductItems, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controller/productController';
import { authenticate } from '../middleware/authentic';


const router = Router();

/**
 * @swagger
 * /Products/create-products:
 *   post:
 *     summary: Create a new product with image upload
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - discountedPrice
 *               - sku
 *               - quantity
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "choclolate Fudge"
 *               description:
 *                 type: string
 *                 example: "include in the rich,velvety goodness of our glutten free choclate fudge"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 20
 *               discountedPrice:
 *                 type: number
 *                 format: float
 *                 example: 18
 *               is_featured:
 *                 type: boolean
 *                 example: true
 *               sku:
 *                 type: string
 *                 example: "Choclatefudge-2025-0015"
 *               quantity:
 *                 type: integer
 *                 example: 45
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 16
 *                     name:
 *                       type: string
 *                       example: choclolate Fudge
 *                     quantity:
 *                       type: integer
 *                       example: 45
 *                     description:
 *                       type: string
 *                       example: include in the rich,velvety goodness of our glutten free choclate fudge
 *                     price:
 *                       type: string
 *                       example: "$20"
 *                     discountedPrice:
 *                       type: string
 *                       example: "$18"
 *                     image:
 *                       type: string
 *                       example: image-1748002918157-653119385.png
 *                     is_featured:
 *                       type: boolean
 *                       example: true
 *                     sku:
 *                       type: string
 *                       example: Choclatefudge-2025-0015
 *       500:
 *         description: Error creating product
 */

router.post('/create-products', upload.array('image'),authenticate,createProductItems);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of products with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 13
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Cracker
 *                       description:
 *                         type: string
 *                         example: delight in the perfect crunch with these all natural glutten free crackers
 *                       price:
 *                         type: string
 *                         example: "$20.00"
 *                       discountedPrice:
 *                         type: string
 *                         example: "$18.00"
 *                       image:
 *                         type: string
 *                         example: image-1747214561453-489373834.jpeg
 *                       sku:
 *                         type: string
 *                         example: SKU-CRAC-9303
 *                       is_featured:
 *                         type: boolean
 *                         example: true
 */

router.get("/",getAllProducts);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to get
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     name:
 *                       type: string
 *                       example: Cracker
 *                     description:
 *                       type: string
 *                       example: delight in the perfect crunch with these all natural glutten free crackers
 *                     price:
 *                       type: string
 *                       example: "$20.00"
 *                     discountedPrice:
 *                       type: string
 *                       example: "$18.00"
 *                     image:
 *                       type: string
 *                       example: image-1747215360597-909896100.jpeg
 *                     is_featured:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Product not found
 */


router.get("/:id",getProductById);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 */

router.delete("/:id",deleteProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Cracker
 *               description:
 *                 type: string
 *                 example: Updated description of the product
 *               price:
 *                 type: number
 *                 example: 25.00
 *               discountedPrice:
 *                 type: number
 *                 example: 20.00
 *               is_featured:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product updated successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     name:
 *                       type: string
 *                       example: Updated Cracker
 *                     description:
 *                       type: string
 *                       example: Updated description of the product
 *                     price:
 *                       type: string
 *                       example: "$25.00"
 *                     discountedPrice:
 *                       type: string
 *                       example: "$20.00"
 *                     image:
 *                       type: string
 *                       example: image-1747215360597-909896100.jpeg
 *                     is_featured:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Error updating product
 */

router.put("/:id",updateProductById);


export default router;