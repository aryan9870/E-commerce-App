import React from "react";
import { LuSlidersVertical } from "react-icons/lu";
import { products } from "../assets/assets";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

const ProductGrid = ({ setOpenFilter, openFilter }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="text-2xl max-sm:hidden">
          <p>
            <span className="text-gray-500">All</span> COLLECTIONS
          </p>
        </div>
        <button
          onClick={() => setOpenFilter(true)}
          className="sm:hidden bg-gray-200 flex justify-center items-center w-8 h-8 rounded-full"
        >
          <LuSlidersVertical />
        </button>
        {/* Modal */}
        {openFilter && (
          <div className="fixed pt-18 inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-[400px] relative">
              <Filter setOpenFilter={setOpenFilter} openFilter={openFilter} />
            </div>
          </div>
        )}
        <div className="flex gap-2 items-center">
          <p className="text-gray-500 text-sm max-sm:text-xs">
            Showing 1-10 of 100 Products
          </p>
          <div className="flex gap-2 items-center max-sm:hidden">
            <p className="text-gray-500 text-sm">Sort by:</p>
            <div>
              <select className="outline-none w-30" name="" id="">
                <option value="">Most Popular</option>
                <option value="">Highest Rated</option>
                <option value="">Newest First</option>
                <option value="">Price: Low to High</option>
                <option value="">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Product Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-sm:justify-items-center max-sm:mt-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
