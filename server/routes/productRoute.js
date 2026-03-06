import express from "express";
import { getProducts, createProduct, getProductById, deleteProduct } from "../controllers/productController.js";
import { productSchema } from "../validations/productValidation.js";
import validate from "../middlewares/validate.js";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();


router.get("/", getProducts);
router.post("/", isLoggedIn, isAdmin, upload.array("images"), validate(productSchema), createProduct);
router.get("/:id", getProductById);
router.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

export default router;