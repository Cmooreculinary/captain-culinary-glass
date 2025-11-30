# Captain Culinary

**America's First Live-In Digital Chef Platform**

Professional culinary education and interactive AI chef mentorship—right from your mobile device.

---

## 🎯 Platform Overview

Captain Culinary is a three-platform ecosystem:

### 🎓 **The Academy** (FREE)
- 20 professional culinary training modules
- Taught by Chef Chris Moore as Captain Culinary
- Progressive skill-building from fundamentals to advanced
- Certification pathway

### 👨‍🍳 **The Galley** (FREEMIUM)
- Cook ANY recipe with 6 culturally authentic AI chef personas
- Interactive, conversational guidance
- Free: 3 sessions/week | Premium: Unlimited

### 🔧 **Pro Tools** (PREMIUM)
- Recipe costing and menu engineering
- Inventory management and ordering
- Kitchen operations and workflow
- Business analytics and reporting

---

## 🧑‍🍳 The 6 Chef Personas

### Pack 1: Culinary Masters
1. **The Garden Philosopher** - Farm-to-table, seasonal cooking (Alice Waters-inspired)
2. **The American Champion** - American ingredients, regional pride (Larry Forgione-inspired)
3. **The Perfectionist** - Precision and technique (Thomas Keller-inspired)

### Pack 2: Performance & Lifestyle
4. **First Mate Kelly** - Peak performance nutrition (Kelly Slater-inspired)
5. **The Scientist** - Food science and equipment (Alton Brown-inspired)
6. **The Traveler** - Food as culture and philosophy (Anthony Bourdain-inspired)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/captain-culinary.git
cd captain-culinary

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Project Structure

```
captain-culinary/
├── src/
│   ├── components/
│   │   └── CastReceiver.tsx    # Chromecast/AirPlay integration
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Brand styling and design system
│   └── main.tsx                # Application entry point
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🎨 Brand Identity

### Colors
- **Bone White**: `#FAF9F6` - Primary background
- **Copper/UT Orange**: `#FF8200` - Accent, energy, warmth
- **Slate Gray**: `#374151` - Text, depth, sophistication
- **Dark Surface**: `rgba(0,0,0,0.8)` - Cards, overlays

### Design Principles
- Mobile-first (phone is primary device)
- Clean, uncluttered interfaces
- Professional but approachable
- Warm, inviting atmosphere

---

## 🚢 Deployment to Vercel

### Why Vercel?
✅ Built for React/Next.js applications  
✅ Zero-config deployment from GitHub  
✅ Automatic preview deployments  
✅ Global CDN for performance  
✅ Free tier with 100GB bandwidth/month  
✅ Automatic HTTPS with custom domains  

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial Captain Culinary build"
   git branch -M main
   git remote add origin https://github.com/yourusername/captain-culinary.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your `captain-culinary` repository
   - Vercel auto-detects React and configures everything
   - Click "Deploy"

3. **Configure Custom Domain** (Optional)
   - In Vercel dashboard, go to your project
   - Settings → Domains
   - Add `captainculinary.com`
   - Follow DNS configuration instructions
   - Vercel handles HTTPS automatically

4. **Environment Variables** (For API Keys)
   - Settings → Environment Variables
   - Add any API keys needed
   - Redeploy to apply changes

### Deploy on Every Push
Vercel automatically deploys:
- `main` branch → Production at captainculinary.com
- Other branches → Preview URLs for testing

---

## 🔧 Technical Features

### What We Kept (From Original Build)
✅ Cast Receiver functionality (Chromecast/AirPlay)  
✅ Conversation state management  
✅ localStorage persistence  
✅ Lazy loading for performance  
✅ Error boundaries and loading states  

### What We Removed (Bloat)
❌ AI image generation (DALL-E, Flux)  
❌ Image editing/manipulation tools  
❌ Unnecessary image processing  
❌ Unfocused "nice to have" features  

### What We Added (Captain Culinary)
✨ Three-platform navigation (Academy/Galley/Pro Tools)  
✨ 6 AI chef persona system prompts  
✨ Brand identity and design system  
✨ Mobile-first responsive design  
✨ Chef selection interface  

---

## 💰 Monetization Model

### Pricing Tiers
- **FREE**: The Academy + 3 Galley sessions/week
- **PREMIUM** ($9.99/mo): Unlimited Galley + all 6 chefs
- **PROFESSIONAL** ($29.99/mo): + Business tools + certification
- **ENTERPRISE**: Custom pricing for schools and restaurants

### Revenue Goals (Year 1)
- Conservative: $30k-$75k MRR
- Optimistic: $75k+ MRR with B2B traction

---

## 🎯 Next Steps

### Phase 1: Core Build (Week 1-2)
- [x] Clean app architecture with brand identity
- [x] 6 chef persona system prompts
- [x] Navigation and welcome experience
- [ ] Add Pro Tools section (preserve existing functionality)
- [ ] Beta testing with friends/family

### Phase 2: Deploy & Test (Week 3)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Custom domain setup (captainculinary.com)
- [ ] Mobile testing on real devices

### Phase 3: Soft Launch (Week 4)
- [ ] Social media announcement
- [ ] Email to personal network
- [ ] Reddit/food community posts
- [ ] Collect initial feedback

### Phase 4: B2B Outreach (Month 2)
- [ ] Email 20 culinary schools
- [ ] Target 2-3 pilot programs
- [ ] Corporate workshop bookings
- [ ] Refine based on feedback

---

## 📞 Contact

**Built by Chef Chris Moore**  
60 years of culinary experience  
Former restaurant owner and culinary educator  

---

## 📄 License

Private - All Rights Reserved

---

## 🙏 Acknowledgments

Inspired by culinary legends:
- Alice Waters (farm-to-table philosophy)
- Larry Forgione (American ingredient renaissance)
- Thomas Keller (precision and excellence)
- Kelly Slater (peak performance nutrition)
- Alton Brown (food science education)
- Anthony Bourdain (food as culture)

---

**"Let's make something worth tasting."**  
— Captain Culinary
