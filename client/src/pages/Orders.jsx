import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  console.log(orders);

  // fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        withCredentials: true,
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-3">Orders</h2>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-sm p-5 text-neutral-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">

              <div className="flex items-center w-fit border p-1 border-gray-300"><BsBoxSeam size={40} /></div>

              <div className="md:col-span-2">
                {order.products.map((item, index) => (
                  <p key={index}>{item?.product?.name}</p>
                ))}

                <div className="mt-3">
                  <p className="font-semibold text-neutral-700">{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.city + " " + order.address.state}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              <div>
                <p>Items: {order.products.length}</p>
                <p>payment method: {order.paymentMethod}</p>
                <p>payment status: {order.paymentStatus}</p>
                <p>date: {order.createdAt.slice(0, 10)}</p>
              </div>

              <div className="flex flex-col border">
                <h3 className="text-lg">{order.amount}</h3>

                <select className="border p-2 rounded">
                  <option>Order Placed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;