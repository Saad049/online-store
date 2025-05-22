import { AppDataSource } from "./config/db";

import { Order, User} from "./entities";

const userRepository = AppDataSource.getRepository(User);
 const orderRepo = AppDataSource.getRepository(Order);


export{
    userRepository,orderRepo

}