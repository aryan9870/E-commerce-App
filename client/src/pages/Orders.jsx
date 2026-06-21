import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Order Placed");

  // fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        withCredentials: true,
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error.response);
    }
  };

  // update order status
  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/orders/${id}`, {
        status,
      }, { withCredentials: true });
      if (response.data.success) {
        toast.success(`Order status updated successfully`);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);




  return (
    <div className="">
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

              <div className="flex flex-col">
                <h3>&#8377; {order.totalPrice}</h3>

                <select value={order.orderStatus} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="border p-2 rounded">
                  <option value="pending">Order Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
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