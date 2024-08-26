"use client";
import React, { useState } from "react";
import moment from "moment";
import { FaEllipsisV } from "react-icons/fa";
import PrimaryButton from "@/components/Button/PrimaryButton"; 

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
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editSection, setEditSection] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false); // Manage modal visibility

  const [newTicketTitle, setNewTicketTitle] = useState<string>("");
  const [newTicketDescription, setNewTicketDescription] = useState<string>("");
  const [newTicketPriority, setNewTicketPriority] = useState<"Normal" | "Medium" | "Urgent">("Normal");
  const [newTicketDeadline, setNewTicketDeadline] = useState<string>("");
  const [newTicketSection, setNewTicketSection] = useState<"To Do" | "In Progress" | "Under Review" | "Finished">("To Do");

  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});

  const handleAddTicket = () => {
    if (newTicketTitle.trim() !== "" && newTicketDescription.trim() !== "" && newTicketDeadline.trim() !== "") {
      const newTask: Task = {
        title: newTicketTitle,
        description: newTicketDescription,
        priority: newTicketPriority,
        deadline: newTicketDeadline,
        createdAt: new Date(),
        section: newTicketSection,
      };

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
          setToDo([...toDo, newTask]);
          break;
      }

      // Reset form
      setNewTicketTitle("");
      setNewTicketDescription("");
      setNewTicketPriority("Normal");
      setNewTicketDeadline("");
      setNewTicketSection("To Do");
      setShowModal(false); // Close the modal after adding
    }
  };

  const handleEditTask = () => {
    if (editTask && editIndex !== null) {
      const updatedTask: Task = { ...editTask, createdAt: new Date() };

      // Remove task from its current section
      switch (editSection) {
        case "To Do":
          setToDo(toDo.filter((_, i) => i !== editIndex));
          break;
        case "In Progress":
          setInProgress(inProgress.filter((_, i) => i !== editIndex));
          break;
        case "Under Review":
          setUnderReview(underReview.filter((_, i) => i !== editIndex));
          break;
        case "Finished":
          setFinished(finished.filter((_, i) => i !== editIndex));
          break;
        default:
          break;
      }

      // Add task to the new section
      switch (updatedTask.section) {
        case "To Do":
          setToDo([...toDo, updatedTask]);
          break;
        case "In Progress":
          setInProgress([...inProgress, updatedTask]);
          break;
        case "Under Review":
          setUnderReview([...underReview, updatedTask]);
          break;
        case "Finished":
          setFinished([...finished, updatedTask]);
          break;
        default:
          break;
      }

      setEditTask(null); // Close the edit modal after updating
      setEditIndex(null);
      setEditSection("");
    }
  };

  const handleCancelEdit = () => {
    setEditTask(null); // Close the edit modal without saving
    setEditIndex(null);
    setEditSection("");
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task, sourceColumn: string) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumn: string) => {
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

  const handleDeleteTask = (task: Task, section: string) => {
    switch (section) {
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
  };

  const handleEditClick = (task: Task, index: number, section: string) => {
    setEditTask(task);
    setEditIndex(index);
    setEditSection(section);
  };

  const handleMenuToggle = (taskTitle: string) => {
    setMenuOpen((prev) => ({
      ...prev,
      [taskTitle]: !prev[taskTitle],
    }));
  };

  const handleMoveTo = (task: Task, section: string) => {
    // Update section and move task
    const updatedTask = { ...task, section };
    handleDeleteTask(task, task.section);
    switch (section) {
      case "To Do":
        setToDo([...toDo, updatedTask]);
        break;
      case "In Progress":
        setInProgress([...inProgress, updatedTask]);
        break;
      case "Under Review":
        setUnderReview([...underReview, updatedTask]);
        break;
      case "Finished":
        setFinished([...finished, updatedTask]);
        break;
      default:
        break;
    }
    setMenuOpen((prev) => ({
      ...prev,
      [task.title]: false,
    }));
  };

  return (
    <>
      {/* Modal for editing a task */}
      

      <PrimaryButton onClick={() => setShowModal(true)} className="mt-4">
        Add New Task
      </PrimaryButton>
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md relative max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            <textarea
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Edit description"
            />
            <select
              value={editTask.priority}
              onChange={(e) => setEditTask({
                ...editTask,
                priority: e.target.value as "Normal" | "Medium" | "Urgent",
              })}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
            <input
              type="date"
              value={moment(editTask.deadline).format("YYYY-MM-DD")}
              onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            <select
              value={editTask.section}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  section: e.target.value as "To Do" | "In Progress" | "Under Review" | "Finished",
                })
              }
              className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Finished">Finished</option>
            </select>
            <div className="flex justify-end">
              <PrimaryButton onClick={handleEditTask} className="mr-2">Save</PrimaryButton>
              <PrimaryButton onClick={handleCancelEdit} className="bg-gray-500">Cancel</PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[{ name: "To Do", tasks: toDo }, { name: "In Progress", tasks: inProgress }, { name: "Under Review", tasks: underReview }, { name: "Finished", tasks: finished }].map((column) => (
          <div
            key={column.name}
            className="border p-4 rounded-md"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column.name)}
          >
            <h2 className="text-xl font-semibold mb-4">{column.name}</h2>
            {column.tasks.map((task, index) => (
              <div
                key={task.title}
                className="bg-gray-100 p-4 mb-2 rounded-md shadow-sm relative"
                draggable
                onDragStart={(e) => handleDragStart(e, task, column.name)}
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">
                  {moment(task.deadline).format("MMM DD, YYYY")}
                </p>
                <button
                  onClick={() => handleMenuToggle(task.title)}
                  className="absolute top-2 right-2 text-gray-600"
                >
                  <FaEllipsisV />
                </button>
                {menuOpen[task.title] && (
                  <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                    <button
                      onClick={() => handleEditClick(task, index, column.name)}
                      className="block px-4 py-2 text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task, column.name)}
                      className="block px-4 py-2 text-red-500"
                    >
                      Delete
                    </button>
                    <div className="mt-2">
                      <p className="font-semibold">Move To:</p>
                      <button
                        onClick={() => handleMoveTo(task, "To Do")}
                        className="block px-4 py-1 text-blue-600"
                      >
                        To Do
                      </button>
                      <button
                        onClick={() => handleMoveTo(task, "In Progress")}
                        className="block px-4 py-1 text-blue-600"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleMoveTo(task, "Under Review")}
                        className="block px-4 py-1 text-blue-600"
                      >
                        Under Review
                      </button>
                      <button
                        onClick={() => handleMoveTo(task, "Finished")}
                        className="block px-4 py-1 text-blue-600"
                      >
                        Finished
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              <FaEllipsisV />
            </button>
            <h3 className="text-lg font-semibold mb-4">New Task</h3>
            <input
              type="text"
              value={newTicketTitle}
              onChange={(e) => setNewTicketTitle(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Title"
            />
            <textarea
              value={newTicketDescription}
              onChange={(e) => setNewTicketDescription(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Description"
            />
            <select
              value={newTicketPriority}
              onChange={(e) => setNewTicketPriority(e.target.value as "Normal" | "Medium" | "Urgent")}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
            <input
              type="date"
              value={newTicketDeadline}
              onChange={(e) => setNewTicketDeadline(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            <select
              value={newTicketSection}
              onChange={(e) => setNewTicketSection(e.target.value as "To Do" | "In Progress" | "Under Review" | "Finished")}
              className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Finished">Finished</option>
            </select>
            <PrimaryButton onClick={handleAddTicket}>Add Task</PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
