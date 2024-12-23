import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const Search = () => {
  const query = 'no'
  return (
    <form className="w-full mx-auto max-w-screen-sm relative">
    {/* Input Field */}
    <input
      className="border w-full p-4 pl-12 pr-12 outline-none rounded-lg border-purple-200 bg-gray-200 text-gray-700"
      placeholder="Search"
    />
    {/* Search Icon */}
    <div className="absolute inset-y-0 left-4 flex items-center text-gray-500">
      <FiSearch size={20} />
    </div>
    {/* Clear Icon */}
    {/* {query && (
      <button
        type="button"
        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
      >
        <FiX size={20} />
      </button>
    )} */}
  </form>
  );
};

export default Search;
