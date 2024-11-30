import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ActivityProvider } from './context/ActivityContext';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import ActivityPage from './pages/ActivityPage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ActivityProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/activities" 
                element={
                  <PrivateRoute>
                    <ActivityPage />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </ActivityProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;