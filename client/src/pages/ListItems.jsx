import React from "react";
import { assets, products } from "../assets/assets";
import { MdOutlineDeleteForever } from "react-icons/md";

const ListItems = () => {
  return (
    <>
      <div className="">
        <p className="mb-3">All Products</p>
        <div>
          <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr_2fr] max-md:grid-cols-[2fr_3fr_1fr] gap-2 bg-gray-200 px-5 py-2 font-semibold justify-items-center rounded-t-sm">
            <p>Image</p>
            <p>Name</p>
            <p className="max-md:hidden">Category</p>
            <p className="max-md:hidden">Price</p>
            <p className="max-md:hidden">Stock</p>
            <p>Actions</p>
          </div>
        </div>
        <div>
          {products.map((product, index) => {
            return (
              <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr_2fr] max-md:grid-cols-[2fr_3fr_1fr] gap-2 border border-gray-200 px-5 py-2 justify-items-center rounded-b-sm items-center">
                <div className="w-20 h-20">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
                <p>{product.name}</p>
                <p className="max-md:hidden">{product.category}</p>
                <p className="max-md:hidden">{product.price}</p>
                <p className="max-md:hidden">{product.stock}</p>
                <button className="cursor-pointer text-red-500 hover:text-red-600">
                  <MdOutlineDeleteForever size={25} />
                </button>
              </div>
            );
          }).slice(0, 10)}
        </div>
      </div>
    </>
  );
};

export default ListItems;
