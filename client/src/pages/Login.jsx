import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-6">Login —</h2>

        <form className="flex flex-col gap-4 w-80">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-400 px-3 py-2 outline-none"
          />

          <div className="flex justify-between text-sm text-gray-600">
            <Link to="/signup" className="cursor-pointer hover:underline">New to this website?</Link>

            <Link to="/signup" className="cursor-pointer hover:underline">Create account</Link>
          </div>

          <button className="bg-black text-white py-2 mt-2 hover:bg-gray-800 transition">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
