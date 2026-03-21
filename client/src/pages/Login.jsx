import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getCart } = useCartStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post(
        `${API_URL}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      login(res.data.user);
      toast.success(res.data.message);
      await getCart();
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if(error.response.data.errors){
        toast.error(error.response.data.errors[0].message);
      }
      else{
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-6">Login —</h2>

        <form className="flex flex-col gap-4 w-80">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <div className="flex justify-between text-sm text-gray-600">
            <Link to="/signup" className="cursor-pointer hover:underline">
              New to this website?
            </Link>

            <Link to="/signup" className="cursor-pointer hover:underline">
              Create account
            </Link>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-black text-white py-2 mt-2 hover:bg-gray-800 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
