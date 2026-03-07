import Cart from "../models/cartSchema.js";
import ErrorHandler from "../utils/errorHandler.js";


// Add item to cart
export const addToCart = async (req, res, next) => {

    const userId = req.user._id;
    const { productId } = req.body;

    if(!productId) {
        return next(new ErrorHandler("Product is required", 404));
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




