import { RESUME_DATA } from '../data/resumeData';

export function initTerminal(onResumeRequest?: () => void): void {
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input') as HTMLInputElement | null;
  const chipContainer = document.getElementById('terminal-command-chips');

  if (!terminalOutput || !terminalInput) return;

  const history: string[] = [];
  let historyIndex = -1;

  const commands: Record<string, () => string> = {
    help: () => `
<div class="text-cyan-300 font-bold mb-1">AVAILABLE COMMANDS:</div>
<div class="grid grid-cols-2 sm:grid-cols-3 gap-y-1 text-slate-300">
  <div><span class="text-emerald-400 font-mono">about</span>     - Bio & overview</div>
  <div><span class="text-emerald-400 font-mono">skills</span>    - Stack breakdown</div>
  <div><span class="text-emerald-400 font-mono">projects</span>  - 4 featured systems</div>
  <div><span class="text-emerald-400 font-mono">education</span> - RGUKT & academic record</div>
  <div><span class="text-emerald-400 font-mono">internship</span>- AP Skill Dev Corp</div>
  <div><span class="text-emerald-400 font-mono">contact</span>   - Email, phone, location</div>
  <div><span class="text-emerald-400 font-mono">resume</span>    - View/download resume</div>
  <div><span class="text-emerald-400 font-mono">clear</span>     - Wipe terminal screen</div>
</div>`,

    about: () => `
<div class="text-cyan-300 font-bold mb-1">SK ZUNIAD AHAMMAD // FULL-STACK DEVELOPER</div>
<p class="text-slate-300 mb-2 leading-relaxed">${RESUME_DATA.personal.summary}</p>
<div class="text-xs text-slate-400 font-mono">
  • Location: ${RESUME_DATA.personal.location}<br>
  • Degree: B.Tech Computer Science, RGUKT Srikakulam (CGPA 8.5)<br>
  • Primary Stack: React.js • Node.js • Express • MongoDB • Django • Python ML
</div>`,

    skills: () => `
<div class="text-cyan-300 font-bold mb-1">TECHNICAL SKILLS ARCHIVE:</div>
<div class="space-y-1.5 text-xs">
  <div><span class="text-emerald-400 font-mono font-semibold">[Languages]</span> Java, Python, C, JavaScript, TypeScript, HTML, CSS</div>
  <div><span class="text-emerald-400 font-mono font-semibold">[Frontend]</span> React.js, Next.js, Tailwind CSS, Bootstrap</div>
  <div><span class="text-emerald-400 font-mono font-semibold">[Backend]</span> Node.js, Express.js, Django, RESTful APIs, Socket.IO</div>
  <div><span class="text-emerald-400 font-mono font-semibold">[Databases]</span> MongoDB, MySQL, PostgreSQL</div>
  <div><span class="text-emerald-400 font-mono font-semibold">[Tools/State]</span> Git, GitHub, REST APIs, Socket.IO, Zustand, Redux Toolkit</div>
  <div><span class="text-emerald-400 font-mono font-semibold">[AI/Data Science]</span> scikit-learn, XGBoost, LightGBM, TensorFlow, SHAP, LIME, Optuna, pandas, NumPy, Streamlit, Plotly, seaborn, imbalanced-learn, UMAP, joblib</div>
</div>`,

    projects: () => `
<div class="text-cyan-300 font-bold mb-1">FEATURED RESUME PROJECTS:</div>
<div class="space-y-2 text-xs">
  <div>
    <span class="text-cyan-400 font-bold">1. Medical Management System</span> (React, Express, MongoDB, JWT)
    <p class="text-slate-300">Full-stack healthcare portal with admin doctor management and patient messaging.</p>
  </div>
  <div>
    <span class="text-cyan-400 font-bold">2. Web Chat Application</span> (React, Zustand, Socket.IO, Express, MongoDB)
    <p class="text-slate-300">Real-time messaging platform with Zustand auth and multi-user chat broadcasting.</p>
  </div>
  <div>
    <span class="text-cyan-400 font-bold">3. Job Finder Application</span> (Full-Stack Resume Parsing & Skill Matching)
    <p class="text-slate-300">Resume skill extractor boosting candidate job relevance accuracy by +30%.</p>
  </div>
  <div>
    <span class="text-cyan-400 font-bold">4. Smart Health Risk Analyzer & Predictor</span> (ML & Deep Learning)
    <p class="text-slate-300">Unified risk estimation for heart disease, diabetes, and stroke using MLPs, LSTMs & SHAP.</p>
  </div>
</div>`,

    education: () => `
<div class="text-cyan-300 font-bold mb-1">ACADEMIC BACKGROUND:</div>
<div class="space-y-2 text-xs">
  <div class="border-l-2 border-cyan-500 pl-2">
    <div class="font-bold text-slate-200">B.Tech in Computer Science (10/2022 – Present)</div>
    <div class="text-slate-400">Rajiv Gandhi University of Knowledge Technologies, Srikakulam</div>
    <div class="text-emerald-400 font-mono">CGPA: 8.5</div>
  </div>
  <div class="border-l-2 border-cyan-500 pl-2">
    <div class="font-bold text-slate-200">Pre-University Course (01/2021 – 09/2022)</div>
    <div class="text-slate-400">Nagarjuna E.M High School</div>
    <div class="text-emerald-400 font-mono">CGPA: 9.65</div>
  </div>
  <div class="border-l-2 border-cyan-500 pl-2">
    <div class="font-bold text-slate-200">Class X (06/2019 – 03/2020)</div>
    <div class="text-slate-400">Nagarjuna E.M High School</div>
    <div class="text-emerald-400 font-mono">CGPA: 9.81</div>
  </div>
</div>`,

    internship: () => `
<div class="text-cyan-300 font-bold mb-1">SUMMER INTERNSHIP:</div>
<div class="text-xs space-y-1">
  <div class="font-semibold text-slate-200">Summer Intern - Python & Django Development (05/2025 – 07/2025)</div>
  <div class="text-slate-400">AP Skill Development Corporation</div>
  <ul class="list-disc list-inside text-slate-300 space-y-0.5 mt-1">
    <li>Developed backend modules using Django for web-based applications.</li>
    <li>Implemented RESTful APIs and ORM-based data models.</li>
    <li>Collaborated in agile teams and contributed to real-world project delivery.</li>
    <li>Gained experience in template rendering and user authentication.</li>
  </ul>
</div>`,

    contact: () => `
<div class="text-cyan-300 font-bold mb-1">COMMUNICATIONS DATA:</div>
<div class="text-xs space-y-1 text-slate-300">
  <div>• Email: <a href="mailto:${RESUME_DATA.personal.email}" class="text-cyan-400 underline">${RESUME_DATA.personal.email}</a></div>
  <div>• Phone: <a href="tel:${RESUME_DATA.personal.phone.replace(/[^0-9+]/g, '')}" class="text-cyan-400 underline">${RESUME_DATA.personal.phone}</a></div>
  <div>• Location: ${RESUME_DATA.personal.location}</div>
  <div>• Status: ${RESUME_DATA.personal.status}</div>
</div>`,

    resume: () => {
      if (onResumeRequest) setTimeout(onResumeRequest, 300);
      return `<div class="text-emerald-400 font-bold">Opening Zun's interactive resume viewer...</div>
      <div class="text-xs text-slate-400">You can inspect or download the official resume PDF directly.</div>`;
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },

    whoami: () => `<div class="text-slate-300">visitor@zun-digital-playground [guest-session]</div>`
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    history.push(cmd);
    historyIndex = history.length;

    // Render user input line
    const userLine = document.createElement('div');
    userLine.className = 'flex items-center gap-2 text-xs font-mono text-cyan-400 mt-2';
    userLine.innerHTML = `<span class="text-emerald-400 font-bold">user@zun-terminal:~$</span> <span>${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(userLine);

    if (trimmed === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const handler = commands[trimmed];
    const responseEl = document.createElement('div');
    responseEl.className = 'text-xs font-mono text-slate-300 pl-4 py-1';

    if (handler) {
      responseEl.innerHTML = handler();
    } else {
      responseEl.innerHTML = `
        <div class="text-amber-400">Command not recognized: "${escapeHtml(trimmed)}".</div>
        <div class="text-slate-400 text-[11px]">Type <span class="text-cyan-300">help</span> to view available operations.</div>
      `;
    }

    terminalOutput.appendChild(responseEl);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex] || '';
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Clickable command chips
  chipContainer?.querySelectorAll('button[data-cmd]').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      const cmd = (e.currentTarget as HTMLElement).dataset.cmd;
      if (cmd) executeCommand(cmd);
    });
  });

  // Initial welcome message in terminal
  terminalOutput.innerHTML = `
    <div class="text-xs font-mono text-slate-400 mb-2">
      <span class="text-cyan-400 font-bold">ZUN WORKSTATION OS [Version 2026.1]</span><br>
      Connected to SK Zuniad Ahammad developer node. Type <span class="text-emerald-400 font-bold">help</span> or click command buttons below.
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
