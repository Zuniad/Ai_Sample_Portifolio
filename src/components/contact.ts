import { RESUME_DATA } from '../data/resumeData';

export function initContact(): void {
  const emailVal = RESUME_DATA.personal.email;
  const phoneVal = RESUME_DATA.personal.phone;

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const formStatus = document.getElementById('form-status-msg');

  // Copy email
  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailVal);
      showFeedback('Email copied to clipboard!');
    } catch {
      showFeedback(`Email: ${emailVal}`);
    }
  });

  // Copy phone
  copyPhoneBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(phoneVal);
      showFeedback('Phone number copied to clipboard!');
    } catch {
      showFeedback(`Phone: ${phoneVal}`);
    }
  });

  function showFeedback(msg: string) {
    if (!copyFeedback) return;
    copyFeedback.textContent = msg;
    copyFeedback.classList.remove('opacity-0');
    copyFeedback.classList.add('opacity-100');
    setTimeout(() => {
      copyFeedback.classList.remove('opacity-100');
      copyFeedback.classList.add('opacity-0');
    }, 2800);
  }

  // Client-side validated message transmitter
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
    const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = 'Please complete all fields before transmission.';
        formStatus.className = 'text-xs font-mono text-amber-400 mt-2 block';
      }
      return;
    }

    // Direct mailto fallback link with prefilled subject and body
    const mailtoSubject = encodeURIComponent(`Inquiry from ${name} via Zun Digital Playground`);
    const mailtoBody = encodeURIComponent(`Hi Zuniad,\n\n${message}\n\nFrom: ${name} (${email})`);
    const mailtoUrl = `mailto:${emailVal}?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (formStatus) {
      formStatus.innerHTML = `
        <div class="text-xs font-mono text-cyan-300 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 space-y-1">
          <div class="font-bold text-emerald-400">Transmission Ready!</div>
          <div>Opening your default email client to send directly to <span class="text-white">${emailVal}</span>.</div>
          <a href="${mailtoUrl}" class="inline-block mt-2 px-3 py-1 bg-cyan-400 text-slate-950 font-bold rounded text-[11px] hover:bg-cyan-300 transition-colors">
            Dispatch Email Now
          </a>
        </div>
      `;
      formStatus.className = 'mt-3 block';
    }

    // Automatically trigger mail client
    window.location.href = mailtoUrl;
  });
}
