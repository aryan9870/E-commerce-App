import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import useCartStore from "../store/useCartStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const { cart, clearCart } = useCartStore();
  console.log(cart);
  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.product.discountPrice * item.quantity,
    0,
  );
  const discount = subtotal * 0.2;
  const shipping = 15;
  const total = subtotal - discount + shipping;

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    if (
      !address.firstName ||
      !address.lastName ||
      !address.email ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !address.country ||
      !address.phone
    ) {
      toast.error("Please fill all the address fields");
      return;
    }

    const products = cart.items.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.discountPrice,
      };
    });

    const orderData = {
      products,
      totalPrice: total,
      paymentMethod,
      address,
    };

    try {
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Order placed successfully");
        navigate("/orders");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.errors) {
        toast.error(error.response.data.errors[0].message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-20 mx-20 max-sm:mt-18 max-sm:mx-5 text-gray-600 tracking-wider">
      <div className="py-5 flex items-center">
        <span className="text-gray-400">HOME</span>
        <IoIosArrowForward />
        <span className="text-gray-400">CART</span>
        <IoIosArrowForward />
        <span>CHECKOUT</span>
      </div>
      <div className="flex justify-between gap-5 max-md:flex-col">
        <section className="w-2/5 max-md:w-full">
          <div className="text-2xl font-semibold">
            <p>
              <span className="text-gray-400">DELIVERY</span> INFORMATION
            </p>
          </div>
          <div className="mt-5">
            <form action="" className="flex flex-col gap-5">
              <div className="flex gap-5">
                <input
                  value={address.firstName}
                  onChange={(e) =>
                    setAddress({ ...address, firstName: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-sm p-2"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  value={address.lastName}
                  onChange={(e) =>
                    setAddress({ ...address, lastName: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-sm p-2"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <input
                value={address.email}
                onChange={(e) =>
                  setAddress({ ...address, email: e.target.value })
                }
                className="w-full border border-gray-400 rounded-sm p-2"
                type="text"
                placeholder="Email"
              />
              <input
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="w-full border border-gray-400 rounded-sm p-2"
                type="text"
                placeholder="Street"
              />
              <div className="flex gap-5">
                <input
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-sm p-2"
                  type="text"
                  placeholder="City"
                />
                <input
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-sm p-2"
                  type="text"
                  placeholder="State"
                />
              </div>
              <div className="flex gap-5">
                <input
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress({ ...address, zipCode: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-sm p-2"
                  type="text"
                  placeholder="Zip code"
                />
                <input
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-sm p-2"
                  type="text"
                  placeholder="Country"
                />
              </div>
              <input
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="w-full border border-gray-400 rounded-sm p-2"
                type="text"
                placeholder="Phone"
              />
            </form>
          </div>
        </section>
        <section className="w-2/5 max-md:w-full">
          <div className="text-2xl font-semibold">
            <p>
              <span className="text-gray-400">CART</span> TOTALS
            </p>
          </div>
          <ul className="flex flex-col gap-5 mt-5">
            <li className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal?.toFixed(2)}</p>
            </li>
            <hr className="border-gray-200" />
            <li className="flex justify-between">
              <p>Shipping</p>
              <p>${shipping}</p>
            </li>
            <hr className="border-gray-200" />
            <li className="flex justify-between">
              <div>
                <p className="font-semibold">Total (incl. discount)</p>
                <span className="text-gray-400 text-sm">
                  You are saving{" "}
                  <span className="text-green-600 font-semibold">
                    ${discount.toFixed(2)}
                  </span>{" "}
                  on this order
                </span>
              </div>
              <p className="font-semibold">${total?.toFixed(2)}</p>
            </li>
          </ul>
          <div className="mt-5">
            <div className="text-2xl font-semibold">
              <p>
                <span className="text-gray-400">PAYMENT</span> METHOD
              </p>
            </div>
            <div className="flex gap-5 mt-5 flex-wrap">
              <label
                htmlFor="cod"
                className="flex gap-2 cursor-pointer text-lg"
              >
                <input
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentMethodChange}
                  value={"cod"}
                  className="accent-black"
                  type="radio"
                  name="payment"
                  id="cod"
                />
                <p>Cash on Delivery</p>
              </label>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-5 py-2 rounded-sm mt-5 block ml-auto w-fit cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
