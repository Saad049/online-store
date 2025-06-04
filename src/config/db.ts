import 'reflect-metadata';
import { DataSource } from 'typeorm';

import  dotenv from 'dotenv';
import { User,Product,Review,Order,OrderItem,Recipe,RecipeIngredient,RecipeStep,ContactMessage,Payment,RecipeImage,Cart,CartItem } from '../entities';
import { Permission } from '../entities/Permissions';
import { Role } from '../entities/Role';
import { BlacklistedToken } from '../entities/blackListToken';



dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User,Product,Review,Order,OrderItem,Recipe,RecipeIngredient,RecipeStep,ContactMessage,Payment,RecipeImage,Cart,CartItem,Permission,Role,BlacklistedToken],
    migrations: ["./src/migrations/*.ts"],
    synchronize: true,
    // logging: true,
    // logger: 'advanced-console',

   
});

AppDataSource.initialize()
    .then(() => console.log("✅ Database Connected!"))
    .catch((err) => console.error("❌ Database connection error:", err));
