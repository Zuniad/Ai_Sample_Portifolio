import { SceneManager } from '../scene/SceneManager';
import { InteractiveEntity } from '../scene/WorldBuilder';

export function initHeroHud(sceneManager: SceneManager): void {
  const hudContainer = document.getElementById('scene-hud');
  const tooltipEl = document.getElementById('scene-tooltip');
  const inspectorModal = document.getElementById('entity-inspector-modal');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorCategory = document.getElementById('inspector-category');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorStatus = document.getElementById('inspector-status');
  const inspectorToggleBtn = document.getElementById('inspector-toggle-btn');
  const inspectorActionBtn = document.getElementById('inspector-action-btn');
  const inspectorCloseBtn = document.getElementById('inspector-close-btn');

  const pauseAllBtn = document.getElementById('pause-all-motion-btn');
  const pauseAllIcon = document.getElementById('pause-all-icon');
  const pauseAllText = document.getElementById('pause-all-text');

  const entityDrawerList = document.getElementById('entity-drawer-list');

  let currentSelectedEntity: InteractiveEntity | null = null;

  // Render Entity chips/buttons for keyboard/touch users
  const renderEntityControls = () => {
    if (!entityDrawerList) return;
    entityDrawerList.innerHTML = '';

    const entities = sceneManager.getEntities();
    entities.forEach((entity) => {
      const item = document.createElement('div');
      item.className =
        'flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono transition-colors hover:border-slate-700';

      const isPaused = entity.isPaused;
      item.innerHTML = `
        <div class="flex items-center gap-2 truncate">
          <span class="w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400'}"></span>
          <span class="text-slate-200 truncate font-medium">${entity.name}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button data-action="toggle-pause" data-id="${entity.id}" class="px-2 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors">
            ${isPaused ? 'Resume' : 'Pause'}
          </button>
          <button data-action="inspect" data-id="${entity.id}" class="px-2 py-1 text-[11px] rounded bg-cyan-950/60 border border-cyan-800/40 hover:bg-cyan-900/60 text-cyan-300 font-mono transition-colors">
            Info
          </button>
        </div>
      `;

      entityDrawerList.appendChild(item);
    });

    // Attach listeners
    entityDrawerList.querySelectorAll('button[data-action="toggle-pause"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) {
          sceneManager.toggleEntityPause(id);
          renderEntityControls();
          updateInspectorModalIfActive(id);
        }
      });
    });

    entityDrawerList.querySelectorAll('button[data-action="inspect"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) {
          const entity = sceneManager.getEntity(id);
          if (entity) openInspector(entity);
        }
      });
    });
  };

  const updateInspectorModalIfActive = (id: string) => {
    if (currentSelectedEntity && currentSelectedEntity.id === id) {
      const isPaused = currentSelectedEntity.isPaused;
      if (inspectorStatus) {
        inspectorStatus.textContent = isPaused ? 'Paused (Movement Frozen)' : 'Active (Moving along path)';
        inspectorStatus.className = `text-xs font-mono font-medium ${isPaused ? 'text-amber-400' : 'text-emerald-400'}`;
      }
      if (inspectorToggleBtn) {
        inspectorToggleBtn.textContent = isPaused ? 'Resume Movement' : 'Pause Movement';
      }
    }
  };

  const openInspector = (entity: InteractiveEntity) => {
    currentSelectedEntity = entity;
    if (inspectorTitle) inspectorTitle.textContent = entity.name;
    if (inspectorCategory) inspectorCategory.textContent = entity.category;
    if (inspectorDesc) inspectorDesc.textContent = entity.description;

    updateInspectorModalIfActive(entity.id);

    if (inspectorActionBtn) {
      inspectorActionBtn.textContent = entity.actionLabel;
      inspectorActionBtn.onclick = () => {
        closeInspector();
        if (entity.actionTarget.startsWith('#')) {
          const el = document.querySelector(entity.actionTarget);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    if (inspectorToggleBtn) {
      inspectorToggleBtn.onclick = () => {
        entity.togglePause();
        renderEntityControls();
        updateInspectorModalIfActive(entity.id);
      };
    }

    inspectorModal?.classList.remove('hidden');
    inspectorModal?.classList.add('flex');
    inspectorCloseBtn?.focus();
  };

  const closeInspector = () => {
    inspectorModal?.classList.add('hidden');
    inspectorModal?.classList.remove('flex');
    currentSelectedEntity = null;
  };

  inspectorCloseBtn?.addEventListener('click', closeInspector);
  inspectorModal?.addEventListener('click', (e) => {
    if (e.target === inspectorModal) closeInspector();
  });

  // ESC key closes inspector
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInspector();
    }
  });

  // Master Pause All Motion
  pauseAllBtn?.addEventListener('click', () => {
    const isPaused = sceneManager.toggleGlobalPause();
    if (pauseAllText) pauseAllText.textContent = isPaused ? 'Resume All Motion' : 'Pause All Motion';
    if (pauseAllIcon) {
      pauseAllIcon.innerHTML = isPaused
        ? `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
        : `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    }
    renderEntityControls();
  });

  // Camera presets
  document.querySelectorAll('button[data-camera-preset]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const preset = (e.currentTarget as HTMLElement).dataset.cameraPreset as 'isometric' | 'frontal' | 'top';
      sceneManager.setCameraPreset(preset);

      document.querySelectorAll('button[data-camera-preset]').forEach((b) => {
        b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        b.classList.add('text-slate-400');
      });
      (e.currentTarget as HTMLElement).classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
      (e.currentTarget as HTMLElement).classList.remove('text-slate-400');
    });
  });

  // Raycaster hover tooltip callback
  sceneManager = Object.assign(sceneManager, {
    callbacks: {
      onEntityHover: (entity: InteractiveEntity | null, pos?: { clientX: number; clientY: number }) => {
        if (!tooltipEl) return;
        if (entity && pos) {
          tooltipEl.classList.remove('hidden');
          const isPaused = entity.isPaused;
          tooltipEl.innerHTML = `
            <div class="font-semibold text-slate-100 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400'}"></span>
              ${entity.name}
            </div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5">
              ${isPaused ? 'PAUSED' : 'MOVING'} • Click to toggle
            </div>
          `;
          tooltipEl.style.left = `${pos.clientX + 16}px`;
          tooltipEl.style.top = `${pos.clientY - 12}px`;
        } else {
          tooltipEl.classList.add('hidden');
        }
      },
      onEntitySelect: (entity: InteractiveEntity) => {
        renderEntityControls();
        openInspector(entity);
      }
    }
  });

  // Initial render
  setTimeout(renderEntityControls, 100);
}
