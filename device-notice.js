(() => {
  const mobileViewport = window.matchMedia('(max-width: 767px)').matches;
  const noticeDismissed = sessionStorage.getItem('mobile-ui-notice-dismissed') === 'true';

  if (mobileViewport || noticeDismissed) return;

  const styles = document.createElement('style');
  styles.textContent = `
    .device-notice { width: min(440px, calc(100% - 32px)); padding: 0; border: 1px solid rgba(53, 19, 52, .18); border-radius: 18px; background: #F7F6F5; color: #351334; box-shadow: 0 24px 80px rgba(25, 8, 29, .3); font-family: Inter, Montserrat, "Segoe UI", Arial, sans-serif; }
    .device-notice::backdrop { background: rgba(24, 10, 27, .66); backdrop-filter: blur(4px); }
    .device-notice__content { padding: 30px; }
    .device-notice__eyebrow { margin: 0 0 12px; color: #a01d16; font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
    .device-notice h2 { margin: 0; font: 400 32px/1.1 Georgia, "Times New Roman", serif; }
    .device-notice__message { margin: 14px 0 24px; color: #68435F; font: 15px/1.6 Georgia, serif; }
    .device-notice__actions { display: flex; flex-wrap: wrap; gap: 10px; }
    .device-notice button { min-height: 44px; padding: 12px 16px; border: 1px solid #5D1558; background: transparent; color: #5D1558; font: 700 10px/1.2 Inter, Montserrat, "Segoe UI", Arial, sans-serif; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; }
    .device-notice button:focus-visible { outline: 3px solid #a01d16; outline-offset: 3px; }
    .device-notice .device-notice__continue { background: #5D1558; color: #fff; }
    @media (max-width: 480px) { .device-notice__content { padding: 24px; } .device-notice h2 { font-size: 28px; } }
  `;
  document.head.append(styles);

  const dialog = document.createElement('dialog');
  dialog.className = 'device-notice';
  dialog.setAttribute('aria-labelledby', 'device-notice-title');
  dialog.setAttribute('aria-describedby', 'device-notice-message');
  dialog.innerHTML = `
    <div class="device-notice__content">
      <p class="device-notice__eyebrow">A quick note</p>
      <h2 id="device-notice-title">Made for mobile</h2>
      <p class="device-notice__message" id="device-notice-message">This website’s interface is specially optimized for mobile devices. You can still continue browsing on this device.</p>
      <div class="device-notice__actions">
        <button type="button" class="device-notice__continue">Continue anyway</button>
        <button type="button" class="device-notice__dismiss">Got it</button>
      </div>
    </div>
  `;
  document.body.append(dialog);

  const dismiss = () => {
    sessionStorage.setItem('mobile-ui-notice-dismissed', 'true');
    dialog.close();
    dialog.remove();
  };

  dialog.querySelectorAll('button').forEach(button => button.addEventListener('click', dismiss));
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    dismiss();
  });
  dialog.showModal();
})();
