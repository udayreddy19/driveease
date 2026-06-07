// ========================================
// DriveEase — Host Dashboard Page
// ========================================

function renderHostDashboardPage() {
  const isHost = AppState.isLoggedIn;

  if (!isHost) {
    // Show "Become a Host" landing
    return renderBecomeHostPage();
  }

  const hostListings = AppState.hostListings || [];
  const hostTab = AppState.hostTab || 'overview';

  return `
    <div class="host-page">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-8);">
          <div>
            <h1 class="animate-fade-in" style="font-size: var(--text-4xl);">Host Dashboard</h1>
            <p style="color: var(--color-text-tertiary);">Manage your car listings and track earnings</p>
          </div>
          <button class="btn btn-primary" onclick="switchHostTab('add')" id="add-car-btn">
            ➕ List a Car
          </button>
        </div>

        <!-- Stats -->
        <div class="host-stats-grid animate-fade-in-up">
          <div class="host-stat-card">
            <div class="host-stat-icon">💰</div>
            <div class="host-stat-value">₹${(hostListings.length * 12500).toLocaleString()}</div>
            <div class="host-stat-label">Total Earnings</div>
          </div>
          <div class="host-stat-card">
            <div class="host-stat-icon">🚗</div>
            <div class="host-stat-value">${hostListings.length}</div>
            <div class="host-stat-label">Active Listings</div>
          </div>
          <div class="host-stat-card">
            <div class="host-stat-icon">📈</div>
            <div class="host-stat-value">${hostListings.length * 15}</div>
            <div class="host-stat-label">Completed Trips</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs" style="margin-bottom: var(--space-6); width: fit-content;">
          <button class="tab ${hostTab === 'overview' ? 'active' : ''}" onclick="switchHostTab('overview')" id="host-tab-overview">
            📊 Overview
          </button>
          <button class="tab ${hostTab === 'listings' ? 'active' : ''}" onclick="switchHostTab('listings')" id="host-tab-listings">
            🚗 My Listings (${hostListings.length})
          </button>
          <button class="tab ${hostTab === 'add' ? 'active' : ''}" onclick="switchHostTab('add')" id="host-tab-add">
            ➕ Add Car
          </button>
        </div>

        <!-- Content -->
        <div id="host-content">
          ${hostTab === 'overview' ? renderHostOverview(hostListings) : ''}
          ${hostTab === 'listings' ? renderHostListings(hostListings) : ''}
          ${hostTab === 'add' ? renderAddCarForm() : ''}
        </div>
      </div>
    </div>
  `;
}

function renderBecomeHostPage() {
  return `
    <div class="host-page">
      <div class="container">
        <!-- Hero -->
        <div style="text-align: center; padding: var(--space-16) 0; max-width: 700px; margin: 0 auto;" class="animate-fade-in-up">
          <div style="font-size: 5rem; margin-bottom: var(--space-6);">🚗💰</div>
          <h1 style="margin-bottom: var(--space-4);">Earn Money With Your Car</h1>
          <p style="font-size: var(--text-lg); color: var(--color-text-secondary); margin-bottom: var(--space-8);">
            List your idle car on DriveEase and earn up to ₹50,000 per month. Zero investment, full insurance coverage, and complete control.
          </p>
          <button class="btn btn-primary btn-lg" onclick="openAuthModal('signup')" id="host-signup-btn">
            Start Hosting →
          </button>
        </div>

        <!-- Benefits -->
        <div class="features-grid" style="margin-top: var(--space-8);">
          <div class="feature-card reveal">
            <div class="feature-icon">💵</div>
            <h4>Earn Passively</h4>
            <p>Make money while your car sits idle. Average hosts earn ₹30,000-50,000/month.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon">🛡️</div>
            <h4>Full Protection</h4>
            <p>Comprehensive insurance covers your car during every rental. Peace of mind guaranteed.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon">📊</div>
            <h4>Track Everything</h4>
            <p>GPS tracking, real-time monitoring, and detailed analytics for all your listings.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon">⚡</div>
            <h4>Instant Payouts</h4>
            <p>Get paid instantly after every trip. No waiting, no hassle. Direct bank transfer.</p>
          </div>
        </div>

        <!-- How it works -->
        <div class="section" style="text-align: center;">
          <div class="section-header reveal">
            <h2>How Hosting Works</h2>
            <p>Three simple steps to start earning</p>
            <div class="section-line"></div>
          </div>
          <div class="how-it-works-grid reveal">
            <div class="step-card">
              <div class="step-icon">
                <span class="step-number">1</span>
                📝
              </div>
              <h4>List Your Car</h4>
              <p>Add your car details, photos, and set your pricing. Takes just 5 minutes.</p>
            </div>
            <div class="step-card">
              <div class="step-icon">
                <span class="step-number">2</span>
                ✅
              </div>
              <h4>Get Verified</h4>
              <p>Our team inspects and approves your car. GPS device installed for free.</p>
            </div>
            <div class="step-card">
              <div class="step-icon">
                <span class="step-number">3</span>
                💰
              </div>
              <h4>Start Earning</h4>
              <p>Guests book your car and you earn money. It's that simple!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderHostOverview(listings) {
  if (listings.length === 0) {
    return `
      <div class="empty-state animate-fade-in">
        <div class="empty-state-icon">🚗</div>
        <h3>No Listings Yet</h3>
        <p>List your first car and start earning today!</p>
        <button class="btn btn-primary" onclick="switchHostTab('add')" style="margin-top: var(--space-6);">
          ➕ List a Car
        </button>
      </div>
    `;
  }

  return `
    <div class="animate-fade-in">
      <h3 style="margin-bottom: var(--space-4);">Recent Activity</h3>
      <div style="padding: var(--space-6); background: var(--gradient-card); border: var(--glass-border); border-radius: var(--radius-lg);">
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${listings.slice(0, 5).map((l, i) => `
            <div style="display: flex; align-items: center; gap: var(--space-4); padding-bottom: var(--space-4); ${i < listings.length - 1 ? 'border-bottom: 1px solid var(--color-border);' : ''}">
              <span style="font-size: 1.5rem;">${l.emoji || '🚗'}</span>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: var(--text-sm);">${l.name}</div>
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Listed ${new Date(l.listedAt).toLocaleDateString()}</div>
              </div>
              <span class="badge ${l.active ? 'badge-success' : 'badge-warning'}">${l.active ? 'Active' : 'Paused'}</span>
              <span style="font-weight: 700; color: var(--color-accent);">₹${l.pricePerDay}/day</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderHostListings(listings) {
  if (listings.length === 0) {
    return `
      <div class="empty-state animate-fade-in">
        <div class="empty-state-icon">📋</div>
        <h3>No Listings</h3>
        <p>Add your first car listing to get started.</p>
        <button class="btn btn-primary" onclick="switchHostTab('add')" style="margin-top: var(--space-6);">
          ➕ List a Car
        </button>
      </div>
    `;
  }

  return `
    <div class="animate-fade-in">
      ${listings.map(listing => `
        <div class="listing-card">
          <div class="listing-card-image">
            <span style="font-size: 2.5rem;">${listing.emoji || '🚗'}</span>
          </div>
          <div class="listing-card-info" style="flex: 1;">
            <h4 style="margin-bottom: 2px;">${listing.name}</h4>
            <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">${listing.brand} · ${listing.year} · ${listing.type}</p>
            <div class="listing-card-footer">
              <span class="price">
                <span class="price-amount" style="font-size: var(--text-base);">₹${listing.pricePerDay}</span>
                <span class="price-unit">/day</span>
              </span>
              <label class="toggle" title="${listing.active ? 'Active' : 'Paused'}">
                <input type="checkbox" ${listing.active ? 'checked' : ''} onchange="toggleListing('${listing.id}')">
                <span class="toggle-slider"></span>
              </label>
              <button class="btn btn-ghost btn-sm" onclick="removeListing('${listing.id}')">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAddCarForm() {
  return `
    <div class="listing-form animate-fade-in-up">
      <h3 style="margin-bottom: var(--space-6);">List Your Car</h3>
      <form onsubmit="handleAddCar(event)" id="add-car-form">
        <div class="listing-form-grid">
          <div class="input-group">
            <label for="car-name-input">Car Name</label>
            <input type="text" class="input" id="car-name-input" placeholder="e.g. Hyundai Creta" required>
          </div>
          <div class="input-group">
            <label for="car-brand-input">Brand</label>
            <input type="text" class="input" id="car-brand-input" placeholder="e.g. Hyundai" required>
          </div>
          <div class="input-group">
            <label for="car-year-input">Year</label>
            <select class="input select" id="car-year-input" required>
              <option value="">Select Year</option>
              ${[2025, 2024, 2023, 2022, 2021, 2020].map(y => `<option value="${y}">${y}</option>`).join('')}
            </select>
          </div>
          <div class="input-group">
            <label for="car-type-input">Type</label>
            <select class="input select" id="car-type-input" required>
              <option value="">Select Type</option>
              <option value="hatchback">Hatchback</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div class="input-group">
            <label for="car-trans-input">Transmission</label>
            <select class="input select" id="car-trans-input" required>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
          <div class="input-group">
            <label for="car-fuel-input">Fuel Type</label>
            <select class="input select" id="car-fuel-input" required>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div class="input-group">
            <label for="car-seats-input">Seats</label>
            <select class="input select" id="car-seats-input" required>
              <option value="4">4 Seats</option>
              <option value="5" selected>5 Seats</option>
              <option value="7">7 Seats</option>
            </select>
          </div>
          <div class="input-group">
            <label for="car-price-input">Price per Day (₹)</label>
            <input type="number" class="input" id="car-price-input" placeholder="e.g. 1500" min="500" required>
          </div>
          <div class="input-group">
            <label for="car-city-input">City</label>
            <select class="input select" id="car-city-input" required>
              ${AppData.CITIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="input-group">
            <label for="car-plate-input">License Plate</label>
            <input type="text" class="input" id="car-plate-input" placeholder="e.g. KA01AB1234" required>
          </div>
        </div>

        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="car-desc-input">Description</label>
          <textarea class="input" id="car-desc-input" rows="3" placeholder="Tell guests about your car..." required></textarea>
        </div>

        <div style="margin-top: var(--space-6); display: flex; gap: var(--space-4);">
          <button type="button" class="btn btn-secondary" onclick="switchHostTab('listings')" style="flex: 1;">Cancel</button>
          <button type="submit" class="btn btn-primary btn-lg" style="flex: 2;" id="submit-car-btn">
            🚗 List My Car
          </button>
        </div>
      </form>
    </div>
  `;
}

function handleAddCar(event) {
  event.preventDefault();

  const name = document.getElementById('car-name-input')?.value;
  const brand = document.getElementById('car-brand-input')?.value;
  const year = document.getElementById('car-year-input')?.value;
  const type = document.getElementById('car-type-input')?.value;
  const pricePerDay = parseInt(document.getElementById('car-price-input')?.value || 0);

  const emojis = { hatchback: '🚗', sedan: '🚘', suv: '🚙', luxury: '🏎️' };

  const listing = {
    id: 'L' + Date.now(),
    name,
    brand,
    year,
    type,
    pricePerDay,
    emoji: emojis[type] || '🚗',
    active: true,
    listedAt: new Date().toISOString(),
  };

  AppState.hostListings = AppState.hostListings || [];
  AppState.hostListings.push(listing);
  saveState();

  showToast('success', 'Car Listed!', `${name} has been listed successfully. Our team will verify it within 24 hours.`);
  switchHostTab('listings');
}

function switchHostTab(tab) {
  AppState.hostTab = tab;
  renderPage(renderHostDashboardPage);
}

function toggleListing(id) {
  const listing = (AppState.hostListings || []).find(l => l.id === id);
  if (listing) {
    listing.active = !listing.active;
    saveState();
    showToast('info', listing.active ? 'Listing Activated' : 'Listing Paused', `${listing.name} is now ${listing.active ? 'active' : 'paused'}`);
  }
}

function removeListing(id) {
  AppState.hostListings = (AppState.hostListings || []).filter(l => l.id !== id);
  saveState();
  showToast('info', 'Listing Removed', 'Car has been removed from your listings');
  renderPage(renderHostDashboardPage);
}

function initHostPage() {
  initScrollReveal();
}
