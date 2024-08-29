"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
