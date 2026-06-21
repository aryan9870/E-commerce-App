import React from "react";
import { BsBoxSeam } from "react-icons/bs";

const Orders = () => {
  const orders = [
    {
      id: 1,
      customer: "Aryan Singh",
      products: [
        "Men Round Neck T-Shirt x 2 (M)",
        "Men Round Neck T-Shirt x 1 (XL)",
      ],
      address: "Shastripuram, Agra, UP",
      phone: "9876543210",
      items: 3,
      amount: "$304",
      paymentMethod: "COD",
      paymentStatus: "Pending",
      date: "21/06/2026",
      status: "Order Placed",
    },
    {
      id: 2,
      customer: "Rahul Sharma",
      products: [
        "Oversized Hoodie x 1",
        "Cotton Joggers x 1",
      ],
      address: "Noida Sector 62, UP",
      phone: "9123456789",
      items: 2,
      amount: "$110",
      paymentMethod: "Stripe",
      paymentStatus: "Paid",
      date: "20/06/2026",
      status: "Shipped",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-3">Orders</h2>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-sm p-5 text-neutral-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">

              <div className="flex items-center w-fit border p-1 border-gray-300"><BsBoxSeam size={40} /></div>

              <div className="md:col-span-2">
                {order.products.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}

                <div className="mt-3">
                  <p className="font-semibold text-neutral-700">{order.customer}</p>
                  <p>{order.address}</p>
                  <p>{order.phone}</p>
                </div>
              </div>

              <div>
                <p>Items: {order.items}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.paymentStatus}</p>
                <p>Date: {order.date}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg">{order.amount}</h3>

                <select className="border p-2 rounded">
                  <option>Order Placed</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Out for Delivery</option>
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