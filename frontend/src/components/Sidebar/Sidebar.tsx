"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHome, FiClipboard, FiSettings, FiUsers, FiBarChart2, FiBell, FiSun, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
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
      const data = await response.json();
      setUserName(data.name);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform transform fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4`}
      >
        {/* User Profile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img
              src="/path/to/profile-pic.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-800 font-medium">{userName}</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
            <FiX size={24} /> {/* Close icon */}
          </button>
        </div>

        {/* Notification and Logout */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FiBell className="text-gray-500" />
            <FiSun className="text-gray-500" />
          </div>
          <button onClick={handleLogout} className="text-gray-500">
            Logout
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="space-y-2">
        <Link href="/home" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiHome className="mr-2" /> Home
          </Link>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiClipboard className="mr-2" /> Boards
          </a>
          
          <Link href="/settings" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiSettings className="mr-2" /> Settings
          </Link>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiUsers className="mr-2" /> Teams
          </a>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <FiBarChart2 className="mr-2" /> Analytics
          </a>
        </nav>

        {/* Create New Task Button */}
        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
          Create new task +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
