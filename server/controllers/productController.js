import Product from "../models/productSchema.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get list of all products (no filters/pagination yet)
export const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// Get a single product by its MongoDB _id
export const getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // If product is missing, forward a 404 error to the global error handler
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// Create a new product document from the request body
export const createProduct = async (req, res, next) => {
  const {
    name,
    description,
    brand,
    category,
    subCategory,
    price,
    discountPrice,
    sizes,
    stock,
    isFeatured,
  } = req.body;

  // Directly pass the extracted fields to Mongoose create
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    subCategory,
    price,
    discountPrice,
    sizes,
    stock,
    isFeatured,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};

// Delete a product by id if it exists
export const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    // If nothing was deleted, the id did not match any product
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};
