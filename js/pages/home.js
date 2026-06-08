// ========================================
// DriveEase — Homepage (ZoomCar-Style)
// ========================================

function renderHomePage() {
  return `
    <!-- Hero with Search Card -->
    <section class="hero">
      <div class="container">
        <div class="hero-layout">
          <div class="hero-text animate-fade-in-up">
            <p class="subtitle">Looking for Best Car Rentals?</p>
            <h1>Book Self-Drive<br>Cars Across India</h1>
            <p style="margin-top: var(--space-4);">Choose from 25,000+ verified cars. Unlimited kms. 24/7 roadside assistance.</p>
          </div>

          <!-- Search Card -->
          <div class="search-card animate-fade-in-up animate-delay-2">
            <div class="search-card-tabs">
              <button class="search-card-tab active">Daily Drives</button>
              <button class="search-card-tab" onclick="navigateTo('/subscription')">Subscription</button>
              <button class="search-card-tab" onclick="showToast('info', 'Coming Soon', 'Weekday pass launching soon!')">Weekday Pass <span style="background: var(--color-accent); color: white; font-size: 10px; padding: 1px 6px; border-radius: var(--radius-full); font-weight: 700;">NEW</span></button>
            </div>

            <div class="search-card-field">
              <label>City</label>
              <div class="field-value" onclick="openCityPicker()">
                <span id="home-city">${AppState.selectedCity || 'Bangalore'}</span>
                <span style="color: var(--color-text-muted);">▾</span>
              </div>
            </div>

            <div class="search-card-field">
              <label>Location</label>
              <div class="field-value" onclick="openLocationPicker()">
                <span id="home-location" style="font-size: var(--text-sm); ${!AppState.selectedLocation ? 'color: var(--color-text-muted);' : ''}">${AppState.selectedLocation || 'Select pickup location'}</span>
              </div>
            </div>

            <div class="search-card-dates">
              <div class="search-card-field" style="margin-bottom: 0;">
                <label>Trip Starts</label>
                <div class="field-value" id="home-pickup-trigger" onclick="openHomeDatePicker('pickup')">
                  <span id="home-pickup-display">${formatSearchDate(AppState.pickupDate) || getDefaultPickup()}</span>
                </div>
              </div>
              <div class="search-card-field" style="margin-bottom: 0;">
                <label>Trip Ends</label>
                <div class="field-value" id="home-dropoff-trigger" onclick="openHomeDatePicker('dropoff')">
                  <span id="home-dropoff-display">${formatSearchDate(AppState.dropoffDate) || getDefaultDropoff()}</span>
                </div>
              </div>
            </div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">All times are shown in IST (UTC+5:30)</div>

            <label class="filter-option" style="margin-top: var(--space-3); padding: 0;">
              <input type="checkbox" id="home-delivery-check">
              <span style="font-size: var(--text-sm); color: var(--color-text-secondary);">Delivery & Pick-up, from anywhere</span>
            </label>

            <button class="search-card-btn" onclick="handleHomeSearch()">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- USP Banner -->
    <section style="background: white; border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="usp-banner animate-fade-in-up">
          <div class="usp-item">
            <div class="usp-icon">🚗</div>
            <div class="usp-title">25,000+</div>
            <div class="usp-desc">High-quality car options</div>
          </div>
          <div class="usp-item">
            <div class="usp-icon" style="background: var(--color-accent-subtle);">∞</div>
            <div class="usp-title" style="color: var(--color-accent);">Unlimited kms</div>
            <div class="usp-desc">Drive and stop anywhere</div>
          </div>
          <div class="usp-item">
            <div class="usp-icon" style="background: var(--color-success-bg);">🛡️</div>
            <div class="usp-title" style="color: var(--color-success);">100% Protection</div>
            <div class="usp-desc">Safe, hassle-free drives</div>
          </div>
          <div class="usp-item">
            <div class="usp-icon" style="background: var(--color-warm-subtle);">🎧</div>
            <div class="usp-title" style="color: var(--color-warm);">24/7 Support</div>
            <div class="usp-desc">Dedicated assistance</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Cars Carousel -->
    <section class="section" style="background: white;">
      <div class="container">
        <h2 class="section-title">Top Cars in ${AppState.selectedCity || 'Bangalore'}</h2>
        <p class="section-subtitle">Most booked self-drive cars this month</p>
        <div class="car-grid" id="top-cars-grid">
          ${renderTopCars()}
        </div>
        <div style="text-align: center; margin-top: var(--space-8);">
          <a href="#/search" class="btn btn-primary btn-lg">BROWSE ALL CARS</a>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">How DriveEase Works</h2>
        <p class="section-subtitle">Book a self-drive car in 3 easy steps</p>
        <div class="how-it-works">
          <div class="how-step animate-fade-in-up">
            <div class="how-step-number">1</div>
            <h4>Choose Your Car</h4>
            <p>Browse from 25,000+ verified cars. Filter by type, price, rating, and features.</p>
          </div>
          <div class="how-step animate-fade-in-up animate-delay-1">
            <div class="how-step-number">2</div>
            <h4>Book & Pay</h4>
            <p>Select your dates, pick a payment method, and confirm your booking instantly.</p>
          </div>
          <div class="how-step animate-fade-in-up animate-delay-2">
            <div class="how-step-number">3</div>
            <h4>Drive Away</h4>
            <p>Pick up your car at the location. Enjoy unlimited kilometers and 24/7 support.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Browse by Type -->
    <section class="section" style="background: white;">
      <div class="container">
        <h2 class="section-title">Browse by Category</h2>
        <p class="section-subtitle">Find the perfect car for every occasion</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-4);">
          ${renderCategoryCards()}
        </div>
      </div>
    </section>

    <!-- CTA Banner — Become a Host -->
    <section class="section">
      <div class="container">
        <div class="cta-banner animate-fade-in-up">
          <h2>Earn up to ₹50,000/month</h2>
          <p style="max-width: 500px; margin-left: auto; margin-right: auto;">List your car on DriveEase and start earning. Join 15,000+ hosts across India.</p>
          <a href="#/host" class="btn btn-lg" style="background: white; color: var(--color-primary); font-weight: 700;">Become a Host →</a>
        </div>
      </div>
    </section>

    <!-- Cities -->
    <section class="section" style="background: white;">
      <div class="container">
        <h2 class="section-title">Available in 50+ Cities</h2>
        <p class="section-subtitle">Self-drive car rentals across India</p>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center;">
          ${AppData.CITIES.map(city => `
            <button class="filter-chip ${(AppState.selectedCity || 'bangalore') === city.id ? 'active' : ''}" onclick="selectCity('${city.id}')">
              ${city.emoji} ${city.name}
            </button>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">What Our Guests Say</h2>
        <p class="section-subtitle">Real reviews from real drivers</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-6);">
          ${renderTestimonials()}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" style="background: white;">
      <div class="container container-sm">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Everything you need to know</p>
        <div id="faq-list">
          ${renderFAQs()}
        </div>
      </div>
    </section>
  `;
}

// ---- Render Helpers ----

function renderTopCars() {
  const city = AppState.selectedCity || 'bangalore';
  const cars = AppData.CARS.filter(c => c.city === city).sort((a, b) => b.trips - a.trips).slice(0, 6);
  if (cars.length === 0) {
    return AppData.CARS.sort((a, b) => b.trips - a.trips).slice(0, 6).map(c => renderCarCardHTML(c)).join('');
  }
  return cars.map(c => renderCarCardHTML(c)).join('');
}

function renderCarCardHTML(car) {
  const isFav = AppState.favorites.includes(car.id);
  const cityName = AppData.CITIES.find(c => c.id === car.city)?.name || car.city;
  const distance = (Math.random() * 15 + 1).toFixed(1);
  const pricePerHr = Math.round(car.pricePerDay / 24);
  const ratingClass = car.rating >= 4.5 ? 'excellent' : 'good';

  return `
    <div class="car-card" onclick="navigateTo('/car/${car.id}')">
      <div class="car-card-image">
        <div class="car-card-emoji">${car.emoji}</div>
        <button class="car-card-fav ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${car.id})" id="fav-btn-${car.id}">
          ${isFav ? '❤️' : '🤍'}
        </button>
        ${car.host === 'Professional Host' ? `
          <div class="car-card-badge">
            <span class="badge badge-warning" style="font-size: 10px;">⭐ Professional Host</span>
          </div>
        ` : ''}
        <div class="car-card-rating">
          <span class="rating-badge ${ratingClass}">★ ${car.rating} (${car.trips})</span>
        </div>
      </div>
      <div class="car-card-body">
        <div class="car-card-title">${car.name}</div>
        <div class="car-card-specs">
          <span>${car.transmission}</span>
          <span>${car.fuel}</span>
          <span>${car.seats} Seats</span>
        </div>
      </div>
      <div class="car-card-footer">
        <div class="car-card-distance">📍 ${distance} km away</div>
        <div class="car-card-price">
          <div><span class="amount">₹${pricePerHr}</span> <span class="unit">/hr</span></div>
          <div class="total">₹${car.pricePerDay.toLocaleString()} excl. fees</div>
        </div>
      </div>
    </div>
  `;
}

function renderCategoryCards() {
  const categories = [
    { type: 'hatchback', emoji: '🚗', label: 'Hatchbacks', desc: 'Starting ₹49/hr', count: AppData.CARS.filter(c => c.type === 'hatchback').length },
    { type: 'sedan', emoji: '🚘', label: 'Sedans', desc: 'Starting ₹69/hr', count: AppData.CARS.filter(c => c.type === 'sedan').length },
    { type: 'suv', emoji: '🚙', label: 'SUVs', desc: 'Starting ₹89/hr', count: AppData.CARS.filter(c => c.type === 'suv').length },
    { type: 'luxury', emoji: '🏎️', label: 'Luxury', desc: 'Starting ₹199/hr', count: AppData.CARS.filter(c => c.type === 'luxury').length },
    { type: 'muv', emoji: '🚐', label: 'MUVs', desc: 'Starting ₹79/hr', count: AppData.CARS.filter(c => c.type === 'muv').length },
    { type: 'electric', emoji: '⚡', label: 'Electric', desc: 'Starting ₹99/hr', count: AppData.CARS.filter(c => c.fuel === 'Electric').length },
  ];

  return categories.map(cat => `
    <a href="#/search?type=${cat.type}" style="text-decoration: none;">
      <div class="card" style="padding: var(--space-6); text-align: center; cursor: pointer;">
        <div style="font-size: 2.5rem; margin-bottom: var(--space-3);">${cat.emoji}</div>
        <h4 style="font-size: var(--text-base); margin-bottom: 2px;">${cat.label}</h4>
        <p style="font-size: var(--text-xs); color: var(--color-text-muted);">${cat.desc}</p>
        <p style="font-size: var(--text-xs); color: var(--color-primary); margin-top: var(--space-2); font-weight: 600;">${cat.count} cars available</p>
      </div>
    </a>
  `).join('');
}

function renderTestimonials() {
  const testimonials = [
    { name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'Incredible experience! The car was in perfect condition, and the booking was seamless. Will definitely use again.' },
    { name: 'Amit Patel', city: 'Bangalore', rating: 5, text: 'Best self-drive rental in India. The unlimited kms feature is a game changer for road trips. Highly recommend!' },
    { name: 'Sneha Reddy', city: 'Hyderabad', rating: 4, text: 'Very professional service. Pickup was smooth and the car was exactly as described. Great value for money.' },
  ];

  return testimonials.map(t => `
    <div class="card" style="padding: var(--space-6);">
      <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);">
        <div class="avatar">${t.name.split(' ').map(n => n[0]).join('')}</div>
        <div>
          <div style="font-weight: 600; font-size: var(--text-sm);">${t.name}</div>
          <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${t.city}</div>
        </div>
        <div style="margin-left: auto; color: var(--color-warning);">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      </div>
      <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: var(--leading-relaxed);">"${t.text}"</p>
    </div>
  `).join('');
}

function renderFAQs() {
  const faqs = [
    { q: 'What documents do I need to rent a car?', a: 'You need a valid driving license (original), Aadhaar card or passport for identity proof, and a credit/debit card for the security deposit.' },
    { q: 'Is there a km limit?', a: 'No! DriveEase offers unlimited kilometers on all bookings. Drive as far as you want without any extra charges.' },
    { q: 'What if the car breaks down?', a: 'We provide 24/7 roadside assistance. Call our support team and we\'ll send help immediately. You can also get a replacement car if needed.' },
    { q: 'Can I cancel my booking?', a: 'Yes, free cancellation up to 6 hours before the trip. Cancellations within 6 hours may incur a fee. Full refund for cancellations 24+ hours before.' },
    { q: 'How does the security deposit work?', a: 'A refundable deposit of ₹500-₹2000 is required. It\'s automatically refunded within 2-3 business days after the trip, provided there\'s no damage.' },
  ];

  return faqs.map((faq, i) => `
    <div class="card" style="margin-bottom: var(--space-3); cursor: pointer;" onclick="toggleFAQ(${i})">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-5);">
        <h4 style="font-size: var(--text-sm); font-weight: 600;">${faq.q}</h4>
        <span id="faq-icon-${i}" style="color: var(--color-text-muted); transition: transform 0.3s;">▾</span>
      </div>
      <div id="faq-answer-${i}" style="display: none; padding: 0 var(--space-5) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); line-height: var(--leading-relaxed);">
        ${faq.a}
      </div>
    </div>
  `).join('');
}

// ---- Actions ----

function initHomePage() {
  // Nothing special needed for now
}

function selectCity(cityId) {
  AppState.selectedCity = cityId;
  const cityName = AppData.CITIES.find(c => c.id === cityId)?.name || cityId;
  const el = document.getElementById('home-city');
  if (el) el.textContent = cityName;

  // Update top cars
  const grid = document.getElementById('top-cars-grid');
  if (grid) grid.innerHTML = renderTopCars();

  // Update section title
  document.querySelectorAll('.section-title').forEach(t => {
    if (t.textContent.includes('Top Cars in')) t.textContent = `Top Cars in ${cityName}`;
  });

  showToast('info', 'City Updated', `Showing cars in ${cityName}`);
}

function openCityPicker() {
  const existing = document.getElementById('city-picker-overlay');
  if (existing) existing.remove();

  const html = `
    <div class="modal-overlay" id="city-picker-overlay" onclick="if(event.target===this) document.getElementById('city-picker-overlay').remove()">
      <div class="modal" style="max-width: 500px;">
        <div class="modal-header">
          <h3>Select City</h3>
          <button class="modal-close" onclick="document.getElementById('city-picker-overlay').remove()">✕</button>
        </div>
        <div class="modal-body">
          <input type="text" class="input" placeholder="🔍 Search city..." oninput="filterCities(this.value)" style="margin-bottom: var(--space-4);">
          <div id="city-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); max-height: 400px; overflow-y: auto;">
            ${AppData.CITIES.map(city => `
              <button class="filter-chip ${(AppState.selectedCity || 'bangalore') === city.id ? 'active' : ''}" onclick="selectCity('${city.id}'); document.getElementById('city-picker-overlay').remove();" style="justify-content: flex-start; width: 100%;">
                ${city.emoji} ${city.name}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

function filterCities(query) {
  const lq = query.toLowerCase();
  document.querySelectorAll('#city-list .filter-chip').forEach(chip => {
    chip.style.display = chip.textContent.toLowerCase().includes(lq) ? '' : 'none';
  });
}

function openLocationPicker() {
  const locations = [
    'Indiranagar Club', 'Koramangala 4th Block', 'MG Road Metro Station', 'HSR Layout Sector 1',
    'Whitefield IT Park', 'Electronic City Phase 1', 'JP Nagar 6th Phase', 'Marathahalli Bridge',
    'Hebbal Flyover', 'Jayanagar 4th Block', 'Banashankari 2nd Stage', 'Yelahanka New Town',
  ];

  const existing = document.getElementById('location-picker-overlay');
  if (existing) existing.remove();

  const html = `
    <div class="modal-overlay" id="location-picker-overlay" onclick="if(event.target===this) document.getElementById('location-picker-overlay').remove()">
      <div class="modal" style="max-width: 500px;">
        <div class="modal-header">
          <h3>Select Location</h3>
          <button class="modal-close" onclick="document.getElementById('location-picker-overlay').remove()">✕</button>
        </div>
        <div class="modal-body">
          <input type="text" class="input" placeholder="🔍 Search for area, landmark..." style="margin-bottom: var(--space-4);">
          <div style="display: flex; flex-direction: column; gap: var(--space-1); max-height: 400px; overflow-y: auto;">
            ${locations.map(loc => `
              <button class="dashboard-sidebar-item" onclick="selectLocation('${loc}'); document.getElementById('location-picker-overlay').remove();">
                📍 ${loc}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

function selectLocation(loc) {
  AppState.selectedLocation = loc;
  const el = document.getElementById('home-location');
  if (el) {
    el.textContent = loc;
    el.style.color = '';
  }
}

function openHomeDatePicker(mode) {
  // Use our custom date picker
  if (typeof openDatePicker === 'function') {
    openDatePicker(mode, (pickup, dropoff) => {
      if (pickup) {
        AppState.pickupDate = pickup;
        const el = document.getElementById('home-pickup-display');
        if (el) el.textContent = formatSearchDate(pickup);
      }
      if (dropoff) {
        AppState.dropoffDate = dropoff;
        const el = document.getElementById('home-dropoff-display');
        if (el) el.textContent = formatSearchDate(dropoff);
      }
    });
  }
}

function handleHomeSearch() {
  const city = AppState.selectedCity || 'bangalore';
  navigateTo(`/search?city=${city}`);
}

function getDefaultPickup() {
  const d = new Date();
  d.setHours(d.getHours() + 2);
  d.setMinutes(0);
  return formatSearchDate(d.toISOString());
}

function getDefaultDropoff() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  d.setHours(d.getHours() + 2);
  d.setMinutes(0);
  return formatSearchDate(d.toISOString());
}

function formatSearchDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear().toString().slice(2);
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day} ${month}'${year}, ${hours} ${ampm}`;
}

function toggleFAQ(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer) return;

  if (answer.style.display === 'none') {
    answer.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    answer.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}
