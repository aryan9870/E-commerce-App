import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const SearchBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery} = useProductStore();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate(`/collection?q=${query}`);
  };

  return (
    <div className="w-[40%] flex gap-2 items-center bg-gray-200 rounded-full px-5 py-2.5 shadow-sm max-xl:hidden">
      <IoMdSearch onClick={handleSearch} className="text-xl text-gray-400" />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
        className="w-full bg-transparent outline-none"
        type="text"
        placeholder="Search for products..."
      />
    </div>
  );
};

export default SearchBar;
