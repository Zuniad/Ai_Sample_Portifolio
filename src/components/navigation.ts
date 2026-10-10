export function initNavigation(onResumeClick: () => void): void {
  const nav = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const resumeBtn = document.getElementById('nav-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');

  // Resume button listener
  resumeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    onResumeClick();
  });

  mobileResumeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu?.classList.add('hidden');
    onResumeClick();
  });

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    const isHidden = mobileMenu?.classList.toggle('hidden');
    mobileToggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
  });

  // Close mobile menu on clicking any link
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Header background blur on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav?.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-slate-800');
      nav?.classList.remove('bg-transparent', 'border-transparent');
    } else {
      nav?.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-slate-800');
      nav?.classList.add('bg-transparent', 'border-transparent');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}
