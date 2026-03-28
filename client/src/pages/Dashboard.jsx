import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

const Dashboard = () => {

    const {user} = useAuthStore();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    

  return (
    <div className="mt-20 flex text-gray-600">
      <div className="border-r border-gray-200 flex-1">
        <ul className="flex flex-col gap-3 py-5 pl-5 h-[calc(100vh-100px)]">
          <NavLink  to="/dashboard/addProduct" className={({isActive}) => isActive ? "p-2 cursor-pointer flex gap-2 items-center border border-gray-200 bg-gray-200" : "p-2 cursor-pointer flex gap-2 items-center border border-gray-200"}>
            <IoAddCircleOutline size={22} />
            <span>Add Items</span>
          </NavLink>
          <NavLink to="/dashboard/listProduct" className={({isActive}) => isActive ? "p-2 cursor-pointer flex gap-2 items-center border border-gray-200 bg-gray-200" : "p-2 cursor-pointer flex gap-2 items-center border border-gray-200"}>
            <IoIosList size={22} />
            <span>List Items</span>
          </NavLink>
          <NavLink to="/dashboard/orders" className={({isActive}) => isActive ? "p-2 cursor-pointer flex gap-2 items-center border border-gray-200 bg-gray-200" : "p-2 cursor-pointer flex gap-2 items-center border border-gray-200"}>
            <IoIosList size={22} />
            <span>Orders</span>
          </NavLink>
        </ul>
      </div>
      <div className="flex-6 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
