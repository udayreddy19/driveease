// ========================================
// DriveEase — Navbar (ZoomCar-Style)
// ========================================

function renderNavbar() {
  const user = AppState.currentUser;

  return `
    <nav class="navbar" id="navbar">
      <div class="container">
        <div class="navbar-inner">
          <!-- Left: Hamburger + Logo -->
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <button class="navbar-mobile-btn" onclick="toggleMobileNav()" aria-label="Menu">☰</button>
            <a href="#/" class="navbar-logo">
              <span class="navbar-logo-icon">🚗</span>
              <span>DriveEase</span>
            </a>
          </div>

          <!-- Center: Nav Links -->
          <div class="navbar-links">
            ${user?.role === 'admin' ? `
              <a href="#/admin" class="navbar-link">Admin Dashboard</a>
            ` : ''}
            ${user?.role === 'host' ? `
              <a href="#/host" class="navbar-link">Host Dashboard</a>
            ` : ''}
          </div>

          <!-- Right: Actions -->
          <div class="navbar-actions">
            <a href="#/host" class="btn btn-outline btn-sm" style="border-radius: var(--radius-full);">Become a Host</a>

            ${user ? `
              <a href="#/finance" class="navbar-link wallet-link" style="display: flex; align-items: center; gap: var(--space-1);">
                💰 <span style="font-weight: 700;">₹${(user.walletBalance || 0).toLocaleString()}</span>
              </a>
              <button class="avatar" onclick="toggleUserMenu()" id="user-avatar" title="${user.name}">
                ${user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </button>
              <!-- User dropdown -->
              <div class="user-dropdown" id="user-dropdown" style="display: none;">
                <div style="padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--color-border-light);">
                  <div style="font-weight: 700; font-size: var(--text-sm);">${user.name}</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${user.email}</div>
                </div>
                <a href="#/dashboard" class="user-dropdown-item">👤 My Profile</a>
                <a href="#/dashboard?tab=bookings" class="user-dropdown-item">🚗 My Bookings</a>
                <a href="#/finance" class="user-dropdown-item">💰 Wallet & Payments</a>
                <a href="#/dashboard?tab=favorites" class="user-dropdown-item">❤️ Favorites</a>
                ${user.role === 'admin' ? '<a href="#/admin" class="user-dropdown-item">⚡ Admin Panel</a>' : ''}
                ${user.role === 'host' ? '<a href="#/host" class="user-dropdown-item">📊 Host Dashboard</a>' : ''}
                <div style="border-top: 1px solid var(--color-border-light); padding: var(--space-2);"></div>
                <button class="user-dropdown-item" onclick="handleLogout()" style="color: var(--color-danger);">🚪 Logout</button>
              </div>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="openAuthModal()" style="border-radius: var(--radius-full);">Login / Signup</button>
            `}
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Nav Drawer -->
    <div class="mobile-nav" id="mobile-nav">
      <button class="mobile-nav-close" onclick="toggleMobileNav()">✕</button>
      ${user ? `
        <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4) 0; margin-bottom: var(--space-4); border-bottom: 1px solid var(--color-border-light);">
          <div class="avatar">${user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <div>
            <div style="font-weight: 700; font-size: var(--text-sm);">${user.name}</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${user.email}</div>
          </div>
        </div>
      ` : ''}
      <a href="#/" class="mobile-nav-link" onclick="toggleMobileNav()">🏠 Home</a>
      <a href="#/search" class="mobile-nav-link" onclick="toggleMobileNav()">🔍 Search Cars</a>
      ${user ? `
        <a href="#/dashboard" class="mobile-nav-link" onclick="toggleMobileNav()">👤 My Profile</a>
        <a href="#/dashboard?tab=bookings" class="mobile-nav-link" onclick="toggleMobileNav()">🚗 My Bookings</a>
        <a href="#/finance" class="mobile-nav-link" onclick="toggleMobileNav()">💰 Wallet & Payments</a>
        <a href="#/dashboard?tab=favorites" class="mobile-nav-link" onclick="toggleMobileNav()">❤️ Favorites</a>
        ${user.role === 'admin' ? '<a href="#/admin" class="mobile-nav-link" onclick="toggleMobileNav()">⚡ Admin Panel</a>' : ''}
        ${user.role === 'host' ? '<a href="#/host" class="mobile-nav-link" onclick="toggleMobileNav()">📊 Host Dashboard</a>' : ''}
        <div style="border-top: 1px solid var(--color-border-light); margin: var(--space-4) 0;"></div>
        <button class="mobile-nav-link" onclick="handleLogout(); toggleMobileNav();" style="color: var(--color-danger);">🚪 Logout</button>
      ` : `
        <button class="mobile-nav-link" onclick="openAuthModal(); toggleMobileNav();">🔐 Login / Signup</button>
      `}
      <div style="margin-top: auto; border-top: 1px solid var(--color-border-light); padding-top: var(--space-4);">
        <a href="#/host" class="mobile-nav-link" onclick="toggleMobileNav()">🏢 Become a Host</a>
      </div>
    </div>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-nav-overlay" id="mobile-nav-overlay" onclick="toggleMobileNav()" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: calc(var(--z-modal) - 1);"></div>
  `;
}

// ---- Navbar Styles (injected once) ----
function injectNavbarStyles() {
  if (document.getElementById('navbar-dropdown-styles')) return;
  const style = document.createElement('style');
  style.id = 'navbar-dropdown-styles';
  style.textContent = `
    .user-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 240px;
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      z-index: var(--z-dropdown);
      overflow: hidden;
      animation: fadeInDown 0.2s var(--ease-out);
    }
    .user-dropdown-item {
      display: block;
      padding: var(--space-3) var(--space-5);
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);
      text-decoration: none;
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
    }
    .user-dropdown-item:hover {
      background: var(--color-bg-hover);
      color: var(--color-primary);
    }
    .navbar-actions {
      position: relative;
    }
  `;
  document.head.appendChild(style);
}

// ---- Actions ----

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  if (!nav) return;

  const isOpen = nav.classList.contains('open');
  if (isOpen) {
    nav.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  } else {
    nav.classList.add('open');
    if (overlay) overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  if (!dropdown) return;

  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', closeUserMenuOnOutsideClick);
    }, 0);
  } else {
    dropdown.style.display = 'none';
    document.removeEventListener('click', closeUserMenuOnOutsideClick);
  }
}

function closeUserMenuOnOutsideClick(e) {
  const dropdown = document.getElementById('user-dropdown');
  const avatar = document.getElementById('user-avatar');
  if (dropdown && avatar && !dropdown.contains(e.target) && !avatar.contains(e.target)) {
    dropdown.style.display = 'none';
    document.removeEventListener('click', closeUserMenuOnOutsideClick);
  }
}

function handleLogout() {
  AppState.currentUser = null;
  localStorage.removeItem('driveease_user');
  showToast('info', 'Logged Out', 'You have been logged out successfully');
  navigateTo('/');
}

// Scroll effect
function initNavbarScroll() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}
