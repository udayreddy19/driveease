// ========================================
// DriveEase — Booking / Payment (ZoomCar-Style)
// ========================================

function renderBookingPage(carId) {
  const car = AppData.CARS.find(c => c.id === parseInt(carId));
  if (!car) return renderNotFoundPage();

  const user = AppState.currentUser;
  if (!user) {
    setTimeout(() => openAuthModal(), 100);
    return `<div class="empty-state" style="padding-top: 120px;"><div class="empty-state-icon">🔐</div><h3>Login Required</h3></div>`;
  }

  const tripProtection = Math.round(car.pricePerDay * 0.15);
  const deposit = car.type === 'luxury' ? 2000 : car.type === 'suv' ? 1000 : 500;
  const gst = Math.round(car.pricePerDay * 0.18);
  const total = car.pricePerDay + tripProtection + deposit + gst;

  return `
    <div class="payment-page">
      <div class="payment-header">
        <div class="container">
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <button class="detail-back" onclick="history.back()">← Back</button>
            <h3 style="font-size: var(--text-lg);">Complete Payment</h3>
            <div style="margin-left: auto; padding: var(--space-2) var(--space-4); border: 1px solid var(--color-warning); border-radius: var(--radius-md); font-size: var(--text-xs); color: var(--color-warning); font-weight: 600;">
              price locked for <strong>09:38</strong> Minutes
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-top: var(--space-6);">Choose the method you prefer</p>
        <div class="payment-layout">
          <!-- Payment Methods Sidebar -->
          <div class="payment-methods">
            <h4 style="padding: var(--space-4) var(--space-5); font-size: var(--text-base); border-bottom: 1px solid var(--color-border-light);">Payment Options</h4>
            <div class="payment-method-item active" onclick="selectPaymentMethod('upi', this)">
              <div class="payment-method-icon">📱</div>
              <div class="payment-method-label">
                <h4>UPI</h4>
                <p>Google Pay, PhonePe, BHIM UPI</p>
              </div>
            </div>
            <div class="payment-method-item" onclick="selectPaymentMethod('card', this)">
              <div class="payment-method-icon">💳</div>
              <div class="payment-method-label">
                <h4>Credit / Debit / ATM Card</h4>
                <p>Enabled for online transactions</p>
              </div>
            </div>
            <div class="payment-method-item" onclick="selectPaymentMethod('netbanking', this)">
              <div class="payment-method-icon">🏛️</div>
              <div class="payment-method-label">
                <h4>Net Banking</h4>
                <p>All major banks supported</p>
              </div>
            </div>
            <div class="payment-method-item" onclick="selectPaymentMethod('wallet', this)">
              <div class="payment-method-icon">💰</div>
              <div class="payment-method-label">
                <h4>DriveEase Wallet</h4>
                <p>Balance: ₹${(user.walletBalance || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <div class="payment-form" id="payment-form-content">
            ${renderPaymentMethodForm('upi', total)}
          </div>

          <!-- Booking Summary -->
          <div class="payment-summary">
            <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-4);">
              <div style="width: 100px; height: 70px; background: var(--color-bg-input); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; flex-shrink: 0;">
                ${car.emoji}
              </div>
              <div>
                <h4 style="font-size: var(--text-sm); margin-bottom: 2px;">${car.name}</h4>
                <span class="rating-badge" style="font-size: 10px; padding: 2px 8px;">★ ${car.rating} | ${car.trips} trips</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); padding: var(--space-3) 0; border-top: 1px solid var(--color-border-light); border-bottom: 1px solid var(--color-border-light);">
              <div style="text-align: center; flex: 1;">
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${getShortDate('pickup')}</div>
                <div style="font-size: var(--text-sm); font-weight: 600;">${getShortTime('pickup')}</div>
              </div>
              <span style="color: var(--color-text-muted);">→</span>
              <div style="text-align: center; flex: 1;">
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${getShortDate('dropoff')}</div>
                <div style="font-size: var(--text-sm); font-weight: 600;">${getShortTime('dropoff')}</div>
              </div>
            </div>

            <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-4);">
              📍 Pickup location: ${AppState.selectedLocation || 'Indiranagar Club, Bangalore'}
            </div>

            <div style="border-top: 1px solid var(--color-border-light); padding-top: var(--space-3);">
              <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: var(--space-2);">
                <span>Base Fare</span>
                <span>₹${car.pricePerDay.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: var(--space-2);">
                <span>Trip Protection</span>
                <span>₹${tripProtection.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: var(--space-2);">
                <span>Refundable Deposit</span>
                <span>₹${deposit.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: var(--space-2);">
                <span>GST (18%)</span>
                <span>₹${gst.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: var(--text-base); padding-top: var(--space-3); border-top: 1px solid var(--color-border-light); margin-top: var(--space-2);">
                <span>Pay</span>
                <span>₹${total.toLocaleString()}</span>
              </div>
              <a href="#" style="font-size: var(--text-xs); color: var(--color-primary); font-weight: 600; display: block; text-align: right; margin-top: var(--space-1);">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPaymentMethodForm(method, total) {
  switch (method) {
    case 'upi':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-1);">UPI</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-6);">Amount: ₹${total.toLocaleString()}</p>
          
          <div style="text-align: center; margin-bottom: var(--space-6);">
            <h4 style="color: var(--color-primary); margin-bottom: var(--space-1);">Scan QR & Pay ₹${total.toLocaleString()}</h4>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-4);">Choose any UPI app you prefer</p>
            <div style="display: flex; gap: var(--space-3); justify-content: center; margin-bottom: var(--space-4);">
              <span style="padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-xl);">📱</span>
              <span style="padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-xl);">💰</span>
              <span style="padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-xl);">🏦</span>
            </div>
            <div style="width: 200px; height: 200px; background: var(--color-bg-input); border-radius: var(--radius-lg); margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 2px dashed var(--color-border);">
              <div style="text-align: center; color: var(--color-text-muted);">
                <div style="font-size: 3rem; margin-bottom: var(--space-2);">📷</div>
                <div style="font-size: var(--text-xs);">QR Code</div>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: var(--space-4);">
            <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Or enter UPI ID</p>
            <div style="display: flex; gap: var(--space-2); max-width: 400px; margin: var(--space-3) auto 0;">
              <input type="text" class="input" placeholder="yourname@upi" id="upi-id">
              <button class="btn btn-primary" onclick="processPayment()">Pay ₹${total.toLocaleString()}</button>
            </div>
          </div>
        </div>
      `;
    case 'card':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-1);">Credit / Debit Card</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-6);">Amount: ₹${total.toLocaleString()}</p>
          
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label>Card Number</label>
            <input type="text" class="input" placeholder="1234 5678 9012 3456" maxlength="19">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
            <div class="input-group">
              <label>Expiry Date</label>
              <input type="text" class="input" placeholder="MM/YY" maxlength="5">
            </div>
            <div class="input-group">
              <label>CVV</label>
              <input type="password" class="input" placeholder="•••" maxlength="3">
            </div>
          </div>
          <div class="input-group" style="margin-bottom: var(--space-6);">
            <label>Cardholder Name</label>
            <input type="text" class="input" placeholder="Name on card">
          </div>
          <button class="btn btn-primary btn-full btn-lg" onclick="processPayment()">Pay ₹${total.toLocaleString()}</button>
          <div style="display: flex; gap: var(--space-3); justify-content: center; margin-top: var(--space-4); opacity: 0.5;">
            <span style="font-size: var(--text-xs);">🔒 Secured by</span>
            <span style="font-size: var(--text-xs);">VISA</span>
            <span style="font-size: var(--text-xs);">Mastercard</span>
            <span style="font-size: var(--text-xs);">RuPay</span>
          </div>
        </div>
      `;
    case 'netbanking':
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-1);">Net Banking</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-6);">Amount: ₹${total.toLocaleString()}</p>
          
          <h4 style="font-size: var(--text-sm); margin-bottom: var(--space-3);">Popular Banks</h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-6);">
            ${['🏦 SBI', '🏛️ HDFC', '🏦 ICICI', '🏛️ Axis', '🏦 Kotak', '🏛️ BOB'].map(bank => `
              <button class="card" style="padding: var(--space-3); text-align: center; font-size: var(--text-sm); font-weight: 600; cursor: pointer;" onclick="processPayment()">${bank}</button>
            `).join('')}
          </div>
          
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label>Other Banks</label>
            <select class="select">
              <option>Select your bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Bank of Baroda</option>
              <option>Punjab National Bank</option>
              <option>Union Bank of India</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full btn-lg" onclick="processPayment()">Pay ₹${total.toLocaleString()}</button>
        </div>
      `;
    case 'wallet':
      const balance = AppState.currentUser?.walletBalance || 0;
      const canPay = balance >= total;
      return `
        <div>
          <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-1);">DriveEase Wallet</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-6);">Amount: ₹${total.toLocaleString()}</p>
          
          <div class="card" style="padding: var(--space-6); text-align: center; margin-bottom: var(--space-6); background: var(--gradient-primary); color: white; border: none;">
            <p style="font-size: var(--text-sm); opacity: 0.8; margin-bottom: var(--space-2);">Available Balance</p>
            <div style="font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800;">₹${balance.toLocaleString()}</div>
          </div>
          
          ${canPay ? `
            <button class="btn btn-primary btn-full btn-lg" onclick="processPayment()">Pay ₹${total.toLocaleString()} from Wallet</button>
          ` : `
            <div class="card" style="padding: var(--space-4); text-align: center; border-color: var(--color-warning);">
              <p style="color: var(--color-warning); font-weight: 600; font-size: var(--text-sm);">⚠️ Insufficient Balance</p>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1);">You need ₹${(total - balance).toLocaleString()} more. Add money to your wallet or choose another payment method.</p>
            </div>
          `}
        </div>
      `;
    default:
      return '';
  }
}

function selectPaymentMethod(method, element) {
  document.querySelectorAll('.payment-method-item').forEach(i => i.classList.remove('active'));
  element.classList.add('active');

  const carId = window.location.hash.split('/booking/')[1];
  const car = AppData.CARS.find(c => c.id === parseInt(carId));
  if (!car) return;

  const tripProtection = Math.round(car.pricePerDay * 0.15);
  const deposit = car.type === 'luxury' ? 2000 : car.type === 'suv' ? 1000 : 500;
  const gst = Math.round(car.pricePerDay * 0.18);
  const total = car.pricePerDay + tripProtection + deposit + gst;

  const form = document.getElementById('payment-form-content');
  if (form) {
    form.innerHTML = renderPaymentMethodForm(method, total);
    form.style.animation = 'fadeIn 0.3s var(--ease-out)';
  }
}

function processPayment() {
  const carId = window.location.hash.split('/booking/')[1];
  const car = AppData.CARS.find(c => c.id === parseInt(carId));

  // Create booking
  const booking = {
    id: Date.now(),
    carId: car.id,
    userId: AppState.currentUser.id,
    pickupDate: AppState.pickupDate || new Date().toISOString(),
    dropoffDate: AppState.dropoffDate || new Date(Date.now() + 86400000 * 2).toISOString(),
    location: AppState.selectedLocation || 'Indiranagar Club, Bangalore',
    totalAmount: car.pricePerDay,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  if (!AppState.bookings) AppState.bookings = [];
  AppState.bookings.push(booking);

  showToast('success', 'Booking Confirmed! 🎉', `Your ${car.name} is ready. Check My Bookings for details.`);
  setTimeout(() => navigateTo('/dashboard?tab=bookings'), 1500);
}
