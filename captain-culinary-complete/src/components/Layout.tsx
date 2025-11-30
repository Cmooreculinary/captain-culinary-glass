import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="app-container">
      {/* Glass Morphism Navigation */}
      <nav className="main-nav">
        <div className="nav-brand" onClick={() => navigate('/')}>
          <div className="brand-icon">
            <img src="/images/logo-captain.png" alt="Captain Culinary" />
          </div>
          <span className="brand-name">Captain Culinary</span>
        </div>
        
        {user && (
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/modules" className="nav-link">Academy</Link>
            <Link to="/ai-chef" className="nav-link">AI Chef</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
