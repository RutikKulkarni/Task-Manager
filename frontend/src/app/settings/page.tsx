"use client";
import SidebarWrapper from "@/components/Wrappers/SidebarWrapper";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SettingsPage() {
  const [userData, setUserData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found");
          }

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserData(response.data);
        } catch (err: any) {
          console.error("Error fetching user data:", err.message || err);
          setError(
            "Failed to fetch user data. Please check your connection or login status."
          );
        }
      };

      fetchUserData();
    }
  }, []);

  const handleSave = async () => {
    if (newPassword && newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      if (userData.name) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata/name`,
          { name: userData.name },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      if (newPassword) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata/password`,
          { password: newPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setSuccess("Settings updated successfully");
      setError(null);
    } catch (err: any) {
      console.error("Error updating settings:", err.message || err);
      setError("Failed to update settings. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <SidebarWrapper>
      <div className="container p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Settings</h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4 font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-4 font-semibold">
            {success}
          </div>
        )}

        <div className="space-y-8">
          <div>
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full p-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none shadow-sm transition duration-150"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition duration-150"
          >
            Save Changes
          </button>
        </div>
      </div>
    </SidebarWrapper>
  );
}
