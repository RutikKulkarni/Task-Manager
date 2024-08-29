import React, { useState } from "react";
import PrimaryButton from "@/components/Button/PrimaryButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: {
    title: string;
    description?: string;
    priority?: string;
    deadline?: string;
    status: string;
  }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("To-Do");

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    onSave({ title, description, priority, deadline, status });
    // Reset the form fields
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDeadline("");
    setStatus("To-Do");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 transform transition-all duration-300 ease-out">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 mb-4 w-full text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 mb-4 w-full text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out"
          rows={3}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 mb-4 w-full text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={today}
          className="border border-gray-300 rounded-lg p-4 mb-4 w-full text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 mb-6 w-full text-gray-700 bg-gray-100 focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="text-black px-4 py-2 hover:underline transition duration-200 ease-in-out"
          >
            Cancel
          </button>

          <PrimaryButton
            onClick={handleSubmit}
            className="ml-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out"
          >
            Create Task
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
