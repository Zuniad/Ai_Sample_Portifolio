import './index.css';
import { SceneManager } from './scene/SceneManager';
import { initLoader } from './components/loader';
import { initNavigation } from './components/navigation';
import { initHeroHud } from './components/heroHud';
import { initTechParade } from './components/techParade';
import { initTerminal } from './components/terminal';
import { initSkillLab } from './components/skillLab';
import { initProjectShowcase } from './components/projectShowcase';
import { initExperience } from './components/experience';
import { initContact } from './components/contact';
import { initResumeModal } from './components/resumeModal';

function initializeApplication(): void {
  console.log('[ZUN_OS] Bootstrapping developer portfolio...');

  // 1. Dynamic copyright year
  const copyYear = document.getElementById('copyright-year');
  if (copyYear) {
    copyYear.textContent = new Date().getFullYear().toString();
  }

  // 2. Resume modal controller
  let openResume: () => void = () => {};
  try {
    const resumeModal = initResumeModal();
    openResume = () => resumeModal.open();
    document.getElementById('hero-resume-trigger')?.addEventListener('click', openResume);
  } catch (err) {
    console.error('Error initializing resume modal:', err);
  }

  // 3. Navigation
  try {
    initNavigation(openResume);
  } catch (err) {
    console.error('Error initializing navigation:', err);
  }

  // 4. Skills Lab & Marquee Parade (Render immediately!)
  try {
    const skillLab = initSkillLab();
    initTechParade((skillName) => {
      skillLab.filterBySkill(skillName);
    });
  } catch (err) {
    console.error('Error initializing skills & parade:', err);
  }

  // 5. Featured Projects Showcase (Render immediately!)
  try {
    initProjectShowcase();
  } catch (err) {
    console.error('Error initializing projects:', err);
  }

  // 6. Experience, Education & Certifications (Render immediately!)
  try {
    initExperience();
  } catch (err) {
    console.error('Error initializing experience:', err);
  }

  // 7. Retro Terminal Workstation
  try {
    initTerminal(openResume);
  } catch (err) {
    console.error('Error initializing terminal:', err);
  }

  // 8. Contact Console
  try {
    initContact();
  } catch (err) {
    console.error('Error initializing contact:', err);
  }

  // 9. 3D Scene Initialization
  const canvasContainer = document.getElementById('hero-canvas-container');
  if (canvasContainer) {
    try {
      const sceneManager = new SceneManager(canvasContainer);
      initHeroHud(sceneManager);
    } catch (err) {
      console.warn('3D Scene initialization warning:', err);
    }
  }

  // 10. Complete loader quickly with smooth fade-out
  try {
    initLoader(() => {
      console.log('[ZUN_OS] Portfolio active and operational.');
    });
  } catch (err) {
    console.error('Error with loader:', err);
  }
}

// Ensure execution triggers regardless of when script is evaluated
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
  initializeApplication();
}
