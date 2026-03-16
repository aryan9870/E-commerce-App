import React from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
        <div className="w-[40%] flex gap-2 items-center bg-gray-200 rounded-full px-5 py-2.5 shadow-sm max-xl:hidden">
          <IoMdSearch className="text-xl text-gray-400" />
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Search for products..."
          />
        </div>
        <div className="flex gap-5 font-medium items-center">
          <PiShoppingCartSimpleBold
            onClick={() => navigate("/cart")}
            className="text-2xl cursor-pointer"
          />
          <span className="hidden">
            <LuCircleUserRound
              onClick={() => setOpen(!open)}
              className="text-2xl cursor-pointer"
            />
          </span>
          <NavLink to="/login" className="bg-black text-white px-3 py-1 rounded-sm hover:bg-gray-800 transition">
            Login
          </NavLink>
          {/* Dropdown Menu */}
          {open && (
            <div className="absolute top-20 right-20 w-40 bg-white shadow-sm rounded max-sm:right-10">
              <ul className="py-2">
                <li
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around"
                >
                  <span>Sign In</span> <FiLogIn />
                </li>

                <li
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around"
                >
                  <span>Sign Up</span> <FiLogIn />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
