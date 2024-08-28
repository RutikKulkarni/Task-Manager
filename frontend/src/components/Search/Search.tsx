import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
      <div className="flex items-center justify-center rounded-l-lg border-r border-gray-300 p-3">
        <CiSearch className="w-5 h-5 text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-xs p-3 text-gray-700 font-semibold outline-none bg-white rounded-r-lg focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

export default Search;
