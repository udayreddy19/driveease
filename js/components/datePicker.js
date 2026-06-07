// ========================================
// DriveEase — Custom Calendar Date Picker
// ZoomCar-style with calendar + time slots
// ========================================

let _dpState = {
  isOpen: false,
  activeTab: 'pickup', // 'pickup' or 'dropoff'
  pickupDate: null,
  pickupTime: null,
  dropoffDate: null,
  dropoffTime: null,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  onConfirm: null,
  fieldId: null,
};

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TIME_SLOTS = [];
for (let h = 0; h < 24; h++) {
  TIME_SLOTS.push(`${h.toString().padStart(2, '0')}:00`);
  TIME_SLOTS.push(`${h.toString().padStart(2, '0')}:30`);
}

// ---- Open Date Picker ----
function openDatePicker(options = {}) {
  const { pickupDate, pickupTime, dropoffDate, dropoffTime, onConfirm, fieldId } = options;

  _dpState.isOpen = true;
  _dpState.activeTab = 'pickup';
  _dpState.pickupDate = pickupDate || null;
  _dpState.pickupTime = pickupTime || '10:00';
  _dpState.dropoffDate = dropoffDate || null;
  _dpState.dropoffTime = dropoffTime || '10:00';
  _dpState.onConfirm = onConfirm || null;
  _dpState.fieldId = fieldId || null;

  const today = new Date();
  if (pickupDate) {
    const d = new Date(pickupDate);
    _dpState.currentMonth = d.getMonth();
    _dpState.currentYear = d.getFullYear();
  } else {
    _dpState.currentMonth = today.getMonth();
    _dpState.currentYear = today.getFullYear();
  }

  renderDatePicker();
}

function closeDatePicker() {
  const overlay = document.getElementById('datepicker-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeIn 0.2s var(--ease-out) reverse';
    setTimeout(() => overlay.remove(), 200);
  }
  _dpState.isOpen = false;
}

// ---- Render ----
function renderDatePicker() {
  const existing = document.getElementById('datepicker-overlay');
  if (existing) existing.remove();

  const pickupDisplay = _dpState.pickupDate
    ? formatDPDate(_dpState.pickupDate) + ' ' + (_dpState.pickupTime || '')
    : 'Select date';
  const dropoffDisplay = _dpState.dropoffDate
    ? formatDPDate(_dpState.dropoffDate) + ' ' + (_dpState.dropoffTime || '')
    : 'Select date';

  const duration = getDPDuration();

  const html = `
    <div class="datepicker-overlay" id="datepicker-overlay" onclick="if(event.target===this) closeDatePicker()">
      <div class="datepicker-modal">
        <!-- Header -->
        <div class="datepicker-header">
          <h3>📅 Select Trip Dates</h3>
          <button class="datepicker-close" onclick="closeDatePicker()" aria-label="Close">✕</button>
        </div>

        <!-- Pickup / Dropoff Tabs -->
        <div class="datepicker-tabs">
          <button class="datepicker-tab ${_dpState.activeTab === 'pickup' ? 'active' : ''}" onclick="switchDPTab('pickup')">
            <div>📍 Pickup</div>
            <div class="datepicker-tab-value">${pickupDisplay}</div>
          </button>
          <button class="datepicker-tab ${_dpState.activeTab === 'dropoff' ? 'active' : ''}" onclick="switchDPTab('dropoff')">
            <div>🏁 Drop-off</div>
            <div class="datepicker-tab-value">${dropoffDisplay}</div>
          </button>
        </div>

        <!-- Calendar -->
        <div class="datepicker-calendar">
          ${renderDPMonthNav()}
          ${renderDPWeekdays()}
          ${renderDPDays()}
        </div>

        <!-- Time Picker -->
        <div class="datepicker-time">
          <div class="datepicker-time-label">
            ⏰ ${_dpState.activeTab === 'pickup' ? 'Pickup' : 'Drop-off'} Time
          </div>
          <div class="datepicker-time-grid">
            ${renderDPTimeSlots()}
          </div>
        </div>

        <!-- Duration Summary -->
        ${duration ? `
          <div class="datepicker-summary">
            <div class="datepicker-duration">
              Trip Duration: <strong>${duration}</strong>
            </div>
          </div>
        ` : ''}

        <!-- Footer -->
        <div class="datepicker-footer">
          <button class="btn btn-secondary" style="flex: 1;" onclick="closeDatePicker()">Cancel</button>
          <button class="btn btn-primary" style="flex: 2;" onclick="confirmDatePicker()" id="dp-confirm-btn"
            ${!_dpState.pickupDate || !_dpState.dropoffDate ? 'disabled style="flex:2;opacity:0.5;cursor:not-allowed;"' : 'style="flex:2;"'}>
            ✓ Confirm Dates
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

function renderDPMonthNav() {
  const today = new Date();
  const isPrevDisabled = _dpState.currentYear === today.getFullYear() && _dpState.currentMonth === today.getMonth();

  return `
    <div class="datepicker-month-nav">
      <button class="datepicker-nav-btn" onclick="dpPrevMonth()" ${isPrevDisabled ? 'disabled' : ''}>‹</button>
      <span class="datepicker-month-title">${MONTH_NAMES[_dpState.currentMonth]} ${_dpState.currentYear}</span>
      <button class="datepicker-nav-btn" onclick="dpNextMonth()">›</button>
    </div>
  `;
}

function renderDPWeekdays() {
  return `
    <div class="datepicker-weekdays">
      ${DAY_NAMES.map(d => `<div class="datepicker-weekday">${d}</div>`).join('')}
    </div>
  `;
}

function renderDPDays() {
  const year = _dpState.currentYear;
  const month = _dpState.currentMonth;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let days = '';

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days += '<div class="datepicker-day empty"></div>';
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = formatDPDateISO(date);
    const isPast = date < today;
    const isToday = date.getTime() === today.getTime();

    let classes = 'datepicker-day';
    if (isPast) classes += ' disabled';
    if (isToday) classes += ' today';

    // Selected state
    const pickupStr = _dpState.pickupDate;
    const dropoffStr = _dpState.dropoffDate;

    if (dateStr === pickupStr && dateStr === dropoffStr) {
      classes += ' selected';
    } else if (dateStr === pickupStr) {
      classes += ' range-start selected';
    } else if (dateStr === dropoffStr) {
      classes += ' range-end selected';
    } else if (pickupStr && dropoffStr && dateStr > pickupStr && dateStr < dropoffStr) {
      classes += ' in-range';
    }

    days += `<button class="${classes}" ${isPast ? 'disabled' : ''} onclick="selectDPDay('${dateStr}')">${d}</button>`;
  }

  return `<div class="datepicker-days">${days}</div>`;
}

function renderDPTimeSlots() {
  const selectedTime = _dpState.activeTab === 'pickup' ? _dpState.pickupTime : _dpState.dropoffTime;
  const now = new Date();
  const selectedDate = _dpState.activeTab === 'pickup' ? _dpState.pickupDate : _dpState.dropoffDate;
  const isToday = selectedDate === formatDPDateISO(now);

  return TIME_SLOTS.map(slot => {
    let disabled = false;
    if (isToday) {
      const [h, m] = slot.split(':').map(Number);
      disabled = h < now.getHours() || (h === now.getHours() && m <= now.getMinutes());
    }

    // If dropoff tab and same day as pickup, disable times before pickup time
    if (_dpState.activeTab === 'dropoff' && _dpState.pickupDate === _dpState.dropoffDate && _dpState.pickupTime) {
      if (slot <= _dpState.pickupTime) disabled = true;
    }

    return `
      <button class="datepicker-time-slot ${slot === selectedTime ? 'selected' : ''} ${disabled ? 'disabled' : ''}"
        onclick="${disabled ? '' : `selectDPTime('${slot}')`}" ${disabled ? 'disabled' : ''}>
        ${formatTimeDisplay(slot)}
      </button>
    `;
  }).join('');
}

// ---- Actions ----
function switchDPTab(tab) {
  _dpState.activeTab = tab;

  // Navigate calendar to the selected date's month
  const dateStr = tab === 'pickup' ? _dpState.pickupDate : _dpState.dropoffDate;
  if (dateStr) {
    const d = new Date(dateStr);
    _dpState.currentMonth = d.getMonth();
    _dpState.currentYear = d.getFullYear();
  }

  renderDatePicker();
}

function dpPrevMonth() {
  _dpState.currentMonth--;
  if (_dpState.currentMonth < 0) {
    _dpState.currentMonth = 11;
    _dpState.currentYear--;
  }
  renderDatePicker();
}

function dpNextMonth() {
  _dpState.currentMonth++;
  if (_dpState.currentMonth > 11) {
    _dpState.currentMonth = 0;
    _dpState.currentYear++;
  }
  renderDatePicker();
}

function selectDPDay(dateStr) {
  if (_dpState.activeTab === 'pickup') {
    _dpState.pickupDate = dateStr;
    // If dropoff is before pickup, reset it
    if (_dpState.dropoffDate && _dpState.dropoffDate < dateStr) {
      _dpState.dropoffDate = null;
    }
    // Auto-switch to dropoff tab
    _dpState.activeTab = 'dropoff';
  } else {
    if (_dpState.pickupDate && dateStr < _dpState.pickupDate) {
      showToast('warning', 'Invalid Date', 'Drop-off date cannot be before pickup date');
      return;
    }
    _dpState.dropoffDate = dateStr;
  }
  renderDatePicker();
}

function selectDPTime(time) {
  if (_dpState.activeTab === 'pickup') {
    _dpState.pickupTime = time;
  } else {
    _dpState.dropoffTime = time;
  }
  renderDatePicker();
}

function confirmDatePicker() {
  if (!_dpState.pickupDate || !_dpState.dropoffDate) {
    showToast('warning', 'Select Dates', 'Please select both pickup and drop-off dates');
    return;
  }

  const pickupFull = `${_dpState.pickupDate}T${_dpState.pickupTime || '10:00'}`;
  const dropoffFull = `${_dpState.dropoffDate}T${_dpState.dropoffTime || '10:00'}`;

  if (_dpState.onConfirm) {
    _dpState.onConfirm(pickupFull, dropoffFull);
  }

  // Update display fields if fieldId provided
  updateDPDisplayFields();

  closeDatePicker();
}

// ---- Utility Functions ----
function formatDPDateISO(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDPDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTimeDisplay(time) {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function getDPDuration() {
  if (!_dpState.pickupDate || !_dpState.dropoffDate) return '';
  const start = new Date(`${_dpState.pickupDate}T${_dpState.pickupTime || '10:00'}`);
  const end = new Date(`${_dpState.dropoffDate}T${_dpState.dropoffTime || '10:00'}`);
  const ms = end - start;
  if (ms <= 0) return '';

  const hours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0 && remainingHours > 0) return `${days} day${days > 1 ? 's' : ''} ${remainingHours} hr${remainingHours > 1 ? 's' : ''}`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  return `${hours} hour${hours > 1 ? 's' : ''}`;
}

function updateDPDisplayFields() {
  // Update any inline display elements
  const displays = document.querySelectorAll('.datepicker-inline-display');
  displays.forEach(el => {
    const pickupVal = el.querySelector('.dp-pickup-value');
    const dropoffVal = el.querySelector('.dp-dropoff-value');
    if (pickupVal && _dpState.pickupDate) {
      pickupVal.textContent = formatDPDate(_dpState.pickupDate) + ', ' + formatTimeDisplay(_dpState.pickupTime || '10:00');
    }
    if (dropoffVal && _dpState.dropoffDate) {
      dropoffVal.textContent = formatDPDate(_dpState.dropoffDate) + ', ' + formatTimeDisplay(_dpState.dropoffTime || '10:00');
    }
  });
}

// ---- Inline Display Component ----
function renderDatePickerInline(pickupValue, dropoffValue, onClickFn) {
  const pickupDisplay = pickupValue ? formatDateTime(pickupValue) : 'Select pickup date & time';
  const dropoffDisplay = dropoffValue ? formatDateTime(dropoffValue) : 'Select drop-off date & time';

  return `
    <div class="datepicker-inline-display" onclick="${onClickFn || 'openTripDatePicker()'}" id="dp-inline-display">
      <div class="datepicker-inline-section">
        <div class="datepicker-inline-label">📍 Pickup</div>
        <div class="datepicker-inline-value dp-pickup-value">${pickupDisplay}</div>
      </div>
      <div class="datepicker-inline-arrow">→</div>
      <div class="datepicker-inline-section">
        <div class="datepicker-inline-label">🏁 Drop-off</div>
        <div class="datepicker-inline-value dp-dropoff-value">${dropoffDisplay}</div>
      </div>
    </div>
  `;
}

// ---- Date/Time helpers (keep backward compat) ----
function renderDateTimePicker(id, label, value = '', min = '') {
  const displayValue = value ? formatDateTime(value) : 'Select date & time';
  return `
    <div class="input-group">
      <label for="${id}">${label}</label>
      <div class="datepicker-trigger" onclick="openSingleDatePicker('${id}', '${value}')">
        <input type="text" class="input" id="${id}" value="${value}" readonly placeholder="Tap to select" 
          style="cursor: pointer;">
        <span class="datepicker-trigger-icon">📅</span>
      </div>
      <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;" id="${id}-display">
        ${value ? formatDateTime(value) : ''}
      </div>
    </div>
  `;
}

function openSingleDatePicker(fieldId, currentValue) {
  const isPickup = fieldId.includes('pickup');

  openDatePicker({
    pickupDate: isPickup && currentValue ? currentValue.split('T')[0] : _dpState.pickupDate,
    pickupTime: isPickup && currentValue ? currentValue.split('T')[1] : _dpState.pickupTime,
    dropoffDate: !isPickup && currentValue ? currentValue.split('T')[0] : _dpState.dropoffDate,
    dropoffTime: !isPickup && currentValue ? currentValue.split('T')[1] : _dpState.dropoffTime,
    fieldId: fieldId,
    onConfirm: (pickup, dropoff) => {
      // Update the specific input
      const pickupInput = document.querySelector('[id*="pickup"]');
      const dropoffInput = document.querySelector('[id*="dropoff"]');

      if (pickupInput) {
        pickupInput.value = pickup;
        const pickupDisplay = document.getElementById(pickupInput.id + '-display');
        if (pickupDisplay) pickupDisplay.textContent = formatDateTime(pickup);
      }
      if (dropoffInput) {
        dropoffInput.value = dropoff;
        const dropoffDisplay = document.getElementById(dropoffInput.id + '-display');
        if (dropoffDisplay) dropoffDisplay.textContent = formatDateTime(dropoff);
      }

      // Trigger any update functions
      if (typeof updateDetailSummary === 'function') updateDetailSummary();
    },
  });
}

function openTripDatePicker() {
  openDatePicker({
    pickupDate: _dpState.pickupDate,
    pickupTime: _dpState.pickupTime,
    dropoffDate: _dpState.dropoffDate,
    dropoffTime: _dpState.dropoffTime,
    onConfirm: (pickup, dropoff) => {
      // Store in booking state
      if (AppState.currentBooking) {
        AppState.currentBooking.pickup = pickup;
        AppState.currentBooking.dropoff = dropoff;
      }
      updateDPDisplayFields();
    },
  });
}

function getMinDateTime() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now.toISOString().slice(0, 16);
}

function formatDateTime(dateStr) {
  if (!dateStr) return 'Not set';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function calculateDuration(start, end) {
  if (!start || !end) return { hours: 0, days: 0 };
  const ms = new Date(end) - new Date(start);
  const hours = Math.max(1, Math.ceil(ms / (1000 * 60 * 60)));
  const days = Math.ceil(hours / 24);
  return { hours, days };
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}
