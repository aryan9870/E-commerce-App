import Order from "../models/orderSchema.js";
import ErrorHandler from "../utils/errorHandler.js";

// create order
export const createOrder = async (req, res, next) => {
  const { products, totalPrice, paymentMethod, address } = req.body;
  const order = await Order.create({
    user: req.user._id,
    products,
    totalPrice,
    paymentMethod,
    address,
  });
  res.status(201).json({
    success: true,
    order,
  });
};
