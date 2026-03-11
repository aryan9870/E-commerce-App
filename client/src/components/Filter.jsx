import React from "react";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { LuSlidersVertical } from "react-icons/lu";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoClose } from "react-icons/io5";

const Filter = ({ setOpenFilter, openFilter }) => {
  return (
    <div className="border rounded-2xl border-gray-300 h-fit">
      <div className="flex justify-between items-center mx-3 py-3 font-semibold border-b border-gray-300">
        <p>Categories</p>
        <button onClick={() => setOpenFilter(false)} className="text-gray-500 text-xl">
          {openFilter ? <IoClose /> : <LuSlidersVertical />}
        </button>
      </div>
      <div>
        <ul className="py-2 mx-3 border-b border-gray-300">
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">Men</span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">
                Women
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">
                Kids
              </span>
              <IoIosArrowForward />
            </label>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center mx-3 py-3 font-semibold border-b border-gray-300">
        <p>Type</p>
        <span className="text-gray-500 text-lg">
          <IoIosArrowUp />
        </span>
      </div>
      <div>
        <ul className="py-2 mx-3 border-b border-gray-300">
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">
                Topwere
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">
                Bottomwere
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">
                Winterwear
              </span>
              <IoIosArrowForward />
            </label>
          </li>
          <li className="">
            <label className="flex justify-between items-center py-1 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span className="text-gray-500 peer-checked:text-black">
                Sportswear
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
          range
          min={1}
          max={100}
          defaultValue={[20, 80]}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-2 px-5">
          <span>$20</span>
          <span>$80</span>
        </div>
      </div>
      <div className="flex justify-between items-center mx-3 py-3 font-semibold border-b border-gray-300">
        <p>Size</p>
        <span className="text-gray-500 text-lg">
          <IoIosArrowUp />
        </span>
      </div>
      <div className="py-3 mx-3 border-b border-gray-300 flex flex-wrap gap-3">
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            XX-Small
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            X-Small
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            Small
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            Medium
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            X-Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            XX-Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            3X-Large
          </span>
        </label>
        <label className="cursor-pointer">
          <input type="checkbox" className="peer hidden" />
          <span className="bg-gray-200 text-gray-500 rounded-full py-2 px-3 text-xs flex items-center justify-center peer-checked:text-white peer-checked:bg-black">
            4X-Large
          </span>
        </label>
      </div>
      <button onClick={() => setOpenFilter(false)} className="font-extralight text-sm py-2 flex justify-center items-center w-4/5 mx-auto bg-black text-white rounded-full my-5 cursor-pointer">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
