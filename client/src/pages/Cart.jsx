import React from "react";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import { IoIosArrowForward } from "react-icons/io";
import useCartStore from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="mt-20 mx-20 max-sm:mt-18 max-sm:mx-5 text-gray-600 tracking-wider">
      <div className="py-5 flex items-center">
        <span className="text-gray-400">HOME</span>
        <IoIosArrowForward />
        CART
      </div>
      {cart?.items?.length > 0 && (
        <div className="text-2xl max-md:text-xl font-semibold mb-2">
          <p>YOUR CART</p>
        </div>
      )}
      {/* Cart Items and Order Summary */}
      {cart?.items?.length > 0 ? (
        <div className="flex gap-5 md:gap-10 md:flex-row flex-col">
          <div className="md:w-2/3 w-full">
            <CartItems />
          </div>
          <div className="md:w-2/6 w-full">
            <OrderSummary />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 h-[50vh] justify-center items-center ">
          <p className="text-center text-2xl">Your cart is empty</p>
          <p className="text-gray-400 mb-4">
            Looks like you haven’t added anything yet.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-10 py-2 rounded-full cursor-pointer max-sm:w-full mx-auto block"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
