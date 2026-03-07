import Cart from "../models/cartSchema.js";
import ErrorHandler from "../utils/errorHandler.js";


// Add item to cart
export const addToCart = async (req, res, next) => {

    const userId = req.user._id;
    const { productId } = req.body;

    if(!productId) {
        return next(new ErrorHandler("Product is required", 400));
    }
  
    // find user's cart
    let cart = await Cart.findOne({ user: userId });
  
    // if cart does not exist create new cart
    if (!cart) {
  
      cart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
          }
        ]
      });
  
      await cart.save();
  
    } else {
  
      // check if product already exists in cart
      let productExists = false;
  
      for (let item of cart.items) {
  
        if (item.product.toString() === productId) {
          item.quantity++;
          productExists = true;
          break;
        }
  
      }
  
      // if product not found in cart, add new item
      if (!productExists) {
        cart.items.push({
          product: productId,
        });
      }
  
      await cart.save();
    }
  
    res.json({
      success: true,
      message: "Product added to cart",
      cart
    });
  
  };

// Get cart for user
export const getCart = async (req, res, next) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { user: userId, items: [] },
      });
    }
    res.status(200).json({
      success: true,
      cart,
    });
};

// Update quantity of a product in the user's cart (+1 or -1 only)
export const updateCartQuantity = async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { operation } = req.body; // operation: 'increment' or 'decrement'

  if (!productId) {
    return next(new ErrorHandler("Product ID is required", 400));
  }
  if (!["increment", "decrement"].includes(operation)) {
    return next(
      new ErrorHandler("Valid operation required: 'increment' or 'decrement'", 400)
    );
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (!item) {
    return next(new ErrorHandler("Product not found in cart", 404));
  }

  if (operation === "increment") {
    item.quantity += 1;
  } else if (operation === "decrement") {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // If quantity is 1 and user tries to decrement, remove the item
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
      );
    }
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart quantity updated",
    cart,
  });
};



// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.params;

  if (!productId) {
    return next(new ErrorHandler("Product ID is required", 400));
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
    cart,
  });
};




