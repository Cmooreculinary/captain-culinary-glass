import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProgress } from '../types';

interface LessonViewProps {
  onComplete: (moduleId: string, lessonId: string) => void;
  progress: UserProgress;
}

const LessonView: React.FC<LessonViewProps> = ({ onComplete, progress }) => {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();

  const isCompleted = moduleId && lessonId && progress[moduleId]?.[lessonId];

  const handleComplete = () => {
    if (moduleId && lessonId) {
      onComplete(moduleId, lessonId);
    }
  };

  return (
    <div className="lesson-container">
      <button className="back-button" onClick={() => navigate('/modules')}>
        ← Back to Modules
      </button>

      <div className="glass-card lesson-card">
        <div className="lesson-header">
          <h1>Lesson: {lessonId}</h1>
          <p className="lesson-module">Module: {moduleId}</p>
        </div>

        <div className="lesson-content">
          <p>This is a placeholder lesson view. Replace this component with your actual lesson content.</p>
          
          <div className="lesson-video">
            <div className="video-placeholder">
              <span>🎥</span>
              <p>Video player would go here</p>
            </div>
          </div>

          <div className="lesson-text">
            <h3>Lesson Content</h3>
            <p>Add your lesson text, instructions, and materials here.</p>
          </div>
        </div>

        <div className="lesson-actions">
          {!isCompleted ? (
            <button 
              className="complete-button"
              onClick={handleComplete}
            >
              Mark as Complete
            </button>
          ) : (
            <div className="completed-badge">
              ✓ Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;
