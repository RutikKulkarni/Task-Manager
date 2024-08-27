import React, { useState, useEffect } from 'react';
import TaskCard from '@/components/Card/Card';
import Modal from '@/components/Modal/Modal';
import PrimaryButton from '@/components/Button/PrimaryButton';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleSaveTask = async (task: { title: string; description?: string; priority?: string; deadline?: string; status: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: any) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...task, status })
    })
      .then(() => {
        setTasks(tasks.map(t => t._id === task._id ? { ...t, status } : t));
      });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <PrimaryButton onClick={() => setModalOpen(true)}>Create Task</PrimaryButton>
      <div className="flex space-x-4 mt-4">
        {['To-Do', 'In Progress', 'Under Review', 'Completed'].map((status) => (
          <div
            key={status}
            className="flex-1 p-4 border rounded bg-gray-50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h2 className="text-xl mb-2">{status}</h2>
            {tasks.filter(task => task.status === status).map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                deadline={task.deadline}
                status={task.status}
                onDragStart={(e) => handleDragStart(e, task)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveTask} />
    </div>
  );
};

export default Dashboard;
