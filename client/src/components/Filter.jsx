import React from "react";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { LuSlidersVertical } from "react-icons/lu";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoClose } from "react-icons/io5";
import { useProductStore } from "../store/useProductStore";


const Filter = ({ setOpenFilter, openFilter }) => {
  const { filters, setFilters} = useProductStore();

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category: filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category],
    });
  };

  const handleTypeChange = (type) => {
    setFilters({
      ...filters,
      type: filters.type.includes(type)
        ? filters.type.filter((t) => t !== type)
        : [...filters.type, type],
    });
  };

  const handlePriceChange = (price) => {
    setFilters({
      ...filters,
      price,
    });
  };

  const handleSizeChange = (size) => {
    setFilters({
      ...filters,
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    });
  };

  

  return (
    <div className="border rounded-2xl border-gray-300 h-fit">
      <div className="flex justify-between items-center mx-3 py-3 font-semibold border-b border-gray-300">
        <p>Categories</p>
        <button onClick={() => setOpenFilter(false)} className="text-gray-400 text-xl">
          {openFilter ? <IoClose /> : <LuSlidersVertical />}
        </button>
      </div>
      <div>
        <ul className="py-2 mx-3 border-b border-gray-300">
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input checked={filters.category.includes("men")} onChange={() => handleCategoryChange("men")} type="checkbox" className="peer hidden" />
              <span className="text-gray-400 peer-checked:text-black">Men</span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input checked={filters.category.includes("women")} onChange={() => handleCategoryChange("women")} type="checkbox" className="peer hidden" />
              <span className="text-gray-400 peer-checked:text-black">
                Women
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input checked={filters.category.includes("kids")} onChange={() => handleCategoryChange("kids")} type="checkbox" className="peer hidden" />
              <span className="text-gray-400 peer-checked:text-black">
                Kids
              </span>
              <IoIosArrowForward />
            </label>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center mx-3 py-3 font-semibold border-b border-gray-300">
        <p>Type</p>
        <span className="text-gray-400 text-lg">
          <IoIosArrowUp />
        </span>
      </div>
      <div>
        <ul className="py-2 mx-3 border-b border-gray-300">
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input onChange={() => handleTypeChange("T-Shirts")} type="checkbox" className="peer hidden" />
              <span className="text-gray-400 peer-checked:text-black">
                T-Shirt
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input onChange={() => handleTypeChange("Shirts")} type="checkbox" className="peer hidden" />
              <span className="text-gray-400 peer-checked:text-black">
                Shirt
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input onChange={() => handleTypeChange("Jeans")} type="checkbox" className="peer hidden" />
              <span className="text-gray-400 peer-checked:text-black">
                Jeans
              </span>
              <IoIosArrowForward />
            </label>
          </li>
        </ul>
      </div>
      <div className="mx-3 py-3">
        <p className="font-semibold mb-3 flex justify-between items-center">
          <span>Price</span> <IoIosArrowUp />
        </p>

        <Slider
          onChange={handlePriceChange}
          range
          min={0}
          max={2000}
          defaultValue={[filters.price[0], filters.price[1]]}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-2 px-5">
          <span>${filters.price[0]}</span>
          <span>${filters.price[1]}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mx-3 py-3 font-semibold border-b border-gray-300">
        <p>Size</p>
        <span className="text-gray-400 text-lg">
          <IoIosArrowUp />
        </span>
      </div>
      <div className="py-3 mx-3 border-b border-gray-300 flex flex-wrap gap-3">
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("XXS")} onChange={() => handleSizeChange("XXS")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            XX-Small
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("XS")} onChange={() => handleSizeChange("XS")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            X-Small
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("S")} onChange={() => handleSizeChange("S")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            Small
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("M")} onChange={() => handleSizeChange("M")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            Medium
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("L")} onChange={() => handleSizeChange("L")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("XL")} onChange={() => handleSizeChange("XL")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            X-Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("XXL")} onChange={() => handleSizeChange("XXL")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            XX-Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("3XL")} onChange={() => handleSizeChange("3XL")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            3X-Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input checked={filters.sizes.includes("4XL")} onChange={() => handleSizeChange("4XL")} type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-400 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            4X-Large
          </span>
        </label>
      </div>
      <button className="font-extralight text-sm py-2 flex justify-center items-center w-4/5 mx-auto bg-black text-white rounded-full my-5 cursor-pointer">
        Clear Filter
      </button>
    </div>
  );
};

export default Filter;
