import React, { useState } from 'react';

// 6 Chef Personas from Captain Culinary
const CHEF_PERSONAS = [
  {
    id: 'garden',
    name: 'The Garden Philosopher',
    avatar: '🌱',
    description: 'Farm-to-table, seasonal cooking, ingredient-driven simplicity',
    inspiration: 'Inspired by Alice Waters'
  },
  {
    id: 'champion',
    name: 'The American Champion',
    avatar: '🇺🇸',
    description: 'American ingredients, heirloom varieties, regional pride',
    inspiration: 'Inspired by Larry Forgione'
  },
  {
    id: 'perfectionist',
    name: 'The Perfectionist',
    avatar: '⭐',
    description: 'Precision, foundational technique, attention to detail',
    inspiration: 'Inspired by Thomas Keller'
  },
  {
    id: 'kelly',
    name: 'First Mate Kelly',
    avatar: '🏄',
    description: 'Peak performance nutrition, anti-inflammatory eating',
    inspiration: 'Inspired by Kelly Slater'
  },
  {
    id: 'scientist',
    name: 'The Scientist',
    avatar: '🔬',
    description: 'Food science, why ingredients work, equipment knowledge',
    inspiration: 'Inspired by Alton Brown'
  },
  {
    id: 'traveler',
    name: 'The Traveler',
    avatar: '🌍',
    description: 'Food as culture, adventure, philosophy, human connection',
    inspiration: 'Inspired by Anthony Bourdain'
  }
];

const AiChef: React.FC = () => {
  const [selectedChef, setSelectedChef] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const chef = CHEF_PERSONAS.find(c => c.id === selectedChef);

  if (selectedChef && chef) {
    return (
      <div className="ai-chef-container">
        <button 
          className="back-button"
          onClick={() => setSelectedChef(null)}
        >
          ← Change Chef
        </button>

        <div className="chef-chat-header glass-card">
          <div className="chef-avatar-large">{chef.avatar}</div>
          <div className="chef-info">
            <h2>{chef.name}</h2>
            <p>{chef.description}</p>
          </div>
        </div>

        <div className="chat-area glass-card">
          <div className="welcome-message">
            <h3>Welcome to The Galley</h3>
            <p>You're cooking with {chef.name}.</p>
            <p>Share what you're making or ask for guidance!</p>
          </div>
        </div>

        <div className="chat-input-container glass-card">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe what you're cooking or ask for help..."
            className="glass-input chat-input"
            rows={3}
          />
          <button className="send-button">Send</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chef-selection-container">
      <div className="chef-header">
        <h1>Choose Your AI Chef</h1>
        <p className="chef-subtitle">Each chef brings their unique teaching style and expertise</p>
      </div>

      <div className="chef-packs">
        <div className="chef-pack glass-card">
          <h3 className="pack-title">Pack 1: Culinary Masters</h3>
          <p className="pack-description">Technical excellence and foundational mastery</p>
          
          <div className="chef-grid">
            {CHEF_PERSONAS.slice(0, 3).map((chef) => (
              <div 
                key={chef.id}
                className="chef-card"
                onClick={() => setSelectedChef(chef.id)}
              >
                <div className="chef-avatar">{chef.avatar}</div>
                <h4>{chef.name}</h4>
                <p className="chef-description">{chef.description}</p>
                <p className="chef-inspired">{chef.inspiration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chef-pack glass-card">
          <h3 className="pack-title">Pack 2: Performance & Lifestyle</h3>
          <p className="pack-description">Peak performance, knowledge, and adventure</p>
          
          <div className="chef-grid">
            {CHEF_PERSONAS.slice(3, 6).map((chef) => (
              <div 
                key={chef.id}
                className="chef-card"
                onClick={() => setSelectedChef(chef.id)}
              >
                <div className="chef-avatar">{chef.avatar}</div>
                <h4>{chef.name}</h4>
                <p className="chef-description">{chef.description}</p>
                <p className="chef-inspired">{chef.inspiration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChef;
