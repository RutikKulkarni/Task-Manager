import React from "react";
import Search from "@/components/Search/Search";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { CiCalendar, CiSettings, CiFilter } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";

interface ActionBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notFound: boolean;
  setModalOpen: (open: boolean) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  searchQuery,
  setSearchQuery,
  notFound,
  setModalOpen,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 mt-8 space-y-4 lg:space-y-0">
      <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {notFound && (
        <div className="text-red-500 text-center lg:text-left mt-4 lg:mt-0">
          No results found for <b>{searchQuery}</b>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center lg:justify-end space-x-2 lg:space-x-4">
        <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <CiCalendar className="w-6 h-6" />
          <span className="text-sm font-medium">Calendar view</span>
        </button>

        <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <CiSettings className="w-6 h-6" />
          <span className="text-sm font-medium">Automation</span>
        </button>

        <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <CiFilter className="w-5 h-5" />
          <span className="text-sm font-medium">Filter</span>
        </button>

        <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <IoShareOutline className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>

        <PrimaryButton
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Create new task +
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ActionBar;
