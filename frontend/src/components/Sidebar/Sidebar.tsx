"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHome, FiClipboard, FiSettings, FiUsers, FiBarChart2, FiBell, FiSun, FiX } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    
    if (!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry))) {
      handleLogout();
    } else {
      setIsAuthenticated(true);
      fetchUserName(token);
    }
  }, [router]);

  const fetchUserName = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/userdata`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
        } else {
          throw new Error("Failed to fetch user data.");
        }
      }

      const data = await response.json();
      setUserName(data.name);
    // } catch (error) {
    //   console.error(error.message);
    //   handleLogout();
    // }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred.");
      }
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    router.push("/login");
  };

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform transform fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={navigateToSettings}>
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <span className="text-gray-800 font-medium">{userName}</span>
          </div>
          <a onClick={toggleSidebar} className="lg:hidden text-gray-500">
            <FiX size={24} />
          </a>
        </div>
        <div className="flex items-center px-2 justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FiBell className="text-gray-500" />
            <FiSun className="text-gray-500" />
          </div>
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium">
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
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
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
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiUsers className="mr-2" /> Teams
          </a>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiBarChart2 className="mr-2" /> Analytics
          </a>
        </nav>

        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
          Create new task +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
