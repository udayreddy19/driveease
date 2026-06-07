// ========================================
// DriveEase — Dashboard (ZoomCar Profile Style)
// ========================================

function renderDashboardPage() {
  const user = AppState.currentUser;
  if (!user) {
    return `
      <div class="empty-state" style="padding-top: 120px;">
        <div class="empty-state-icon">🔐</div>
        <h3>Login Required</h3>
        <p>Please login to access your dashboard</p>
        <button class="btn btn-primary" style="margin-top: var(--space-4);" onclick="openAuthModal()">Login / Signup</button>
      </div>
    `;
  }

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const activeTab = new URLSearchParams(window.location.hash.split('?')[1] || '').get('tab') || 'account';

  return `
    <div class="dashboard-page">
      <div class="container">
        <div class="dashboard-layout">
          <!-- Left Sidebar -->
          <div class="dashboard-sidebar">
            <div class="dashboard-sidebar-user">
              <div class="dashboard-sidebar-avatar">${initials}</div>
              <div class="dashboard-sidebar-name">${user.name}</div>
              <div class="dashboard-sidebar-email">${user.phone || user.email}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">${user.email}</div>
            </div>

            <div style="display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-1);">
              ${user.isVerified ? `<span style="color: var(--color-success);">✅</span>` : `<span style="color: var(--color-danger);">❌</span>`}
              <span style="font-size: var(--text-sm);">Profile Document</span>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-1);">
              <span style="color: var(--color-success);">✅</span>
              <span style="font-size: var(--text-sm);">Mobile Number</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); margin-bottom: var(--space-1);">
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <span>🎯</span>
                <span style="font-size: var(--text-sm);">D-Points</span>
              </div>
              <span style="font-size: var(--text-xs); color: var(--color-primary); font-weight: 600;">Earn Points!</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); margin-bottom: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <span>💰</span>
                <span style="font-size: var(--text-sm);">Credits</span>
              </div>
              <span style="font-weight: 700; color: var(--color-primary);">₹${(user.walletBalance || 0).toLocaleString()}</span>
            </div>

            <div style="border-top: 1px solid var(--color-border-light); padding-top: var(--space-2);">
              <button class="dashboard-sidebar-item ${activeTab === 'bookings' ? 'active' : ''}" onclick="switchDashboardTab('bookings')">
                🚗 My Bookings
              </button>
              <button class="dashboard-sidebar-item" onclick="navigateTo('/finance')">
                💳 Saved Cards
              </button>
              <button class="dashboard-sidebar-item ${activeTab === 'account' ? 'active' : ''}" onclick="switchDashboardTab('account')">
                👤 Account
              </button>
              <button class="dashboard-sidebar-item ${activeTab === 'favorites' ? 'active' : ''}" onclick="switchDashboardTab('favorites')">
                ❤️ Favorites
                ${AppState.favorites.length ? `<span class="item-badge">${AppState.favorites.length}</span>` : ''}
              </button>
            </div>
          </div>

          <!-- Main Content -->
          <div class="dashboard-main" id="dashboard-content">
            ${renderDashboardTabContent(activeTab, user)}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDashboardTabContent(tab, user) {
  switch (tab) {
    case 'account':
      return renderAccountTab(user);
    case 'bookings':
      return renderBookingsTab(user);
    case 'favorites':
      return renderFavoritesTab();
    default:
      return renderAccountTab(user);
  }
}

function renderAccountTab(user) {
  return `
    <div>
      <h1 style="font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-8);">MY ACCOUNT</h1>

      <div class="card" style="padding: var(--space-8);">
        <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-6); padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border-light);">Account Details</h3>

        <div style="display: grid; grid-template-columns: 120px 1fr; gap: var(--space-4); align-items: center; margin-bottom: var(--space-4);">
          <label style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Email</label>
          <span style="font-size: var(--text-sm);">${user.email}</span>
        </div>

        <div style="display: grid; grid-template-columns: 120px 1fr; gap: var(--space-4); align-items: center; margin-bottom: var(--space-6);">
          <label style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Mobile *</label>
          <input type="text" class="input" value="${user.phone || ''}" style="max-width: 240px;" placeholder="Enter phone number">
        </div>

        <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-6); padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border-light);">Personal Details</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
          <div style="display: grid; grid-template-columns: 80px 1fr; gap: var(--space-4); align-items: center;">
            <label style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Name *</label>
            <input type="text" class="input" value="${user.name}" id="profile-name">
          </div>
          <div style="display: grid; grid-template-columns: 80px 1fr; gap: var(--space-4); align-items: center;">
            <label style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Gender</label>
            <select class="select" style="max-width: 160px;">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div style="margin-top: var(--space-8); display: flex; gap: var(--space-3);">
          <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
          <button class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function renderBookingsTab(user) {
  const bookings = AppState.bookings || [];

  if (bookings.length === 0) {
    return `
      <div>
        <h1 style="font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-8);">MY BOOKINGS</h1>
        <div class="empty-state" style="padding: var(--space-12);">
          <div class="empty-state-icon">🚗</div>
          <h3>No Bookings Found</h3>
          <p>You haven't made any bookings yet. Start exploring cars!</p>
          <a href="#/search" class="btn btn-primary" style="margin-top: var(--space-4);">Browse Cars</a>
        </div>
      </div>
    `;
  }

  return `
    <div>
      <h1 style="font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-8);">MY BOOKINGS</h1>
      ${bookings.map(b => {
        const car = AppData.CARS.find(c => c.id === b.carId) || {};
        return `
          <div class="booking-card">
            <div class="booking-card-image">${car.emoji || '🚗'}</div>
            <div class="booking-card-info">
              <div class="booking-card-header">
                <div class="booking-card-title">${car.name || 'Unknown Car'}</div>
                <span class="badge badge-${b.status === 'confirmed' ? 'success' : b.status === 'completed' ? 'primary' : 'warning'}">${b.status}</span>
              </div>
              <div class="booking-card-dates">
                <span>${formatSearchDate(b.pickupDate)}</span>
                <span class="arrow">→</span>
                <span>${formatSearchDate(b.dropoffDate)}</span>
              </div>
              <div class="booking-card-footer">
                <div class="booking-card-location">📍 ${b.location || 'Pickup location'}</div>
                <div class="booking-card-price">₹${(b.totalAmount || 0).toLocaleString()}</div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderFavoritesTab() {
  const favCars = AppData.CARS.filter(c => AppState.favorites.includes(c.id));

  if (favCars.length === 0) {
    return `
      <div>
        <h1 style="font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-8);">FAVORITES</h1>
        <div class="empty-state" style="padding: var(--space-12);">
          <div class="empty-state-icon">❤️</div>
          <h3>No Favorites Yet</h3>
          <p>Save cars you love and they'll show up here!</p>
          <a href="#/search" class="btn btn-primary" style="margin-top: var(--space-4);">Browse Cars</a>
        </div>
      </div>
    `;
  }

  return `
    <div>
      <h1 style="font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-8);">FAVORITES</h1>
      <div class="car-grid">
        ${favCars.map(c => renderCarCardHTML(c)).join('')}
      </div>
    </div>
  `;
}

// ---- Actions ----

function switchDashboardTab(tab) {
  // Update sidebar
  document.querySelectorAll('.dashboard-sidebar-item').forEach(item => item.classList.remove('active'));
  event.target.closest('.dashboard-sidebar-item')?.classList.add('active');

  // Update content
  const content = document.getElementById('dashboard-content');
  if (content) {
    content.innerHTML = renderDashboardTabContent(tab, AppState.currentUser);
    content.style.animation = 'fadeIn 0.3s var(--ease-out)';
  }

  // Update URL without triggering router
  history.replaceState(null, '', `#/dashboard?tab=${tab}`);
}

function saveProfile() {
  const name = document.getElementById('profile-name')?.value;
  if (name && AppState.currentUser) {
    AppState.currentUser.name = name;
    showToast('success', 'Profile Updated', 'Your changes have been saved');
  }
}
