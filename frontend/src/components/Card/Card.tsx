import React, { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { format } from 'date-fns';

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
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, priority = 'Low', deadline, status, onDelete, onDragStart, onDragOver, onDrop }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Choose colors and icons based on priority
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
      default:
        return 'text-green-500';
    }
  };

  // Choose icons and colors based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'In Progress':
        return <FaHourglassHalf className="text-yellow-500" />;
      case 'Under Review':
        return <FaExclamationCircle className="text-blue-500" />;
      case 'To-Do':
      default:
        return <FaExclamationCircle className="text-gray-400" />;
    }
  };

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300 ease-in-out"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div onClick={() => isHovered && onDelete(id)} className="cursor-pointer">
          {isHovered ? <MdDelete className="text-red-500" /> : getStatusIcon(status)}
        </div>
      </div>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <div className="flex justify-between items-center text-sm">
        <p className={`font-medium ${getPriorityStyle(priority)}`}>{priority}</p>
        {deadline && (
          <p className="text-gray-500">{format(new Date(deadline), 'MMM dd, yyyy')}</p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
