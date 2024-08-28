"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiClipboard,
  FiSettings,
  FiUsers,
  FiBarChart2,
  FiBell,
  FiSun,
  FiX,
} from "react-icons/fi";
import { GoSidebarExpand } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";
import { getTokenInfo, fetchUserName, handleLogout } from "@/utils/auth";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { LuLogOut } from "react-icons/lu";
import { FaGooglePlay } from "react-icons/fa6";
import { FaAppStore } from "react-icons/fa6";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const { token, tokenExpiry } = getTokenInfo();

    if (!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry))) {
      handleLogout(router);
    } else {
      setIsAuthenticated(true);
      fetchUserName(token)
        .then(setUserName)
        .catch((error) => {
          console.error(error.message);
          handleLogout(router);
        });
    }
  }, [router]);

  return (
    <div className="flex h-100">
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform transform fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6 cursor-pointer">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <span className="text-gray-800 font-medium">{userName}</span>
          </div>
          <a onClick={toggleSidebar} className="lg:hidden text-gray-500">
            <GoSidebarExpand size={20} />
          </a>
        </div>
        <div className="flex items-center justify-between mb-8 text-white">
          <div className="flex space-x-4">
            <FiBell className="text-gray-500" />
            <FiSun className="text-gray-500" />
          </div>
          <button
            onClick={() => handleLogout(router)}
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium"
          >
            <LuLogOut />
            Logout
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          <Link
            href="/home"
            className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
              pathname === "/home"
                ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg transform scale-105 font-semibold"
                : "text-gray-600 hover:bg-gray-200 hover:scale-105"
            }`}
          >
            <FiHome className="mr-2" /> Home
          </Link>
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 hover:bg-gray-100"
          >
            <FiClipboard className="mr-2" /> Boards
          </a>
          <Link
            href="/settings"
            className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
              pathname === "/settings"
                ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg transform scale-105 font-semibold"
                : "text-gray-600 hover:bg-gray-200 hover:scale-105"
            }`}
          >
            <FiSettings className="mr-2" /> Settings
          </Link>
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 hover:bg-gray-100"
          >
            <FiUsers className="mr-2" /> Teams
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 hover:bg-gray-100"
          >
            <FiBarChart2 className="mr-2" /> Analytics
          </a>
        </nav>
        <div className="p-2 rounded-lg text-gray-600">
          <div className="flex mb-4">
            <a>
              <FaAppStore className="w-8 h-8" />
            </a>
          </div>
          <h2 className="text-lg font-semibold mb-2">Get our App!</h2>
          <p className="text-sm mb-4">
            Download our app from the App Store for a better experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
