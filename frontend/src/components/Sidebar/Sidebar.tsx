"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiClipboard,
  FiSettings,
  FiUsers,
  FiBarChart2,
  FiBell,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { GoSidebarExpand } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";
import { getTokenInfo, fetchUserName, handleLogout } from "@/utils/auth";
import { LuLogOut } from "react-icons/lu";
import { FaAppStore } from "react-icons/fa6";
import { applyTheme, getInitialTheme } from "@/utils/theme";

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
  const [theme, setTheme] = useState(getInitialTheme() || "light");

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

    applyTheme(theme);
  }, [router, theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex h-100">
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform transform fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6 cursor-pointer">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {userName}
            </span>
          </div>
          <a
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 dark:text-gray-200"
          >
            <GoSidebarExpand size={20} />
          </a>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-4">
            <FiBell className="text-gray-500 dark:text-gray-200" />
            <button onClick={toggleTheme}>
              {theme === "light" ? (
                <FiSun className="text-gray-500 dark:text-gray-200" />
              ) : (
                <FiMoon className="text-gray-500 dark:text-gray-200" />
              )}
            </button>
          </div>
          <button
            onClick={() => handleLogout(router)}
            className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-200 hover:text-red-500 transition-colors duration-300 font-medium"
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
                : "text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <FiHome className="mr-2" /> Home
          </Link>
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiClipboard className="mr-2" /> Boards
          </a>
          <Link
            href="/settings"
            className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
              pathname === "/settings"
                ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg transform scale-105 font-semibold"
                : "text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <FiSettings className="mr-2" /> Settings
          </Link>
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiUsers className="mr-2" /> Teams
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiBarChart2 className="mr-2" /> Analytics
          </a>
        </nav>
        <div className="p-2 rounded-lg text-gray-600 dark:text-gray-200">
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
