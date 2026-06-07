// ========================================
// DriveEase — Bottom Navigation Component
// ========================================

function renderBottomNav() {
  const currentHash = window.location.hash.slice(1) || '/';
  const bookingCount = (AppState.bookings || []).filter(b => b.status === 'upcoming').length;

  const tabs = [
    { route: '/', icon: '🏠', label: 'Home', match: (h) => h === '/' },
    { route: '/search', icon: '🔍', label: 'Search', match: (h) => h.startsWith('/search') },
    { route: '/dashboard', icon: '📋', label: 'Trips', match: (h) => h.startsWith('/dashboard'), badge: bookingCount },
    { route: '/finance', icon: '💰', label: 'Wallet', match: (h) => h.startsWith('/finance') },
    { route: AppState.isLoggedIn ? '/dashboard' : '', icon: '👤', label: 'Profile', match: (h) => false, action: AppState.isLoggedIn ? null : "openAuthModal('login')" },
  ];

  return `
    <nav class="bottom-nav" id="bottom-nav">
      <div class="bottom-nav-inner">
        ${tabs.map(tab => `
          <${tab.action ? 'button' : 'a'}
            class="bottom-nav-item ${tab.match(currentHash) ? 'active' : ''}"
            ${tab.action ? `onclick="${tab.action}"` : `href="#${tab.route}"`}
            ${tab.route === '' && !tab.action ? 'onclick="openAuthModal(\'login\')"' : ''}>
            <span class="bottom-nav-icon">${tab.icon}</span>
            <span class="bottom-nav-label">${tab.label}</span>
            ${tab.badge && tab.badge > 0 ? `<span class="bottom-nav-badge">${tab.badge}</span>` : ''}
          </${tab.action ? 'button' : 'a'}>
        `).join('')}
      </div>
    </nav>
  `;
}

function updateBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (nav) {
    nav.outerHTML = renderBottomNav();
  }
}
