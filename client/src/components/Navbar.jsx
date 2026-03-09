import React from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";


const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="py-5 px-20">
      <div className="flex justify-between items-center">
        <div onClick={() => navigate("/")} className="text-black font-bold text-4xl cursor-pointer">ZEN VY</div>
        <div className="flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500"
            }
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500"
            }
          >
            Contact Us
          </NavLink>
        </div>
        <div className="w-1/2 flex gap-2 items-center bg-gray-200 rounded-full px-5 py-2.5">
          <IoMdSearch className="text-xl text-gray-500" />
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Search for products..."
          />
        </div>
        <div className="flex gap-5 font-medium">
          <PiShoppingCartSimpleBold
            onClick={() => navigate("/cart")}
            className="text-2xl cursor-pointer"
          />
          <LuCircleUserRound
            onClick={() => setOpen(!open)}
            className="text-2xl cursor-pointer"
          />
          {/* Dropdown Menu */}
          {open && (
            <div className="absolute top-20 right-20 w-40 bg-white shadow-sm rounded">
              <ul className="py-2">
                <li onClick={() => navigate("/login")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around">
                   <span>Sign In</span> <FiLogIn />
                </li>

                <li onClick={() => navigate("/signup")} className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-around">
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
