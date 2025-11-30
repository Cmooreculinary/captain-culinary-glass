# ⚡ QUICK DEPLOYMENT REFERENCE

## 🚀 NETLIFY (RECOMMENDED - START HERE)

### **2-Minute Deploy:**
```bash
1. npm run build
2. Go to netlify.com
3. Drag dist/ folder
4. Done!
```

**URL:** `https://captain-culinary.netlify.app`

---

### **5-Minute GitHub Deploy:**
```bash
1. git push to GitHub
2. netlify.com → "New site from Git"
3. Connect repository
4. Auto-deploys on every push
```

**Files needed:** `netlify.toml` ✅ (included)

---

## 🔥 FIREBASE (FOR LATER)

### **5-Minute Deploy:**
```bash
1. npm install -g firebase-tools
2. firebase login
3. firebase init
   → Choose "Hosting"
   → Public directory: dist
   → Single-page app: Yes
4. npm run build
5. firebase deploy
```

**URL:** `https://captain-culinary.web.app`

**Files needed:** `firebase.json`, `.firebaserc` ✅ (both included)

---

## 📋 FILES YOU HAVE

```
✅ netlify.toml       → Netlify config
✅ firebase.json      → Firebase config  
✅ .firebaserc        → Firebase project
✅ DEPLOY-NETLIFY.md  → Full Netlify guide
✅ DEPLOY-FIREBASE.md → Full Firebase guide
✅ All source code    → Ready to deploy
```

---

## 🎯 CHOOSE YOUR PATH

### **Path A: Netlify (Easiest)**
```
npm run build → Drag to netlify.com → Share URL
Time: 2 minutes
```

### **Path B: Firebase (More Features)**
```
firebase login → firebase deploy → Share URL
Time: 5 minutes
```

### **Path C: Both (Best)**
```
Deploy to Netlify today (fast)
Test with users
Add Firebase later when you need database
```

---

## 💰 COSTS

**Netlify Free:** 100GB bandwidth  
**Firebase Free:** 10GB bandwidth  

**Both:** $0 to start

---

## 🌐 CUSTOM DOMAIN

**Both platforms:**
1. Buy domain: $10/year
2. Add in platform dashboard
3. Update DNS records
4. Free SSL automatic
5. Done!

---

## 🔄 UPDATES

**Both platforms:**
```bash
npm run build
[deploy command]
```

**Auto-deploy from GitHub:**
- Netlify: Built-in ✅
- Firebase: Setup needed

---

## ✅ RECOMMENDATION

**START:** Netlify (fastest)  
**GROW:** Firebase (when needed)  
**BOTH:** Works perfectly together

---

**Pick Netlify. Deploy now. Ship Captain Culinary.** ⚓

See full guides in:
- `DEPLOY-NETLIFY.md`
- `DEPLOY-FIREBASE.md`
- `NETLIFY-VS-FIREBASE.md`
