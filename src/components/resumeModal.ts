import { RESUME_DATA } from '../data/resumeData';

export function initResumeModal(): { open: () => void; close: () => void } {
  const modal = document.getElementById('resume-viewer-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('resume-print-btn');
  const downloadLink = document.getElementById('resume-download-link') as HTMLAnchorElement | null;
  const contentContainer = document.getElementById('resume-modal-content');

  if (downloadLink) {
    downloadLink.href = '/resume/resume.pdf';
  }

  const renderResumeDocument = () => {
    if (!contentContainer) return;
    const { personal, experience, education, skills, projects, certifications, coursework } = RESUME_DATA;

    contentContainer.innerHTML = `
      <div class="max-w-3xl mx-auto bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-xl text-slate-200 text-sm font-sans space-y-6 shadow-2xl">
        <!-- Header -->
        <div class="border-b border-slate-700/80 pb-6 text-center sm:text-left">
          <h1 class="text-3xl font-extrabold text-white tracking-tight">${personal.name}</h1>
          <div class="text-base text-cyan-400 font-semibold mt-1">${personal.headline}</div>
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-400 mt-3 font-mono">
            <span>✉ ${personal.email}</span>
            <span>📱 ${personal.phone}</span>
            <span>📍 ${personal.location}</span>
          </div>
        </div>

        <!-- Summary -->
        <div>
          <h2 class="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase border-b border-slate-800 pb-1 mb-2">Professional Summary</h2>
          <p class="text-xs text-slate-300 leading-relaxed">${personal.summary}</p>
        </div>

        <!-- Experience -->
        <div>
          <h2 class="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase border-b border-slate-800 pb-1 mb-3">Experience</h2>
          ${experience
            .map(
              (exp) => `
            <div class="mb-4">
              <div class="flex justify-between items-baseline text-xs font-bold text-white">
                <span>${exp.role}</span>
                <span class="text-slate-400 font-mono font-normal">${exp.period}</span>
              </div>
              <div class="text-xs text-cyan-300 font-medium mb-1.5">${exp.organization}</div>
              <ul class="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                ${exp.responsibilities.map((r) => `<li>${r}</li>`).join('')}
              </ul>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Education -->
        <div>
          <h2 class="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase border-b border-slate-800 pb-1 mb-3">Education</h2>
          <div class="space-y-3">
            ${education
              .map(
                (edu) => `
              <div class="flex justify-between items-baseline text-xs">
                <div>
                  <div class="font-bold text-white">${edu.degree}</div>
                  <div class="text-slate-400 text-[11px]">${edu.institution}</div>
                </div>
                <div class="text-right">
                  <div class="font-mono text-cyan-300 font-bold">${edu.cgpa}</div>
                  <div class="text-[10px] text-slate-500 font-mono">${edu.period}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Technical Skills -->
        <div>
          <h2 class="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase border-b border-slate-800 pb-1 mb-3">Technical Skills</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <div><span class="font-bold text-slate-300">Languages:</span> <span class="text-slate-400">Java, Python, C, JavaScript, TypeScript, HTML, CSS</span></div>
            <div><span class="font-bold text-slate-300">Frontend:</span> <span class="text-slate-400">HTML, CSS, JavaScript, React.js, Bootstrap, Tailwind CSS, Next.js, TypeScript</span></div>
            <div><span class="font-bold text-slate-300">Backend:</span> <span class="text-slate-400">Node.js, Express.js, Django, RESTful APIs, Socket.IO</span></div>
            <div><span class="font-bold text-slate-300">Databases:</span> <span class="text-slate-400">MongoDB, MySQL, PostgreSQL</span></div>
            <div><span class="font-bold text-slate-300">Tools & Platforms:</span> <span class="text-slate-400">Git, GitHub, REST APIs, Socket.IO, Zustand, Redux Toolkit</span></div>
            <div><span class="font-bold text-slate-300">Coursework:</span> <span class="text-slate-400">${coursework.join(', ')}</span></div>
          </div>
        </div>

        <!-- Projects -->
        <div>
          <h2 class="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase border-b border-slate-800 pb-1 mb-3">Projects</h2>
          <div class="space-y-4 text-xs">
            ${projects
              .map(
                (proj) => `
              <div>
                <div class="font-bold text-white">${proj.title}</div>
                <div class="text-[11px] text-cyan-400 font-mono mb-1">${proj.technologies.join(', ')}</div>
                <ul class="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
                  ${proj.features.map((f) => `<li>${f}</li>`).join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Certifications -->
        <div>
          <h2 class="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase border-b border-slate-800 pb-1 mb-3">Certifications</h2>
          <div class="grid grid-cols-2 gap-2 text-xs">
            ${certifications
              .map(
                (c) => `
              <div class="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div class="font-bold text-slate-200">${c.title}</div>
                <div class="text-[10px] text-slate-400">${c.issuer} | ${c.issueDate}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  };

  const open = () => {
    renderResumeDocument();
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
    closeBtn?.focus();
  };

  const close = () => {
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
  };

  closeBtn?.addEventListener('click', close);
  printBtn?.addEventListener('click', () => {
    window.print();
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
      close();
    }
  });

  return { open, close };
}
