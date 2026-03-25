import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { assets } from "../assets/assets";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/my-orders`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  if (orders.length === 0) {
    return (
      <div className="mt-20 text-9xl flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-20 mx-20 max-sm:mt-18 max-sm:mx-5 text-gray-600 tracking-wider">
      <div className="py-5 flex items-center">
        <span className="text-gray-400">HOME</span>
        <IoIosArrowForward />
        <span>ORDERS</span>
      </div>
      <h1 className="text-2xl font-semibold mb-5">
        <span className="text-gray-400">MY</span> ORDERS
      </h1>
      <div>
        <ul>
          {orders.map((order, index) => {
            return (
              <li
                key={index}
                className="flex p-2 justify-between border-y border-gray-200 py-5 items-center gap-10 max-md:flex-col"
              >
                <div className="flex gap-5 flex-1">
                  <div className="h-24 w-24">
                    <img
                      className="h-full w-full"
                      src={order.products[0].product.images[0]}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-around flex-1">
                    <h3>
                      {order.products
                        .map((item) => item.product.name)
                        .join(", ")
                        .slice(0, 30)}
                      ...
                    </h3>
                    <div className="flex justify-between items-center text-sm">
                      <p>
                        $
                        {order.products.reduce(
                          (total, item) =>
                            total + item.product?.discountPrice * item.quantity,
                          0,
                        )/100 * 80 + 15}
                      </p>
                      <p>
                        Quantity:
                        {order.products.reduce(
                          (total, item) => total + item.quantity,
                          0,
                        )}
                      </p>
                      <p>Items: {order.products.length}</p>
                    </div>
                    <div>
                      <b>Date:</b>
                      <span className="text-gray-400 text-sm">
                        {" "}
                        {order.createdAt.slice(0, 10)}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center text-sm max-md:hidden">
                  <p>Order Status: <span className="text-gray-400">{order.orderStatus.toLowerCase() === "pending" ? "Ready to ship" : order.orderStatus.toLowerCase() === "shipped" ? "Out for delivery" : order.orderStatus.toLowerCase() === "delivered" ? "Delivered" : "Cancelled"}</span></p>
                </div>
                <div className="flex-1 flex items-center justify-end text-sm max-md:w-full max-md:justify-start">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="border border-gray-200 rounded-sm py-2 px-5 cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MyOrder;
