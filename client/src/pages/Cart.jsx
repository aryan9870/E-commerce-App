import React from "react";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import { IoIosArrowForward } from "react-icons/io";

const Cart = () => {
  return (
    <div className="mt-20 mx-20 max-sm:mt-18 max-sm:mx-5 text-gray-600 tracking-wider">
      <div className="py-5 flex items-center">
        <span className="text-gray-400">HOME</span>
        <IoIosArrowForward />
        CART
      </div>
      <div className="text-2xl max-md:text-xl font-semibold mb-2">
        <p>YOUR CART</p>
      </div>
      {/* Cart Items and Order Summary */}
      <div className="flex gap-5 md:gap-10 md:flex-row flex-col">
        <div className="md:w-2/3 w-full">
          <CartItems />
        </div>
        <div className="md:w-2/6 w-full">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
