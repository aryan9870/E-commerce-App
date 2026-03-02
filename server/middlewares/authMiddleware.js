import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import ErrorHandler from "../utils/errorHandler.js";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

export default isLoggedIn;