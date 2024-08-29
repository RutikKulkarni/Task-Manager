import React, { useState } from "react";
import { format } from "date-fns";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

interface TaskModalProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: string) => void;
  onEdit: (task: any) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onDelete,
  onMove,
  onEdit,
}) => {
  const [newStatus, setNewStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  if (!isOpen || !task) return null;

  const today = new Date().toISOString().split('T')[0];

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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{isEditing ? "Edit Task" : task.title}</h2>
          <button
            onClick={onClose}
            className="flex items-center space-x-2 p-2 rounded transition duration-200 cursor-pointer"
          >
            <IoIosCloseCircleOutline className="w-6 h-6 text-gray-500 hover:text-gray-700 transition duration-200" />
            <span className="text-gray-700">Close</span>
          </button>
        </div>

        {!isEditing ? (
          <>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <div className="mb-4">
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
                Change Status:
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={handleMove}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 border-none flex items-center space-x-2"
                >
                  <span>Change Status</span>
                </button>
                <button
                  onClick={handleEdit}
                  className="text-black py-2 px-4 rounded-lg hover:underline transition duration-300 border-none flex items-center space-x-2"
                >
                  <CiEdit className="w-5 h-5" />
                  <span>{isEditing ? "Cancel" : "Edit Task"}</span>
                </button>
              </div>
              <button
                onClick={() => {
                  onDelete(task._id);
                  onClose();
                }}
                className="text-red-600 py-2 px-4 rounded-lg hover:text-red-700 transition duration-300 border-none flex items-center space-x-2"
              >
                <MdDelete className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-800 font-medium mb-2">
                Title:
              </label>
              <input
                id="title"
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                min={today}
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
