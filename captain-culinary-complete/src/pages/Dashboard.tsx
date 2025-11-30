import React from 'react';
import { Link } from 'react-router-dom';
import { UserProgress } from '../types';

interface DashboardProps {
  progress: UserProgress;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, userName }) => {
  // Calculate total progress
  const totalLessons = Object.values(progress).reduce(
    (acc, module) => acc + Object.keys(module).length,
    0
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {userName}!</h1>
        <p className="dashboard-subtitle">Continue your culinary journey</p>
      </div>

      <div className="dashboard-stats">
        <div className="glass-card stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{totalLessons}</h3>
            <p>Lessons Completed</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{Object.keys(progress).length}</h3>
            <p>Modules Started</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Beginner</h3>
            <p>Current Level</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/modules" className="action-card glass-card">
          <div className="action-icon">🎓</div>
          <div className="action-content">
            <h3>The Academy</h3>
            <p>Continue your professional training</p>
          </div>
          <div className="action-arrow">→</div>
        </Link>

        <Link to="/ai-chef" className="action-card glass-card">
          <div className="action-icon">👨‍🍳</div>
          <div className="action-content">
            <h3>AI Chef</h3>
            <p>Cook with your AI mentor</p>
          </div>
          <div className="action-arrow">→</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
