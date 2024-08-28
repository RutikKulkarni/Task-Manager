import React, { useState, useEffect } from "react";
import TaskCard from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { CiSearch, CiCalendar, CiSettings, CiFilter } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("API response is not an array");
          setTasks([]);
        }
      });
  }, []);

  const handleDeleteTask = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };


  const handleSaveTask = async (task: {
    title: string;
    description?: string;
    priority?: string;
    deadline?: string;
    status: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: any) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, status }),
    }).then(() => {
      setTasks(tasks.map((t) => (t._id === task._id ? { ...t, status } : t)));
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 pt-1">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 mt-8 space-y-4 lg:space-y-0">
        <div className="flex items-center justify-center ">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
            <div className="flex items-center justify-center rounded-l-lg border-r border-gray-300 p-3">
              <CiSearch className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full max-w-xs p-3 text-gray-700 font-semibold outline-none bg-white rounded-r-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-2 lg:space-x-4">
          <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <CiCalendar className="w-6 h-6" />
            <span className="text-sm font-medium">Calendar view</span>
          </button>

          <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <CiSettings className="w-6 h-6" />
            <span className="text-sm font-medium">Automation</span>
          </button>

          <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <CiFilter className="w-5 h-5" />
            <span className="text-sm font-medium">Filter</span>
          </button>

          <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <IoShareOutline className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>

          <PrimaryButton
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Create new task +
          </PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {["To-Do", "In Progress", "Under Review", "Completed"].map((status) => (
          <div
            key={status}
            className="flex flex-col p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h2 className="text-2xl font-semibold mb-4 border-b pb-3">
              {status}
            </h2>
            <div className="space-y-6">
              {Array.isArray(tasks) &&
                tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      deadline={task.deadline}
                      status={task.status}
                      onDelete={handleDeleteTask}
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, status)}
                    />
                  ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Dashboard;
