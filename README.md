# ZUN // DIGITAL PLAYGROUND
### Interactive 3D Developer Portfolio — SK Zuniad Ahammad
**Full-Stack Developer • AI Explorer • Creative Developer**

---

## 1. Overview

**ZUN // DIGITAL PLAYGROUND** is a production-grade interactive 3D developer portfolio for **SK Zuniad Ahammad**. It blends high-performance 3D graphics (Three.js), retro-futuristic arcade computing aesthetics, and modern editorial web design (Tailwind CSS, GSAP) with 100% verified credentials and projects extracted directly from the developer's resume.

---

## 2. Key Architecture & Features

### A. Miniature 3D Digital World (`src/scene/`)
- **Procedural 3D Island**: Cyber platform with grid planes, glowing energy core, and ambient particle nebula.
- **Autonomous Cyber Cruiser (`cyber_car`)**: Traverses a smooth closed 3D CatmullRom spline track with illuminated headlights and braking lights.
- **Digital Swift Scouts (`sky_bird_1`, `sky_bird_2`)**: Articulated low-poly winged scouts gliding in orbital lofts with procedural wing-flapping physics.
- **Retro CRT Workstation (`crt_terminal`)**: Vintage monitor displaying dynamic canvas-generated terminal code in real-time.
- **Ecosystem Tokens**:
  - React Ecosystem Orb with rotating atomic rings (`react_token`)
  - MongoDB Document Vault with glowing disk clusters (`mongo_vault`)
  - Neural AI Satellite with solar wings and telemetry dish (`ai_satellite`)

### B. Moving Object Interaction System (`src/components/heroHud.ts`)
- **Independently Pausable**: Clicking or tapping any moving entity toggles its individual motion state without halting other objects.
- **Raycast Hover Tooltips**: Real-time cursor-following tooltip indicating entity state (`MOVING` / `PAUSED`).
- **Drag vs. Click Detection**: 6px distance threshold prevents accidental clicks while panning the camera.
- **Accessible HUD**: Full keyboard and touch drawer controls to pause, resume, or inspect individual entities.
- **Master Pause**: "Pause All Motion" toggle freezes all scene animations instantly.
- **Camera Presets**: Fast switching between Frontal, Isometric, and Top-Down angles.

### C. Retro Technology Parade (`src/components/techParade.ts`)
- Three endless horizontal marquees displaying verified skills:
  - Row 1: Programming Languages & Modern Frontend
  - Row 2: Scalable Backend, Databases & State Containers (opposite scroll)
  - Row 3: Machine Learning, Deep Learning & Scientific Data Stack
- Pause on hover, subtle 3D tilt, and click-to-filter integration with the Skill Lab.

### D. Retro CRT Terminal (`src/components/terminal.ts`)
- Authentic retro terminal emulator (`ZUN_OS v2026.1`) with command history (Arrow Up / Down) and suggestion chips.
- Commands: `help`, `about`, `skills`, `projects`, `education`, `internship`, `contact`, `resume`, `clear`, `whoami`.
- Displays real resume facts without fabricated mock data.

### E. 3D Skill Lab (`src/components/skillLab.ts`)
- Categorized tabs: Languages, Frontend, Backend, Databases, Tools & Platforms, AI / Machine Learning.
- Instant search filter and project association markers (e.g., *"Applied in: Medical Management System & Web Chat"*).

### F. Cinematic Project Showcases (`src/components/projectShowcase.ts`)
1. **Medical Management System**: Full-stack clinical portal with JWT auth, doctor management, patient messages, and role-based access.
2. **Web Chat Application**: High-speed real-time messaging with Zustand state store, Socket.IO channels, and multi-user chat broadcasting.
3. **Job Finder Application**: Resume parsing and skill-matching heuristic engine that boosted job match relevance by +30%.
4. **Smart Health Risk Analyzer & Predictor**: Simultaneous tri-disease estimation (heart, diabetes, stroke) using MLPs, LSTMs, XGBoost, and SHAP/LIME explainability.
- Features interactive simulated UI mockups and deep-dive architectural modals.

### G. Experience, Education & Certifications (`src/components/experience.ts`)
- **Internship**: Summer Intern - Python & Django Development at AP Skill Development Corporation (05/2025 – 07/2025).
- **Education**: RGUKT Srikakulam B.Tech (CGPA 8.5), Nagarjuna PUC (CGPA 9.65), Class X (CGPA 9.81).
- **Certifications**: Udemy (Web Dev & Python), GitHub (Front-End Foundations), IBM (Interpersonal Skills).

### H. Communication Console & Resume Modal (`src/components/contact.ts`, `src/components/resumeModal.ts`)
- Click-to-copy email (`zuniadahammadshaik31@gmail.com`) and phone (`+91 6305473963`).
- Client-side validated message transmitter with instant mailto fallback.
- In-app printable resume modal with direct `/resume/resume.pdf` download link.

---

## 3. Technology Stack

- **Markup & Layout**: Semantic HTML5 & Modern CSS3
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js (r182+)
- **Choreography & Motion**: GSAP 3 & ScrollTrigger
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
- **Build Tooling**: Vite 8 & TypeScript

---

## 4. Installation & Local Development

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The app will be accessible at `http://localhost:3000`.

---

## 5. Asset Replacement Guide

- **Resume PDF**: Replace `public/resume/resume.pdf` with any updated PDF document.
- **Personal Details & Skills**: Edit `src/data/resumeData.ts` to update contact info, new projects, or coursework without touching DOM logic.
- **3D Objects & Colors**: Adjust colors, speeds, and geometries in `src/scene/WorldBuilder.ts`.

---

## 6. Static Deployment Guide

This application builds to static HTML/CSS/JS and can be hosted on any static hosting platform:

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
1. Build static output: `npm run build`
2. Push the contents of `dist/` to your `gh-pages` branch.

---

## 7. Quality & Validation Checklist

- [x] **No Console Errors**: Clean ES module imports and type verification (`tsc --noEmit`).
- [x] **Zero Broken Assets**: Self-contained procedural 3D geometries and local SVG icons.
- [x] **Top Bar Contract**: Exactly 3 zones (Brand, 5 text links, 1 primary Resume action).
- [x] **Moving Object Interactions**: Individual pause/resume + Master pause + Raycast hover tooltip.
- [x] **Drag vs Click Differentiation**: Dragging camera does not trigger unintended object clicks.
- [x] **Zero-Pill Discipline**: Metadata rendered as clean, unboxed text.
- [x] **Reduced Motion**: Respects `prefers-reduced-motion` media queries.
- [x] **100% Resume Factual Integrity**: Preserves exact CGPAs, dates, institutions, and project descriptions from the source resume.
