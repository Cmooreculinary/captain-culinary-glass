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

  // ============================================================================
  // CONVERSATION MANAGEMENT
  // ============================================================================

  const createNewConversation = (title: string = 'New Conversation') => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
    setMessages([]);
    return newConv.id;
  };

  const loadConversation = (id: string) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setCurrentConversationId(id);
      setMessages(conv.messages);
    }
  };

  const updateCurrentConversation = (newMessages: Message[]) => {
    if (!currentConversationId) {
      const newId = createNewConversation();
      setCurrentConversationId(newId);
    }

    setConversations(prev => prev.map(conv => 
      conv.id === currentConversationId
        ? { ...conv, messages: newMessages, updatedAt: Date.now() }
        : conv
    ));
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  };

  // ============================================================================
  // MESSAGE HANDLING
  // ============================================================================

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build system prompt based on selected chef
      const systemPrompt = getChefSystemPrompt(selectedChef);

      // Call Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: systemPrompt,
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Claude');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content[0].text,
        timestamp: Date.now(),
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      updateCurrentConversation(finalMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ============================================================================
  // CHEF PERSONA SYSTEM PROMPTS
  // ============================================================================

  const getChefSystemPrompt = (chef: ChefPersona): string => {
    const basePrompt = `You are a professional culinary instructor with Captain Culinary, America's first live-in digital chef platform. You provide interactive cooking guidance and culinary education.`;

    switch (chef) {
      case 'garden':
        return `${basePrompt}

You are "The Garden Philosopher" - inspired by Alice Waters' farm-to-table philosophy.

PERSONA:
- Warm, thoughtful, ingredient-obsessed
- Poetic about vegetables and seasonality
- Emphasis on sustainable sourcing
- Philosophy: "Let ingredients speak for themselves"

VOICE:
- Gentle California accent in your tone
- Stories about farmers and gardens
- Connect food to land and season
- Patient, encouraging teaching style

FOCUS:
- Seasonal menu planning and ingredient selection
- Simple preparations that honor ingredients
- Perfect green salad and vinaigrette mastery
- Building relationships with growers
- Farm-to-table philosophy in practice`;

      case 'champion':
        return `${basePrompt}

You are "The American Champion" - inspired by Larry Forgione's American ingredient renaissance.

PERSONA:
- Passionate advocate for American cuisine
- Rediscovered forgotten ingredients
- Bridge between European technique and American products
- Mentor energy, building confidence

VOICE:
- Strong New York presence
- Pride in American culinary heritage
- Ingredient storytelling
- Technique-focused but ingredient-driven

FOCUS:
- American regional ingredients and terroir
- Heirloom vegetables and heritage breeds
- Elevating "humble" American ingredients
- Sourcing knowledge and farmer relationships
- Classical technique with American twist`;

      case 'perfectionist':
        return `${basePrompt}

You are "The Perfectionist" - inspired by Thomas Keller's precision and attention to detail.

PERSONA:
- Obsessive attention to every element
- Perfection through proper execution
- European technique meets American sensibility
- Teaching as refinement of basics
- Humble despite expertise

VOICE:
- Measured, precise language
- Focus on "why" behind every step
- No shortcuts, proper technique always
- Respectful of ingredients and process
- "Mise en place is meditation"

FOCUS:
- Mise en place as foundation for excellence
- Foundational techniques executed perfectly
- French Laundry approach for home cooks
- Attention to detail in every element
- Why precision matters in cooking`;

      case 'kelly':
        return `${basePrompt}

You are "First Mate Kelly" - inspired by Kelly Slater's peak performance nutrition.

PERSONA:
- Laid-back but disciplined
- Performance-driven nutrition choices
- Anti-inflammatory focus
- Longevity and recovery emphasis
- Real talk about what works vs. trends

VOICE:
- California surf culture meets athletic discipline
- Conversational but knowledgeable
- Talk about how food affects performance
- Stories from competition and travel
- "This is what keeps me performing at peak levels"

FOCUS:
- Anti-inflammatory diet principles
- Pre/post-performance meal strategies
- Travel nutrition and eating on the road
- Plant-forward performance eating
- Recovery foods and meal timing
- Clean eating without deprivation`;

      case 'scientist':
        return `${basePrompt}

You are "The Scientist" - inspired by Alton Brown's food science approach.

PERSONA:
- Curious about the "why" behind cooking
- Makes science accessible and fun
- Equipment nerd with practical knowledge
- Problem-solver and troubleshooter
- Makes connections between science and flavor

VOICE:
- Enthusiastic and educational
- Uses analogies and visual explanations
- "Here's what's actually happening..."
- Demystifies kitchen chemistry
- Balance of nerdy and practical

FOCUS:
- Chemistry of cooking (Maillard, emulsification, etc.)
- Equipment selection and proper use
- Troubleshooting common cooking problems
- Understanding ingredient interactions
- Why recipes work (or don't work)`;

      case 'traveler':
        return `${basePrompt}

You are "The Traveler" - inspired by Anthony Bourdain's food-as-culture philosophy.

PERSONA:
- Food is culture, history, human connection
- Adventurous but respectful
- Stories and philosophy over technique
- Anti-pretentious, pro-authenticity
- Eating with purpose and curiosity

VOICE:
- Storytelling and observational
- Raw, honest, sometimes poetic
- Cultural context for every dish
- "Food is about the people who make it"
- Philosophical but grounded

FOCUS:
- Global cuisines and cultural context
- Street food and regional traditions
- Eating as cultural education
- Authenticity over fusion
- Food as gateway to understanding people`;

      default:
        return basePrompt;
    }
  };

  // ============================================================================
  // NAVIGATION HANDLERS
  // ============================================================================

  const navigateTo = (platform: Platform) => {
    setCurrentPlatform(platform);
    if (platform !== 'galley') {
      setSelectedChef(null);
    }
  };

  const selectChef = (chef: ChefPersona) => {
    setSelectedChef(chef);
    createNewConversation(`Cooking with ${getChefName(chef)}`);
  };

  const getChefName = (chef: ChefPersona): string => {
    switch (chef) {
      case 'garden': return 'The Garden Philosopher';
      case 'champion': return 'The American Champion';
      case 'perfectionist': return 'The Perfectionist';
      case 'kelly': return 'First Mate Kelly';
      case 'scientist': return 'The Scientist';
      case 'traveler': return 'The Traveler';
      default: return 'Chef';
    }
  };

  // ============================================================================
  // RENDER: WELCOME SCREEN
  // ============================================================================

  const renderWelcome = () => (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1 className="welcome-title">Captain Culinary</h1>
          <p className="welcome-subtitle">America's First Live-In Digital Chef</p>
        </div>

        <div className="welcome-description">
          <p>Professional culinary education and interactive AI chef mentorship—right from your mobile device.</p>
        </div>

        <div className="platform-cards">
          <div className="platform-card" onClick={() => navigateTo('academy')}>
            <div className="platform-icon">🎓</div>
            <h3>The Academy</h3>
            <p className="platform-label">FREE</p>
            <p>20 professional culinary training modules taught by Chef Chris Moore</p>
          </div>

          <div className="platform-card" onClick={() => navigateTo('galley')}>
            <div className="platform-icon">👨‍🍳</div>
            <h3>The Galley</h3>
            <p className="platform-label">FREEMIUM</p>
            <p>Cook ANY recipe with culturally authentic AI chef personas</p>
          </div>

          <div className="platform-card" onClick={() => navigateTo('tools')}>
            <div className="platform-icon">🔧</div>
            <h3>Pro Tools</h3>
            <p className="platform-label">PREMIUM</p>
            <p>Restaurant management and business tools for professionals</p>
          </div>
        </div>

        <div className="welcome-footer">
          <p className="captain-quote">"Let's make something worth tasting."</p>
          <p className="captain-signature">— Captain Culinary</p>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER: THE ACADEMY
  // ============================================================================

  const renderAcademy = () => (
    <div className="academy-container">
      <div className="academy-header">
        <button className="back-button" onClick={() => navigateTo('welcome')}>
          ← Back
        </button>
        <h2>The Academy</h2>
        <p className="academy-subtitle">Professional Culinary Training with Captain Chris Moore</p>
      </div>

      <div className="academy-content">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">🚀</div>
          <h3>Launching Soon</h3>
          <p>20 professional culinary training modules covering everything from knife skills to advanced techniques.</p>
          
          <div className="waitlist-section">
            <h4>Join the Waitlist</h4>
            <p>Be the first to know when The Academy launches.</p>
            <input 
              type="email" 
              placeholder="Your email address"
              className="waitlist-input"
            />
            <button className="waitlist-button">Notify Me</button>
          </div>
        </div>

        <div className="module-preview">
          <h4>What You'll Learn:</h4>
          <ul className="module-list">
            <li>Foundational knife skills and mise en place</li>
            <li>Stock, sauce, and soup fundamentals</li>
            <li>Meat, poultry, and fish preparation</li>
            <li>Vegetable cookery and seasonality</li>
            <li>Baking and pastry basics</li>
            <li>Menu planning and costing</li>
            <li>Restaurant operations and management</li>
            <li>...and 13 more advanced modules</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER: THE GALLEY (CHEF SELECTION)
  // ============================================================================

  const renderGalley = () => {
    if (selectedChef) {
      return renderCookingInterface();
    }

    return (
      <div className="galley-container">
        <div className="galley-header">
          <button className="back-button" onClick={() => navigateTo('welcome')}>
            ← Back
          </button>
          <h2>The Galley</h2>
          <p className="galley-subtitle">Choose Your AI Chef</p>
        </div>

        <div className="chef-selection">
          <div className="chef-pack">
            <h3 className="pack-title">Pack 1: Culinary Masters</h3>
            <p className="pack-description">Technical excellence and foundational mastery</p>
            
            <div className="chef-cards">
              <div className="chef-card" onClick={() => selectChef('garden')}>
                <div className="chef-avatar">🌱</div>
                <h4>The Garden Philosopher</h4>
                <p className="chef-description">Farm-to-table, seasonal cooking, ingredient-driven simplicity</p>
                <p className="chef-inspired">Inspired by Alice Waters</p>
              </div>

              <div className="chef-card" onClick={() => selectChef('champion')}>
                <div className="chef-avatar">🇺🇸</div>
                <h4>The American Champion</h4>
                <p className="chef-description">American ingredients, heirloom varieties, regional pride</p>
                <p className="chef-inspired">Inspired by Larry Forgione</p>
              </div>

              <div className="chef-card" onClick={() => selectChef('perfectionist')}>
                <div className="chef-avatar">⭐</div>
                <h4>The Perfectionist</h4>
                <p className="chef-description">Precision, foundational technique, attention to detail</p>
                <p className="chef-inspired">Inspired by Thomas Keller</p>
              </div>
            </div>
          </div>

          <div className="chef-pack">
            <h3 className="pack-title">Pack 2: Performance & Lifestyle</h3>
            <p className="pack-description">Peak performance, knowledge, and adventure</p>
            
            <div className="chef-cards">
              <div className="chef-card" onClick={() => selectChef('kelly')}>
                <div className="chef-avatar">🏄</div>
                <h4>First Mate Kelly</h4>
                <p className="chef-description">Peak performance nutrition, anti-inflammatory eating</p>
                <p className="chef-inspired">Inspired by Kelly Slater</p>
              </div>

              <div className="chef-card" onClick={() => selectChef('scientist')}>
                <div className="chef-avatar">🔬</div>
                <h4>The Scientist</h4>
                <p className="chef-description">Food science, why ingredients work, equipment knowledge</p>
                <p className="chef-inspired">Inspired by Alton Brown</p>
              </div>

              <div className="chef-card" onClick={() => selectChef('traveler')}>
                <div className="chef-avatar">🌍</div>
                <h4>The Traveler</h4>
                <p className="chef-description">Food as culture, adventure, philosophy, human connection</p>
                <p className="chef-inspired">Inspired by Anthony Bourdain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER: COOKING INTERFACE (ACTIVE CHEF SESSION)
  // ============================================================================

  const renderCookingInterface = () => (
    <div className="cooking-container">
      <div className="cooking-header">
        <button className="back-button" onClick={() => setSelectedChef(null)}>
          ← Change Chef
        </button>
        <div className="active-chef">
          <span className="chef-avatar-small">{getChefAvatar(selectedChef)}</span>
          <span className="chef-name">{getChefName(selectedChef)}</span>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h3>Welcome to The Galley</h3>
            <p>You're cooking with {getChefName(selectedChef)}.</p>
            <p>Share what you're making or ask for guidance!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          ref={inputRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe what you're cooking or ask for help..."
          className="message-input"
          rows={3}
        />
        <button 
          onClick={sendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );

  const getChefAvatar = (chef: ChefPersona): string => {
    switch (chef) {
      case 'garden': return '🌱';
      case 'champion': return '🇺🇸';
      case 'perfectionist': return '⭐';
      case 'kelly': return '🏄';
      case 'scientist': return '🔬';
      case 'traveler': return '🌍';
      default: return '👨‍🍳';
    }
  };

  // ============================================================================
  // RENDER: PRO TOOLS
  // ============================================================================

  const renderProTools = () => (
    <div className="tools-container">
      <div className="tools-header">
        <button className="back-button" onClick={() => navigateTo('welcome')}>
          ← Back
        </button>
        <h2>Pro Tools</h2>
        <p className="tools-subtitle">Professional restaurant management and business tools</p>
      </div>

      <div className="tools-content">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">🔧</div>
          <h3>Premium Feature</h3>
          <p>Advanced tools for culinary professionals, restaurants, and culinary schools.</p>
          
          <div className="tools-preview">
            <h4>Included Tools:</h4>
            <ul>
              <li>Recipe costing and menu engineering</li>
              <li>Inventory management and ordering</li>
              <li>Kitchen operations and workflow</li>
              <li>Staff training and documentation</li>
              <li>Business analytics and reporting</li>
            </ul>
          </div>

          <button className="upgrade-button">Upgrade to Premium</button>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  // Determine app className for background switching
  const getAppClassName = () => {
    let className = 'App';
    if (currentPlatform === 'academy') className += ' academy-view';
    else if (currentPlatform === 'galley' && selectedChef) className += ' cooking-view';
    else if (currentPlatform === 'galley') className += ' galley-view';
    else if (currentPlatform === 'tools') className += ' tools-view';
    return className;
  };

  return (
    <div className={getAppClassName()}>
      {/* Cast Receiver for Chromecast/AirPlay */}
      <Suspense fallback={null}>
        <CastReceiver />
      </Suspense>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="nav-brand">
          <span className="brand-icon">⚓</span>
          <span className="brand-name">Captain Culinary</span>
        </div>
        
        {currentPlatform !== 'welcome' && (
          <div className="nav-links">
            <button 
              className={`nav-link ${currentPlatform === 'academy' ? 'active' : ''}`}
              onClick={() => navigateTo('academy')}
            >
              Academy
            </button>
            <button 
              className={`nav-link ${currentPlatform === 'galley' ? 'active' : ''}`}
              onClick={() => navigateTo('galley')}
            >
              Galley
            </button>
            <button 
              className={`nav-link ${currentPlatform === 'tools' ? 'active' : ''}`}
              onClick={() => navigateTo('tools')}
            >
              Pro Tools
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {currentPlatform === 'welcome' && renderWelcome()}
        {currentPlatform === 'academy' && renderAcademy()}
        {currentPlatform === 'galley' && renderGalley()}
        {currentPlatform === 'tools' && renderProTools()}
      </main>
    </div>
  );
}

export default App;
