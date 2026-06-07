// ========================================
// DriveEase — Car Detail (ZoomCar-Style)
// ========================================

function renderCarDetailPage(carId) {
  const car = AppData.CARS.find(c => c.id === parseInt(carId));
  if (!car) return renderNotFoundPage();

  const cityName = AppData.CITIES.find(c => c.id === car.city)?.name || car.city;
  const isFav = AppState.favorites.includes(car.id);
  const pricePerHr = Math.round(car.pricePerDay / 24);
  const tripProtection = Math.round(car.pricePerDay * 0.15);
  const deposit = car.type === 'luxury' ? 2000 : car.type === 'suv' ? 1000 : 500;
  const ratingClass = car.rating >= 4.5 ? 'excellent' : 'good';
  const relatedCars = AppData.CARS.filter(c => c.type === car.type && c.id !== car.id).slice(0, 3);

  return `
    <div class="detail-page">
      <!-- Detail Header -->
      <div class="detail-header">
        <div class="container">
          <div class="detail-header-inner">
            <button class="detail-back" onclick="history.back()">← Back</button>
            <div style="display: flex; align-items: center; gap: var(--space-4); flex: 1; justify-content: center;">
              <div class="search-date-box" onclick="openHomeDatePicker('pickup')">
                <label style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">Checkin</label>
                <div class="date" style="font-size: var(--text-sm);">${getShortDate('pickup')}, ${getShortTime('pickup')}</div>
              </div>
              <div class="search-date-box" onclick="openHomeDatePicker('dropoff')">
                <label style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">Checkout</label>
                <div class="date" style="font-size: var(--text-sm);">${getShortDate('dropoff')}, ${getShortTime('dropoff')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="detail-layout">
          <!-- Left — Gallery + Info -->
          <div>
            <div class="detail-gallery">
              <div class="detail-gallery-main">
                ${car.emoji}
                <div class="detail-gallery-actions">
                  <button class="detail-gallery-action ${isFav ? 'active' : ''}" onclick="toggleFavorite(${car.id})" style="${isFav ? 'background: var(--color-accent); color: white;' : ''}">
                    ${isFav ? '❤️' : '🤍'}
                  </button>
                  <button class="detail-gallery-action" onclick="shareCar(${car.id})">📤</button>
                </div>
                <button class="detail-gallery-nav prev">‹</button>
                <button class="detail-gallery-nav next">›</button>
                <div class="detail-gallery-counter">1 / 5</div>
              </div>
              <div class="detail-gallery-thumbs">
                ${[1,2,3,4,5].map((n, i) => `
                  <div class="detail-gallery-thumb ${i === 0 ? 'active' : ''}">
                    ${car.emoji}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Car Info -->
            <div class="detail-info">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
                <div>
                  <h1 class="detail-car-name">${car.name}</h1>
                  <div class="detail-car-specs">
                    <span>${car.transmission}</span> · <span>${car.fuel}</span> · <span>${car.seats} Seats</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-4);">
                  <span class="rating-badge ${ratingClass}" style="font-size: var(--text-sm); padding: 6px 14px;">
                    ★ ${car.rating} <span style="opacity: 0.8;">(${car.trips})</span>
                  </span>
                </div>
              </div>

              <div class="detail-car-host">
                <div class="avatar" style="width: 28px; height: 28px; font-size: 10px;">H</div>
                <span>Hosted by <strong>${typeof car.host === 'object' ? car.host.name : (car.host || 'DriveEase Host')}</strong></span>
                ${car.host === 'Professional Host' ? '<span class="badge badge-warning" style="font-size: 10px;">⭐ Professional</span>' : ''}
              </div>

              <!-- Tabs -->
              <div class="detail-tabs" id="detail-tabs">
                <button class="detail-tab active" onclick="switchDetailTab('location', this)">Location</button>
                <button class="detail-tab" onclick="switchDetailTab('reviews', this)">Reviews</button>
                <button class="detail-tab" onclick="switchDetailTab('features', this)">Features</button>
                <button class="detail-tab" onclick="switchDetailTab('cancellation', this)">Cancellation</button>
                <button class="detail-tab" onclick="switchDetailTab('inclusions', this)">Inclusions/Exclusions</button>
                <button class="detail-tab" onclick="switchDetailTab('faqs', this)">FAQs</button>
              </div>

              <!-- Tab Content -->
              <div id="detail-tab-content">
                ${renderDetailTabContent('location', car, cityName)}
              </div>
            </div>
          </div>

          <!-- Right Checkout Panel -->
          <div class="detail-checkout">
            <!-- Trip Protection -->
            <div class="checkout-card">
              <div class="checkout-protection">
                <div class="checkout-protection-label">
                  <h4>Travel with confidence</h4>
                  <p>Your trip is secured against accidental damage</p>
                  <a href="#" style="font-size: var(--text-xs); color: var(--color-primary); font-weight: 600;">Learn More →</a>
                </div>
                <div class="checkout-protection-price">₹${tripProtection.toLocaleString()}</div>
              </div>
            </div>

            <!-- Refundable Deposit -->
            <div class="checkout-card">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-4);">
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                  <div class="checkout-deposit-icon">✓</div>
                  <div>
                    <h4 style="font-size: var(--text-base);">Refundable Deposit</h4>
                    <a href="#" style="font-size: var(--text-xs); color: var(--color-primary);">Learn more →</a>
                  </div>
                </div>
                <div style="font-family: var(--font-display); font-weight: 800; font-size: var(--text-xl);">₹${deposit.toLocaleString()}</div>
              </div>

              <div class="checkout-options">
                <label class="checkout-option selected" onclick="selectPayOption(this)">
                  <input type="radio" name="pay-option" value="now" checked>
                  <div>
                    <strong style="font-size: var(--text-sm);">Pay Now</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">Complete the payment along with your booking fee</p>
                  </div>
                </label>
                <label class="checkout-option" onclick="selectPayOption(this)">
                  <input type="radio" name="pay-option" value="later">
                  <div>
                    <strong style="font-size: var(--text-sm);">Pay Later</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">Pay anytime before your trip start</p>
                  </div>
                </label>
              </div>

              <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-3); line-height: 1.5;">
                You'll get a full refund within 2-3 days after booking completion, unless there's a damage or late return.
              </p>
            </div>

            <!-- Offers -->
            <div class="checkout-card" style="cursor: pointer;" onclick="showToast('info', 'Offers', 'No offers available right now')">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-warm-subtle); color: var(--color-warm); display: flex; align-items: center; justify-content: center; font-weight: 700;">%</div>
                <div>
                  <strong style="font-size: var(--text-sm);">Explore Offers</strong>
                  <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Check Availability Here</p>
                </div>
                <span style="margin-left: auto; color: var(--color-text-muted);">→</span>
              </div>
            </div>

            <!-- Terms + Total + Book -->
            <div class="checkout-card">
              <label class="checkbox-label" style="margin-bottom: var(--space-4);">
                <input type="checkbox" id="terms-check" checked style="accent-color: var(--color-primary);">
                <span style="font-size: var(--text-xs);">I hereby agree to the terms and conditions of the Lease Agreement with Host. <a href="#" style="color: var(--color-primary);">View Details</a></span>
              </label>

              <div class="checkout-total">
                <div>
                  <div class="checkout-total-label">Total Price</div>
                  <div class="checkout-total-sub">Incl Unlimited Kms</div>
                </div>
                <div>
                  <div class="checkout-total-price">₹${car.pricePerDay.toLocaleString()}</div>
                  <a href="#" style="font-size: var(--text-xs); color: var(--color-primary);">View Details</a>
                </div>
              </div>

              <button class="checkout-proceed-btn" onclick="proceedToPayment(${car.id})">
                PROCEED TO PAY
              </button>
            </div>
          </div>
        </div>

        <!-- Related Cars -->
        ${relatedCars.length > 0 ? `
          <div style="padding: var(--space-12) 0;">
            <h2 style="font-size: var(--text-2xl); font-weight: 800; margin-bottom: var(--space-6);">Similar Cars</h2>
            <div class="car-grid">
              ${relatedCars.map(c => renderCarCardHTML(c)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderDetailTabContent(tab, car, cityName) {
  switch (tab) {
    case 'location':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">Car Location</h3>
          <div class="card" style="padding: var(--space-5);">
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);">
              <span>📍</span>
              <strong>${cityName}</strong>
            </div>
            <div class="badge badge-primary">${(Math.random() * 10 + 1).toFixed(1)} Kms Away</div>
          </div>
        </div>
      `;
    case 'reviews':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">Ratings & Reviews</h3>
          <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6);">
            <div style="text-align: center;">
              <div style="font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; color: var(--color-text-primary);">${car.rating}</div>
              <div style="color: var(--color-warning); font-size: var(--text-lg);">★★★★${car.rating >= 4.5 ? '★' : '☆'}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${car.trips} trips</div>
            </div>
            <div style="flex: 1;">
              ${[5,4,3,2,1].map(n => `
                <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px;">
                  <span style="font-size: var(--text-xs); width: 16px;">${n}★</span>
                  <div style="flex: 1; height: 6px; background: var(--color-bg-input); border-radius: var(--radius-full); overflow: hidden;">
                    <div style="width: ${n === 5 ? 70 : n === 4 ? 20 : n === 3 ? 7 : 3}%; height: 100%; background: var(--color-warning); border-radius: var(--radius-full);"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ${renderMockReviews()}
        </div>
      `;
    case 'features':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">Car Features</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
            ${['🔵 Bluetooth', '📱 USB Charging', '❄️ AC', '🎵 Music System', '📸 Dashcam', '🗺️ GPS Navigation', '🪟 Power Windows', '🔑 Keyless Entry', '🅿️ Parking Sensors', '🧳 Boot Space'].map(f => `
              <div style="display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) 0; font-size: var(--text-sm); color: var(--color-text-secondary);">${f}</div>
            `).join('')}
          </div>
        </div>
      `;
    case 'cancellation':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">Cancellation Policy</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <div class="card" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
              <span class="badge badge-success">Free</span>
              <div>
                <strong style="font-size: var(--text-sm);">24+ hours before trip</strong>
                <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Full refund, no questions asked</p>
              </div>
            </div>
            <div class="card" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
              <span class="badge badge-warning">50%</span>
              <div>
                <strong style="font-size: var(--text-sm);">6-24 hours before trip</strong>
                <p style="font-size: var(--text-xs); color: var(--color-text-muted);">50% refund of booking amount</p>
              </div>
            </div>
            <div class="card" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
              <span class="badge badge-danger">No refund</span>
              <div>
                <strong style="font-size: var(--text-sm);">Less than 6 hours</strong>
                <p style="font-size: var(--text-xs); color: var(--color-text-muted);">No refund for late cancellations</p>
              </div>
            </div>
          </div>
        </div>
      `;
    case 'inclusions':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">Inclusions & Exclusions</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
            <div>
              <h4 style="color: var(--color-success); font-size: var(--text-sm); margin-bottom: var(--space-3);">✅ Included</h4>
              ${['Unlimited kilometers', 'Basic insurance', '24/7 roadside assistance', 'GST included', 'Free cancellation (24hrs)'].map(i => `
                <p style="font-size: var(--text-sm); color: var(--color-text-secondary); padding: var(--space-1) 0;">• ${i}</p>
              `).join('')}
            </div>
            <div>
              <h4 style="color: var(--color-danger); font-size: var(--text-sm); margin-bottom: var(--space-3);">❌ Not Included</h4>
              ${['Fuel charges', 'Toll charges', 'Traffic fines', 'Damage beyond insurance', 'Late return penalty'].map(i => `
                <p style="font-size: var(--text-sm); color: var(--color-text-secondary); padding: var(--space-1) 0;">• ${i}</p>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    case 'faqs':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">FAQs</h3>
          ${[
            {q: 'What documents do I need?', a: 'Valid driving license and Aadhaar card/passport for verification.'},
            {q: 'Can I extend my trip?', a: 'Yes, you can extend through the app subject to availability. Additional charges apply at the same hourly rate.'},
            {q: 'What if I return the car late?', a: 'Late returns are charged at 1.5x the hourly rate. Grace period of 30 minutes is provided.'},
            {q: 'Is fuel included?', a: 'No, fuel is not included. You need to return the car with the same fuel level as pickup.'},
          ].map((faq, i) => `
            <div class="card" style="margin-bottom: var(--space-2); cursor: pointer;" onclick="toggleFAQ(100+${i})">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4);">
                <strong style="font-size: var(--text-sm);">${faq.q}</strong>
                <span id="faq-icon-${100+i}" style="color: var(--color-text-muted);">▾</span>
              </div>
              <div id="faq-answer-${100+i}" style="display: none; padding: 0 var(--space-4) var(--space-3); font-size: var(--text-sm); color: var(--color-text-tertiary);">
                ${faq.a}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    default:
      return '';
  }
}

function renderMockReviews() {
  const reviews = [
    { name: 'Rahul M.', date: '2 weeks ago', rating: 5, text: 'Excellent car! Very well maintained. Smooth drive and no issues at all. Host was very cooperative with pickup and dropoff.' },
    { name: 'Priya S.', date: '1 month ago', rating: 4, text: 'Good car overall. AC was perfect, music system worked well. Slight delay in pickup but otherwise great experience.' },
    { name: 'Karthik R.', date: '1 month ago', rating: 5, text: 'Amazing condition! Car was spotless and drove like new. Will definitely book again for my next trip.' },
  ];

  return reviews.map(r => `
    <div style="padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border-light);">
      <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
        <div class="avatar" style="width: 32px; height: 32px; font-size: 11px;">${r.name.split(' ').map(n => n[0]).join('')}</div>
        <div>
          <strong style="font-size: var(--text-sm);">${r.name}</strong>
          <span style="font-size: var(--text-xs); color: var(--color-text-muted); margin-left: var(--space-2);">${r.date}</span>
        </div>
        <div style="margin-left: auto; color: var(--color-warning); font-size: var(--text-sm);">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      </div>
      <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6;">${r.text}</p>
    </div>
  `).join('');
}

// ---- Actions ----

function switchDetailTab(tab, btn) {
  document.querySelectorAll('#detail-tabs .detail-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const carId = window.location.hash.split('/car/')[1];
  const car = AppData.CARS.find(c => c.id === parseInt(carId));
  if (!car) return;

  const cityName = AppData.CITIES.find(c => c.id === car.city)?.name || car.city;
  const content = document.getElementById('detail-tab-content');
  if (content) {
    content.innerHTML = renderDetailTabContent(tab, car, cityName);
    content.style.animation = 'fadeInUp 0.3s var(--ease-out)';
  }
}

function selectPayOption(label) {
  document.querySelectorAll('.checkout-option').forEach(o => o.classList.remove('selected'));
  label.classList.add('selected');
}

function shareCar(carId) {
  if (navigator.share) {
    navigator.share({ title: 'Check out this car on DriveEase', url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('success', 'Link Copied', 'Car link copied to clipboard!');
  }
}

function proceedToPayment(carId) {
  if (!AppState.currentUser) {
    openAuthModal();
    return;
  }
  const termsCheck = document.getElementById('terms-check');
  if (termsCheck && !termsCheck.checked) {
    showToast('warning', 'Terms Required', 'Please agree to the lease agreement terms');
    return;
  }
  navigateTo(`/booking/${carId}`);
}

function renderNotFoundPage() {
  return `
    <div class="empty-state" style="padding-top: 120px;">
      <div class="empty-state-icon">🚫</div>
      <h3>Car Not Found</h3>
      <p>The car you're looking for doesn't exist or has been removed.</p>
      <a href="#/search" class="btn btn-primary" style="margin-top: var(--space-4);">Browse Cars</a>
    </div>
  `;
}
