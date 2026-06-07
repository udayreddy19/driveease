// ========================================
// DriveEase — User Dashboard Page
// ========================================

function renderDashboardPage() {
  if (!AppState.isLoggedIn) {
    setTimeout(() => openAuthModal('login'), 300);
    return `
      <div class="dashboard-page">
        <div class="container">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please login to view your dashboard.</p>
            <button class="btn btn-primary" onclick="openAuthModal('login')" style="margin-top: var(--space-6);">Login</button>
          </div>
        </div>
      </div>
    `;
  }

  const user = AppState.currentUser;
  const bookings = AppState.bookings || [];
  const favorites = AppState.favorites || [];
  const favCars = AppData.CARS.filter(c => favorites.includes(c.id));

  const upcomingTrips = bookings.filter(b => b.status === 'upcoming');
  const pastTrips = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const dashTab = AppState.dashboardTab || 'trips';

  return `
    <div class="dashboard-page">
      <div class="container">
        <!-- Header -->
        <div class="dashboard-header animate-fade-in">
          <div class="avatar avatar-xl">${user.name.split(' ').map(n => n[0]).join('')}</div>
          <div class="dashboard-user-info">
            <h2>${user.name}</h2>
            <p style="color: var(--color-text-tertiary);">${user.email} · Member since ${user.joinDate}</p>
          </div>
          <div style="margin-left: auto;">
            <button class="btn btn-secondary btn-sm" onclick="showToast('info', 'Coming Soon', 'Profile editing will be available soon')" id="edit-profile-btn">
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="dashboard-stats animate-fade-in-up">
          <div class="stat-card">
            <div class="stat-value">${bookings.length}</div>
            <div class="stat-label">Total Trips</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${upcomingTrips.length}</div>
            <div class="stat-label">Upcoming</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${favorites.length}</div>
            <div class="stat-label">Favorites</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">₹${bookings.reduce((s, b) => s + (b.total || 0), 0).toLocaleString()}</div>
            <div class="stat-label">Total Spent</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs" style="margin-bottom: var(--space-6); width: fit-content;">
          <button class="tab ${dashTab === 'trips' ? 'active' : ''}" onclick="switchDashTab('trips')" id="tab-trips">
            🚗 My Trips
          </button>
          <button class="tab ${dashTab === 'favorites' ? 'active' : ''}" onclick="switchDashTab('favorites')" id="tab-favorites">
            ❤️ Favorites (${favorites.length})
          </button>
          <button class="tab ${dashTab === 'payments' ? 'active' : ''}" onclick="switchDashTab('payments')" id="tab-payments">
            💳 Payments
          </button>
        </div>

        <!-- Content -->
        <div class="dashboard-content" id="dashboard-content">
          ${dashTab === 'trips' ? renderTripsTab(upcomingTrips, pastTrips) : ''}
          ${dashTab === 'favorites' ? renderFavoritesTab(favCars) : ''}
          ${dashTab === 'payments' ? renderPaymentsTab(bookings) : ''}
        </div>
      </div>
    </div>
  `;
}

function renderTripsTab(upcoming, past) {
  return `
    <div class="animate-fade-in">
      ${upcoming.length > 0 ? `
        <h4 style="margin-bottom: var(--space-4); color: var(--color-primary-light);">
          📅 Upcoming Trips (${upcoming.length})
        </h4>
        ${upcoming.map(trip => renderTripCard(trip)).join('')}
      ` : ''}

      ${past.length > 0 ? `
        <h4 style="margin: var(--space-8) 0 var(--space-4); color: var(--color-text-tertiary);">
          📋 Past Trips (${past.length})
        </h4>
        ${past.map(trip => renderTripCard(trip)).join('')}
      ` : ''}

      ${upcoming.length === 0 && past.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🚗</div>
          <h3>No Trips Yet</h3>
          <p>Book your first self-drive car and start your journey!</p>
          <a href="#/search" class="btn btn-primary" style="margin-top: var(--space-6);">Browse Cars</a>
        </div>
      ` : ''}
    </div>
  `;
}

function renderTripCard(trip) {
  const car = AppData.CARS.find(c => c.id === trip.carId);
  const statusColors = {
    upcoming: 'badge-primary',
    active: 'badge-accent',
    completed: 'badge-success',
    cancelled: 'badge-danger',
  };

  return `
    <div class="trip-card">
      <div class="trip-card-image" style="background: ${car?.color || '#333'}15;">
        ${trip.carEmoji || car?.emoji || '🚗'}
      </div>
      <div class="trip-card-info">
        <div class="trip-card-header">
          <div>
            <h4 style="margin-bottom: 2px;">${trip.carName || car?.name || 'Unknown Car'}</h4>
            <span style="font-size: var(--text-xs); color: var(--color-text-muted);">ID: ${trip.id}</span>
          </div>
          <span class="badge ${statusColors[trip.status] || 'badge-primary'}">${trip.status}</span>
        </div>
        <div class="trip-card-dates">
          <span>📅 ${formatDateTime(trip.pickup) || 'N/A'}</span>
          <span>→</span>
          <span>${formatDateTime(trip.dropoff) || 'N/A'}</span>
        </div>
        <div class="trip-card-footer">
          <span class="price">
            <span class="price-amount" style="font-size: var(--text-lg);">₹${(trip.total || 0).toLocaleString()}</span>
          </span>
          <div style="display: flex; gap: var(--space-2);">
            ${trip.status === 'upcoming' ? `
              <button class="btn btn-ghost btn-sm" onclick="cancelTrip('${trip.id}')" id="cancel-${trip.id}">Cancel</button>
              <button class="btn btn-outline btn-sm" onclick="showToast('info', 'Coming Soon', 'Trip extension feature coming soon')">Extend</button>
            ` : trip.status === 'completed' ? `
              <button class="btn btn-outline btn-sm" onclick="navigateTo('/car/${trip.carId}')">Book Again</button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFavoritesTab(cars) {
  if (cars.length === 0) {
    return `
      <div class="empty-state animate-fade-in">
        <div class="empty-state-icon">❤️</div>
        <h3>No Favorites Yet</h3>
        <p>Save cars you love and book them later.</p>
        <a href="#/search" class="btn btn-primary" style="margin-top: var(--space-6);">Browse Cars</a>
      </div>
    `;
  }

  return `
    <div class="cars-grid animate-fade-in">
      ${cars.map(car => renderCarCard(car)).join('')}
    </div>
  `;
}

function renderPaymentsTab(bookings) {
  if (bookings.length === 0) {
    return `
      <div class="empty-state animate-fade-in">
        <div class="empty-state-icon">💳</div>
        <h3>No Payments</h3>
        <p>Your payment history will appear here.</p>
      </div>
    `;
  }

  return `
    <div class="animate-fade-in" style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: var(--glass-border); text-align: left;">
            <th style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); font-weight: 600;">Date</th>
            <th style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); font-weight: 600;">Trip ID</th>
            <th style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); font-weight: 600;">Car</th>
            <th style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); font-weight: 600;">Amount</th>
            <th style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); font-weight: 600;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => `
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm);">${new Date(b.bookedAt).toLocaleDateString()}</td>
              <td style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); font-family: monospace; color: var(--color-primary-light);">${b.id}</td>
              <td style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm);">${b.carEmoji || '🚗'} ${b.carName}</td>
              <td style="padding: var(--space-3) var(--space-4); font-size: var(--text-sm); font-weight: 600;">₹${(b.total || 0).toLocaleString()}</td>
              <td style="padding: var(--space-3) var(--space-4);"><span class="badge badge-success">Paid</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function switchDashTab(tab) {
  AppState.dashboardTab = tab;
  renderPage(renderDashboardPage);
}

function cancelTrip(tripId) {
  const bookings = AppState.bookings || [];
  const trip = bookings.find(b => b.id === tripId);
  if (trip) {
    trip.status = 'cancelled';
    saveState();
    showToast('info', 'Trip Cancelled', `Trip ${tripId} has been cancelled. Refund will be processed in 3-5 business days.`);
    renderPage(renderDashboardPage);
  }
}
