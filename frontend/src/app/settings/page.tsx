"use client";
import SidebarWrapper from "@/components/Wrappers/SidebarWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default function SettingsPage() {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/userdata`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const updates: any = {};
      // Check if the name has changed
      if (userData.name !== userData.name) {
        updates.name = userData.name;
        await axios.put(`${API_BASE_URL}/userdata/name`, { name: userData.name }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      // Check if the password has been provided
      if (newPassword) {
        await axios.put(`${API_BASE_URL}/userdata/password`, { password: newPassword }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      setSuccess("Settings updated successfully");
    } catch (err) {
      setError("Failed to update settings");
      console.error(err);
    }
  };

  return (
    <SidebarWrapper>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
        {success && <div className="bg-green-500 text-white p-2 mb-4">{success}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </SidebarWrapper>
  );
}
