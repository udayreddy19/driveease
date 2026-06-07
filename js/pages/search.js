// ========================================
// DriveEase — Search Page
// ========================================

let searchFilters = {
  city: '',
  type: '',
  transmission: '',
  fuel: '',
  seats: '',
  minPrice: 0,
  maxPrice: 10000,
  sort: 'rating',
};

function renderSearchPage(params = {}) {
  // Apply URL params
  if (params.city) searchFilters.city = params.city;
  if (params.type) searchFilters.type = params.type;
  if (params.fuel) searchFilters.fuel = params.fuel;

  const filteredCars = getFilteredCars();

  return `
    <div class="search-page">
      <div class="container">
        ${renderSearchBar({ compact: true, city: searchFilters.city })}

        <div class="search-layout">
          <!-- Sidebar Filters -->
          <aside class="search-sidebar" id="search-sidebar">
            <!-- Car Type -->
            <div class="filter-group">
              <div class="filter-group-title">Car Type</div>
              <div class="filter-options">
                ${['hatchback', 'sedan', 'suv', 'luxury'].map(type => `
                  <button class="filter-chip ${searchFilters.type === type ? 'active' : ''}"
                    onclick="setFilter('type', '${type}')" id="filter-type-${type}">
                    ${type === 'hatchback' ? '🚗' : type === 'sedan' ? '🚘' : type === 'suv' ? '🚙' : '🏎️'}
                    ${type.charAt(0).toUpperCase() + type.slice(1)}
                    <span style="margin-left: auto; font-size: var(--text-xs); opacity: 0.6;">
                      ${AppData.CARS.filter(c => c.type === type).length}
                    </span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Transmission -->
            <div class="filter-group">
              <div class="filter-group-title">Transmission</div>
              <div class="filter-options">
                ${['manual', 'automatic'].map(t => `
                  <button class="filter-chip ${searchFilters.transmission === t ? 'active' : ''}"
                    onclick="setFilter('transmission', '${t}')" id="filter-trans-${t}">
                    ⚙️ ${t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Fuel Type -->
            <div class="filter-group">
              <div class="filter-group-title">Fuel Type</div>
              <div class="filter-options">
                ${['petrol', 'diesel', 'electric', 'hybrid'].map(f => `
                  <button class="filter-chip ${searchFilters.fuel === f ? 'active' : ''}"
                    onclick="setFilter('fuel', '${f}')" id="filter-fuel-${f}">
                    ${f === 'electric' ? '⚡' : f === 'hybrid' ? '🔋' : '⛽'} ${f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Seats -->
            <div class="filter-group">
              <div class="filter-group-title">Seats</div>
              <div class="filter-options">
                ${['4', '5', '7'].map(s => `
                  <button class="filter-chip ${searchFilters.seats === s ? 'active' : ''}"
                    onclick="setFilter('seats', '${s}')" id="filter-seats-${s}">
                    👥 ${s}${s === '7' ? '+' : ''} Seats
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Price Range -->
            <div class="filter-group">
              <div class="filter-group-title">Price Range (per hour)</div>
              <div style="padding: 0 var(--space-2);">
                <input type="range" class="range-slider" id="price-slider"
                  min="50" max="1000" value="${searchFilters.maxPrice}"
                  oninput="updatePriceFilter(this.value)">
                <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: var(--space-2);">
                  <span>₹50</span>
                  <span id="price-display">Up to ₹${searchFilters.maxPrice}/hr</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>

            <!-- Clear Filters -->
            <button class="btn btn-ghost btn-full" onclick="clearFilters()" id="clear-filters-btn" style="margin-top: var(--space-2);">
              ✕ Clear All Filters
            </button>
          </aside>

          <!-- Results -->
          <main>
            <div class="search-results-header">
              <div>
                <h3 style="margin-bottom: var(--space-1);">
                  ${searchFilters.city ? AppData.CITIES.find(c => c.id === searchFilters.city)?.name + ' — ' : ''}Available Cars
                </h3>
                <span class="search-results-count" id="results-count">${filteredCars.length} cars found</span>
              </div>
              <div class="search-sort">
                <label for="sort-select">Sort by:</label>
                <select class="select" id="sort-select" onchange="setSort(this.value)" style="width: 160px;">
                  <option value="rating" ${searchFilters.sort === 'rating' ? 'selected' : ''}>Top Rated</option>
                  <option value="price-low" ${searchFilters.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-high" ${searchFilters.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="popularity" ${searchFilters.sort === 'popularity' ? 'selected' : ''}>Most Popular</option>
                </select>
              </div>
            </div>

            ${filteredCars.length > 0 ? `
              <div class="cars-grid" id="cars-grid">
                ${filteredCars.map(car => renderCarCard(car)).join('')}
              </div>
            ` : `
              <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No Cars Found</h3>
                <p>Try adjusting your filters or search in a different city.</p>
                <button class="btn btn-primary" onclick="clearFilters()" style="margin-top: var(--space-6);">
                  Clear Filters
                </button>
              </div>
            `}
          </main>
        </div>
      </div>
    </div>
  `;
}

function getFilteredCars() {
  let cars = [...AppData.CARS];

  if (searchFilters.city) cars = cars.filter(c => c.city === searchFilters.city);
  if (searchFilters.type) cars = cars.filter(c => c.type === searchFilters.type);
  if (searchFilters.transmission) cars = cars.filter(c => c.transmission === searchFilters.transmission);
  if (searchFilters.fuel) cars = cars.filter(c => c.fuel === searchFilters.fuel);
  if (searchFilters.seats) cars = cars.filter(c => c.seats >= parseInt(searchFilters.seats));
  if (searchFilters.maxPrice < 10000) cars = cars.filter(c => c.pricePerHour <= searchFilters.maxPrice);

  // Sort
  switch (searchFilters.sort) {
    case 'price-low': cars.sort((a, b) => a.pricePerHour - b.pricePerHour); break;
    case 'price-high': cars.sort((a, b) => b.pricePerHour - a.pricePerHour); break;
    case 'rating': cars.sort((a, b) => b.rating - a.rating); break;
    case 'popularity': cars.sort((a, b) => b.trips - a.trips); break;
  }

  return cars;
}

function setFilter(key, value) {
  searchFilters[key] = searchFilters[key] === value ? '' : value;
  refreshSearchResults();
}

function setSort(value) {
  searchFilters.sort = value;
  refreshSearchResults();
}

function updatePriceFilter(value) {
  searchFilters.maxPrice = parseInt(value);
  const display = document.getElementById('price-display');
  if (display) display.textContent = `Up to ₹${value}/hr`;
  refreshSearchResults();
}

function clearFilters() {
  searchFilters = {
    city: '',
    type: '',
    transmission: '',
    fuel: '',
    seats: '',
    minPrice: 0,
    maxPrice: 10000,
    sort: 'rating',
  };
  renderPage(renderSearchPage);
}

function refreshSearchResults() {
  const filteredCars = getFilteredCars();
  const grid = document.getElementById('cars-grid');
  const count = document.getElementById('results-count');

  if (grid) {
    if (filteredCars.length > 0) {
      grid.innerHTML = filteredCars.map(car => renderCarCard(car)).join('');
    } else {
      grid.outerHTML = `
        <div class="empty-state" id="cars-grid">
          <div class="empty-state-icon">🔍</div>
          <h3>No Cars Found</h3>
          <p>Try adjusting your filters or search in a different city.</p>
          <button class="btn btn-primary" onclick="clearFilters()" style="margin-top: var(--space-6);">
            Clear Filters
          </button>
        </div>
      `;
    }
  }

  if (count) count.textContent = `${filteredCars.length} cars found`;

  // Update active states on filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const onclick = chip.getAttribute('onclick');
    if (onclick) {
      const match = onclick.match(/setFilter\('(\w+)',\s*'(\w+)'\)/);
      if (match) {
        const [, key, val] = match;
        chip.classList.toggle('active', searchFilters[key] === val);
      }
    }
  });
}

function handleSearchFilter() {
  const city = document.getElementById('search-city')?.value || '';
  const type = document.getElementById('search-type')?.value || '';

  searchFilters.city = city;
  if (type) searchFilters.type = type;

  refreshSearchResults();
}

function initSearchPage() {
  // Set initial values from URL params
  const citySelect = document.getElementById('search-city');
  if (citySelect && searchFilters.city) {
    citySelect.value = searchFilters.city;
  }

  const typeSelect = document.getElementById('search-type');
  if (typeSelect && searchFilters.type) {
    typeSelect.value = searchFilters.type;
  }
}
