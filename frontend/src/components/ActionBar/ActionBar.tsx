import { CiSearch, CiCalendar, CiSettings, CiFilter } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";

export default function ActionBar() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 mt-6 space-y-4 lg:space-y-0">
      <div className="relative mb-4 lg:mb-0">
        <input
          type="text"
          placeholder="Search"
          className="p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
          style={{ width: "200px", maxWidth: "100%" }} // Consistent width with max-width for smaller screens
        />
        <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex flex-wrap items-center space-x-2 lg:space-x-3">
        <button className="flex items-center space-x-1 p-2 border border-gray-300 rounded-lg text-gray-600">
          <CiCalendar className="w-6 h-6" />
          <span className="text-sm">Calendar view</span>
        </button>

        <button className="flex items-center space-x-1 p-2 border border-gray-300 rounded-lg text-gray-600">
          <CiSettings className="w-6 h-6" />
          <span className="text-sm">Automation</span>
        </button>

        <button className="flex items-center space-x-1 p-2 border border-gray-300 rounded-lg text-gray-600">
          <CiFilter className="w-4 h-4" />
          <span className="text-sm">Filter</span>
        </button>

        <button className="flex items-center space-x-1 p-2 border border-gray-300 rounded-lg text-gray-600">
          <IoShareOutline className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>

        <button className="p-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-1">
          <span className="text-sm">Create new</span>
          <span className="text-sm">+</span>
        </button>
      </div>
    </div>
  );
}
