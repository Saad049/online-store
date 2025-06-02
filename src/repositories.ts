import { AppDataSource } from "./config/db";

import { Order, Product, Review, User} from "./entities";
import { Permission } from "./entities/Permissions";
import { Role } from "./entities/Role";

const userRepository = AppDataSource.getRepository(User);
 const orderRepo = AppDataSource.getRepository(Order);

    const productRepo = AppDataSource.getRepository(Product);
    const reviewRepo = AppDataSource.getRepository(Review);

     const roleRepo = AppDataSource.getRepository(Role);
    const permissionRepo = AppDataSource.getRepository(Permission);
 


export{
    userRepository,orderRepo,productRepo,reviewRepo,roleRepo,permissionRepo

}