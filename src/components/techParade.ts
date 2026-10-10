import { RESUME_DATA } from '../data/resumeData';

export function initTechParade(onSelectSkill?: (skillName: string) => void): void {
  const row1El = document.getElementById('parade-row-1');
  const row2El = document.getElementById('parade-row-2');
  const row3El = document.getElementById('parade-row-3');

  if (!row1El || !row2El || !row3El) return;

  // Group 1: Languages & Frontend
  const group1 = [
    { name: 'JavaScript', category: 'Language', icon: 'JS', color: '#f7df1e', glow: 'rgba(247, 223, 30, 0.2)' },
    { name: 'TypeScript', category: 'Language', icon: 'TS', color: '#3178c6', glow: 'rgba(49, 120, 198, 0.2)' },
    { name: 'Python', category: 'Language', icon: 'PY', color: '#3776ab', glow: 'rgba(55, 118, 171, 0.2)' },
    { name: 'Java', category: 'Language', icon: 'JV', color: '#ea2d2e', glow: 'rgba(234, 45, 46, 0.2)' },
    { name: 'C', category: 'Language', icon: 'C', color: '#555555', glow: 'rgba(100, 100, 100, 0.2)' },
    { name: 'React.js', category: 'Frontend', icon: '⚛', color: '#61dafb', glow: 'rgba(97, 218, 251, 0.2)' },
    { name: 'Next.js', category: 'Frontend', icon: '▲', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: '≋', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.2)' },
    { name: 'HTML5', category: 'Markup', icon: '</>', color: '#e34f26', glow: 'rgba(227, 79, 38, 0.2)' },
    { name: 'CSS3', category: 'Styles', icon: '#', color: '#1572b6', glow: 'rgba(21, 114, 182, 0.2)' },
    { name: 'Bootstrap', category: 'Frontend', icon: 'B', color: '#7952b3', glow: 'rgba(121, 82, 179, 0.2)' }
  ];

  // Group 2: Backend & Databases & Tools
  const group2 = [
    { name: 'Node.js', category: 'Runtime', icon: 'Node', color: '#68a063', glow: 'rgba(104, 160, 99, 0.2)' },
    { name: 'Express.js', category: 'Backend', icon: 'Ex', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'Django', category: 'Backend', icon: 'Dj', color: '#092e20', glow: 'rgba(9, 46, 32, 0.3)' },
    { name: 'MongoDB', category: 'Database', icon: '🍃', color: '#47a248', glow: 'rgba(71, 162, 72, 0.2)' },
    { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: '#336791', glow: 'rgba(51, 103, 145, 0.2)' },
    { name: 'MySQL', category: 'Database', icon: '🐬', color: '#00758f', glow: 'rgba(0, 117, 143, 0.2)' },
    { name: 'REST APIs', category: 'Protocol', icon: 'API', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.2)' },
    { name: 'Socket.IO', category: 'Real-time', icon: '⚡', color: '#010101', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'Zustand', category: 'State', icon: '🐻', color: '#ba8556', glow: 'rgba(186, 133, 86, 0.2)' },
    { name: 'Redux Toolkit', category: 'State', icon: 'RTK', color: '#764abc', glow: 'rgba(118, 74, 188, 0.2)' },
    { name: 'Git & GitHub', category: 'Tools', icon: 'Git', color: '#f05032', glow: 'rgba(240, 80, 50, 0.2)' }
  ];

  // Group 3: AI / Machine Learning
  const group3 = [
    { name: 'TensorFlow', category: 'Deep Learning', icon: 'TF', color: '#ff6f00', glow: 'rgba(255, 111, 0, 0.2)' },
    { name: 'scikit-learn', category: 'Machine Learning', icon: 'SK', color: '#f7931e', glow: 'rgba(247, 147, 30, 0.2)' },
    { name: 'XGBoost', category: 'Ensemble ML', icon: 'XGB', color: '#337ab7', glow: 'rgba(51, 122, 183, 0.2)' },
    { name: 'LightGBM', category: 'Ensemble ML', icon: 'LGB', color: '#2b82d9', glow: 'rgba(43, 130, 217, 0.2)' },
    { name: 'SHAP & LIME', category: 'Explainable AI', icon: 'XAI', color: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' },
    { name: 'Optuna', category: 'Hyperparameter Tuning', icon: 'OPT', color: '#00a3e0', glow: 'rgba(0, 163, 224, 0.2)' },
    { name: 'pandas & NumPy', category: 'Data Science', icon: 'Data', color: '#150458', glow: 'rgba(21, 4, 88, 0.2)' },
    { name: 'Streamlit', category: 'ML Apps', icon: 'ST', color: '#ff4b4b', glow: 'rgba(255, 75, 75, 0.2)' },
    { name: 'Plotly & Seaborn', category: 'Visualization', icon: '📊', color: '#3f4f75', glow: 'rgba(63, 79, 117, 0.2)' },
    { name: 'imbalanced-learn', category: 'Sampling (SMOTE)', icon: 'IMB', color: '#f15a24', glow: 'rgba(241, 90, 36, 0.2)' },
    { name: 'UMAP & joblib', category: 'Pipelines & Dim-Reduction', icon: 'ML', color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' }
  ];

  const buildCards = (items: typeof group1) => {
    // Duplicate items once for seamless loop
    const doubled = [...items, ...items];
    return doubled
      .map(
        (item) => `
        <div 
          data-skill="${item.name}" 
          class="tech-card group shrink-0 relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/90 cursor-pointer transition-all duration-200 select-none shadow-sm"
          style="box-shadow: 0 4px 14px ${item.glow};"
        >
          <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-200 border border-slate-700/60 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors">
            ${item.icon}
          </div>
          <div>
            <div class="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors whitespace-nowrap">${item.name}</div>
            <div class="text-[10px] text-slate-400 font-mono">${item.category}</div>
          </div>
        </div>
      `
      )
      .join('');
  };

  row1El.innerHTML = buildCards(group1);
  row2El.innerHTML = buildCards(group2);
  row3El.innerHTML = buildCards(group3);

  // Hover pauses row
  const attachPauseOnHover = (container: HTMLElement) => {
    container.addEventListener('mouseenter', () => container.classList.add('marquee-paused'));
    container.addEventListener('mouseleave', () => container.classList.remove('marquee-paused'));
  };

  attachPauseOnHover(row1El);
  attachPauseOnHover(row2El);
  attachPauseOnHover(row3El);

  // Click on any skill card scrolls to Skill Lab and filters it
  document.querySelectorAll('.tech-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const skillName = (e.currentTarget as HTMLElement).dataset.skill;
      if (skillName && onSelectSkill) {
        onSelectSkill(skillName);
      }
      const skillLabSection = document.getElementById('skills');
      skillLabSection?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
