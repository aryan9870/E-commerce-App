import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const SearchBar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useProductStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  const handleSearch = (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    navigate(`/collection?q=${input}`);
  };

  return (
    <div className="w-[40%] flex gap-2 items-center bg-gray-200 rounded-full px-5 py-2.5 shadow-sm max-xl:hidden">
      <IoMdSearch className="text-xl text-gray-400" />
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if(e.target.value === ""){
            navigate("/collection");
          }
        }}
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
