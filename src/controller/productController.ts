import { Request, Response } from 'express';
import { Product } from '../entities';
import { AppDataSource } from '../config/db';


export const createProductItems = async (req: Request, res: Response) => {
    try {
      const { name, description, price, discountedPrice, is_featured,sku,quantity} = req.body;
      const files = req.files as Express.Multer.File[];
      const imageFilename = files && files[0] ? files[0].filename : "";
  
      const newProduct = new Product();
      newProduct.name = name;
      newProduct.quantity = parseInt(quantity);
      newProduct.description = description;
      newProduct.price = parseFloat(price);
      newProduct.discountedPrice = parseFloat(discountedPrice);
      newProduct.sku= sku;
  
      // Ensure is_featured is treated as a boolean
      newProduct.is_featured = is_featured === 'true' || is_featured === true;
  
      newProduct.image = imageFilename;
      
  
      const savedProduct = await AppDataSource.getRepository(Product).save(newProduct);
  
      res.status(201).json({
        message: "Product created successfully",
        product: {
          id: savedProduct.id,
          name: savedProduct.name,
          quantity:savedProduct.quantity,
          description: savedProduct.description,
          price: `$${savedProduct.price}`,
          discountedPrice: `$${savedProduct.discountedPrice}`,
          image: savedProduct.image,
          is_featured: savedProduct.is_featured,
          sku:savedProduct.sku
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product" });
    }
  };
  export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const [products, totalItems] = await AppDataSource.getRepository(Product).findAndCount({
        skip,
        take: limit,
      });
  
      const formattedProducts = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: `$${Number(product.price).toFixed(2)}`,
        discountedPrice: `$${Number(product.discountedPrice).toFixed(2)}`,
        image: product.image,
        sku:product.sku,
        is_featured: product.is_featured,
      }));
     
      const paginationResponse = {
        pagination:{
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),

        },
            products: formattedProducts,
        
       
      };
  
   
      res.json(paginationResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  };
  export const getProductById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  // Get the id from the request parameters
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: parseInt(id) },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: `$${product.price}`,
          discountedPrice: `$${product.discountedPrice}`,
          image: product.image,
          is_featured: product.is_featured,
        },
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Error fetching product' });
    }
  };
 
export const deleteProductById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  // Get the id from the request parameters
      const productRepository = AppDataSource.getRepository(Product);
  
  
      const product = await productRepository.findOne({ where: { id: parseInt(id) } });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
    
      await productRepository.delete(id);
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  };

export const updateProductById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  
      const { name, description, price, discountedPrice, is_featured } = req.body;
  
      const productRepository = AppDataSource.getRepository(Product);
  
      
      const product = await productRepository.findOne({ where: { id: parseInt(id) } });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
     
      product.name = name;
      product.description = description;
      product.price = parseFloat(price);
      product.discountedPrice = parseFloat(discountedPrice);
      product.is_featured = is_featured === 'true' || is_featured === true;
  
     
      const updatedProduct = await productRepository.save(product);
  
      res.status(200).json({
        message: 'Product updated successfully',
        product: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: `$${updatedProduct.price}`,
          discountedPrice: `$${updatedProduct.discountedPrice}`,
          image: updatedProduct.image,
          is_featured: updatedProduct.is_featured,
          
        },
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product' });
    }
  };
      
  
  

    


 
