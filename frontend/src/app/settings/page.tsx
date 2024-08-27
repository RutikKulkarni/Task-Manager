"use client";
import SidebarWrapper from "@/components/Wrappers/SidebarWrapper";
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useEffect, useState } from "react";
import axios from "axios";

export default function SettingsPage() {
  const [userData, setUserData] = useState<{ name: string; email: string }>({ name: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err: any) {
        console.error("Error fetching user data:", err.message || err);
        setError("Failed to fetch user data. Please check your connection or login status.");
      }
    };

    fetchUserData();
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
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata/name`, { name: userData.name }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (newPassword) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata/password`, { password: newPassword }, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">Settings</h1>
        {error && <div className="bg-red-600 text-white p-2 mb-4 rounded-md">{error}</div>}
        {success && <div className="bg-green-600 text-white p-2 mb-4 rounded-md">{success}</div>}

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-700 p-4 rounded-md">
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
            />
          </div>

          <div className="bg-gray-700 p-4 rounded-md">
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
            />
          </div>

          <div className="bg-gray-700 p-4 rounded-md">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
            />
          </div>

          <div className="bg-gray-700 p-4 rounded-md">
            <label className="block text-white mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white"
            />
          </div>

          <PrimaryButton
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    </SidebarWrapper>
  );
}
