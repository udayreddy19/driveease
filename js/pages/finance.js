// ========================================
// DriveEase — Finance Page
// ========================================

function renderFinancePage() {
  if (!AppState.currentUser) {
    setTimeout(() => openAuthModal('login'), 300);
    return `
      <div class="dashboard-page">
        <div class="container">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please login to view your finances.</p>
            <button class="btn btn-primary" onclick="openAuthModal('login')" style="margin-top: var(--space-6);">Login</button>
          </div>
        </div>
      </div>
    `;
  }

  const financeTab = AppState.financeTab || 'wallet';

  return `
    <div class="dashboard-page">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-8);">
          <div>
            <h1 class="animate-fade-in" style="font-size: var(--text-4xl);">💰 Finance</h1>
            <p style="color: var(--color-text-tertiary);">Manage your wallet, payments & invoices</p>
          </div>
        </div>

        <!-- Wallet Card -->
        <div class="animate-fade-in-up" style="margin-bottom: var(--space-8);">
          ${renderWalletCard()}
        </div>

        <!-- Tabs -->
        <div class="tabs" style="margin-bottom: var(--space-6); width: fit-content;">
          <button class="tab ${financeTab === 'wallet' ? 'active' : ''}" onclick="switchFinanceTab('wallet')">💳 Wallet</button>
          <button class="tab ${financeTab === 'payments' ? 'active' : ''}" onclick="switchFinanceTab('payments')">💵 Payments</button>
          <button class="tab ${financeTab === 'invoices' ? 'active' : ''}" onclick="switchFinanceTab('invoices')">📄 Invoices</button>
          <button class="tab ${financeTab === 'tax' ? 'active' : ''}" onclick="switchFinanceTab('tax')">📊 Tax Summary</button>
        </div>

        <!-- Content -->
        <div id="finance-content">
          ${financeTab === 'wallet' ? renderWalletTab() : ''}
          ${financeTab === 'payments' ? renderPaymentsFullTab() : ''}
          ${financeTab === 'invoices' ? renderInvoicesTab() : ''}
          ${financeTab === 'tax' ? renderTaxTab() : ''}
        </div>
      </div>
    </div>
  `;
}

function renderWalletCard() {
  const walletBalance = AppState.currentUser?.walletBalance || 5000;
  const bookings = AppState.bookings || [];
  const totalSpent = bookings.reduce((s, b) => s + (b.total || 0), 0);

  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-6);">
      <!-- Balance Card -->
      <div style="padding: var(--space-8); background: var(--gradient-primary); border-radius: var(--radius-xl); position: relative; overflow: hidden;">
        <div style="position: absolute; top: -30px; right: -30px; width: 150px; height: 150px; border-radius: 50%; background: rgba(255,255,255,0.1);"></div>
        <div style="position: absolute; bottom: -50px; left: -20px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.05);"></div>
        <div style="position: relative; z-index: 1;">
          <div style="font-size: var(--text-sm); color: rgba(255,255,255,0.7); margin-bottom: var(--space-2);">Wallet Balance</div>
          <div style="font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; color: white; margin-bottom: var(--space-4);">
            ₹${walletBalance.toLocaleString()}
          </div>
          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-sm" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);" onclick="showAddMoneyModal()">
              ➕ Add Money
            </button>
            <button class="btn btn-sm" style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.2);" onclick="showToast('info','Coming Soon','Withdrawal feature coming soon')">
              ↗️ Withdraw
            </button>
          </div>
        </div>
      </div>

      <!-- Total Spent -->
      <div class="stat-card" style="display: flex; flex-direction: column; justify-content: center;">
        <div style="font-size: 2rem; margin-bottom: var(--space-2);">💸</div>
        <div class="stat-value" style="font-size: var(--text-3xl);">₹${totalSpent.toLocaleString()}</div>
        <div class="stat-label">Total Spent</div>
      </div>

      <!-- Total Trips -->
      <div class="stat-card" style="display: flex; flex-direction: column; justify-content: center;">
        <div style="font-size: 2rem; margin-bottom: var(--space-2);">🧾</div>
        <div class="stat-value" style="font-size: var(--text-3xl);">${bookings.length + 3}</div>
        <div class="stat-label">Total Transactions</div>
      </div>
    </div>
  `;
}

function renderWalletTab() {
  const transactions = [
    { id: 'W001', type: 'credit', amount: 5000, description: 'Wallet Top-up via Card', date: '2026-04-20', balance: 5000 },
    { id: 'W002', type: 'credit', amount: 500, description: 'Referral Bonus - FRIEND50', date: '2026-05-01', balance: 5500 },
    { id: 'W003', type: 'debit', amount: 500, description: 'Booking Discount Applied', date: '2026-05-18', balance: 5000 },
    ...(AppState.walletTransactions || []),
  ];

  return `
    <div class="animate-fade-in">
      <div class="admin-table-container">
        <div class="admin-table-header">
          <h4 class="admin-table-title">Wallet Transactions</h4>
          <button class="btn btn-primary btn-sm" onclick="showAddMoneyModal()">➕ Add Money</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(t => `
                <tr>
                  <td style="font-family: monospace; color: var(--color-text-muted);">${t.id}</td>
                  <td style="color: var(--color-text-tertiary);">${t.date}</td>
                  <td style="font-weight: 500;">${t.description}</td>
                  <td><span class="badge ${t.type === 'credit' ? 'badge-success' : 'badge-danger'}">${t.type}</span></td>
                  <td style="font-weight: 700; color: ${t.type === 'credit' ? 'var(--color-success-light)' : 'var(--color-danger-light)'};">
                    ${t.type === 'credit' ? '+' : '-'}₹${t.amount.toLocaleString()}
                  </td>
                  <td style="font-weight: 600;">₹${t.balance.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderPaymentsFullTab() {
  const bookings = AppState.bookings || [];
  const seededPayments = [
    { id: 'PAY-001', date: '2026-06-05', method: 'Credit Card (****4242)', car: '🚙 Hyundai Creta', amount: 6250, status: 'success' },
    { id: 'PAY-002', date: '2026-05-18', method: 'Credit Card (****8888)', car: '🛻 Mahindra Thar', amount: 7986, status: 'success' },
    { id: 'PAY-003', date: '2026-04-29', method: 'UPI', car: '🏎️ BMW 3 Series', amount: 17459, status: 'success' },
  ];

  // Add payments from actual bookings
  const newPayments = bookings.map((b, i) => ({
    id: `PAY-${100 + i}`,
    date: b.bookedAt ? new Date(b.bookedAt).toLocaleDateString() : 'N/A',
    method: 'Credit Card (****4242)',
    car: `${b.carEmoji || '🚗'} ${b.carName}`,
    amount: b.total || 0,
    status: b.status === 'cancelled' ? 'refunded' : 'success',
  }));

  const allPayments = [...newPayments, ...seededPayments];

  return `
    <div class="animate-fade-in">
      <div class="admin-table-container">
        <div class="admin-table-header">
          <h4 class="admin-table-title">Payment History</h4>
          <div class="admin-table-actions">
            <select class="select" style="width: 140px;">
              <option>All Status</option>
              <option>Success</option>
              <option>Refunded</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Method</th>
                <th>Car</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              ${allPayments.map(p => `
                <tr>
                  <td style="font-family: monospace; color: var(--color-primary-light);">${p.id}</td>
                  <td style="color: var(--color-text-tertiary);">${p.date}</td>
                  <td style="font-size: var(--text-xs);">${p.method}</td>
                  <td style="font-weight: 500;">${p.car}</td>
                  <td style="font-weight: 700;">₹${p.amount.toLocaleString()}</td>
                  <td>
                    <span class="badge ${p.status === 'success' ? 'badge-success' : p.status === 'refunded' ? 'badge-warning' : 'badge-primary'}">
                      ${p.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-ghost btn-sm" onclick="viewInvoice('${p.id}')">📄</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="admin-table-footer">
          <span>Showing ${allPayments.length} payments</span>
          <span>Total: ₹${allPayments.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

function renderInvoicesTab() {
  const invoices = [
    { id: 'INV-2026-0001', date: '2026-05-18', car: '🛻 Mahindra Thar', base: 6598, gst: 1188, total: 7986 },
    { id: 'INV-2026-0002', date: '2026-04-29', car: '🏎️ BMW 3 Series', base: 13998, gst: 2663, total: 17459 },
  ];

  // Add from bookings
  (AppState.bookings || []).forEach((b, i) => {
    invoices.unshift({
      id: `INV-2026-${(3 + i).toString().padStart(4, '0')}`,
      date: b.bookedAt ? new Date(b.bookedAt).toLocaleDateString() : 'N/A',
      car: `${b.carEmoji || '🚗'} ${b.carName}`,
      base: Math.round((b.total || 0) / 1.18),
      gst: Math.round((b.total || 0) - (b.total || 0) / 1.18),
      total: b.total || 0,
    });
  });

  return `
    <div class="animate-fade-in">
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        ${invoices.map(inv => `
          <div style="display: flex; align-items: center; gap: var(--space-5); padding: var(--space-5); background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
            <div style="width: 50px; height: 50px; background: var(--color-primary-subtle); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📄</div>
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: var(--text-sm); color: var(--color-primary-light); font-family: monospace;">${inv.id}</div>
              <div style="font-size: var(--text-sm); margin-top: 2px;">${inv.car}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">${inv.date}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Base: ₹${inv.base.toLocaleString()} + GST: ₹${inv.gst.toLocaleString()}</div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: var(--text-lg); color: var(--color-text-primary);">₹${inv.total.toLocaleString()}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="downloadInvoice('${inv.id}', '${inv.car}', ${inv.base}, ${inv.gst}, ${inv.total}, '${inv.date}')">
              ⬇️ Download
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTaxTab() {
  const bookings = AppState.bookings || [];
  const seededTotal = 7986 + 17459;
  const bookingTotal = bookings.reduce((s, b) => s + (b.total || 0), 0);
  const grandTotal = seededTotal + bookingTotal;

  const baseTotal = Math.round(grandTotal / 1.18);
  const gstTotal = grandTotal - baseTotal;
  const cgst = Math.round(gstTotal / 2);
  const sgst = gstTotal - cgst;

  const currentFY = '2025-2026';

  return `
    <div class="animate-fade-in">
      <!-- FY Header -->
      <div style="margin-bottom: var(--space-6); padding: var(--space-5); background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h4>Financial Year ${currentFY}</h4>
            <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">Tax summary for all bookings</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="showToast('info', 'Coming Soon', 'Tax report download coming soon')">📥 Download Tax Report</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-5); margin-bottom: var(--space-8);">
        <div class="stat-card">
          <div style="font-size: 1.5rem; margin-bottom: var(--space-2);">💰</div>
          <div class="stat-value" style="font-size: var(--text-2xl);">₹${grandTotal.toLocaleString()}</div>
          <div class="stat-label">Total Amount (incl. GST)</div>
        </div>
        <div class="stat-card">
          <div style="font-size: 1.5rem; margin-bottom: var(--space-2);">📋</div>
          <div class="stat-value" style="font-size: var(--text-2xl);">₹${baseTotal.toLocaleString()}</div>
          <div class="stat-label">Base Amount</div>
        </div>
        <div class="stat-card">
          <div style="font-size: 1.5rem; margin-bottom: var(--space-2);">🏛️</div>
          <div class="stat-value" style="font-size: var(--text-2xl);">₹${gstTotal.toLocaleString()}</div>
          <div class="stat-label">Total GST (18%)</div>
        </div>
        <div class="stat-card">
          <div style="font-size: 1.5rem; margin-bottom: var(--space-2);">📊</div>
          <div class="stat-value" style="font-size: var(--text-2xl);">${bookings.length + 2}</div>
          <div class="stat-label">Taxable Transactions</div>
        </div>
      </div>

      <!-- GST Breakdown -->
      <div class="admin-table-container">
        <div class="admin-table-header">
          <h4 class="admin-table-title">GST Breakdown</h4>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Rate</th>
                <th>Taxable Amount</th>
                <th>Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: 600;">CGST</td>
                <td>9%</td>
                <td>₹${baseTotal.toLocaleString()}</td>
                <td style="font-weight: 700; color: var(--color-warning-light);">₹${cgst.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="font-weight: 600;">SGST</td>
                <td>9%</td>
                <td>₹${baseTotal.toLocaleString()}</td>
                <td style="font-weight: 700; color: var(--color-warning-light);">₹${sgst.toLocaleString()}</td>
              </tr>
              <tr style="background: var(--color-bg-input);">
                <td style="font-weight: 800;">Total GST</td>
                <td style="font-weight: 800;">18%</td>
                <td style="font-weight: 800;">₹${baseTotal.toLocaleString()}</td>
                <td style="font-weight: 800; color: var(--color-accent);">₹${gstTotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TDS Info -->
      <div style="margin-top: var(--space-6); padding: var(--space-6); background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
        <h4 style="margin-bottom: var(--space-3);">ℹ️ TDS Information</h4>
        <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: var(--leading-relaxed);">
          As per Indian tax regulations, TDS at 1% is deducted on rental income above ₹50,000 per annum under Section 194-IB.
          For hosts earning through DriveEase, applicable TDS is deducted at source and reflected in your earnings statement.
          You can download Form 26AS from the Income Tax portal for TDS certificate details.
        </p>
      </div>
    </div>
  `;
}

// ---- Finance Actions ----
function switchFinanceTab(tab) {
  AppState.financeTab = tab;
  renderPage(renderFinancePage);
}

function showAddMoneyModal() {
  const existing = document.getElementById('addmoney-overlay');
  if (existing) existing.remove();

  const html = `
    <div class="modal-overlay" id="addmoney-overlay" onclick="if(event.target===this) document.getElementById('addmoney-overlay').remove()">
      <div class="modal" style="max-width: 400px;">
        <div class="modal-header">
          <h3>💳 Add Money to Wallet</h3>
          <button class="modal-close" onclick="document.getElementById('addmoney-overlay').remove()">✕</button>
        </div>
        <div class="modal-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-4);">
            ${[500, 1000, 2000, 3000, 5000, 10000].map(amt => `
              <button class="btn btn-secondary" onclick="document.getElementById('add-amount').value='${amt}'" style="padding: var(--space-2);">₹${amt.toLocaleString()}</button>
            `).join('')}
          </div>
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label for="add-amount">Amount (₹)</label>
            <input type="number" class="input" id="add-amount" placeholder="Enter amount" min="100" value="1000">
          </div>
          <div class="input-group" style="margin-bottom: var(--space-6);">
            <label>Payment Method</label>
            <div style="display: flex; gap: var(--space-3);">
              <button class="btn btn-secondary btn-sm" style="flex: 1;">💳 Card</button>
              <button class="btn btn-secondary btn-sm" style="flex: 1;">📱 UPI</button>
              <button class="btn btn-secondary btn-sm" style="flex: 1;">🏦 NetBanking</button>
            </div>
          </div>
          <button class="btn btn-primary btn-full btn-lg" onclick="addMoneyToWallet()">Add Money →</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

function addMoneyToWallet() {
  const amount = parseInt(document.getElementById('add-amount')?.value || 0);
  if (amount < 100) {
    showToast('error', 'Invalid Amount', 'Minimum top-up amount is ₹100');
    return;
  }

  // Update wallet
  if (AppState.currentUser) {
    AppState.currentUser.walletBalance = (AppState.currentUser.walletBalance || 0) + amount;
  }

  AppState.walletTransactions = AppState.walletTransactions || [];
  AppState.walletTransactions.push({
    id: 'W' + Date.now().toString().slice(-6),
    type: 'credit',
    amount: amount,
    description: 'Wallet Top-up via Card',
    date: new Date().toLocaleDateString(),
    balance: AppState.currentUser?.walletBalance || amount,
  });

  saveState();

  document.getElementById('addmoney-overlay')?.remove();
  showToast('success', 'Money Added!', `₹${amount.toLocaleString()} added to your wallet`);
  renderPage(renderFinancePage);
}

function viewInvoice(paymentId) {
  showToast('info', 'Invoice', `Generating invoice for ${paymentId}...`);
  // Generate and download
  setTimeout(() => {
    downloadInvoice(paymentId, 'Car Rental', 0, 0, 0, new Date().toLocaleDateString());
  }, 500);
}

function downloadInvoice(id, car, base, gst, total, date) {
  const invoiceHtml = generateInvoiceHTML(id, car, base, gst, total, date);
  const blob = new Blob([invoiceHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${id}.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('success', 'Invoice Downloaded', `Invoice ${id} saved`);
}
