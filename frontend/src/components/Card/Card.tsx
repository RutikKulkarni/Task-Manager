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
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
      default:
        return "bg-green-100 text-green-800";
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
      className="p-4 bg-white rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-300 ease-in-out"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="cursor-pointer"
        >
          {getStatusIcon(status)}
        </div>
      </div>
      {description && (
        <p className="text-gray-600 mb-4">{truncatedDescription}</p>
      )}
      <div className="flex justify-between items-center text-sm">
        <p
          className={`font-medium py-1 px-2 rounded-full ${getPriorityStyle(
            priority
          )}`}
        >
          {priority}
        </p>
        {deadline && (
          <p className="text-gray-500">
            {format(new Date(deadline), "MMM dd, yyyy")}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
