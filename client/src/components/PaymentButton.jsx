import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({ address, paymentMethod, cart, total }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handlePayment = async () => {

    if(paymentMethod === "cod") {
      toast.error("Cash on Delivery is currently unavailable. Please choose RazorPay.");
      return;
    }

    if (!address.firstName || !address.lastName || !address.email || !address.street || !address.city || !address.state || !address.zipCode || !address.country || !address.phone) {
      toast.error("Please fill in all address fields");
      return;
    }

    if (paymentMethod === "razorpay") {
      try {
        // Create order via backend
        const response = await axios.post(
          `${API_URL}/orders`,
          {
            amount: total, // Amount in rupees
            currency: "INR",
          },
          {
            withCredentials: true,
          },
        );

        const { id: order_id, amount, currency } = response.data;

        // Set up RazorPay options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: "ZEN VY CLOTHING",
          description: "Test Transaction",
          order_id: order_id,
          handler: async (response) => {
            try {
              const res = await axios.post(
                `${API_URL}/orders/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  address,
                  paymentMethod,
                  cart,
                  total,
                },
                {
                  withCredentials: true,
                },
              );
              if (res.data.success) {
                toast.success("Order placed successfully");
                navigate("/orders");
              } else {
                toast.error("Payment verification failed");
              }
            } catch (error) {
              console.error("Payment verification failed:", error);
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: `${address.firstName} ${address.lastName}`,
            email: address.email,
            contact: address.phone,
          },
          theme: {
            color: "#111827",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Payment initiation failed:", error);
        toast.error("Payment initiation failed");
      }
    }
  };

  return (
    <button
      className="bg-black text-white py-2 px-5 rounded-md cursor-pointer mt-5"
      onClick={handlePayment}
    >
      Proceed To Buy
    </button>
  );
};

export default PaymentButton;
