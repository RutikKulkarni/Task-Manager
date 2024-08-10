import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-500 mb-4"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        {children}
      </div>
    </main>
  );
};

export default SidebarWrapper;
