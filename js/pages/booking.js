// ========================================
// DriveEase — Booking Flow Page
// ========================================

function renderBookingPage(params = {}) {
  const carId = parseInt(params.id);
  const car = AppData.CARS.find(c => c.id === carId);

  if (!car) return renderNotFoundPage();

  if (!AppState.isLoggedIn) {
    setTimeout(() => {
      openAuthModal('login');
      showToast('info', 'Login Required', 'Please login to complete booking');
    }, 300);
    return `
      <div class="booking-page">
        <div class="container">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please login or create an account to book a car.</p>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize booking state
  if (!AppState.currentBooking || AppState.currentBooking.carId !== carId) {
    AppState.currentBooking = {
      carId,
      pickup: '',
      dropoff: '',
      location: 'hub',
      addons: [],
      step: 1,
    };
  }

  const step = AppState.currentBooking.step || 1;

  return `
    <div class="booking-page">
      <div class="container">
        <div class="booking-page-content">
          <!-- Car Summary -->
          <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-8); padding: var(--space-4); background: var(--gradient-card); border: var(--glass-border); border-radius: var(--radius-lg);">
            <div style="width: 80px; height: 60px; background: ${car.color}15; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2rem; flex-shrink: 0;">
              ${car.emoji}
            </div>
            <div style="flex: 1;">
              <h4 style="margin-bottom: 2px;">${car.name}</h4>
              <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">${car.brand} · ${car.type} · ${car.transmission}</p>
            </div>
            <div class="price">
              <span class="price-amount">₹${car.pricePerHour}</span>
              <span class="price-unit">/hr</span>
            </div>
          </div>

          <!-- Progress Steps -->
          <div class="progress-steps">
            <div class="progress-step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}">
              <div class="progress-step-circle">${step > 1 ? '✓' : '1'}</div>
              <span class="progress-step-label">Trip Details</span>
            </div>
            <div class="progress-step-line ${step > 1 ? 'completed' : ''}"></div>
            <div class="progress-step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
              <div class="progress-step-circle">${step > 2 ? '✓' : '2'}</div>
              <span class="progress-step-label">Add-ons</span>
            </div>
            <div class="progress-step-line ${step > 2 ? 'completed' : ''}"></div>
            <div class="progress-step ${step >= 3 ? (step > 3 ? 'completed' : 'active') : ''}">
              <div class="progress-step-circle">${step > 3 ? '✓' : '3'}</div>
              <span class="progress-step-label">Payment</span>
            </div>
            <div class="progress-step-line ${step > 3 ? 'completed' : ''}"></div>
            <div class="progress-step ${step >= 4 ? 'active' : ''}">
              <div class="progress-step-circle">4</div>
              <span class="progress-step-label">Confirmed</span>
            </div>
          </div>

          <!-- Step Content -->
          ${step === 1 ? renderBookingStep1(car) : ''}
          ${step === 2 ? renderBookingStep2(car) : ''}
          ${step === 3 ? renderBookingStep3(car) : ''}
          ${step === 4 ? renderBookingStep4(car) : ''}
        </div>
      </div>
    </div>
  `;
}

function renderBookingStep1(car) {
  const booking = AppState.currentBooking;
  return `
    <div class="booking-step-content animate-fade-in-up">
      <h3 class="booking-step-title">📅 Trip Details</h3>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        ${renderDateTimePicker('booking-pickup', 'Pickup Date & Time', booking.pickup)}
        ${renderDateTimePicker('booking-dropoff', 'Drop-off Date & Time', booking.dropoff)}
      </div>

      <div class="input-group" style="margin-top: var(--space-4);">
        <label for="booking-location">📍 Pickup Location</label>
        <select class="input select" id="booking-location">
          <option value="hub" ${booking.location === 'hub' ? 'selected' : ''}>
            DriveEase Hub - ${AppData.CITIES.find(c => c.id === car.city)?.name || 'City Center'}
          </option>
          <option value="airport" ${booking.location === 'airport' ? 'selected' : ''}>Airport Pickup (+₹200)</option>
          <option value="delivery" ${booking.location === 'delivery' ? 'selected' : ''}>Home Delivery (+₹300)</option>
        </select>
      </div>

      <div class="input-group" style="margin-top: var(--space-4);">
        <label for="booking-notes">📝 Special Instructions (optional)</label>
        <textarea class="input" id="booking-notes" rows="3" placeholder="Any special requests or instructions..."></textarea>
      </div>

      <div class="booking-actions">
        <a href="#/car/${car.id}" class="btn btn-secondary" style="flex: 1;">← Back</a>
        <button class="btn btn-primary" style="flex: 2;" onclick="nextBookingStep()" id="step1-next-btn">
          Continue to Add-ons →
        </button>
      </div>
    </div>
  `;
}

function renderBookingStep2(car) {
  const selectedAddons = AppState.currentBooking.addons || [];

  return `
    <div class="booking-step-content animate-fade-in-up">
      <h3 class="booking-step-title">🛡️ Add-ons & Extras</h3>
      <p style="margin-bottom: var(--space-6); color: var(--color-text-secondary);">Enhance your trip with these optional add-ons</p>

      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${AppData.ADDONS.map(addon => `
          <div class="addon-card ${selectedAddons.includes(addon.id) ? 'selected' : ''}"
            onclick="toggleAddon('${addon.id}')" id="addon-${addon.id}">
            <div class="addon-info">
              <span class="addon-icon">${addon.icon}</span>
              <div>
                <div class="addon-name">${addon.name}</div>
                <div class="addon-desc">${addon.description}</div>
              </div>
            </div>
            <div class="addon-price">₹${addon.price}</div>
          </div>
        `).join('')}
      </div>

      <div class="booking-actions">
        <button class="btn btn-secondary" style="flex: 1;" onclick="prevBookingStep()">← Back</button>
        <button class="btn btn-primary" style="flex: 2;" onclick="nextBookingStep()" id="step2-next-btn">
          Continue to Payment →
        </button>
      </div>
    </div>
  `;
}

function renderBookingStep3(car) {
  const booking = AppState.currentBooking;
  const { hours, days } = calculateDuration(booking.pickup, booking.dropoff);
  const baseFare = days >= 1 ? car.pricePerDay * days : car.pricePerHour * Math.max(4, hours);
  const locationFee = booking.location === 'airport' ? 200 : booking.location === 'delivery' ? 300 : 0;
  const addonTotal = (booking.addons || []).reduce((sum, id) => {
    const addon = AppData.ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const subtotal = baseFare + locationFee + addonTotal;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return `
    <div class="booking-step-content animate-fade-in-up">
      <h3 class="booking-step-title">💳 Payment</h3>

      <!-- Coupon Code -->
      <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-6);">
        <input type="text" class="input" id="coupon-code" placeholder="Enter coupon code" style="flex: 1;">
        <button class="btn btn-outline" onclick="applyCoupon()" id="apply-coupon-btn">Apply</button>
      </div>

      <!-- Price Summary -->
      <div class="booking-summary" style="margin-bottom: var(--space-6);">
        <div class="booking-summary-row">
          <span style="color: var(--color-text-secondary);">
            Base fare (${days >= 1 ? days + ' day' + (days > 1 ? 's' : '') : Math.max(4, hours) + ' hours'})
          </span>
          <span style="color: var(--color-text-primary);">₹${baseFare.toLocaleString()}</span>
        </div>
        ${locationFee > 0 ? `
          <div class="booking-summary-row">
            <span style="color: var(--color-text-secondary);">${booking.location === 'airport' ? 'Airport' : 'Home'} pickup</span>
            <span style="color: var(--color-text-primary);">₹${locationFee}</span>
          </div>
        ` : ''}
        ${addonTotal > 0 ? `
          <div class="booking-summary-row">
            <span style="color: var(--color-text-secondary);">Add-ons (${booking.addons.length})</span>
            <span style="color: var(--color-text-primary);">₹${addonTotal.toLocaleString()}</span>
          </div>
        ` : ''}
        <div class="booking-summary-row">
          <span style="color: var(--color-text-secondary);">GST (18%)</span>
          <span style="color: var(--color-text-primary);">₹${gst.toLocaleString()}</span>
        </div>
        <div class="booking-summary-row booking-summary-total" style="margin-top: var(--space-2); padding-top: var(--space-3);">
          <span>Total Amount</span>
          <span style="font-size: var(--text-xl); color: var(--color-accent);">₹${total.toLocaleString()}</span>
        </div>
      </div>

      <!-- Card Details -->
      <div style="margin-bottom: var(--space-6);">
        <h4 style="margin-bottom: var(--space-4);">Card Details</h4>
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label for="card-name">Name on Card</label>
          <input type="text" class="input" id="card-name" placeholder="John Doe" value="${AppState.currentUser?.name || ''}">
        </div>
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label for="card-number">Card Number</label>
          <input type="text" class="input" id="card-number" placeholder="4242 4242 4242 4242" maxlength="19"
            oninput="this.value = this.value.replace(/\\D/g,'').replace(/(\\d{4})/g,'$1 ').trim()">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div class="input-group">
            <label for="card-expiry">Expiry Date</label>
            <input type="text" class="input" id="card-expiry" placeholder="MM/YY" maxlength="5"
              oninput="this.value = this.value.replace(/\\D/g,'').replace(/(\\d{2})(\\d)/, '$1/$2')">
          </div>
          <div class="input-group">
            <label for="card-cvv">CVV</label>
            <input type="password" class="input" id="card-cvv" placeholder="•••" maxlength="3">
          </div>
        </div>
      </div>

      <div class="booking-actions">
        <button class="btn btn-secondary" style="flex: 1;" onclick="prevBookingStep()">← Back</button>
        <button class="btn btn-accent btn-lg" style="flex: 2;" onclick="confirmBooking(${total})" id="pay-btn">
          🔒 Pay ₹${total.toLocaleString()}
        </button>
      </div>

      <p style="text-align: center; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-4);">
        🔒 Your payment is secured with 256-bit SSL encryption
      </p>
    </div>
  `;
}

function renderBookingStep4(car) {
  const booking = AppState.currentBooking;
  const tripId = 'DE' + Date.now().toString().slice(-8);

  return `
    <div class="booking-step-content animate-fade-in-up">
      <div class="confirmation-card">
        <div class="confirmation-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">Your trip has been booked successfully.</p>

        <div class="trip-id">${tripId}</div>

        <div class="confirmation-details">
          <div class="confirmation-detail-row">
            <span style="color: var(--color-text-tertiary);">Car</span>
            <span style="color: var(--color-text-primary); font-weight: 600;">${car.name}</span>
          </div>
          <div class="confirmation-detail-row">
            <span style="color: var(--color-text-tertiary);">Pickup</span>
            <span style="color: var(--color-text-primary);">${formatDateTime(booking.pickup) || 'As selected'}</span>
          </div>
          <div class="confirmation-detail-row">
            <span style="color: var(--color-text-tertiary);">Drop-off</span>
            <span style="color: var(--color-text-primary);">${formatDateTime(booking.dropoff) || 'As selected'}</span>
          </div>
          <div class="confirmation-detail-row">
            <span style="color: var(--color-text-tertiary);">Location</span>
            <span style="color: var(--color-text-primary);">${booking.location === 'airport' ? 'Airport Pickup' : booking.location === 'delivery' ? 'Home Delivery' : 'DriveEase Hub'}</span>
          </div>
          <div class="confirmation-detail-row">
            <span style="color: var(--color-text-tertiary);">Status</span>
            <span class="badge badge-success">Confirmed</span>
          </div>
        </div>

        <div style="display: flex; gap: var(--space-4); justify-content: center; margin-top: var(--space-8);">
          <a href="#/dashboard" class="btn btn-primary btn-lg" id="view-trips-btn">View My Trips</a>
          <a href="#/" class="btn btn-secondary btn-lg">Back to Home</a>
        </div>
      </div>
    </div>
  `;
}

function nextBookingStep() {
  const step = AppState.currentBooking.step;

  if (step === 1) {
    const pickup = document.getElementById('booking-pickup')?.value;
    const dropoff = document.getElementById('booking-dropoff')?.value;
    const location = document.getElementById('booking-location')?.value;

    if (!pickup || !dropoff) {
      showToast('warning', 'Missing Dates', 'Please select pickup and drop-off dates');
      return;
    }

    if (new Date(dropoff) <= new Date(pickup)) {
      showToast('error', 'Invalid Dates', 'Drop-off must be after pickup');
      return;
    }

    AppState.currentBooking.pickup = pickup;
    AppState.currentBooking.dropoff = dropoff;
    AppState.currentBooking.location = location;
  }

  AppState.currentBooking.step = step + 1;
  saveState();
  renderPage(() => renderBookingPage({ id: AppState.currentBooking.carId }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevBookingStep() {
  AppState.currentBooking.step = Math.max(1, AppState.currentBooking.step - 1);
  saveState();
  renderPage(() => renderBookingPage({ id: AppState.currentBooking.carId }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAddon(addonId) {
  const addons = AppState.currentBooking.addons || [];
  const idx = addons.indexOf(addonId);
  if (idx >= 0) {
    addons.splice(idx, 1);
  } else {
    addons.push(addonId);
  }
  AppState.currentBooking.addons = addons;

  // Update UI
  const card = document.getElementById(`addon-${addonId}`);
  if (card) card.classList.toggle('selected');
}

function applyCoupon() {
  const code = document.getElementById('coupon-code')?.value?.trim();
  if (!code) {
    showToast('warning', 'Enter Code', 'Please enter a coupon code');
    return;
  }

  if (code.toUpperCase() === 'DRIVE20' || code.toUpperCase() === 'FIRST50') {
    showToast('success', 'Coupon Applied!', `Code "${code.toUpperCase()}" applied successfully`);
  } else {
    showToast('error', 'Invalid Code', 'This coupon code is not valid');
  }
}

function confirmBooking(total) {
  const cardNumber = document.getElementById('card-number')?.value;
  const cardExpiry = document.getElementById('card-expiry')?.value;
  const cardCvv = document.getElementById('card-cvv')?.value;

  if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
    showToast('error', 'Invalid Card', 'Please enter a valid card number');
    return;
  }
  if (!cardExpiry || cardExpiry.length < 5) {
    showToast('error', 'Invalid Expiry', 'Please enter a valid expiry date');
    return;
  }
  if (!cardCvv || cardCvv.length < 3) {
    showToast('error', 'Invalid CVV', 'Please enter a valid CVV');
    return;
  }

  // Simulate payment
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.innerHTML = '<span class="animate-spin" style="display:inline-block;">⏳</span> Processing...';
    payBtn.disabled = true;
  }

  setTimeout(() => {
    // Save booking to history
    const tripId = 'DE' + Date.now().toString().slice(-8);
    const car = AppData.CARS.find(c => c.id === AppState.currentBooking.carId);
    const newTrip = {
      id: tripId,
      carId: AppState.currentBooking.carId,
      carName: car?.name || 'Unknown',
      carEmoji: car?.emoji || '🚗',
      pickup: AppState.currentBooking.pickup,
      dropoff: AppState.currentBooking.dropoff,
      location: AppState.currentBooking.location,
      addons: AppState.currentBooking.addons,
      total: total,
      status: 'upcoming',
      bookedAt: new Date().toISOString(),
    };

    AppState.bookings = AppState.bookings || [];
    AppState.bookings.push(newTrip);

    AppState.currentBooking.step = 4;
    saveState();

    showToast('success', 'Payment Successful!', `₹${total.toLocaleString()} charged to your card`);
    renderPage(() => renderBookingPage({ id: AppState.currentBooking.carId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 2000);
}
