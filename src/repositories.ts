import { AppDataSource } from "./config/db";

import { Order, Product, Review, User} from "./entities";

const userRepository = AppDataSource.getRepository(User);
 const orderRepo = AppDataSource.getRepository(Order);

    const productRepo = AppDataSource.getRepository(Product);
    const reviewRepo = AppDataSource.getRepository(Review);
 


export{
    userRepository,orderRepo,productRepo,reviewRepo

}