import { RESUME_DATA, SkillItem } from '../data/resumeData';

export function initSkillLab(): { filterBySkill: (name: string) => void } {
  const container = document.getElementById('skill-cards-grid');
  const tabsContainer = document.getElementById('skill-category-tabs');
  const searchInput = document.getElementById('skill-search-input') as HTMLInputElement | null;
  const countBadge = document.getElementById('skill-count-badge');

  let activeCategory: string = 'All';
  let searchTerm: string = '';

  const categories = [
    'All',
    'Languages',
    'Frontend',
    'Backend',
    'Databases',
    'Tools & Platforms',
    'AI / Machine Learning'
  ];

  const renderTabs = () => {
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = cat === activeCategory;
      btn.className = `px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
        isActive
          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
          : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
      }`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        activeCategory = cat;
        renderTabs();
        renderSkills();
      });
      tabsContainer.appendChild(btn);
    });
  };

  const renderSkills = () => {
    if (!container) return;

    let filtered = RESUME_DATA.skills.filter((skill) => {
      const matchesCat = activeCategory === 'All' || skill.category === activeCategory;
      const matchesSearch =
        searchTerm === '' ||
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (skill.projectAssociation && skill.projectAssociation.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Skills`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <div class="text-sm font-mono">No matching technologies found for "${escapeHtml(searchTerm)}".</div>
          <button id="clear-skill-search" class="mt-3 px-3 py-1 text-xs text-cyan-400 border border-cyan-800/40 rounded-lg hover:bg-cyan-950/40 transition-colors">
            Reset Filters
          </button>
        </div>
      `;
      document.getElementById('clear-skill-search')?.addEventListener('click', () => {
        activeCategory = 'All';
        searchTerm = '';
        if (searchInput) searchInput.value = '';
        renderTabs();
        renderSkills();
      });
      return;
    }

    container.innerHTML = filtered
      .map((skill) => {
        const hasProject = !!skill.projectAssociation;
        return `
        <div class="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col justify-between group relative overflow-hidden transition-all duration-200">
          <div class="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div class="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-sm">${escapeHtml(skill.name)}</div>
              <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 shrink-0">
                ${escapeHtml(skill.category)}
              </span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(skill.description)}</p>
          </div>
          
          ${
            hasProject
              ? `
            <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-cyan-400/90 font-mono">
              <span class="text-slate-500">Applied in:</span>
              <span class="truncate font-medium">${escapeHtml(skill.projectAssociation!)}</span>
            </div>
          `
              : `
            <div class="mt-3 pt-2.5 border-t border-slate-800/40 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <span>Core Stack Competency</span>
            </div>
          `
          }
        </div>
      `;
      })
      .join('');
  };

  searchInput?.addEventListener('input', (e) => {
    searchTerm = (e.target as HTMLInputElement).value;
    renderSkills();
  });

  renderTabs();
  renderSkills();

  return {
    filterBySkill: (name: string) => {
      searchTerm = name;
      if (searchInput) searchInput.value = name;
      activeCategory = 'All';
      renderTabs();
      renderSkills();
    }
  };
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
