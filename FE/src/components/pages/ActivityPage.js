import React, { useState } from 'react';
import { useActivity } from '../context/ActivityContext';
import CreateActivityModal from '../components/Activities/CreateActivityModal';

function ActivityPage() {
  const { activities, joinActivity } = useActivity();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Activities</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Activity
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold mb-2">{activity.title}</h2>
            <p className="text-gray-600 mb-2">{activity.description}</p>
            <div className="mb-2">
              <span className="font-bold">Category:</span> {activity.category}
            </div>
            <div className="mb-2">
              <span className="font-bold">Date:</span> {activity.date}
            </div>
            <div className="mb-2">
              <span className="font-bold">Location:</span> {activity.location}
            </div>
            <div className="mb-2">
              <span className="font-bold">Participants:</span> 
              {activity.participants.length} / {activity.maxParticipants}
            </div>
            <button 
              onClick={() => joinActivity(activity.id)}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Join Activity
            </button>
          </div>
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateActivityModal 
          onClose={() => setIsCreateModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default ActivityPage;