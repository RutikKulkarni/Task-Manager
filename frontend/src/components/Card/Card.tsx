import React from 'react';

interface TaskCardProps {
  title: string;
  description?: string;
  priority?: string;
  deadline?: string;
  status: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, priority, deadline, status, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="p-4 bg-gray-100 rounded mb-2 shadow"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      <p>Deadline: {deadline}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default TaskCard;
