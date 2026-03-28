import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";

const AddProduct = () => {
  const [images, setImages] = useState([null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  };

  return (
    <>
      <div className="">
        <div className="mb-3">
          <p className="mb-1">Upload Product Images</p>
          <div className="flex gap-5">
            {images.map((image, index) => {
              return (
                <label key={index} htmlFor={`image_${index}`}>
                  <input
                    onChange={(e) => handleImageChange(e, index)}
                    type="file"
                    name={`image_${index}`}
                    id={`image_${index}`}
                    hidden
                  />
                  <div className="w-20 h-20 border border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <IoCloudUploadOutline size={25} />
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
        <div className="mb-3">
          <p className="mb-1">Product Name</p>
          <input
            type="text"
            name="name"
            id="name"
            className="border py-1 px-2 rounded-xs w-96 max-md:w-full border-gray-200"
          />
        </div>
        <div className="mb-3">
          <p className="mb-1">Product Description</p>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="3"
            className="border py-1 px-2 rounded-xs w-96 max-md:w-full border-gray-200"
          ></textarea>
        </div>
        <div className="flex gap-5 mb-3 flex-wrap">
          <div className="flex flex-col gap-2">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              id="price"
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Product Stock</p>
            <input
              type="number"
              name="stock"
              id="stock"
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Product Category</p>
            <select
              name="category"
              id="category"
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            >
              <option value="">Men</option>
              <option value="">Women</option>
              <option value="">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Sub Category</p>
            <select
              name="subCategory"
              id="subCategory"
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            >
              <option value="">T-Shirt</option>
              <option value="">Shirt</option>
              <option value="">Jeans</option>
              <option value="">Shorts</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <p className="mb-1">Product Sizes</p>
          <div className="flex gap-5 text-xs flex-wrap">
            {["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"].map(
              (size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    hidden
                    type="checkbox"
                    name="size"
                    id="size"
                    value={size}
                    className="peer"
                  />
                  <p className="cursor-pointer p-2 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-sm peer-checked:bg-black peer-checked:text-white">
                    {size}
                  </p>
                </label>
              ),
            )}
          </div>
        </div>
        <div className="mb-3 flex gap-2 items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            className="accent-black cursor-pointer"
          />
          <label htmlFor="featured">Featured</label>
        </div>
        <button className="bg-black text-white py-2 px-5 rounded-xs cursor-pointer">
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
