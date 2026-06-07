// ========================================
// DriveEase — Search Page (ZoomCar-Style)
// ========================================

function renderSearchPage() {
  const city = AppState.selectedCity || 'bangalore';
  const cityName = AppData.CITIES.find(c => c.id === city)?.name || 'Bangalore';

  return `
    <div class="search-page">
      <!-- Sticky Search Header -->
      <div class="search-header">
        <div class="container">
          <div class="search-header-inner">
            <div class="search-location" onclick="openCityPicker()" style="cursor: pointer;">
              📍 <span id="search-city-name">${cityName}</span> <span style="color: var(--color-text-muted); font-size: var(--text-xs);">▾</span>
            </div>
            <div class="search-dates">
              <div class="search-date-box" onclick="openHomeDatePicker('pickup')">
                <div class="date">${getShortDate('pickup')}</div>
                <div class="time">${getShortTime('pickup')}</div>
              </div>
              <span style="color: var(--color-text-muted);">→</span>
              <div class="search-date-box" onclick="openHomeDatePicker('dropoff')">
                <div class="date">${getShortDate('dropoff')}</div>
                <div class="time">${getShortTime('dropoff')}</div>
              </div>
            </div>
            <div style="margin-left: var(--space-4);">
              <select class="select" style="min-width: 150px;" id="search-sort" onchange="applySearchFilters()">
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="search-layout">
          <!-- Left Sidebar Filters -->
          <div class="search-sidebar" id="search-filters-sidebar">
            <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-6);">Filters</h3>

            <!-- Search -->
            <div class="filter-section">
              <input type="text" class="input" placeholder="🔍 Search for model, features..." id="search-query" oninput="applySearchFilters()">
            </div>

            <!-- Distance -->
            <div class="filter-section">
              <div class="filter-title" onclick="toggleFilterSection(this)">
                Distance <span class="toggle-icon">▴</span>
              </div>
              <div class="filter-content">
                <input type="range" class="range-slider" min="0" max="100" value="50" id="filter-distance" oninput="updateDistanceLabel(this.value)">
                <div class="filter-range-labels">
                  <span>Near</span>
                  <span id="distance-label">50 km</span>
                  <span>Far</span>
                </div>
              </div>
            </div>

            <!-- Car Type -->
            <div class="filter-section">
              <div class="filter-title" onclick="toggleFilterSection(this)">
                Car Type <span class="toggle-icon">▴</span>
              </div>
              <div class="filter-content">
                ${['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'].map(type => `
                  <label class="filter-option">
                    <input type="checkbox" value="${type.toLowerCase()}" class="filter-type" onchange="applySearchFilters()">
                    <span>${type}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Fuel Type -->
            <div class="filter-section">
              <div class="filter-title" onclick="toggleFilterSection(this)">
                Fuel Type <span class="toggle-icon">▴</span>
              </div>
              <div class="filter-content">
                ${['Petrol', 'Diesel', 'Electric', 'CNG'].map(fuel => `
                  <label class="filter-option">
                    <input type="checkbox" value="${fuel}" class="filter-fuel" onchange="applySearchFilters()">
                    <span>${fuel}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Transmission -->
            <div class="filter-section">
              <div class="filter-title" onclick="toggleFilterSection(this)">
                Transmission <span class="toggle-icon">▴</span>
              </div>
              <div class="filter-content">
                ${['Automatic', 'Manual'].map(t => `
                  <label class="filter-option">
                    <input type="checkbox" value="${t}" class="filter-transmission" onchange="applySearchFilters()">
                    <span>${t}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Total Price Range -->
            <div class="filter-section">
              <div class="filter-title" onclick="toggleFilterSection(this)">
                Total Price <span class="toggle-icon">▴</span>
              </div>
              <div class="filter-content">
                <input type="range" class="range-slider" min="500" max="25000" value="25000" step="500" id="filter-max-price" oninput="updatePriceLabel(this.value); applySearchFilters()">
                <div class="filter-range-labels">
                  <span>₹500</span>
                  <span id="price-label">₹25,000</span>
                </div>
              </div>
            </div>

            <!-- Seats -->
            <div class="filter-section">
              <div class="filter-title" onclick="toggleFilterSection(this)">
                Seating Capacity <span class="toggle-icon">▴</span>
              </div>
              <div class="filter-content">
                ${['4 Seats', '5 Seats', '6+ Seats', '7+ Seats'].map(s => `
                  <label class="filter-option">
                    <input type="checkbox" value="${s.split(' ')[0]}" class="filter-seats" onchange="applySearchFilters()">
                    <span>${s}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <button class="btn btn-secondary btn-full" onclick="clearAllFilters()" style="margin-top: var(--space-2);">
              Clear All Filters
            </button>
          </div>

          <!-- Search Results -->
          <div class="search-results" id="search-results">
            <!-- Filter Chips -->
            <div class="filter-chips" style="margin-bottom: var(--space-4);">
              <button class="filter-chip" onclick="toggleFilterChip(this, 'delivery')">🏠 Home Delivery</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, 'professional')">⭐ Professional Host</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, 'guest-fav')">🏆 Guest Favourite</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, 'suv')">🚙 SUV</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, '0-10km')">🚶 0-10 km</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, '2020+')">📅 Model 2020+</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, '6-seater')">💺 6/7 Seater</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, 'automatic')">⚙️ Automatic</button>
              <button class="filter-chip" onclick="toggleFilterChip(this, '4.5+')">⭐ 4.5+ Rated</button>
            </div>

            <div class="search-results-header">
              <span class="search-results-count" id="results-count">Showing 0 cars</span>
            </div>

            <div class="car-grid" id="search-car-grid">
              <!-- Cars loaded via JS -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initSearchPage() {
  applySearchFilters();
}

function getShortDate(mode) {
  const d = mode === 'pickup' 
    ? (AppState.pickupDate ? new Date(AppState.pickupDate) : new Date())
    : (AppState.dropoffDate ? new Date(AppState.dropoffDate) : (() => { const dd = new Date(); dd.setDate(dd.getDate() + 2); return dd; })());
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function getShortTime(mode) {
  const d = mode === 'pickup'
    ? (AppState.pickupDate ? new Date(AppState.pickupDate) : new Date())
    : (AppState.dropoffDate ? new Date(AppState.dropoffDate) : (() => { const dd = new Date(); dd.setDate(dd.getDate() + 2); return dd; })());
  
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:00 ${ampm}`;
}

function applySearchFilters() {
  let cars = [...AppData.CARS];

  // City filter
  const city = AppState.selectedCity || 'bangalore';
  const cityMatches = cars.filter(c => c.city === city);
  if (cityMatches.length > 0) cars = cityMatches;

  // Search query
  const query = document.getElementById('search-query')?.value?.toLowerCase() || '';
  if (query) {
    cars = cars.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.type.toLowerCase().includes(query) ||
      c.fuel.toLowerCase().includes(query) ||
      c.transmission.toLowerCase().includes(query)
    );
  }

  // Type filter
  const types = [...document.querySelectorAll('.filter-type:checked')].map(cb => cb.value);
  if (types.length) cars = cars.filter(c => types.includes(c.type));

  // Fuel filter
  const fuels = [...document.querySelectorAll('.filter-fuel:checked')].map(cb => cb.value);
  if (fuels.length) cars = cars.filter(c => fuels.includes(c.fuel));

  // Transmission filter
  const trans = [...document.querySelectorAll('.filter-transmission:checked')].map(cb => cb.value);
  if (trans.length) cars = cars.filter(c => trans.includes(c.transmission));

  // Max price
  const maxPrice = parseInt(document.getElementById('filter-max-price')?.value || '25000');
  cars = cars.filter(c => c.pricePerDay <= maxPrice);

  // Sort
  const sort = document.getElementById('search-sort')?.value || 'relevance';
  switch (sort) {
    case 'price-low': cars.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
    case 'price-high': cars.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
    case 'rating': cars.sort((a, b) => b.rating - a.rating); break;
    case 'distance': cars.sort(() => Math.random() - 0.5); break;
    default: cars.sort((a, b) => b.trips - a.trips);
  }

  // Render
  const grid = document.getElementById('search-car-grid');
  const count = document.getElementById('results-count');
  if (!grid) return;

  if (cars.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1;" class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No cars found</h3>
        <p>Try adjusting your filters or searching in a different city.</p>
        <button class="btn btn-primary" style="margin-top: var(--space-4);" onclick="clearAllFilters()">Clear Filters</button>
      </div>
    `;
  } else {
    grid.innerHTML = cars.map(c => renderCarCardHTML(c)).join('');
  }

  if (count) count.textContent = `Showing ${cars.length} cars`;
}

function updateDistanceLabel(val) {
  const el = document.getElementById('distance-label');
  if (el) el.textContent = `${val} km`;
}

function updatePriceLabel(val) {
  const el = document.getElementById('price-label');
  if (el) el.textContent = `₹${parseInt(val).toLocaleString()}`;
}

function toggleFilterSection(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  if (!content) return;

  if (content.style.display === 'none') {
    content.style.display = 'block';
    if (icon) icon.textContent = '▴';
  } else {
    content.style.display = 'none';
    if (icon) icon.textContent = '▾';
  }
}

function toggleFilterChip(chip, filter) {
  chip.classList.toggle('active');
  // Quick filter logic
  if (filter === 'suv') {
    const cb = document.querySelector('.filter-type[value="suv"]');
    if (cb) cb.checked = chip.classList.contains('active');
  } else if (filter === 'automatic') {
    const cb = document.querySelector('.filter-transmission[value="Automatic"]');
    if (cb) cb.checked = chip.classList.contains('active');
  }
  applySearchFilters();
}

function clearAllFilters() {
  document.querySelectorAll('.filter-type, .filter-fuel, .filter-transmission, .filter-seats').forEach(cb => cb.checked = false);
  document.querySelectorAll('.filter-chip.active').forEach(c => c.classList.remove('active'));
  const q = document.getElementById('search-query');
  if (q) q.value = '';
  const mp = document.getElementById('filter-max-price');
  if (mp) mp.value = '25000';
  updatePriceLabel('25000');
  applySearchFilters();
}
