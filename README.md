# Prodesk IT — Sprint 2 & 3

# Prodesk IT — Sprint 3: API Infrastructure Pipeline

A JavaScript-based web application demonstrating async API integration, skeleton loaders, AbortController timeout, and Web Worker implementation as part of Sprint 3 of the Prodesk IT Associate Software Engineering Program.

---

## Live Demo & Repository

**GitHub Repository:** https://github.com/kashish-526/Prodesk-Sprint-2

**Live Deployment:** https://prodesk-sprint-2.vercel.app

**QA Video:** https://drive.google.com/file/d/YOUR_VIDEO_ID

---

## Project Structure
Prodesk-sprint-3/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── eventbus.js
│   ├── main.js
│   ├── rates.js
│   └── worker.js
├── assets/
│   └── images/
└── README.md

---

## Sprint Completion Checklist

### ✅ Phase 1 — Asynchronous Integration

| Requirement | Status | Notes |
|------------|--------|-------|
| fetch() API implementation | ✅ | Live exchange rates fetched using async/await |
| Promise handling | ✅ | Promises resolved cleanly using await |
| try/catch error boundaries | ✅ | Network errors handled properly |
| Fallback error state | ✅ | Service Unavailable message shown if API fails |

---

### ✅ Phase 2 — Latency Mitigation & Skeleton Loaders

| Requirement | Status | Notes |
|------------|--------|-------|
| Skeleton loader | ✅ | Grey animated cards shown while data loads |
| UX protection | ✅ | No broken layout during network transit |
| AbortController | ✅ | Request cancelled if API takes more than 5 seconds |
| Timeout error state | ✅ | Separate timeout message shown to user |

---

### ✅ Phase 3 — Web Workers & Non-Blocking Processing

| Requirement | Status | Notes |
|------------|--------|-------|
| Web Worker file | ✅ | worker.js runs in background thread |
| postMessage communication | ✅ | Data sent to worker and received back |
| Main thread preserved | ✅ | UI stays smooth during data processing |
| Worker cleanup | ✅ | worker.terminate() called after work done |

---

## Features

- Live Market Rates (USD base)
- Async API Fetch
- Skeleton Loader Animation
- AbortController Timeout
- Web Worker Data Processing
- Error State Handling
- Dark Mode
- Responsive Design
- Mobile Friendly Layout

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- AbortController API
- Web Workers API
- open.er-api.com (Exchange Rate API)

---

## Architecture Decisions

### Async Fetch
Live exchange rates are fetched from open.er-api.com using fetch() with async/await pattern. Errors are caught using try/catch block.

### Skeleton Loader
While API data is loading, skeleton cards are shown to the user so the layout does not break or look empty.

### AbortController
A 5 second timeout is enforced using AbortController. If the API does not respond in time, the request is cancelled and a timeout message is shown.

### Web Worker
Currency data filtering and processing is done inside worker.js which runs in a separate background thread. This keeps the main thread free and UI stays at 60fps.

---

## Performance Notes

- Non-blocking data processing using Web Worker
- Skeleton loader prevents layout shift during loading
- AbortController prevents hanging requests
- Worker terminated after use to free memory
- Responsive layout across all screen sizes

---

## Deployment

git add .
git commit -m "feat: sprint 3 complete - async fetch, skeleton loader, web worker"
git push origin main

Deploy using Vercel — auto deploys on every push.

---

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ |
| Edge | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Mobile Chrome | ✅ |
| Mobile Safari | ✅ |

---

## Semantic Commit History

feat: live market rates section with async fetch and error handling
feat: skeleton loader and AbortController timeout added
feat: web worker added for non-blocking data processing
docs: updated README for sprint 3

---

Sprint 3 — Prodesk IT Associate Software Engineering Programme

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