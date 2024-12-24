import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Form from "next/form";
import SearchReset from "./reset-form";


const Search = ({ query }: { query?: string }) => {
  return (
    <Form action="/dashboard" scroll={false} className="w-full mx-auto max-w-screen-sm relative">
    {/* Input Field */}
    <input
        name="query"
        defaultValue={query}
      className="border w-full p-4 pl-12 pr-12 outline-none rounded-lg border-purple-200 bg-gray-100 text-gray-700"
      placeholder="Search"
    />
    {/* Search Icon */}
    <button className="absolute inset-y-0 left-4 flex items-center text-gray-500">
      
      <FiSearch size={20} />
    </button>
    {query && (
    <SearchReset />
    )} 
   
  </Form>
  );
};

export default Search;
