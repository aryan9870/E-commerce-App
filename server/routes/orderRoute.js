import express from "express";
import { createOrder, getAllOrders, getUserOrders, getSingleOrder, updateOrderStatus } from "../controllers/orderController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";  
import { orderSchema, updateOrderStatusSchema } from "../validations/orderValidation.js";

const router = express.Router();

router.post("/", isLoggedIn, validate(orderSchema), createOrder);
router.get("/", isLoggedIn, getAllOrders);
router.get("/my-orders", isLoggedIn, getUserOrders);
router.get("/:id", isLoggedIn, getSingleOrder);
router.put("/:id", isLoggedIn, validate(updateOrderStatusSchema), updateOrderStatus);

export default router;