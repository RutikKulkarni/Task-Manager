"use client";
import React, { useState } from "react";

const Dashboard = () => {
  const [toDo, setToDo] = useState<string[]>([]);
  const [inProgress, setInProgress] = useState<string[]>([]);
  const [underReview, setUnderReview] = useState<string[]>([]);
  const [finished, setFinished] = useState<string[]>([]);
  const [newTicket, setNewTicket] = useState<string>("");

  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setToDo([...toDo, newTicket]);
      setNewTicket("");
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: string,
    sourceColumn: string
  ) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: string
  ) => {
    const task = e.dataTransfer.getData("task");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (targetColumn !== sourceColumn) {
      switch (targetColumn) {
        case "To Do":
          setToDo([...toDo, task]);
          break;
        case "In Progress":
          setInProgress([...inProgress, task]);
          break;
        case "Under Review":
          setUnderReview([...underReview, task]);
          break;
        case "Finished":
          setFinished([...finished, task]);
          break;
        default:
          break;
      }

      switch (sourceColumn) {
        case "To Do":
          setToDo(toDo.filter((t) => t !== task));
          break;
        case "In Progress":
          setInProgress(inProgress.filter((t) => t !== task));
          break;
        case "Under Review":
          setUnderReview(underReview.filter((t) => t !== task));
          break;
        case "Finished":
          setFinished(finished.filter((t) => t !== task));
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <input
          type="text"
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
          placeholder="Enter new ticket"
          className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <button
          onClick={handleAddTicket}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Ticket
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 px-4">
        <Column
          title="To Do"
          tasks={toDo}
          onDrop={(e) => handleDrop(e, "To Do")}
          onDragStart={handleDragStart}
        />
        <Column
          title="In Progress"
          tasks={inProgress}
          onDrop={(e) => handleDrop(e, "In Progress")}
          onDragStart={handleDragStart}
        />
        <Column
          title="Under Review"
          tasks={underReview}
          onDrop={(e) => handleDrop(e, "Under Review")}
          onDragStart={handleDragStart}
        />
        <Column
          title="Finished"
          tasks={finished}
          onDrop={(e) => handleDrop(e, "Finished")}
          onDragStart={handleDragStart}
        />
      </div>
    </>
  );
};

interface ColumnProps {
  title: string;
  tasks: string[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: string,
    title: string
  ) => void;
}

const Column = ({ title, tasks, onDrop, onDragStart }: ColumnProps) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-md mb-3 shadow-sm cursor-move"
          draggable
          onDragStart={(e) => onDragStart(e, task, title)}
        >
          {task}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
