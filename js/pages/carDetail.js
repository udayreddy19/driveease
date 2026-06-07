// ========================================
// DriveEase — Car Detail Page
// ========================================

function renderCarDetailPage(params = {}) {
  const carId = parseInt(params.id);
  const car = AppData.CARS.find(c => c.id === carId);

  if (!car) {
    return renderNotFoundPage();
  }

  const carReviews = AppData.REVIEWS.filter(r => r.carId === carId);
  const similarCars = AppData.CARS.filter(c => c.type === car.type && c.id !== car.id).slice(0, 3);
  const isFav = AppState.favorites.includes(car.id);

  return `
    <div class="car-detail-page">
      <div class="container">
        <!-- Breadcrumb -->
        <div style="margin-bottom: var(--space-6); display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-tertiary);">
          <a href="#/" style="color: var(--color-text-tertiary);">Home</a>
          <span>›</span>
          <a href="#/search" style="color: var(--color-text-tertiary);">Browse</a>
          <span>›</span>
          <span style="color: var(--color-text-primary);">${car.name}</span>
        </div>

        <!-- Gallery -->
        <div class="car-detail-gallery animate-fade-in">
          <div class="car-detail-main-img" style="background-color: ${car.color}10;">
            ${car.image
              ? `<img src="${car.image}" alt="${car.name}">`
              : `<span style="font-size: 8rem;">${car.emoji}</span>`
            }
            <button class="favorite-btn ${isFav ? 'active' : ''}" style="top: var(--space-5); right: var(--space-5); width: 48px; height: 48px; font-size: var(--text-xl);"
              onclick="toggleFavorite(${car.id})" id="detail-fav-btn">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <div class="car-detail-side-imgs">
            <div class="car-detail-side-img" style="background: linear-gradient(135deg, ${car.color}20, ${car.color}05);">
              <span style="font-size: 4rem;">🏎️</span>
            </div>
            <div class="car-detail-side-img" style="background: linear-gradient(135deg, ${car.color}15, ${car.color}05);">
              <span style="font-size: 4rem;">🪑</span>
            </div>
          </div>
        </div>

        <!-- Content Layout -->
        <div class="car-detail-layout" style="margin-top: var(--space-8);">
          <!-- Left: Info -->
          <div class="car-detail-info animate-fade-in-up">
            <!-- Title Section -->
            <div>
              <div class="car-detail-title-section">
                <div class="car-detail-title">
                  <h1>${car.name}</h1>
                  <div class="car-detail-meta">
                    <span class="badge badge-primary">${car.type.toUpperCase()}</span>
                    <span class="chip">⭐ ${car.rating} (${car.reviews} reviews)</span>
                    <span class="chip">🚗 ${car.trips}+ trips</span>
                  </div>
                </div>
              </div>
              <p style="margin-top: var(--space-4); font-size: var(--text-base);">${car.description}</p>
            </div>

            <!-- Specs -->
            <div>
              <h3 style="margin-bottom: var(--space-4);">Specifications</h3>
              <div class="car-detail-specs-grid">
                <div class="spec-card">
                  <div class="spec-card-icon">⚙️</div>
                  <div class="spec-card-value">${car.transmission}</div>
                  <div class="spec-card-label">Transmission</div>
                </div>
                <div class="spec-card">
                  <div class="spec-card-icon">⛽</div>
                  <div class="spec-card-value">${car.fuel}</div>
                  <div class="spec-card-label">Fuel Type</div>
                </div>
                <div class="spec-card">
                  <div class="spec-card-icon">👥</div>
                  <div class="spec-card-value">${car.seats}</div>
                  <div class="spec-card-label">Seats</div>
                </div>
                <div class="spec-card">
                  <div class="spec-card-icon">📊</div>
                  <div class="spec-card-value">${car.mileage}</div>
                  <div class="spec-card-label">Mileage</div>
                </div>
              </div>
            </div>

            <!-- Features -->
            <div>
              <h3 style="margin-bottom: var(--space-4);">Features</h3>
              <div class="car-features-grid">
                ${car.features.map(f => {
                  const feat = AppData.CAR_FEATURES[f];
                  return feat ? `
                    <div class="car-feature-item">
                      <span class="car-feature-icon">${feat.icon}</span>
                      ${feat.name}
                    </div>
                  ` : '';
                }).join('')}
              </div>
            </div>

            <!-- Host Info -->
            <div>
              <h3 style="margin-bottom: var(--space-4);">Hosted By</h3>
              <div style="display: flex; align-items: center; gap: var(--space-4); padding: var(--space-5); background: var(--gradient-card); border: var(--glass-border); border-radius: var(--radius-lg);">
                <div class="avatar avatar-lg">${car.host.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <h4 style="margin-bottom: var(--space-1);">${car.host.name}</h4>
                  <div style="display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary);">
                    <span>⭐ ${car.host.rating} rating</span>
                    <span>🚗 ${car.host.trips} trips</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews -->
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
                <h3>Reviews (${carReviews.length})</h3>
              </div>
              ${carReviews.length > 0 ? `
                <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                  ${carReviews.map(r => renderReviewCard(r)).join('')}
                </div>
              ` : `
                <div style="padding: var(--space-8); text-align: center; background: var(--gradient-card); border: var(--glass-border); border-radius: var(--radius-lg);">
                  <p style="color: var(--color-text-tertiary);">No reviews yet. Be the first to review this car!</p>
                </div>
              `}
            </div>

            <!-- Similar Cars -->
            ${similarCars.length > 0 ? `
              <div>
                <h3 style="margin-bottom: var(--space-4);">Similar Cars</h3>
                <div class="cars-grid" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));">
                  ${similarCars.map(c => renderCarCard(c)).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Right: Booking Sidebar -->
          <div class="booking-sidebar animate-fade-in-up delay-2">
            <div class="booking-card">
              <div class="booking-price-header">
                <span class="price-amount" style="font-size: var(--text-3xl);">₹${car.pricePerHour}</span>
                <span class="price-unit">/hour</span>
              </div>

              <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-4);">
                <div class="chip">₹${car.pricePerDay}/day</div>
                <div class="chip">₹${Math.round(car.pricePerDay * 6.5)}/week</div>
              </div>

              <div class="booking-form">
                ${renderDateTimePicker('detail-pickup', '📅 Pickup Date & Time')}
                ${renderDateTimePicker('detail-dropoff', '📅 Drop-off Date & Time')}

                <div class="input-group">
                  <label for="detail-location">📍 Pickup Location</label>
                  <select class="input select" id="detail-location">
                    <option value="hub">DriveEase Hub - ${AppData.CITIES.find(c => c.id === car.city)?.name || 'City Center'}</option>
                    <option value="airport">Airport Pickup (+₹200)</option>
                    <option value="delivery">Home Delivery (+₹300)</option>
                  </select>
                </div>

                <div class="booking-summary" id="detail-booking-summary">
                  <div class="booking-summary-row">
                    <span style="color: var(--color-text-secondary);">Base fare</span>
                    <span style="color: var(--color-text-primary);">Select dates</span>
                  </div>
                  <div class="booking-summary-row">
                    <span style="color: var(--color-text-secondary);">Insurance</span>
                    <span style="color: var(--color-text-primary);">Included</span>
                  </div>
                  <div class="booking-summary-row booking-summary-total">
                    <span>Total</span>
                    <span>-</span>
                  </div>
                </div>

                <button class="btn btn-primary btn-full btn-lg" onclick="handleBookNow(${car.id})" id="book-now-btn">
                  Book Now →
                </button>

                <p style="text-align: center; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-2);">
                  🔒 Free cancellation up to 6 hours before pickup
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleBookNow(carId) {
  if (!AppState.isLoggedIn) {
    openAuthModal('login');
    showToast('info', 'Login Required', 'Please login to book a car');
    return;
  }

  const pickup = document.getElementById('detail-pickup')?.value;
  const dropoff = document.getElementById('detail-dropoff')?.value;
  const location = document.getElementById('detail-location')?.value;

  AppState.currentBooking = {
    carId,
    pickup: pickup || '',
    dropoff: dropoff || '',
    location: location || 'hub',
    addons: [],
    step: 1,
  };

  saveState();
  navigateTo(`/booking/${carId}`);
}

function initCarDetailPage() {
  // Update booking summary on date change
  const pickupEl = document.getElementById('detail-pickup');
  const dropoffEl = document.getElementById('detail-dropoff');

  if (pickupEl) {
    pickupEl.addEventListener('change', updateDetailSummary);
  }
  if (dropoffEl) {
    dropoffEl.addEventListener('change', updateDetailSummary);
  }
}

function updateDetailSummary() {
  const pickup = document.getElementById('detail-pickup')?.value;
  const dropoff = document.getElementById('detail-dropoff')?.value;
  const summary = document.getElementById('detail-booking-summary');
  const carId = parseInt(window.location.hash.split('/').pop());
  const car = AppData.CARS.find(c => c.id === carId);

  if (!summary || !car || !pickup || !dropoff) return;

  const { hours, days } = calculateDuration(pickup, dropoff);
  const baseFare = days >= 1 ? car.pricePerDay * days : car.pricePerHour * hours;
  const locationSelect = document.getElementById('detail-location');
  const locationFee = locationSelect?.value === 'airport' ? 200 : locationSelect?.value === 'delivery' ? 300 : 0;
  const total = baseFare + locationFee;

  summary.innerHTML = `
    <div class="booking-summary-row">
      <span style="color: var(--color-text-secondary);">Base fare (${days >= 1 ? days + ' day' + (days > 1 ? 's' : '') : hours + ' hr' + (hours > 1 ? 's' : '')})</span>
      <span style="color: var(--color-text-primary);">₹${baseFare.toLocaleString()}</span>
    </div>
    ${locationFee > 0 ? `
      <div class="booking-summary-row">
        <span style="color: var(--color-text-secondary);">Pickup fee</span>
        <span style="color: var(--color-text-primary);">₹${locationFee}</span>
      </div>
    ` : ''}
    <div class="booking-summary-row">
      <span style="color: var(--color-text-secondary);">Insurance</span>
      <span style="color: var(--color-success-light);">Included</span>
    </div>
    <div class="booking-summary-row booking-summary-total">
      <span>Total</span>
      <span>₹${total.toLocaleString()}</span>
    </div>
  `;
}
