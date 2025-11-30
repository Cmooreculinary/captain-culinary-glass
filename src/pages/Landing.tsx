import React, { useState } from 'react';

interface LandingProps {
  onLogin: (email: string, name: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onLogin(email, name);
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Hero Section */}
        <div className="landing-hero">
          <h1 className="landing-title">Captain Culinary</h1>
          <p className="landing-subtitle">America's First Live-In Digital Chef</p>
          <p className="landing-description">
            Professional culinary education and interactive AI chef mentorship—right from your mobile device.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="platform-cards">
          <div className="platform-card">
            <div className="platform-icon">🎓</div>
            <h3>The Academy</h3>
            <span className="platform-label">FREE</span>
            <p>20 professional culinary training modules taught by Chef Chris Moore</p>
          </div>

          <div className="platform-card">
            <div className="platform-icon">👨‍🍳</div>
            <h3>The Galley</h3>
            <span className="platform-label">FREEMIUM</span>
            <p>Cook ANY recipe with culturally authentic AI chef personas</p>
          </div>

          <div className="platform-card">
            <div className="platform-icon">🔧</div>
            <h3>Pro Tools</h3>
            <span className="platform-label">PREMIUM</span>
            <p>Restaurant management and business tools for professionals</p>
          </div>
        </div>

        {/* CTA Section */}
        {!showLogin ? (
          <div className="landing-cta">
            <button 
              className="cta-button primary"
              onClick={() => setShowLogin(true)}
            >
              Get Started Free
            </button>
            <p className="cta-note">
              Start learning professional culinary skills today
            </p>
          </div>
        ) : (
          <div className="login-form-container">
            <div className="glass-card login-card">
              <h2>Welcome to Captain Culinary</h2>
              <p className="login-subtitle">Enter your details to begin your culinary journey</p>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chef in training..."
                    required
                    className="glass-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="glass-input"
                  />
                </div>

                <button type="submit" className="submit-button">
                  Start Learning
                </button>

                <button 
                  type="button" 
                  className="back-link"
                  onClick={() => setShowLogin(false)}
                >
                  ← Back
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer Quote */}
        <div className="landing-footer">
          <p className="captain-quote">"Let's make something worth tasting."</p>
          <p className="captain-signature">— Captain Culinary</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
