// ========================================
// DriveEase — Toast Notification System
// ========================================

function showToast(type = 'info', title = '', message = '', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const id = 'toast-' + Date.now();

  const html = `
    <div class="toast ${type}" id="${id}">
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" onclick="removeToast('${id}')" aria-label="Close notification">✕</button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);

  // Auto remove
  setTimeout(() => removeToast(id), duration);
}

function removeToast(id) {
  const toast = document.getElementById(id);
  if (!toast) return;

  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}
