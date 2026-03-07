import express from "express";
const router = express.Router();
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cartController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

router.get("/", isLoggedIn, getCart);
router.post("/", isLoggedIn, addToCart);
router.put("/:productId", isLoggedIn, updateCartQuantity);
router.delete("/:productId", isLoggedIn, removeFromCart);

export default router;