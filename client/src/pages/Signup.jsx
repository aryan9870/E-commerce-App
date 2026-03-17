import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";

const Signup = () => {

  const signup = useAuthStore((state) => state.signup);
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.name, user.email, user.password);
    try {
      const res = await axios.post(
        `${API_URL}/users/register`,
        user,
        { withCredentials: true },
      );
      console.log(res.data);
      signup(res.data.user, res.data.token);
    } catch (error) {
      console.log(error.response);
      if(error.response.data.errors){
        console.log(error.response.data.errors[0].message);
      }
      else{
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-6">Sign Up —</h2>

        <form className="flex flex-col gap-4 w-80">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="Name"
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Email"
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Password"
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <div className="flex justify-between text-sm text-gray-600">
            <Link to="/login" className="cursor-pointer hover:underline">
              Already have an account?
            </Link>

            <Link to="/login" className="cursor-pointer hover:underline">Login</Link>
          </div>

          <button onClick={handleSubmit} className="bg-black text-white py-2 mt-2 hover:bg-gray-800 transition">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
