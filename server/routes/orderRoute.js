import express from "express";
import { createOrder, getAllOrders, getUserOrders, getSingleOrder, updateOrderStatus, verifyOrder } from "../controllers/orderController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";  
import { orderSchema, updateOrderStatusSchema } from "../validations/orderValidation.js";

const router = express.Router();

router.post("/", isLoggedIn, createOrder);
router.post("/verify", isLoggedIn, verifyOrder);
router.get("/", isLoggedIn, isAdmin, getAllOrders);
router.get("/my-orders", isLoggedIn, getUserOrders);
router.get("/:id", isLoggedIn, getSingleOrder);
router.put("/:id", isLoggedIn, isAdmin, validate(updateOrderStatusSchema), updateOrderStatus);

export default router;