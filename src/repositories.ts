import { AppDataSource } from "./config/db";

import { Cart, CartItem, Order, Product, Review, User} from "./entities";
import { Permission } from "./entities/Permissions";
import { Role } from "./entities/Role";

const userRepository = AppDataSource.getRepository(User);
 const orderRepo = AppDataSource.getRepository(Order);

    const productRepo = AppDataSource.getRepository(Product);
    const reviewRepo = AppDataSource.getRepository(Review);

    const roleRepo = AppDataSource.getRepository(Role);
    const permissionRepo = AppDataSource.getRepository(Permission);
   
    const cartRepo = AppDataSource.getRepository(Cart);

    const cartItemRepo = AppDataSource.getRepository(CartItem);
 


export{
    userRepository,orderRepo,productRepo,reviewRepo,roleRepo,permissionRepo,cartRepo,cartItemRepo

}