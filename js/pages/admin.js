// ========================================
// DriveEase — Admin Panel Page
// ========================================

function renderAdminPage() {
  // Check admin access
  if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
    return `
      <div class="admin-page">
        <div class="container">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Admin Access Required</h3>
            <p>Login with admin credentials to access this panel.<br>
            <small style="color: var(--color-text-muted);">Email: admin@driveease.com | Password: admin123</small></p>
            <button class="btn btn-primary" onclick="openAuthModal('login')" style="margin-top: var(--space-6);">Admin Login</button>
          </div>
        </div>
      </div>
    `;
  }

  const adminTab = AppState.adminTab || 'overview';

  return `
    <div class="admin-page">
      <div class="container">
        <div class="page-header animate-fade-in">
          <div>
            <h1>
              Admin Dashboard
              <span class="page-header-badge">ADMIN</span>
            </h1>
            <p style="color: var(--color-text-tertiary); margin-top: var(--space-1);">Welcome back, ${AppState.currentUser?.name || 'Admin'}</p>
          </div>
          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary btn-sm" onclick="exportData()">📥 Export Data</button>
            <button class="btn btn-outline btn-sm" onclick="showToast('info', 'Coming Soon', 'Settings panel coming soon')">⚙️ Settings</button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs" style="margin-bottom: var(--space-6); width: fit-content;">
          <button class="tab ${adminTab === 'overview' ? 'active' : ''}" onclick="switchAdminTab('overview')">📊 Overview</button>
          <button class="tab ${adminTab === 'users' ? 'active' : ''}" onclick="switchAdminTab('users')">👥 Users</button>
          <button class="tab ${adminTab === 'fleet' ? 'active' : ''}" onclick="switchAdminTab('fleet')">🚗 Fleet</button>
          <button class="tab ${adminTab === 'bookings' ? 'active' : ''}" onclick="switchAdminTab('bookings')">📋 Bookings</button>
          <button class="tab ${adminTab === 'reports' ? 'active' : ''}" onclick="switchAdminTab('reports')">📈 Reports</button>
        </div>

        <!-- Content -->
        <div id="admin-content">
          ${adminTab === 'overview' ? renderAdminOverview() : ''}
          ${adminTab === 'users' ? renderAdminUsers() : ''}
          ${adminTab === 'fleet' ? renderAdminFleet() : ''}
          ${adminTab === 'bookings' ? renderAdminBookings() : ''}
          ${adminTab === 'reports' ? renderAdminReports() : ''}
        </div>
      </div>
    </div>
  `;
}

// ---- Overview Tab ----
function renderAdminOverview() {
  const allBookings = getAllBookingsForAdmin();
  const totalRevenue = allBookings.reduce((s, b) => s + (b.total || 0), 0);
  const activeBookings = allBookings.filter(b => b.status === 'upcoming').length;
  const totalUsers = 3; // seeded
  const totalCars = AppData.CARS.length;

  return `
    <div class="animate-fade-in-up">
      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon primary">💰</div>
          <div class="stat-value">₹${totalRevenue.toLocaleString()}</div>
          <div class="stat-label">Total Revenue</div>
          <div class="stat-change up">↑ 12%</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon accent">📋</div>
          <div class="stat-value">${allBookings.length}</div>
          <div class="stat-label">Total Bookings</div>
          <div class="stat-change up">↑ 8%</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon info">👥</div>
          <div class="stat-value">${totalUsers}</div>
          <div class="stat-label">Registered Users</div>
          <div class="stat-change up">↑ 25%</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon success">🚗</div>
          <div class="stat-value">${totalCars}</div>
          <div class="stat-label">Total Cars</div>
          <div class="stat-change up">↑ 5%</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
        <!-- Revenue Chart -->
        ${renderRevenueChart()}

        <!-- Recent Bookings -->
        <div class="card" style="padding: var(--space-5);">
          <div class="admin-chart-header">
            <h4>Recent Bookings</h4>
          </div>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${allBookings.slice(0, 5).map(b => `
              <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--color-bg-input); border-radius: var(--radius-md);">
                <span style="font-size: 1.5rem;">${b.carEmoji || '🚗'}</span>
                <div style="flex: 1;">
                  <div style="font-weight: 600; font-size: var(--text-sm);">${b.carName || 'Unknown'}</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-muted);">ID: ${b.id}</div>
                </div>
                <span class="badge ${b.status === 'upcoming' ? 'badge-primary' : b.status === 'completed' ? 'badge-success' : 'badge-danger'}">${b.status}</span>
                <span style="font-weight: 700; font-size: var(--text-sm);">₹${(b.total || 0).toLocaleString()}</span>
              </div>
            `).join('') || '<p style="color: var(--color-text-muted); text-align: center; padding: var(--space-8);">No bookings yet</p>'}
          </div>
        </div>
      </div>

      <!-- Popular Cars -->
      <div class="admin-chart-container" style="margin-top: var(--space-6);">
        <div class="admin-chart-header">
          <h4>🔥 Most Popular Cars</h4>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-4);">
          ${AppData.CARS.sort((a, b) => b.trips - a.trips).slice(0, 6).map((car, i) => `
            <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--color-bg-input); border-radius: var(--radius-md);">
              <span style="font-size: var(--text-lg); font-weight: 800; color: var(--color-text-muted); width: 24px;">#${i + 1}</span>
              <span style="font-size: 1.3rem;">${car.emoji}</span>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: var(--text-sm);">${car.name}</div>
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${car.trips} trips · ⭐ ${car.rating}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderRevenueChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [45000, 62000, 58000, 71000, 85000, 31695];
  const max = Math.max(...values);

  return `
    <div class="admin-chart-container">
      <div class="admin-chart-header">
        <h4>📊 Revenue Trend</h4>
        <span class="badge badge-accent">Last 6 Months</span>
      </div>
      <div class="admin-chart">
        ${months.map((m, i) => {
          const height = Math.max(8, (values[i] / max) * 180);
          return `
            <div class="admin-chart-bar-wrapper">
              <div class="admin-chart-bar" style="height: ${height}px;">
                <span class="admin-chart-bar-value">₹${(values[i] / 1000).toFixed(0)}K</span>
              </div>
              <span class="admin-chart-label">${m}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ---- Users Tab ----
function renderAdminUsers() {
  const users = [
    { id: 1, name: 'Admin', email: 'admin@driveease.com', role: 'admin', status: 'active', joinDate: '2023-01-01', trips: 0 },
    { id: 2, name: 'Demo User', email: 'demo@driveease.com', role: 'user', status: 'active', joinDate: '2024-06-15', trips: 3 },
    { id: 3, name: 'Rahul Kumar', email: 'rahul@driveease.com', role: 'host', status: 'active', joinDate: '2023-08-20', trips: 340 },
    ...getRegisteredUsers(),
  ];

  return `
    <div class="animate-fade-in-up">
      <div class="admin-table-container">
        <div class="admin-table-header">
          <h4 class="admin-table-title">👥 All Users (${users.length})</h4>
          <div class="admin-table-actions">
            <input type="text" class="input admin-table-search" placeholder="🔍 Search users..." oninput="filterAdminTable(this.value, 'users-table')">
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table" id="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Trips</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>
                    <div class="admin-table-user">
                      <div class="avatar" style="width: 32px; height: 32px; font-size: var(--text-xs);">${u.name.split(' ').map(n => n[0]).join('')}</div>
                      <span style="font-weight: 600;">${u.name}</span>
                    </div>
                  </td>
                  <td style="color: var(--color-text-tertiary);">${u.email}</td>
                  <td><span class="badge ${u.role === 'admin' ? 'badge-warning' : u.role === 'host' ? 'badge-accent' : 'badge-primary'}">${u.role}</span></td>
                  <td style="color: var(--color-text-tertiary);">${new Date(u.joinDate).toLocaleDateString()}</td>
                  <td>${u.trips}</td>
                  <td><span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">${u.status}</span></td>
                  <td>
                    <button class="btn btn-ghost btn-sm" onclick="showToast('info', 'User Details', 'User detail view coming soon')">👁️</button>
                    <button class="btn btn-ghost btn-sm" onclick="toggleUserStatus(${u.id}, '${u.status}')" title="${u.status === 'active' ? 'Suspend' : 'Activate'}">${u.status === 'active' ? '🚫' : '✅'}</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="admin-table-footer">
          <span>Showing ${users.length} users</span>
        </div>
      </div>
    </div>
  `;
}

// ---- Fleet Tab ----
function renderAdminFleet() {
  return `
    <div class="animate-fade-in-up">
      <div class="admin-table-container">
        <div class="admin-table-header">
          <h4 class="admin-table-title">🚗 Fleet Management (${AppData.CARS.length} cars)</h4>
          <div class="admin-table-actions">
            <input type="text" class="input admin-table-search" placeholder="🔍 Search cars..." oninput="filterAdminTable(this.value, 'fleet-table')">
            <button class="btn btn-primary btn-sm" onclick="navigateTo('/host')">➕ Add Car</button>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table" id="fleet-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Type</th>
                <th>City</th>
                <th>Price/Day</th>
                <th>Rating</th>
                <th>Trips</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${AppData.CARS.map(car => `
                <tr>
                  <td>
                    <div class="admin-table-user">
                      <span style="font-size: 1.3rem;">${car.emoji}</span>
                      <div>
                        <div style="font-weight: 600;">${car.name}</div>
                        <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${car.brand} · ${car.year}</div>
                      </div>
                    </div>
                  </td>
                  <td><span class="badge badge-primary">${car.type}</span></td>
                  <td>${AppData.CITIES.find(c => c.id === car.city)?.name || car.city}</td>
                  <td style="font-weight: 600;">₹${car.pricePerDay}</td>
                  <td><span style="color: var(--color-warning);">⭐ ${car.rating}</span></td>
                  <td>${car.trips}</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-ghost btn-sm" onclick="navigateTo('/car/${car.id}')">👁️</button>
                    <button class="btn btn-ghost btn-sm" onclick="showToast('info', 'Edit', 'Car editing coming soon')">✏️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="admin-table-footer">
          <span>Showing ${AppData.CARS.length} cars</span>
          <span>Total fleet value: ₹${(AppData.CARS.length * 800000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

// ---- Bookings Tab ----
function renderAdminBookings() {
  const allBookings = getAllBookingsForAdmin();

  return `
    <div class="animate-fade-in-up">
      <div class="admin-table-container">
        <div class="admin-table-header">
          <h4 class="admin-table-title">📋 All Bookings (${allBookings.length})</h4>
          <div class="admin-table-actions">
            <select class="select" style="width: 150px;" onchange="filterBookingsByStatus(this.value)">
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table" id="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Car</th>
                <th>Pickup</th>
                <th>Drop-off</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allBookings.map(b => `
                <tr>
                  <td style="font-family: monospace; color: var(--color-primary-light);">${b.id}</td>
                  <td>
                    <div class="admin-table-user">
                      <span>${b.carEmoji || '🚗'}</span>
                      <span style="font-weight: 600;">${b.carName || 'Unknown'}</span>
                    </div>
                  </td>
                  <td style="font-size: var(--text-xs);">${formatDateTime(b.pickup)}</td>
                  <td style="font-size: var(--text-xs);">${formatDateTime(b.dropoff)}</td>
                  <td style="font-weight: 700;">₹${(b.total || 0).toLocaleString()}</td>
                  <td>
                    <span class="badge ${b.status === 'upcoming' ? 'badge-primary' : b.status === 'completed' ? 'badge-success' : 'badge-danger'}">
                      ${b.status}
                    </span>
                  </td>
                  <td>
                    ${b.status === 'upcoming' ? `
                      <button class="btn btn-ghost btn-sm" onclick="adminCancelBooking('${b.id}')">❌</button>
                    ` : ''}
                    <button class="btn btn-ghost btn-sm" onclick="showToast('info', 'Details', 'Booking detail view coming soon')">👁️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="admin-table-footer">
          <span>Showing ${allBookings.length} bookings</span>
          <span>Total: ₹${allBookings.reduce((s, b) => s + (b.total || 0), 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

// ---- Reports Tab ----
function renderAdminReports() {
  const allBookings = getAllBookingsForAdmin();
  const totalRevenue = allBookings.reduce((s, b) => s + (b.total || 0), 0);
  const avgBookingValue = allBookings.length > 0 ? Math.round(totalRevenue / allBookings.length) : 0;
  const completedCount = allBookings.filter(b => b.status === 'completed').length;
  const cancelRate = allBookings.length > 0 ? Math.round(allBookings.filter(b => b.status === 'cancelled').length / allBookings.length * 100) : 0;

  // City-wise breakdown
  const cityRevenue = {};
  allBookings.forEach(b => {
    const car = AppData.CARS.find(c => c.id === b.carId);
    if (car) {
      const city = AppData.CITIES.find(c => c.id === car.city)?.name || car.city;
      cityRevenue[city] = (cityRevenue[city] || 0) + (b.total || 0);
    }
  });

  // Type breakdown
  const typeCount = {};
  AppData.CARS.forEach(c => {
    typeCount[c.type] = (typeCount[c.type] || 0) + 1;
  });

  return `
    <div class="animate-fade-in-up">
      <!-- KPI Cards -->
      <div class="admin-stats" style="margin-bottom: var(--space-8);">
        <div class="admin-stat-card">
          <div class="admin-stat-value">₹${totalRevenue.toLocaleString()}</div>
          <div class="admin-stat-label">Total Revenue</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-value">₹${avgBookingValue.toLocaleString()}</div>
          <div class="admin-stat-label">Avg. Booking Value</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-value">${completedCount}</div>
          <div class="admin-stat-label">Completed Trips</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-value">${cancelRate}%</div>
          <div class="admin-stat-label">Cancellation Rate</div>
        </div>
      </div>

      <div class="admin-grid-2">
        <!-- Revenue Chart -->
        ${renderRevenueChart()}

        <!-- Fleet Composition -->
        <div class="card" style="padding: var(--space-5);">
          <div class="admin-chart-header">
            <h4>🚗 Fleet Composition</h4>
          </div>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${Object.entries(typeCount).map(([type, count]) => {
              const pct = Math.round(count / AppData.CARS.length * 100);
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: 4px;">
                    <span style="text-transform: capitalize; font-weight: 600;">${type}</span>
                    <span style="color: var(--color-text-tertiary);">${count} cars (${pct}%)</span>
                  </div>
                  <div style="height: 8px; background: var(--color-bg-input); border-radius: var(--radius-full); overflow: hidden;">
                    <div style="height: 100%; width: ${pct}%; background: var(--gradient-primary); border-radius: var(--radius-full); transition: width 0.5s var(--ease-out);"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- City Performance -->
      <div class="admin-chart-container" style="margin-top: var(--space-6);">
        <div class="admin-chart-header">
          <h4>🏙️ City-wise Revenue</h4>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-4);">
          ${Object.entries(cityRevenue).sort((a, b) => b[1] - a[1]).map(([city, revenue]) => `
            <div style="padding: var(--space-4); background: var(--color-bg-input); border-radius: var(--radius-md); text-align: center;">
              <div style="font-weight: 600; margin-bottom: var(--space-1);">${city}</div>
              <div style="font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; color: var(--color-accent);">₹${revenue.toLocaleString()}</div>
            </div>
          `).join('') || '<p style="color: var(--color-text-muted); text-align: center;">No revenue data yet</p>'}
        </div>
      </div>
    </div>
  `;
}

// ---- Helper Functions ----
function switchAdminTab(tab) {
  AppState.adminTab = tab;
  renderPage(renderAdminPage);
}

function getAllBookingsForAdmin() {
  // Combine AppState bookings + seeded bookings
  const stateBookings = AppState.bookings || [];
  const seeded = [
    { id: 'DE-S001', userId: 2, carId: 2, carName: 'Hyundai Creta', carEmoji: '🚙', pickup: '2026-06-10T10:00', dropoff: '2026-06-12T10:00', total: 6250, status: 'upcoming', createdAt: '2026-06-05T14:30:00Z' },
    { id: 'DE-S002', userId: 2, carId: 5, carName: 'Mahindra Thar', carEmoji: '🛻', pickup: '2026-05-20T09:00', dropoff: '2026-05-22T09:00', total: 7986, status: 'completed', createdAt: '2026-05-18T11:00:00Z' },
    { id: 'DE-S003', userId: 2, carId: 11, carName: 'BMW 3 Series', carEmoji: '🏎️', pickup: '2026-05-01T14:00', dropoff: '2026-05-03T14:00', total: 17459, status: 'completed', createdAt: '2026-04-29T16:00:00Z' },
  ];
  // Merge without duplicates
  const ids = new Set(stateBookings.map(b => b.id));
  const merged = [...stateBookings, ...seeded.filter(s => !ids.has(s.id))];
  return merged;
}

function getRegisteredUsers() {
  // Return any users from AppState who registered via signup
  if (AppState.currentUser && AppState.currentUser.email !== 'admin@driveease.com' && AppState.currentUser.email !== 'demo@driveease.com' && AppState.currentUser.email !== 'rahul@driveease.com') {
    return [{
      id: 100,
      name: AppState.currentUser.name,
      email: AppState.currentUser.email,
      role: 'user',
      status: 'active',
      joinDate: new Date().toISOString(),
      trips: (AppState.bookings || []).length,
    }];
  }
  return [];
}

function filterAdminTable(query, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  const lq = query.toLowerCase();
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(lq) ? '' : 'none';
  });
}

function toggleUserStatus(userId, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
  showToast('info', 'User Updated', `User ${userId} is now ${newStatus}`);
  switchAdminTab('users');
}

function adminCancelBooking(bookingId) {
  const bookings = AppState.bookings || [];
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'cancelled';
    saveState();
  }
  showToast('warning', 'Booking Cancelled', `Booking ${bookingId} has been cancelled by admin`);
  switchAdminTab('bookings');
}

function exportData() {
  const data = {
    users: 3,
    cars: AppData.CARS.length,
    bookings: getAllBookingsForAdmin(),
    exportDate: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `driveease_export_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('success', 'Data Exported', 'Admin data downloaded as JSON');
}
