import React from "react";
import { assets } from "./assets/assets";

const App = () => {
  return (
    <div className="bg-black text-white">
      Welcome to my E-commerce
      <img src={assets.gucci} alt="Gucci Logo" />
      <img src={assets.product1} alt="Product 1" />
    </div>
  );
};

export default App;
