import express from "express";
import { getProducts, createProduct, getProductById, deleteProduct } from "../controllers/productController.js";
const router = express.Router();


router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;