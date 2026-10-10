import { RESUME_DATA, Project } from '../data/resumeData';

export function initProjectShowcase(): void {
  const container = document.getElementById('projects-container');
  const modal = document.getElementById('project-detail-modal');
  const modalTitle = document.getElementById('project-modal-title');
  const modalCategory = document.getElementById('project-modal-category');
  const modalSummary = document.getElementById('project-modal-summary');
  const modalTechs = document.getElementById('project-modal-techs');
  const modalFeatures = document.getElementById('project-modal-features');
  const modalArchitecture = document.getElementById('project-modal-architecture');
  const modalImpact = document.getElementById('project-modal-impact');
  const modalCloseBtn = document.getElementById('project-modal-close');

  if (!container) return;

  const getInteractiveMockup = (project: Project): string => {
    if (project.id === 'medical-management-system') {
      return `
        <div class="h-56 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex flex-col justify-between font-mono select-none overflow-hidden relative">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
            <span class="text-cyan-300 font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span> MED_PORTAL // ADMIN CONSOLE
            </span>
            <span class="text-slate-400">Role: Clinical Administrator</span>
          </div>
          <div class="grid grid-cols-3 gap-2 my-2 text-[10px]">
            <div class="p-2 rounded bg-slate-900/90 border border-slate-800">
              <div class="text-slate-400">Active Doctors</div>
              <div class="text-sm font-bold text-cyan-400">18 Staff</div>
            </div>
            <div class="p-2 rounded bg-slate-900/90 border border-slate-800">
              <div class="text-slate-400">Patient Messages</div>
              <div class="text-sm font-bold text-emerald-400">42 Unread</div>
            </div>
            <div class="p-2 rounded bg-slate-900/90 border border-slate-800">
              <div class="text-slate-400">Auth Session</div>
              <div class="text-sm font-bold text-slate-300">JWT Verified</div>
            </div>
          </div>
          <div class="p-2.5 rounded bg-slate-900/70 border border-slate-800/80 text-[10px] space-y-1">
            <div class="flex justify-between text-slate-300 font-semibold">
              <span>Dr. Sharma (Cardiology)</span>
              <span class="text-cyan-400">Available</span>
            </div>
            <div class="text-slate-400 truncate">Patient Ticket #4092: Prescription review pending</div>
          </div>
        </div>
      `;
    }

    if (project.id === 'web-chat-application') {
      return `
        <div class="h-56 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20 flex flex-col justify-between font-mono select-none overflow-hidden relative">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
            <span class="text-indigo-300 font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> SOCKET.IO ROOM // DEV-TEAM
            </span>
            <span class="text-slate-400">Zustand Store: Synced</span>
          </div>
          <div class="space-y-2 my-2 text-[10px] overflow-hidden">
            <div class="flex items-start gap-2">
              <span class="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center font-bold text-[9px] shrink-0">ZA</span>
              <div class="bg-indigo-950/80 border border-indigo-800/40 p-2 rounded-lg text-slate-200 max-w-[85%]">
                WebSocket bidirectional stream connected. Live messaging active across multiple users!
              </div>
            </div>
            <div class="flex items-start gap-2 flex-row-reverse">
              <span class="w-5 h-5 rounded-full bg-emerald-900 text-emerald-200 flex items-center justify-center font-bold text-[9px] shrink-0">U2</span>
              <div class="bg-slate-900/90 border border-slate-800 p-2 rounded-lg text-slate-300 max-w-[85%]">
                JWT auth verification verified with zero latency.
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Typing indicator active • 3 peers in room</span>
          </div>
        </div>
      `;
    }

    if (project.id === 'job-finder-application') {
      return `
        <div class="h-56 p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex flex-col justify-between font-mono select-none overflow-hidden relative">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
            <span class="text-emerald-300 font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span> RESUME PARSER & SKILL MATCHER
            </span>
            <span class="text-emerald-400 font-bold">+30% Accuracy</span>
          </div>
          <div class="my-2 space-y-2 text-[10px]">
            <div class="p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div class="text-slate-200 font-bold">Extracted Resume Tokens</div>
                <div class="text-slate-400">React.js, Node.js, MongoDB, REST APIs</div>
              </div>
              <span class="text-xs font-bold text-emerald-400">94% Match</span>
            </div>
            <div class="p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div class="text-slate-200 font-bold">Target Position</div>
                <div class="text-slate-400">Full-Stack Software Engineer</div>
              </div>
              <span class="text-xs font-bold text-cyan-400">Ranked #1</span>
            </div>
          </div>
          <div class="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Dynamic filter: In-Office / Remote</span>
            <span class="text-emerald-400">Custom matching heuristic</span>
          </div>
        </div>
      `;
    }

    // Default: Smart Health Risk Analyzer
    return `
      <div class="h-56 p-4 rounded-xl bg-slate-950/80 border border-sky-500/20 flex flex-col justify-between font-mono select-none overflow-hidden relative">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
          <span class="text-sky-300 font-bold flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-sky-400"></span> TRI-DISEASE RISK ENGINE (ML/DL)
          </span>
          <span class="text-slate-400">SHAP & LIME Verified</span>
        </div>
        <div class="grid grid-cols-3 gap-2 my-2 text-[10px]">
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-slate-400 text-[9px]">Heart Disease</div>
            <div class="text-xs font-bold text-emerald-400 mt-0.5">Low Risk</div>
            <div class="text-[9px] text-slate-500 mt-1">XGBoost / Optuna</div>
          </div>
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-slate-400 text-[9px]">Type-2 Diabetes</div>
            <div class="text-xs font-bold text-amber-400 mt-0.5">Moderate</div>
            <div class="text-[9px] text-slate-500 mt-1">LightGBM</div>
          </div>
          <div class="p-2 rounded bg-slate-900/90 border border-slate-800 text-center">
            <div class="text-slate-400 text-[9px]">Stroke Probability</div>
            <div class="text-xs font-bold text-emerald-400 mt-0.5">Low Risk</div>
            <div class="text-[9px] text-slate-500 mt-1">TensorFlow LSTM</div>
          </div>
        </div>
        <div class="p-2 rounded bg-slate-900/70 border border-slate-800/80 text-[10px] flex items-center justify-between text-slate-300">
          <span>Non-linear temporal sequence patterns</span>
          <span class="text-sky-400 font-bold">MLP + LSTM Architecture</span>
        </div>
      </div>
    `;
  };

  const renderProjects = () => {
    container.innerHTML = RESUME_DATA.projects
      .map((proj, index) => {
        return `
        <article class="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group">
          <div>
            <!-- Header -->
            <div class="flex items-center justify-between gap-4 mb-4">
              <span class="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                0${index + 1}. ${escapeHtml(proj.badge)}
              </span>
              <span class="text-xs text-slate-400 font-mono">${escapeHtml(proj.category)}</span>
            </div>

            <!-- Title & Tagline -->
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              ${escapeHtml(proj.title)}
            </h3>
            <p class="text-sm text-slate-300 mb-5 leading-relaxed">
              ${escapeHtml(proj.tagline)}
            </p>

            <!-- Interactive Visual Preview -->
            <div class="mb-5">
              ${getInteractiveMockup(proj)}
            </div>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${proj.technologies
                .map(
                  (t) => `
                <span class="text-[11px] font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800">
                  ${escapeHtml(t)}
                </span>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <button 
              data-action="open-project" 
              data-project-id="${proj.id}" 
              class="px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 font-mono"
            >
              <span>Inspect Architecture</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <span class="text-xs text-slate-400 font-mono">Resume Verified</span>
          </div>
        </article>
      `;
      })
      .join('');

    // Attach listeners
    container.querySelectorAll('button[data-action="open-project"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.projectId;
        const found = RESUME_DATA.projects.find((p) => p.id === id);
        if (found) openModal(found);
      });
    });
  };

  const openModal = (proj: Project) => {
    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalCategory) modalCategory.textContent = proj.category;
    if (modalSummary) modalSummary.textContent = proj.summary;
    if (modalImpact) modalImpact.textContent = proj.impact;

    if (modalTechs) {
      modalTechs.innerHTML = proj.technologies
        .map(
          (t) => `
          <span class="text-xs font-mono text-cyan-300 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/40">
            ${escapeHtml(t)}
          </span>
        `
        )
        .join('');
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = proj.features
        .map(
          (f) => `
          <li class="flex items-start gap-2 text-xs text-slate-300">
            <span class="text-cyan-400 font-bold mt-0.5">•</span>
            <span>${escapeHtml(f)}</span>
          </li>
        `
        )
        .join('');
    }

    if (modalArchitecture) {
      modalArchitecture.innerHTML = proj.architecture
        .map(
          (a) => `
          <li class="flex items-start gap-2 text-xs text-slate-300">
            <span class="text-emerald-400 font-bold mt-0.5">→</span>
            <span>${escapeHtml(a)}</span>
          </li>
        `
        )
        .join('');
    }

    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
    modalCloseBtn?.focus();
  };

  const closeModal = () => {
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
      closeModal();
    }
  });

  renderProjects();
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
