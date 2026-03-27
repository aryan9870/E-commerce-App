import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProductGrid from "../components/ProductGrid";

const Collection = () => {
  const [openFilter, setOpenFilter] = useState(false);

  // Stop scrolling when modal is open
  useEffect(() => {
    window.scrollTo(0,0);
    if (openFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openFilter]);

  return (
    <div className="mt-20 mx-20 max-sm:mt-18 max-sm:mx-5 text-gray-600 tracking-wider">
      <div className="py-5 flex items-center">
        <span className="text-gray-400">HOME</span> <IoIosArrowForward />
        COLLECTION
      </div>
      <div className="flex">
        {/* Filter Section */}
        <div className="flex-1 max-sm:hidden">
          <Filter setOpenFilter={setOpenFilter} openFilter={openFilter} />
        </div>
        {/* Product Section */}
        <div className="flex-4 pl-5 max-sm:flex-1 max-sm:pl-0">
          <ProductGrid setOpenFilter={setOpenFilter} openFilter={openFilter} />
        </div>
      </div>
    </div>
  );
};

export default Collection;
