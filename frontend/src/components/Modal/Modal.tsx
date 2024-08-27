import React, { useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description?: string; priority?: string; deadline?: string; status: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('To-Do');

  const handleSubmit = () => {
    onSave({ title, description, priority, deadline, status });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl mb-4">Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex justify-between">
          <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
