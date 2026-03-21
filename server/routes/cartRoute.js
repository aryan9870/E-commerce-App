import express from "express";
const router = express.Router();
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cartController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import cartValidation from "../validations/cartValidation.js";

router.get("/", isLoggedIn, getCart);
router.post("/", isLoggedIn, validate(cartValidation), addToCart);
router.put("/:productId", isLoggedIn, updateCartQuantity);
router.delete("/:productId", isLoggedIn, removeFromCart);

export default router;