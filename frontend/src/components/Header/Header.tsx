"use client";
import { useEffect, useState } from "react";
import { getTokenInfo, fetchUserName, handleLogout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { FiHelpCircle } from "react-icons/fi";
import { IoPricetags } from "react-icons/io5";
import { GrShareOption } from "react-icons/gr";
import { FaEarthAmericas } from "react-icons/fa6";
// import ActionBar from "@/components/ActionBar/ActionBar";

export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const { token, tokenExpiry } = getTokenInfo();

    if (!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry))) {
      handleLogout(router);
    } else {
      fetchUserName(token)
        .then(setUserName)
        .catch((error) => {
          console.error(error.message);
          handleLogout(router);
        });
    }

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [router]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">
          {greeting}, {userName}!
        </h1>
        <div className="flex items-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-600 dark:text-gray-400 cursor-pointer">
          <span className="hidden md:inline">Help & feedback</span>
          <FiHelpCircle className="inline-block" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow-md">
          <IoPricetags className="hidden lg:block w-16 h-16 mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Introducing tags
            </h2>
            <p className="text-sm text-gray-600">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow-md">
          <GrShareOption className="hidden lg:block w-16 h-16 mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Share Notes Instantly
            </h2>
            <p className="text-sm text-gray-600">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow-md">
          <FaEarthAmericas className="hidden lg:block w-16 h-16 mb-4 md:mb-0 md:mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Access Anywhere
            </h2>
            <p className="text-sm text-gray-600">
              Sync your notes across all devices. Stay productive whether you
              are on your phone, tablet, or computer.
            </p>
          </div>
        </div>
      </div>

      {/* <ActionBar onOpenModal={() => setModalOpen(true)} /> */}
    </div>
  );
}
