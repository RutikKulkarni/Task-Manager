"use client";
import { useEffect, useState } from "react";
import { getTokenInfo, fetchUserName, handleLogout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { FiHelpCircle } from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");

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

    // Determine the time of day and set the appropriate greeting
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
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 dark:text-gray-200">
          {greeting}, {userName}!
        </h1>
        <div className="flex items-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-600 dark:text-gray-400 cursor-pointer">
          {/* Show text only on screens medium and up */}
          <span className="hidden md:inline">Help & feedback</span>
          <FiHelpCircle className="inline-block" />
        </div>
      </div>
    </>
  );
}
