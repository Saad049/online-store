// routes/adminRoutes.ts
import express from "express";
import { authenticate } from "../middleware/authentic";

import { checkPermission } from "../middleware/checkPermission";
import { UserBlock } from "../controller/userBlockController";

const router = express.Router();

// Only authenticated admin can block users
router.patch("/block-user/:id", authenticate,checkPermission("blockUser", "canUpdate"),UserBlock);

export default router;
