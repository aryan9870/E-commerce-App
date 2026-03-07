import express from "express";
const router = express.Router();
import { addToCart, getCart } from "../controllers/cartController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

router.get("/", isLoggedIn, getCart);
router.post("/", isLoggedIn, addToCart);


export default router;