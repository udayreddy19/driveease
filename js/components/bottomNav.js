// ========================================
// DriveEase — Bottom Nav (Light Theme)
// ========================================

function renderBottomNav() {
  const user = AppState.currentUser;
  const hash = window.location.hash.slice(1) || '/';

  return `
    <div class="bottom-nav">
      <div class="bottom-nav-inner">
        <a href="#/" class="bottom-nav-item ${hash === '/' ? 'active' : ''}">
          <span class="icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="#/search" class="bottom-nav-item ${hash.startsWith('/search') ? 'active' : ''}">
          <span class="icon">🔍</span>
          <span>Search</span>
        </a>
        ${user ? `
          <a href="#/dashboard?tab=bookings" class="bottom-nav-item ${hash.startsWith('/dashboard') ? 'active' : ''}">
            <span class="icon">🚗</span>
            <span>Bookings</span>
          </a>
          <a href="#/finance" class="bottom-nav-item ${hash.startsWith('/finance') ? 'active' : ''}">
            <span class="icon">💰</span>
            <span>Wallet</span>
          </a>
          <a href="#/dashboard" class="bottom-nav-item ${hash === '/dashboard' ? 'active' : ''}">
            <span class="icon">👤</span>
            <span>Profile</span>
          </a>
        ` : `
          <a href="javascript:void(0)" class="bottom-nav-item" onclick="openAuthModal()">
            <span class="icon">❤️</span>
            <span>Favorites</span>
          </a>
          <a href="javascript:void(0)" class="bottom-nav-item" onclick="openAuthModal()">
            <span class="icon">👤</span>
            <span>Login</span>
          </a>
        `}
      </div>
    </div>
  `;
}

function updateBottomNav() {
  const container = document.getElementById('bottom-nav-container');
  if (container) {
    container.innerHTML = renderBottomNav();
  }
}
