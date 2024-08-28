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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <p className="text-gray-500 mb-2">
          Priority:{" "}
          <span className={`font-medium ${getPriorityStyle(task.priority)}`}>
            {task.priority}
          </span>
        </p>
        <p className="text-gray-500 mb-4">
          Due Date:{" "}
          {task.deadline && format(new Date(task.deadline), "MMM dd, yyyy")}
        </p>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 mb-2">
            Move to Status:
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              onDelete(task._id);
              onClose();
            }}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={handleMove}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Move
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
