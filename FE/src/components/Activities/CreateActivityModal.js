import React, { useState } from 'react';
import { useActivity } from '../../context/ActivityContext';

function CreateActivityModal({ onClose }) {
  const { createActivity } = useActivity();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    date: '',
    location: '',
    maxParticipants: 10
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createActivity(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Create Activity</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Activity Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            value={formData.maxParticipants}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            min="1"
          />
          <div className="flex justify-between">
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Activity
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateActivityModal;