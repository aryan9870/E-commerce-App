import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";

const OrderSummary = () => {
  const subtotal = 565;
  const discount = 113;
  const delivery = 15;

  const total = subtotal - discount + delivery;

  return (
    <div className="border border-gray-200 rounded-xl p-5 w-full max-w-md">
      {/* Title */}
      <h2 className="font-semibold mb-5 text-lg">Order Summary</h2>

      {/* Price Details */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount (-20%)</span>
          <span className="text-red-500 font-semibold">-${discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold">${delivery}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-5"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-medium">Total</span>
        <span className="text-2xl font-bold">${total}</span>
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mb-5">
        <div className="flex items-center justify-center gap-2 bg-gray-200 rounded-full px-3 flex-1">
          <MdOutlineLocalOffer size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Add promo code"
            className="bg-transparent outline-none py-2 w-full text-sm"
          />
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-full text-xs cursor-pointer">
          Apply
        </button>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-black text-white py-2 rounded-full flex items-center justify-center gap-2 cursor-pointer">
        Go to Checkout
        <IoArrowForwardOutline />
      </button>
    </div>
  );
};

export default OrderSummary;
