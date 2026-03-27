import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../assets/assets";
import { IoIosArrowForward } from "react-icons/io";
import RatingDisplay from "../components/RatingDisplay";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import ProductSection from "../components/ProductSection";
import { FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import useCartStore from "../store/useCartStore";
import LoadingSpinner from "../components/LoadingSpinner";

const Product = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const API_URL = import.meta.env.VITE_API_URL;

  // fetch product
  const [product, setProduct] = useState(null);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`, {
        withCredentials: true,
      });
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  // image handler
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  

  // fetch similar products
  const [similarProducts, setSimilarProducts] = useState([]);
  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}/similar`, {
        withCredentials: true,
      });
      setSimilarProducts(response.data.similarProducts);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchSimilarProducts();
  }, [id]);

  // Add to Cart
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  

  // render product
  return !product ? <LoadingSpinner /> : (
    <div className="mt-20 md:mx-20 mx-5 max-sm:mt-18 max-sm:mx-5 text-gray-600 tracking-wider">
      <div className="py-5 flex items-center">
        <span className="text-gray-400">HOME</span> <IoIosArrowForward />
        <span className="text-gray-400">COLLECTION</span> <IoIosArrowForward />
        {product.subCategory.toUpperCase()}
      </div>
      <div className="flex md:h-[450px] max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-10 md:flex-row">
        <div className="flex gap-5 max-sm:flex-col-reverse max-md:w-full">
          <div className=" justify-between flex sm:flex-col">
            {product.images.map((image, idx) => (
              <img
                onClick={() => handleImageClick(image)}
                key={idx}
                className="w-30 max-sm:w-24 cursor-pointer"
                src={image}
                alt=""
              />
            ))}
          </div>
          <div className=" max-md:w-full">
            <img
              className="h-full w-full"
              src={mainImage || product.images[0]}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 px-10 max-md:px-0 max-md:gap-5 flex flex-col justify-between max-md:w-full">
          <div className=" flex flex-col gap-2">
            <h1 className="text-2xl max-md:text-xl font-extrabold">
              {product.name}
            </h1>
            <div className="flex gap-2 items-center">
              <RatingDisplay rating={product.ratings} />
              {product.ratings}/5
            </div>
            <div className="font-semibold gap-2 flex items-center text-2xl">
              <span className="">${product.discountPrice}</span>
              <span className="text-gray-400 line-through">
                ${product.price}
              </span>
              <span className="text-red-600 bg-red-50 font-extralight px-2 flex items-center justify-center text-xs rounded-full">
                {product.discountPrice
                  ? `-${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`
                  : ""}
              </span>
            </div>
            <p>{product.description}</p>
          </div>
          <hr className="text-gray-200" />
          <div className=" flex flex-col gap-2">
            <p>Select Colors</p>
            <div className="flex gap-4">
              <label className="cursor-pointer">
                <input onChange={() => setColor("brown")} type="radio" name="color" className="peer hidden" />

                <div
                  className="w-10 h-10 rounded-full bg-yellow-900 
    flex items-center justify-center peer-checked:text-white text-transparent"
                >
                  <FiCheck />
                </div>
              </label>

              <label className="cursor-pointer">
                <input onChange={() => setColor("green")} type="radio" name="color" className="peer hidden" />

                <div
                  className="w-10 h-10 rounded-full bg-green-800 
    flex items-center justify-center peer-checked:text-white text-transparent"
                >
                  <FiCheck />
                </div>
              </label>

              <label className="cursor-pointer">
                <input onChange={() => setColor("indigo")} type="radio" name="color" className="peer hidden" />

                <div
                  className="w-10 h-10 rounded-full bg-indigo-900 
    flex items-center justify-center peer-checked:text-white text-transparent"
                >
                  <FiCheck />
                </div>
              </label>
            </div>
          </div>
          <hr className="text-gray-200" />
          <div className=" flex flex-col gap-2">
            <p>Choose Size</p>
            <div className="flex gap-5">
              {product.sizes.map((size, idx) => (
                <label key={idx} className="cursor-pointer">
                  <input onChange={() => setSize(size)} type="radio" name="size" className="peer hidden" />
                  <span className="bg-gray-200 rounded-full py-2.5 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
                    {size === "XXS" ? "XX-Small" : size === "XS" ? "X-Small" : size === "S" ? "Small" : size === "M" ? "Medium" : size === "L" ? "Large" : size === "XL" ? "X-Large" : size === "XXL" ? "XX-Large" : size === "3XL" ? "3X-Large" : size === "4XL" ? "4X-Large" : size}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <hr className="text-gray-200" />
          <div className="flex gap-5">
            {/* QUANTITY */}
            <div className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-1 gap-3 flex-1">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="text-lg font-bold cursor-pointer"
              >
                <TiMinus size={15} />
              </button>

              <span className="font-medium">{quantity}</span>

              <button
                onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                className="text-lg font-bold cursor-pointer"
              >
                <FaPlus size={15} />
              </button>
            </div>
            <button onClick={() => addToCart(product._id, quantity, size, color)} className="bg-black py-2 text-white flex-4 rounded-full cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="my-10">
        <ProductSection
          title="You might also like"
          products={similarProducts}
        />
      </div>
    </div>
  );
};

export default Product;
