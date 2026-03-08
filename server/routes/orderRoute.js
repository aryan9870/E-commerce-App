import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";  
import { orderSchema } from "../validations/orderValidation.js";

const router = express.Router();

router.post("/", isLoggedIn, validate(orderSchema), createOrder);

export default router;