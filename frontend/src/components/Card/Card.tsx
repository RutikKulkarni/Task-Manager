import React from "react";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  deadline?: string;
  status: string;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: (id: string) => void;
  isHighlighted?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  priority = "Low",
  deadline,
  status,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onClick,
}) => {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low":
      default:
        return "bg-green-100 text-green-800 border-green-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-500" />;
      case "In Progress":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Under Review":
        return <FaExclamationCircle className="text-blue-500" />;
      case "To-Do":
      default:
        return <FaExclamationCircle className="text-gray-400" />;
    }
  };

  const truncatedDescription =
    description && description.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-lg mb-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-l-4 ${getPriorityStyle(
        priority
      )}`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="cursor-pointer text-lg"
        >
          {getStatusIcon(status)}
        </div>
      </div>
      {description && (
        <p className="text-gray-700 mb-4">{truncatedDescription}</p>
      )}
      <div className="flex justify-between items-center text-sm">
        <p
          className={`font-medium py-1 px-3 rounded-full border ${getPriorityStyle(
            priority
          )}`}
        >
          {priority}
        </p>
        {deadline && (
          <p className="text-gray-600">
            {format(new Date(deadline), "MMM dd, yyyy")}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
