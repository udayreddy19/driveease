// ========================================
// DriveEase — Search Bar Component
// ========================================

function renderSearchBar(options = {}) {
  const { compact = false, city = '', pickupDate = '', dropoffDate = '' } = options;

  if (compact) {
    return `
      <div class="hero-search" style="margin-bottom: var(--space-6);">
        <div class="hero-search-row" style="grid-template-columns: 1fr 1fr 1fr 1fr auto;">
          <div class="hero-search-field">
            <label for="search-city">City</label>
            <select class="input select" id="search-city" onchange="handleSearchFilter()">
              <option value="">All Cities</option>
              ${AppData.CITIES.map(c => `<option value="${c.id}" ${city === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="hero-search-field">
            <label for="search-type">Car Type</label>
            <select class="input select" id="search-type" onchange="handleSearchFilter()">
              <option value="">All Types</option>
              <option value="hatchback">Hatchback</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div class="hero-search-field">
            <label for="search-pickup-date">Pickup Date</label>
            <input type="date" class="input" id="search-pickup-date" value="${pickupDate}" onchange="handleSearchFilter()">
          </div>
          <div class="hero-search-field">
            <label for="search-dropoff-date">Drop-off Date</label>
            <input type="date" class="input" id="search-dropoff-date" value="${dropoffDate}" onchange="handleSearchFilter()">
          </div>
          <button class="btn btn-primary" onclick="handleSearchFilter()" id="search-btn" style="align-self: end;">
            🔍 Search
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="hero-search">
      <div class="hero-search-row">
        <div class="hero-search-field">
          <label for="hero-city">📍 City</label>
          <select class="input select" id="hero-city">
            <option value="">Select City</option>
            ${AppData.CITIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="hero-search-field">
          <label for="hero-pickup">📅 Pickup Date</label>
          <input type="date" class="input" id="hero-pickup" min="${getTodayDate()}">
        </div>
        <div class="hero-search-field">
          <label for="hero-dropoff">📅 Drop-off Date</label>
          <input type="date" class="input" id="hero-dropoff" min="${getTomorrowDate()}">
        </div>
        <button class="btn btn-primary btn-lg" onclick="handleHeroSearch()" id="hero-search-btn" style="align-self: end;">
          Search Cars →
        </button>
      </div>
    </div>
  `;
}

function handleHeroSearch() {
  const city = document.getElementById('hero-city')?.value || '';
  const pickup = document.getElementById('hero-pickup')?.value || '';
  const dropoff = document.getElementById('hero-dropoff')?.value || '';

  let query = '/search';
  const params = [];
  if (city) params.push(`city=${city}`);
  if (pickup) params.push(`pickup=${pickup}`);
  if (dropoff) params.push(`dropoff=${dropoff}`);
  if (params.length) query += '?' + params.join('&');

  navigateTo(query);
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

// ---- Date Formatting Utilities ----
function getShortDate(type) {
  const d = type === 'pickup' ? (AppState.pickupDate || new Date()) : (AppState.dropoffDate || new Date(Date.now() + 86400000 * 2));
  const date = new Date(d);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
}

function getShortTime(type) {
  const d = type === 'pickup' ? (AppState.pickupDate || new Date()) : (AppState.dropoffDate || new Date(Date.now() + 86400000 * 2));
  const date = new Date(d);
  return date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatSearchDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}

