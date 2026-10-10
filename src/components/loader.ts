export function initLoader(onComplete: () => void): void {
  const loaderEl = document.getElementById('boot-loader');
  if (!loaderEl) {
    onComplete();
    return;
  }

  // Dismiss immediately on click or touch
  const dismissLoader = () => {
    loaderEl.style.opacity = '0';
    loaderEl.style.transition = 'opacity 0.25s ease-out';
    setTimeout(() => {
      loaderEl.style.display = 'none';
      onComplete();
    }, 250);
  };

  loaderEl.addEventListener('click', dismissLoader);

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    loaderEl.style.display = 'none';
    onComplete();
    return;
  }

  const progressBar = document.getElementById('loader-progress');
  const statusText = document.getElementById('loader-status');

  const steps = [
    { progress: 35, text: 'INITIALIZING GRAPHICS & 3D ENVIRONMENT...' },
    { progress: 75, text: 'HYDRATING RESUME RECORD: SK ZUNIAD AHAMMAD...' },
    { progress: 100, text: 'ZUN_OS READY. WELCOME TO DIGITAL PLAYGROUND.' }
  ];

  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      if (progressBar) progressBar.style.width = `${step.progress}%`;
      if (statusText) statusText.textContent = step.text;
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(dismissLoader, 150);
    }
  }, 100);
}
