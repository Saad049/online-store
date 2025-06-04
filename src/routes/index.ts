import { Express } from "express";
import authRoutes from "./authRoutes";
import recipeRoutes from "./recipeRoutes";
import productRoutes from "./productRoutes";
import cartItemsRoutes from "./cartItemsRoutes";
import cartRoutes from "./cartRoutes";
import placeOrderRoutes from "./placeOrderRoutes";
import trackOrderRoutes from "./trackOrderRoutes";
import updateStatusRoutes from "./updateStatusRoutes";
import reviewRoutes from "./reviewRoutes";

import permissionRoutes from "./permissionRoutes";
import roleRoutes from "./roleRoutes";

import assginRoleToUserRoutes from "./assginRoleToUserRoutes";
import userBlockRoutes from "./userBlockRoutes";




const registerRoutes = (app:Express)=>{
    app.use("/auth", authRoutes);
    app.use("/Recipes",recipeRoutes);
    app.use("/Products",productRoutes)
    app.use('/cartItems', cartItemsRoutes);
    app.use('/Cart', cartRoutes);
    app.use('/order', placeOrderRoutes);
    app.use('/trackOrder',trackOrderRoutes);
    app.use('/updateStatus',updateStatusRoutes)
    app.use('/createReview',reviewRoutes)
    app.use("/permissions", permissionRoutes);  // Permissions Routes
    app.use("/roles", roleRoutes); 
    app.use("/assignRoles",assginRoleToUserRoutes);
    
    app.use("/api/admin", userBlockRoutes);

    
};
export default registerRoutes;