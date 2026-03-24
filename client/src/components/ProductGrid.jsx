import React from "react";
import { LuSlidersVertical } from "react-icons/lu";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { useProductStore } from "../store/useProductStore";
import { useEffect, useState } from "react";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

const ProductGrid = ({ setOpenFilter, openFilter }) => {
  const { products, fetchProducts, filters, searchQuery } = useProductStore();

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


  // Sort
  const [sortOption, setSortOption] = useState("newest");
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "newest") {
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === "rating") {
      return b.ratings - a.ratings;
    }
    if (sortOption === "low-high") {
      return a.discountPrice - b.discountPrice;
    }
    if (sortOption === "high-low") {
      return b.discountPrice - a.discountPrice;
    }
    return 0;
  });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
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
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  return currentProducts.length === 0 ? (
    <div className="flex justify-center items-center h-96">
      <p className="text-gray-400 text-2xl">No products found</p>
    </div>
  ) : (
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
              <select
                onChange={(e) => setSortOption(e.target.value)}
                className="outline-none w-30"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
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
