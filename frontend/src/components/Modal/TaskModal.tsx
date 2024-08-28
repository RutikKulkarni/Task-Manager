import React, { useState } from "react";
import { format } from "date-fns";

interface TaskModalProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onDelete,
  onMove,
}) => {
  const [newStatus, setNewStatus] = useState(task.status);

  if (!isOpen || !task) return null;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-red-600";
      case "Medium":
        return "text-yellow-500";
      case "Low":
      default:
        return "text-green-500";
    }
  };

  const handleMove = () => {
    onMove(task._id, newStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-6">{task.description}</p>
        <div className="mb-6">
          <p className="text-gray-600 mb-1">
            <strong>Priority:</strong>{" "}
            <span
              className={`font-semibold ${getPriorityStyle(task.priority)}`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-gray-600">
            <strong>Due Date:</strong>{" "}
            {task.deadline
              ? format(new Date(task.deadline), "MMM dd, yyyy")
              : "N/A"}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="status"
            className="block text-gray-800 font-medium mb-2"
          >
            Move to Status:
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-800"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => {
              onDelete(task._id);
              onClose();
            }}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={handleMove}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Move
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
