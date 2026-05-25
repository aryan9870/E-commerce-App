import Order from "../models/orderSchema.js";
import ErrorHandler from "../utils/errorHandler.js";
import razorpayInstance from "../config/razorpay.js";
import crypto from "crypto";

// create order
export const createOrder = async (req, res, next) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: Math.round(amount * 100), // Convert amount to smallest currency unit
      currency: currency || "INR",
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating RazorPay order");
  }
};

// verify order
export const verifyOrder = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, address, paymentMethod, cart, total } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Save order details to database
      const order = new Order({
        user: req.user._id,
        products: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalPrice: total, // Store in smallest currency unit
        paymentMethod,
        address: address,
        orderStatus: "pending",
        paymentStatus: "paid",
        razorpayOrderId: razorpay_order_id, 
        razorpayPaymentId: razorpay_payment_id,
      });
      await order.save();

       res.json({ message: "Order created successfully", success: true });
    } else {
      res.json({ message: "Payment Failed", success: false });
    }

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error verifying payment", success: false });
  }
};

// fetch order data for admin panel
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product");
  res.status(200).json({
    success: true,
    orders,
  });
};

// fetch order data for user panel
export const getUserOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("user", "name email")
    .populate("products.product");
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
