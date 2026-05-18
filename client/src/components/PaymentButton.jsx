import React from "react";
import axios from "axios";

const PaymentButton = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const handlePayment = async () => {
    try {
      // Create order via backend
      const response = await axios.post(
        `${API_URL}/orders`,
        {
          amount: 500, // Amount in rupees
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
            const res = await axios.post(`${API_URL}/orders/verify`, 
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }, 
              {
              withCredentials: true,
            });
            console.log(res.data);
            alert(res.data.message);
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return <button className="bg-black text-white py-2 px-5 rounded-md cursor-pointer mt-5" onClick={handlePayment}>Proceed To Buy</button>;
};

export default PaymentButton;
