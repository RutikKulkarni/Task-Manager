import React, { useState } from "react";
import { format } from "date-fns";

interface TaskModalProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: string) => void;
  onEdit: (task: any) => void; // New prop for editing
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onDelete,
  onMove,
  onEdit, // Add onEdit prop
}) => {
  const [newStatus, setNewStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [editedTask, setEditedTask] = useState(task);

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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        {!isEditing ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{task.title}</h2>
            <p className="text-gray-700 mb-6">{task.description}</p>
            <div className="mb-6">
              <p className="text-gray-600 mb-1">
                <strong>Priority:</strong>{" "}
                <span className={getPriorityStyle(task.priority)}>
                  {task.priority}
                </span>
              </p>
              <p className="text-gray-600">
                <strong>Due Date:</strong>{" "}
                {task.deadline ? format(new Date(task.deadline), "MMM dd, yyyy") : "N/A"}
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
                onClick={handleEdit}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Task</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-800 font-medium mb-2">
                Title:
              </label>
              <input
                id="title"
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-800 font-medium mb-2">
                Description:
              </label>
              <textarea
                id="description"
                value={editedTask.description || ""}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block text-gray-800 font-medium mb-2">
                Priority:
              </label>
              <select
                id="priority"
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-800"
              >
                <option value="Urgent">Urgent</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="deadline" className="block text-gray-800 font-medium mb-2">
                Due Date:
              </label>
              <input
                id="deadline"
                type="date"
                value={editedTask.deadline ? format(new Date(editedTask.deadline), "yyyy-MM-dd") : ""}
                onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-800"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveEdit}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={handleEdit}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
