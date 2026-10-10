import { RESUME_DATA } from '../data/resumeData';

export function initExperience(): void {
  const expContainer = document.getElementById('experience-timeline-container');
  const eduContainer = document.getElementById('education-cards-container');
  const certContainer = document.getElementById('certifications-grid-container');

  // 1. Experience Timeline
  if (expContainer) {
    expContainer.innerHTML = RESUME_DATA.experience
      .map((item) => {
        return `
        <div class="relative pl-8 pb-8 border-l-2 border-cyan-500/30 group">
          <!-- Timeline beacon dot -->
          <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform flex items-center justify-center">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          </div>

          <!-- Content Card -->
          <div class="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                ${escapeHtml(item.role)}
              </h3>
              <span class="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-md shrink-0 w-fit">
                ${escapeHtml(item.period)}
              </span>
            </div>

            <div class="flex items-center gap-2 text-sm text-slate-300 font-medium mb-4">
              <span>${escapeHtml(item.organization)}</span>
              <span class="text-slate-500">·</span>
              <span class="text-slate-400 text-xs font-mono">${escapeHtml(item.location)}</span>
            </div>

            <ul class="space-y-2 text-xs text-slate-300">
              ${item.responsibilities
                .map(
                  (resp) => `
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 mt-0.5">▹</span>
                  <span class="leading-relaxed">${escapeHtml(resp)}</span>
                </li>
              `
                )
                .join('')}
            </ul>

            <div class="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
              <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Python</span>
              <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Django</span>
              <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">REST APIs</span>
              <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">ORM Modeling</span>
              <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Agile Sprint Delivery</span>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  // 2. Education Cards
  if (eduContainer) {
    eduContainer.innerHTML = RESUME_DATA.education
      .map((edu) => {
        return `
        <div class="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3 mb-2">
              <h4 class="font-bold text-slate-100 text-base">${escapeHtml(edu.degree)}</h4>
              <span class="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded shrink-0">
                CGPA ${escapeHtml(edu.cgpa)}
              </span>
            </div>
            <div class="text-xs text-cyan-300/90 font-medium mb-1">${escapeHtml(edu.institution)}</div>
            <div class="text-[11px] font-mono text-slate-400 mb-3">${escapeHtml(edu.period)}</div>
          </div>

          ${
            edu.highlights
              ? `
            <div class="pt-3 border-t border-slate-800/80 space-y-1">
              ${edu.highlights
                .map(
                  (h) => `
                <div class="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <span class="text-cyan-400 text-xs">✓</span>
                  <span>${escapeHtml(h)}</span>
                </div>
              `
                )
                .join('')}
            </div>
          `
              : ''
          }
        </div>
      `;
      })
      .join('');
  }

  // 3. Certifications Grid
  if (certContainer) {
    certContainer.innerHTML = RESUME_DATA.certifications
      .map((cert) => {
        return `
        <div class="glass-panel glass-panel-hover p-4 rounded-xl flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center font-mono font-bold text-xs text-cyan-300 shrink-0">
              📜
            </div>
            <div>
              <div class="text-xs font-bold text-slate-200">${escapeHtml(cert.title)}</div>
              <div class="text-[11px] text-slate-400 font-medium">${escapeHtml(cert.issuer)}</div>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-[10px] font-mono text-slate-400 block">${escapeHtml(cert.issueDate)}</span>
            <span class="text-[9px] font-mono text-emerald-400">Verified</span>
          </div>
        </div>
      `;
      })
      .join('');
  }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
