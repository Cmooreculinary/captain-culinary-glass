import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ModuleList from './pages/ModuleList';
import LessonView from './pages/LessonView';
import AiChef from './pages/AiChef';

// ============================================================================
// CAPTAIN CULINARY - HYBRID APPLICATION
// 
// Combines:
// - Your routing structure & login system
// - Glass morphism visual design  
// - Module/lesson progress tracking
// - AI Chef integration
// ============================================================================

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface User {
  email: string;
  name: string;
}

export interface UserProgress {
  [moduleId: string]: {
    [lessonId: string]: boolean;
  };
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress>({});
  
  // ============================================================================
  // LIFECYCLE & EFFECTS
  // ============================================================================

  // Load user and progress from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('captain_culinary_user');
    const savedProgress = localStorage.getItem('captain_culinary_progress');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
    
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // ============================================================================
  // USER MANAGEMENT HANDLERS
  // ============================================================================

  const handleLogin = (email: string, name: string) => {
    const newUser: User = { email, name };
    setUser(newUser);
    localStorage.setItem('captain_culinary_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('captain_culinary_user');
  };

  // ============================================================================
  // PROGRESS TRACKING HANDLERS
  // ============================================================================

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress[moduleId]) {
      newProgress[moduleId] = {};
    }
    
    newProgress[moduleId][lessonId] = true;
    setProgress(newProgress);
    localStorage.setItem('captain_culinary_progress', JSON.stringify(newProgress));
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          {/* Landing Page - Public */}
          <Route 
            index 
            element={
              !user ? (
                <Landing onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          
          {/* Dashboard - Protected */}
          <Route 
            path="dashboard" 
            element={
              user ? (
                <Dashboard progress={progress} userName={user.name} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          {/* Module List - Protected */}
          <Route 
            path="modules" 
            element={
              user ? (
                <ModuleList progress={progress} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          {/* Individual Lesson - Protected */}
          <Route 
            path="modules/:moduleId/lessons/:lessonId" 
            element={
              user ? (
                <LessonView 
                  onComplete={handleLessonComplete} 
                  progress={progress} 
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          {/* AI Chef - Protected */}
          <Route 
            path="ai-chef" 
            element={
              user ? (
                <AiChef />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
