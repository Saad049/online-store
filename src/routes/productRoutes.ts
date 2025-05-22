import { Router } from 'express';


import { upload } from '../middleware/uploads';
import { createProductItems, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controller/productController';


const router = Router();

router.post('/create-products', upload.array('image'),createProductItems);
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.delete("/:id",deleteProductById);
router.put("/:id",updateProductById);


export default router;