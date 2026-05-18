import Order from "../models/orderSchema.js";
import ErrorHandler from "../utils/errorHandler.js";
import razorpayInstance from "../config/razorpay.js";

// create order
export const createOrder = async (req, res, next) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert amount to smallest currency unit
      currency: currency || "INR",
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating RazorPay order");
  }
};

// fetch order data for admin panel
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email").populate("products.product");
  res.status(200).json({
    success: true,
    orders,
  });
};

// fetch order data for user panel
export const getUserOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate("user", "name email").populate("products.product");
  res.status(200).json({
    success: true,
    orders,
  });
};

// fetch single order data
export const getSingleOrder = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("user", "name email")
    .populate("products.product", "name");

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// update status from admin panel
export const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  order.orderStatus = status;
  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
};
