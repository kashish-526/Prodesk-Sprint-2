# Prodesk IT — Sprint 2: Logic & Data Persistence

A JavaScript-based web application demonstrating DOM Manipulation, state management, localStorage persistence, and dynamic UI interactions as part of Sprint 2 of the Prodesk IT Associate Software Engineering Program.

---

# Live Demo & Repository

**GitHub Repository:** https://github.com/YOUR_USERNAME/prodesk-sprint-2

**Live Deployment:** https://your-project.vercel.app

**QA Video:** https://drive.google.com/file/d/YOUR_VIDEO_ID

---

# Project Structure

```
prodesk-sprint-2/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── README.md
```

---

# Sprint Completion Checklist

## ✅ Phase 1 — State Injection & DOM Manipulation

| Requirement | Status | Notes |
|------------|--------|------|
| Dynamic JSON data integration | ✅ | Application loads data from JavaScript JSON objects |
| DOM Manipulation | ✅ | UI updates dynamically using JavaScript |
| Secure text updates | ✅ | textContent used instead of innerHTML where applicable |
| UI state changes | ✅ | Buttons and controls update page state dynamically |

---

## ✅ Phase 2 — Local Storage & Session Persistence

| Requirement | Status | Notes |
|------------|--------|------|
| localStorage implementation | ✅ | User data stored locally |
| Persistent application state | ✅ | Data remains after page refresh |
| Theme persistence | ✅ | Dark mode saved using localStorage |
| Session restoration | ✅ | Previous application state restored automatically |

---

## ✅ Phase 3 — Performance & JavaScript Architecture

| Requirement | Status | Notes |
|------------|--------|------|
| Event listener management | ✅ | Event listeners organized efficiently |
| Memory optimization | ✅ | Proper event cleanup implemented |
| Modular JavaScript | ✅ | Code separated into reusable functions |
| Publish–Subscribe architecture | ✅ | Custom event communication implemented *(if applicable)* |

---

# Features

- User Login
- Dashboard
- DOM Manipulation
- Form Validation
- Dynamic UI Updates
- localStorage Data Persistence
- Dark Mode
- Responsive Design
- Responsive Navigation
- Mobile Friendly Layout

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API
- JSON
- DOM API

---

# Architecture Decisions

## DOM Manipulation

Application updates the UI dynamically using JavaScript without reloading the page.

## Local Storage

Application data is stored using the browser Local Storage API, allowing persistence across browser sessions.

## Event Handling

All user interactions are managed using JavaScript event listeners.

## Theme Management

Dark mode preference is saved in localStorage and restored automatically when the application reloads.

---

# Performance Notes

- Efficient DOM updates
- Minimal DOM re-rendering
- Reusable JavaScript functions
- Responsive layout
- Optimized assets

---

# Deployment

## Vercel

```
git init
git add .
git commit -m "Sprint 2 Initial Commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prodesk-sprint-2.git
git push -u origin main
```

Deploy using Vercel.

---

# Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ |
| Edge | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Mobile Chrome | ✅ |
| Mobile Safari | ✅ |

---

# Semantic Commit History

```
feat: initialize Sprint 2 project

feat: implement login validation

feat: add dashboard functionality

feat: integrate localStorage

feat: implement dark mode persistence

feat: improve DOM manipulation

feat: optimize JavaScript structure

docs: update README
```

---

# Sprint 2 — Prodesk IT Associate Software Engineering Programme