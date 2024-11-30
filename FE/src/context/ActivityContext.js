import React, { createContext, useState, useContext, useEffect } from 'react';

const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Simulated activities data
  const mockActivities = [
    {
      id: '1',
      title: 'Basketball Meetup',
      description: 'Weekend basketball game at community park',
      category: 'Sports',
      date: '2024-07-15',
      location: 'Community Park',
      participants: ['John', 'Mike'],
      maxParticipants: 10
    },
    {
      id: '2',
      title: 'Study Group',
      description: 'Computer Science study session',
      category: 'Study',
      date: '2024-07-20',
      location: 'Library',
      participants: ['Sarah'],
      maxParticipants: 5
    }
  ];

  useEffect(() => {
    // Simulate fetching activities
    setActivities(mockActivities);
  }, []);

  const createActivity = (newActivity) => {
    const activity = {
      ...newActivity,
      id: String(activities.length + 1),
      participants: []
    };
    setActivities([...activities, activity]);
  };

  const joinActivity = (activityId) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            participants: [...activity.participants, 'CurrentUser'] 
          } 
        : activity
    ));
  };

  return (
    <ActivityContext.Provider value={{ 
      activities, 
      selectedActivity,
      setSelectedActivity,
      createActivity,
      joinActivity 
    }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);