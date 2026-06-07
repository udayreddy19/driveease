// ========================================
// DriveEase — Navbar Component (Updated)
// ========================================

function renderNavbar() {
  const isLoggedIn = AppState.isLoggedIn;
  const user = AppState.currentUser;
  const isAdmin = user && user.role === 'admin';
  const walletBalance = user?.walletBalance || 0;

  return `
    <nav class="navbar" id="navbar">
      <div class="container navbar-inner">
        <a class="navbar-logo" href="#/" id="navbar-logo">
          <div class="navbar-logo-icon">🚗</div>
          <span>Drive<span style="color: var(--color-primary-light)">Ease</span></span>
        </a>

        <div class="navbar-links" id="navbar-links">
          <a class="navbar-link" href="#/" data-route="/">Home</a>
          <a class="navbar-link" href="#/search" data-route="/search">Browse Cars</a>
          <a class="navbar-link" href="#/host" data-route="/host">Become a Host</a>
          ${isAdmin ? `<a class="navbar-link" href="#/admin" data-route="/admin" style="color: var(--color-warning-light);">⚡ Admin</a>` : ''}
        </div>

        <div class="navbar-actions">
          ${isLoggedIn ? `
            <a class="navbar-link" href="#/finance" data-route="/finance" style="font-weight: 600; color: var(--color-accent);">
              💰 ₹${walletBalance.toLocaleString()}
            </a>
            <a class="navbar-link" href="#/dashboard" data-route="/dashboard">
              <span style="margin-right: 4px;">📋</span> My Trips
            </a>
            <button class="btn btn-ghost btn-sm" onclick="handleLogout()" id="logout-btn">
              Logout
            </button>
            <div class="avatar" style="cursor:pointer;" onclick="navigateTo('/dashboard')" id="user-avatar">
              ${user ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </div>
          ` : `
            <button class="btn btn-ghost btn-sm" onclick="openAuthModal('login')" id="login-btn">
              Login
            </button>
            <button class="btn btn-primary btn-sm" onclick="openAuthModal('signup')" id="signup-btn">
              Sign Up
            </button>
          `}
          <button class="navbar-mobile-btn" onclick="toggleMobileNav()" id="mobile-menu-btn" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>
    </nav>

    <div class="mobile-nav" id="mobile-nav">
      <button class="mobile-nav-close" onclick="toggleMobileNav()" aria-label="Close menu">✕</button>
      <a class="mobile-nav-link" href="#/" onclick="toggleMobileNav()">Home</a>
      <a class="mobile-nav-link" href="#/search" onclick="toggleMobileNav()">Browse Cars</a>
      <a class="mobile-nav-link" href="#/host" onclick="toggleMobileNav()">Become a Host</a>
      <a class="mobile-nav-link" href="#/finance" onclick="toggleMobileNav()">💰 Wallet</a>
      ${isAdmin ? `<a class="mobile-nav-link" href="#/admin" onclick="toggleMobileNav()" style="color: var(--color-warning-light);">⚡ Admin Panel</a>` : ''}
      ${isLoggedIn ? `
        <a class="mobile-nav-link" href="#/dashboard" onclick="toggleMobileNav()">My Trips</a>
        <button class="mobile-nav-link" onclick="handleLogout(); toggleMobileNav();">Logout</button>
      ` : `
        <button class="mobile-nav-link" onclick="openAuthModal('login'); toggleMobileNav();">Login</button>
        <button class="mobile-nav-link" onclick="openAuthModal('signup'); toggleMobileNav();">Sign Up</button>
      `}
    </div>
  `;
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.removeEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // initial state

  // Set active link
  const currentHash = window.location.hash.slice(1) || '/';
  document.querySelectorAll('.navbar-link[data-route]').forEach(link => {
    const route = link.dataset.route;
    if (currentHash === route || (route !== '/' && currentHash.startsWith(route))) {
      link.classList.add('active');
    }
  });
}

function toggleMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.classList.toggle('open');
  }
}
