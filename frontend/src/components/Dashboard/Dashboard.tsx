import React, { useState, useEffect } from "react";
import TaskCard from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import TaskModal from "@/components/Modal/TaskModal";
import ActionBar from "@/components/ActionBar/ActionBar";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGenericModal, setShowGenericModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
          setSearchResult([]);
        }
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResult(tasks);
      setNotFound(false);
    } else {
      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(filteredTasks);
      setNotFound(filteredTasks.length === 0);
    }
  }, [searchQuery, tasks]);

  const handleDeleteTask = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTasks(tasks.filter((task) => task._id !== id));
    setShowTaskModal(false);
  };

  const handleMoveTask = async (id: string, status: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    setTasks(
      tasks.map((task) => (task._id === id ? { ...task, status } : task))
    );
    setShowTaskModal(false);
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

  const handleEditTask = async (task: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const updatedTask = await response.json();
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    setShowTaskModal(false);
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

  const openTaskModal = (id: string) => {
    const task = tasks.find((t) => t._id === id);
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeAllModals = () => {
    setShowTaskModal(false);
    setShowGenericModal(false);
  };

  return (
    <div className="p-6 pt-1">
      <ActionBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notFound={notFound}
        setModalOpen={setShowGenericModal}
      />

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
              {Array.isArray(searchResult) &&
                searchResult
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
                      onClick={openTaskModal}
                      isHighlighted={task.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())}
                    />
                  ))}
            </div>
          </div>
        ))}
      </div>

      {showGenericModal && (
        <Modal
          isOpen={showGenericModal}
          onClose={closeAllModals}
          onSave={handleSaveTask}
        />
      )}

      {showTaskModal && selectedTask && (
        <TaskModal
          isOpen={showTaskModal}
          task={selectedTask}
          onClose={closeAllModals}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
          onEdit={handleEditTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
