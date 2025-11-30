import React from 'react';
import { Link } from 'react-router-dom';
import { UserProgress } from '../types';

interface ModuleListProps {
  progress: UserProgress;
}

// Sample modules - Replace with your actual module data
const SAMPLE_MODULES = [
  {
    id: 'knife-skills',
    title: 'Knife Skills & Mise en Place',
    description: 'Master the foundational techniques every chef needs',
    icon: '🔪',
    lessons: 5
  },
  {
    id: 'stocks-sauces',
    title: 'Stocks, Sauces & Soups',
    description: 'Build flavor foundations for exceptional dishes',
    icon: '🍲',
    lessons: 6
  },
  {
    id: 'proteins',
    title: 'Meat, Poultry & Fish',
    description: 'Perfect protein preparation and cooking methods',
    icon: '🥩',
    lessons: 7
  }
];

const ModuleList: React.FC<ModuleListProps> = ({ progress }) => {
  const getModuleProgress = (moduleId: string) => {
    const completed = progress[moduleId] ? Object.keys(progress[moduleId]).length : 0;
    const module = SAMPLE_MODULES.find(m => m.id === moduleId);
    const total = module?.lessons || 0;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  return (
    <div className="module-list-container">
      <div className="module-header">
        <h1>The Academy</h1>
        <p className="module-subtitle">Professional Culinary Training with Chef Chris Moore</p>
      </div>

      <div className="modules-grid">
        {SAMPLE_MODULES.map((module) => {
          const progressPercent = getModuleProgress(module.id);
          
          return (
            <Link 
              key={module.id}
              to={`/modules/${module.id}/lessons/1`}
              className="module-card glass-card"
            >
              <div className="module-icon">{module.icon}</div>
              <div className="module-content">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <div className="module-meta">
                  <span>{module.lessons} Lessons</span>
                  {progressPercent > 0 && (
                    <span className="progress-badge">{Math.round(progressPercent)}% Complete</span>
                  )}
                </div>
              </div>
              {progressPercent > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleList;
