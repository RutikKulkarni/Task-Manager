"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";

interface Task {
  title: string;
  description: string;
  priority: "Normal" | "Medium" | "Urgent";
  deadline: string;
  createdAt: Date;
  section: "To Do" | "In Progress" | "Under Review" | "Finished";
}

const Dashboard = () => {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [underReview, setUnderReview] = useState<Task[]>([]);
  const [finished, setFinished] = useState<Task[]>([]);

  const [newTicketTitle, setNewTicketTitle] = useState<string>("");
  const [newTicketDescription, setNewTicketDescription] = useState<string>("");
  const [newTicketPriority, setNewTicketPriority] = useState<
    "Normal" | "Medium" | "Urgent"
  >("Normal");
  const [newTicketDeadline, setNewTicketDeadline] = useState<string>("");
  const [newTicketSection, setNewTicketSection] = useState<
    "To Do" | "In Progress" | "Under Review" | "Finished"
  >("To Do"); // Default section

  const handleAddTicket = () => {
    if (
      newTicketTitle.trim() !== "" &&
      newTicketDescription.trim() !== "" &&
      newTicketDeadline.trim() !== ""
    ) {
      const newTask: Task = {
        title: newTicketTitle,
        description: newTicketDescription,
        priority: newTicketPriority,
        deadline: newTicketDeadline,
        createdAt: new Date(),
        section: newTicketSection, // Assign selected section
      };

      // Push to the correct section based on selected value
      switch (newTicketSection) {
        case "To Do":
          setToDo([...toDo, newTask]);
          break;
        case "In Progress":
          setInProgress([...inProgress, newTask]);
          break;
        case "Under Review":
          setUnderReview([...underReview, newTask]);
          break;
        case "Finished":
          setFinished([...finished, newTask]);
          break;
        default:
          setToDo([...toDo, newTask]); // Default to 'To Do'
          break;
      }

      setNewTicketTitle("");
      setNewTicketDescription("");
      setNewTicketPriority("Normal");
      setNewTicketDeadline("");
      setNewTicketSection("To Do"); // Reset section to default
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    sourceColumn: string
  ) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: string
  ) => {
    const task = JSON.parse(e.dataTransfer.getData("task")) as Task;
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
          setToDo(toDo.filter((t) => t.title !== task.title));
          break;
        case "In Progress":
          setInProgress(inProgress.filter((t) => t.title !== task.title));
          break;
        case "Under Review":
          setUnderReview(underReview.filter((t) => t.title !== task.title));
          break;
        case "Finished":
          setFinished(finished.filter((t) => t.title !== task.title));
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
          value={newTicketTitle}
          onChange={(e) => setNewTicketTitle(e.target.value)}
          placeholder="Enter title"
          className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <input
          type="text"
          value={newTicketDescription}
          onChange={(e) => setNewTicketDescription(e.target.value)}
          placeholder="Enter description"
          className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <select
          value={newTicketPriority}
          onChange={(e) =>
            setNewTicketPriority(e.target.value as "Normal" | "Medium" | "Urgent")
          }
          className="mr-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="Normal">Normal</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          value={newTicketDeadline}
          onChange={(e) => setNewTicketDeadline(e.target.value)}
          className="mr-2 p-2 border border-gray-300 rounded-lg"
        />
        <select
          value={newTicketSection}
          onChange={(e) =>
            setNewTicketSection(
              e.target.value as "To Do" | "In Progress" | "Under Review" | "Finished"
            )
          }
          className="mr-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Finished">Finished</option>
        </select>
        <button
          onClick={handleAddTicket}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Task
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
  tasks: Task[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
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
          <h4 className="font-bold">{task.title}</h4>
          <p>{task.description}</p>
          <p className={`text-sm ${getPriorityColor(task.priority)}`}>
            Priority: {task.priority}
          </p>
          <p>Deadline: {task.deadline}</p>
          <p className="text-sm text-gray-500">
            Created {moment(task.createdAt).fromNow()}
          </p>
        </div>
      ))}
    </div>
  );
};

const getPriorityColor = (priority: "Normal" | "Medium" | "Urgent") => {
  switch (priority) {
    case "Urgent":
      return "text-red-600";
    case "Medium":
      return "text-yellow-600";
    case "Normal":
      return "text-green-600";
    default:
      return "";
  }
};

export default Dashboard;
