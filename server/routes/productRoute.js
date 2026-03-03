import express from "express";
import { getProducts, createProduct, getProductById, deleteProduct } from "../controllers/productController.js";
import { productSchema } from "../validations/productValidation.js";
import validate from "../middlewares/validate.js";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", getProducts);
router.post("/", validate(productSchema), isLoggedIn, isAdmin, createProduct);
router.get("/:id", getProductById);
router.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

export default router;