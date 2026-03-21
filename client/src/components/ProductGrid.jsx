import React from "react";
import { LuSlidersVertical } from "react-icons/lu";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { useProductStore } from "../store/useProductStore";
import { useEffect, useState } from "react";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

const ProductGrid = ({ setOpenFilter, openFilter }) => {
  const { products, fetchProducts, filters } = useProductStore();

  // Filter
  const filteredProducts = products.filter((product) => {
    // category filter
    if (
      filters.category.length > 0 &&
      !filters.category.includes(product.category.toLowerCase())
    ) {
      return false;
    }

    // type filter
    if (
      filters.type.length > 0 &&
      !filters.type.includes(product.subCategory)
    ) {
      return false;
    }

    // price filter
    if (
      filters.price.length > 0 &&
      (product.discountPrice < filters.price[0] ||
        product.discountPrice > filters.price[1])
    ) {
      return false;
    }

    // size filter
    if (
      filters.sizes.length > 0 &&
      !product.sizes.some((size) => filters.sizes.includes(size))
    ) {
      return false;
    }
    return true;
  });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="text-2xl max-sm:hidden font-semibold">
          <p>
            <span className="text-gray-400">All</span> COLLECTIONS
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
          <p className="text-gray-400 text-sm max-sm:text-xs">
            Showing 1-9 of {filteredProducts.length} Products
          </p>
          <div className="flex gap-2 items-center max-sm:hidden">
            <p className="text-gray-400 text-sm">Sort by:</p>
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
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <hr className="my-5 border-gray-200" />
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className="border px-5 py-2 rounded-sm cursor-pointer border-gray-200 flex items-center gap-2 disabled:opacity-50"
        >
          <IoArrowBackOutline /> <span>Previous</span>
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`h-10 w-10 flex justify-center items-center rounded-sm cursor-pointer ${
                currentPage === index + 1 ? "bg-gray-200" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="border px-5 py-2 rounded-sm cursor-pointer border-gray-200 flex items-center gap-2 disabled:opacity-50"
        >
          <span className="">Next</span> <IoArrowForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
