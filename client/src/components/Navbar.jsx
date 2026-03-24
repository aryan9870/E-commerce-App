import React from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaBars } from "react-icons/fa6";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import useCartStore from "../store/useCartStore";
import SearchBar from "./SearchBar";


const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const API_URL = import.meta.env.VITE_API_URL;
  const { cart, getCart, clearCart } = useCartStore();
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });
      if (res.data.success === true) {
        logout();
        toast.success(res.data.message);
        clearCart();
        setOpen(false);
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

  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);


  useEffect(() => {
    getCart();
  }, []);


  if (isCheckingAuth || !cart) return null;

  return (
    <div className="px-20 fixed top-0 left-0 right-0 z-100 bg-white max-sm:px-5 text-gray-600 tracking-wider">
      <div className="flex justify-between items-center border-b py-5 border-gray-200">
        <div className="font-bold text-4xl cursor-pointer flex items-center max-sm:text-2xl">
          <span className="sm:hidden">
            <FaBars />
          </span>
          <span onClick={() => navigate("/")} className="ml-5">
            ZEN VY
          </span>
        </div>
        <div className="flex gap-5 max-xl:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "text-gray-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "text-gray-400"
            }
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "text-gray-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-gray-600" : "text-gray-400"
            }
          >
            Contact Us
          </NavLink>
        </div>
        <SearchBar />
        <div className="flex gap-5 font-medium items-center">
          <div className="relative">
            <PiShoppingCartSimpleBold
              onClick={() => navigate("/cart")}
              className="text-2xl cursor-pointer"
            />
            {cart?.items?.length > 0 && <span className="absolute -top-4 -right-4 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cart?.items?.length}
            </span>}
          </div>
          {isLoggedIn ? (
            <span>
              <LuCircleUserRound
                onClick={() => setOpen(!open)}
                className="text-2xl cursor-pointer"
              />
              {/* Dropdown Menu */}
              {open && (
                <div className="absolute top-20 right-20 w-40 bg-white shadow-sm rounded max-sm:right-10">
                  <ul className="py-2">
                    <li
                      onClick={() => navigate("/profile")}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around"
                    >
                      <span>Profile</span> <FaRegUser />
                    </li>
                    <li
                      onClick={() => navigate("/orders")}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around"
                    >
                      <span>Orders</span> <HiOutlineShoppingBag />
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around"
                    >
                      <span>Logout</span> <FiLogIn />
                    </li>
                  </ul>
                </div>
              )}
            </span>
          ) : (
            <NavLink
              to="/login"
              className="bg-black text-white px-3 py-1 rounded-sm hover:bg-gray-800 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
