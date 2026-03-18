import Product from "../models/productSchema.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

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

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least 1 product image is required",
    });
  }

  let imageUrls = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer);
      imageUrls.push(result.secure_url);
    }
  }

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
    images: imageUrls,
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

// add a review to a product
export const addReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;
  const userId = req.user._id;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Check if the user already reviewed the product
  const alreadyReviewed = product.reviews.find(
    (rev) => rev.user.toString() === userId.toString(),
  );

  if (alreadyReviewed) {
    return next(
      new ErrorHandler("You have already reviewed this product.", 409),
    );
  }

  // Add the review
  const review = {
    user: userId,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);

  // Update number of reviews and average rating
  product.numOfReviews = product.reviews.length;

  const totalRating = product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0,
  );

  product.ratings = totalRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    message: "Review added successfully.",
  });
};

// delete a review
export const deleteReview = async (req, res, next) => {
  const productId = req.params.id;
  const reviewId = req.params.reviewId;
  const userId = req.user._id;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Find the review to delete
  const review = product.reviews.id(reviewId);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Only the review author or an admin can delete the review
  if (review.user.toString() !== userId.toString() && req.user.role !== "admin") {
    return next(new ErrorHandler("Not authorized to delete this review", 403));
  }

  // Remove review
  product.reviews.pull(reviewId);

  // Update number of reviews and ratings
  product.numOfReviews = product.reviews.length;

  if (product.reviews.length === 0) {
    product.ratings = 0;
  } else {
    let totalRating = 0;

    product.reviews.forEach((review) => {
      totalRating += review.rating;
    });

    product.ratings = totalRating / product.reviews.length;
  }

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
};

// get similar products
export const getSimilarProducts = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const similarProducts = await Product.find({
    subCategory: product.subCategory,
    _id: { $ne: productId },
  }).limit(4);
  res.status(200).json({
    success: true,
    similarProducts,
  });
};
