import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [images, setImages] = useState([null, null, null]);
  const [data, setData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "Men",
    subCategory: "T-Shirts",
    price: 0,
    discountedPrice: 0,
    stock: 0,
    isFeatured: false,
  });
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  };

  const onDataChangeHandler = (e) => {
    if(e.target.name === "isFeatured"){
      setData({ ...data, isFeatured: e.target.checked });
    }else{
      setData({ ...data, [e.target.name]: e.target.value });
    }
    
  };

  const sizeHandler = (e) => {
    if (e.target.checked) {
      setSizes([...sizes, e.target.value]);
    } else {
      setSizes(sizes.filter(size => size !== e.target.value));
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // validation for images
    if(images[0] === null || images[1] === null || images[2] === null){
      return toast.error("Please upload all the images");
    }

    // validation for form data
    if(data.name === "" || data.description === "" || data.brand === "" || data.category === "" || data.subCategory === "" || data.price === 0 || data.discountedPrice === 0 || data.stock === 0){
      return toast.error("Please fill all the fields");
    }

    // validation for sizes
    if(sizes.length === 0){
      return toast.error("Please select at least one size");
    }

    // here we have to upload the files on the server

    console.log(data);
    console.log(images);
    console.log(sizes);
  };
  

  return (
    <>
      <form className="" onSubmit={onSubmitHandler}>
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
            value={data.name}
            onChange={onDataChangeHandler}
            className="border py-1 px-2 rounded-xs w-96 max-md:w-full border-gray-200"
          />
        </div>
        <div className="mb-3">
          <p className="mb-1">Product Description</p>
          <textarea
            name="description"
            id="description"
            value={data.description}
            onChange={onDataChangeHandler}
            cols="30"
            rows="3"
            className="border py-1 px-2 rounded-xs w-96 max-md:w-full border-gray-200"
          ></textarea>
        </div>
        <div className="flex gap-5 mb-3 flex-wrap">
          <div className="flex flex-col gap-2">
            <p>Product Brand</p>
            <input
              type="text"
              name="brand"
              id="brand"
              value={data.brand}
              onChange={onDataChangeHandler}
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Product Category</p>
            <select
              name="category"
              id="category"
              value={data.category}
              onChange={onDataChangeHandler}
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Sub Category</p>
            <select
              name="subCategory"
              id="subCategory"
              value={data.subCategory}
              onChange={onDataChangeHandler}
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            >
              <option value="T-shirts">T-Shirt</option>
              <option value="Shirts">Shirt</option>
              <option value="Kurtas">Kurta</option>
              <option value="Ethnic-Wears">Ethnic Wear</option>
              <option value="Jeans">Jeans</option>
              <option value="Shorts">Shorts</option>
              <option value="Jackets">Jacket</option>
              <option value="Track-Suits">Track Suit</option>
              <option value="Track-Pants">Track Pants</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5 mb-3 flex-wrap">
          <div className="flex flex-col gap-2">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              id="price"
              value={data.price}
              onChange={onDataChangeHandler}
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Discounted Price</p>
            <input
              type="number"
              name="discountedPrice"
              id="discountedPrice"
              value={data.discountedPrice}
              onChange={onDataChangeHandler}
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Product Stock</p>
            <input
              type="number"
              name="stock"
              id="stock"
              value={data.stock}
              onChange={onDataChangeHandler}
              className="border border-gray-200 py-1 px-2 rounded-xs w-32"
            />
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
                    onChange={sizeHandler}
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
            name="isFeatured"
            id="isFeatured"
            className="accent-black cursor-pointer"
            checked={data.isFeatured}
            onChange={onDataChangeHandler}
          />
          <label htmlFor="isFeatured">Featured</label>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-5 rounded-xs cursor-pointer">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
