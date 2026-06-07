// ========================================
// DriveEase — Main Application Entry (Updated)
// ========================================

// ---- Global State ----
let AppState = {
  isLoggedIn: false,
  currentUser: null,
  favorites: [],
  bookings: [],
  currentBooking: null,
  hostListings: [],
  authModalTab: 'login',
  dashboardTab: 'trips',
  hostTab: 'overview',
  adminTab: 'overview',
  financeTab: 'wallet',
  walletTransactions: [],
};

// ---- State Management ----
function loadState() {
  try {
    const saved = localStorage.getItem('driveease_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      AppState = { ...AppState, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem('driveease_state', JSON.stringify({
      isLoggedIn: AppState.isLoggedIn,
      currentUser: AppState.currentUser,
      favorites: AppState.favorites,
      bookings: AppState.bookings,
      hostListings: AppState.hostListings,
      walletTransactions: AppState.walletTransactions,
    }));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

// ---- Navigation Helper ----
function navigateTo(path) {
  window.location.hash = path;
}

// ---- Favorites ----
function toggleFavorite(carId) {
  const idx = AppState.favorites.indexOf(carId);
  if (idx >= 0) {
    AppState.favorites.splice(idx, 1);
    showToast('info', 'Removed', 'Car removed from favorites');
  } else {
    AppState.favorites.push(carId);
    showToast('success', 'Saved!', 'Car added to favorites ❤️');
  }
  saveState();

  // Update all fav buttons for this car
  document.querySelectorAll(`[id^="fav-btn-${carId}"]`).forEach(btn => {
    btn.classList.toggle('active');
    btn.innerHTML = AppState.favorites.includes(carId) ? '❤️' : '🤍';
  });

  const detailBtn = document.getElementById('detail-fav-btn');
  if (detailBtn) {
    detailBtn.classList.toggle('active', AppState.favorites.includes(carId));
    detailBtn.innerHTML = AppState.favorites.includes(carId) ? '❤️' : '🤍';
  }
}

// ---- Render Helpers ----
function renderPage(pageRenderer, params) {
  const content = document.getElementById('page-content');
  if (!content) return;

  // Add page transition
  content.classList.add('page-enter');
  content.innerHTML = pageRenderer(params);

  // Remove animation class after it completes
  setTimeout(() => content.classList.remove('page-enter'), 400);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update bottom nav
  updateBottomNav();
}

function renderApp() {
  const navContainer = document.getElementById('nav-container');
  if (navContainer) {
    navContainer.innerHTML = renderNavbar();
    initNavbarScroll();
  }

  // Update bottom nav
  const bnContainer = document.getElementById('bottom-nav-container');
  if (bnContainer) {
    bnContainer.innerHTML = renderBottomNav();
  }
}

// ---- Router ----
let router;

async function initApp() {
  loadState();

  // Initialize IndexedDB
  try {
    await db.init();
    await db.seedData();
    console.log('✅ IndexedDB initialized');
  } catch (e) {
    console.warn('IndexedDB init failed, falling back to localStorage:', e);
  }

  // Initial render of app shell
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="nav-container">${renderNavbar()}</div>
    <main id="page-content"></main>
    ${renderFooter()}
    <div id="bottom-nav-container">${renderBottomNav()}</div>
    <div class="toast-container" id="toast-container"></div>
  `;

  // Inject navbar dropdown styles
  injectNavbarStyles();

  // Setup router
  router = new Router();

  router.beforeEach = (route) => {
    setTimeout(() => {
      // Update navbar active state
      document.querySelectorAll('.navbar-link[data-route]').forEach(link => {
        link.classList.remove('active');
        const linkRoute = link.dataset.route;
        const hash = window.location.hash.slice(1) || '/';
        if (hash === linkRoute || (linkRoute !== '/' && hash.startsWith(linkRoute))) {
          link.classList.add('active');
        }
      });
      // Update bottom nav
      updateBottomNav();
    }, 50);
  };

  // ---- Routes ----
  router.on('/', () => {
    renderPage(renderHomePage);
    setTimeout(initHomePage, 100);
  });

  router.on('/search', (params) => {
    renderPage(renderSearchPage, params);
    setTimeout(initSearchPage, 100);
  });

  router.on('/car/:id', (params) => {
    renderPage(() => renderCarDetailPage(params.id));
  });

  router.on('/booking/:id', (params) => {
    renderPage(() => renderBookingPage(params.id));
  });

  router.on('/dashboard', () => {
    renderPage(renderDashboardPage);
  });

  router.on('/host', () => {
    renderPage(renderHostDashboardPage);
    setTimeout(initHostPage, 100);
  });

  router.on('/admin', () => {
    renderPage(renderAdminPage);
  });

  router.on('/finance', () => {
    renderPage(renderFinancePage);
  });

  router.on('*', () => {
    renderPage(renderNotFoundPage);
  });

  // Init
  initNavbarScroll();
  router.init();
}

// ---- Start ----
document.addEventListener('DOMContentLoaded', initApp);
