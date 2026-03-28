import React from "react";
import { assets } from "./assets/assets";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckOut from "./pages/CheckOut";
import MyOrder from "./pages/MyOrder";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import ListItems from "./pages/ListItems";

const App = () => {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
    <Toaster />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/orders" element={<MyOrder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {user?.role === "admin" && <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<AddProduct />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="listProduct" element={<ListItems />} />
      </Route>}
      
      <Route path="*" element={<Home />} />
    </Routes>
    <Footer />
    </>
  );
};

export default App;
