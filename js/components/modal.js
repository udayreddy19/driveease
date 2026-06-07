// ========================================
// DriveEase — Auth Modal Component (Updated)
// Supports admin/host/user roles
// ========================================

function openAuthModal(tab = 'login') {
  AppState.authModalTab = tab;
  renderAuthModal();
}

function closeAuthModal() {
  const overlay = document.getElementById('auth-modal-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeIn 0.2s var(--ease-out) reverse';
    setTimeout(() => overlay.remove(), 200);
  }
}

function renderAuthModal() {
  const existing = document.getElementById('auth-modal-overlay');
  if (existing) existing.remove();

  const tab = AppState.authModalTab || 'login';

  const html = `
    <div class="modal-overlay" id="auth-modal-overlay" onclick="if(event.target === this) closeAuthModal()">
      <div class="modal" id="auth-modal">
        <div class="modal-header">
          <h3>${tab === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
          <button class="modal-close" onclick="closeAuthModal()" id="auth-modal-close" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-tabs">
            <button class="modal-tab ${tab === 'login' ? 'active' : ''}" onclick="switchAuthTab('login')" id="tab-login">Login</button>
            <button class="modal-tab ${tab === 'signup' ? 'active' : ''}" onclick="switchAuthTab('signup')" id="tab-signup">Sign Up</button>
          </div>

          ${tab === 'login' ? renderLoginForm() : renderSignupForm()}

          <div class="modal-divider">or continue with</div>

          <div class="social-login-btns">
            <button class="social-btn" onclick="handleSocialLogin('google')" id="google-login-btn">
              <span>🔵</span> Google
            </button>
            <button class="social-btn" onclick="handleSocialLogin('apple')" id="apple-login-btn">
              <span>🍎</span> Apple
            </button>
          </div>

          <!-- Quick login hint -->
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--color-bg-glass); border-radius: var(--radius-md); border: var(--glass-border);">
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); text-align: center; margin-bottom: var(--space-2);">
              🔑 Quick Login Credentials
            </p>
            <div style="display: flex; gap: var(--space-2); justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-ghost btn-sm" onclick="quickLogin('admin')" style="font-size: 11px; padding: 4px 10px;">
                ⚡ Admin
              </button>
              <button class="btn btn-ghost btn-sm" onclick="quickLogin('user')" style="font-size: 11px; padding: 4px 10px;">
                👤 User
              </button>
              <button class="btn btn-ghost btn-sm" onclick="quickLogin('host')" style="font-size: 11px; padding: 4px 10px;">
                🚗 Host
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

function renderLoginForm() {
  return `
    <form onsubmit="handleLogin(event)" id="login-form">
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="login-email">Email Address</label>
        <input type="email" class="input" id="login-email" placeholder="you@example.com" required>
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="login-password">Password</label>
        <input type="password" class="input" id="login-password" placeholder="Enter your password" required minlength="4">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
        <label class="checkbox-label">
          <input type="checkbox" checked> Remember me
        </label>
        <a href="#" onclick="event.preventDefault(); showToast('info', 'Reset Link', 'Password reset link sent to your email')" style="font-size: var(--text-sm); color: var(--color-primary-light);">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary btn-full btn-lg" id="login-submit-btn">
        Login
      </button>
    </form>
  `;
}

function renderSignupForm() {
  return `
    <form onsubmit="handleSignup(event)" id="signup-form">
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="signup-name">Full Name</label>
        <input type="text" class="input" id="signup-name" placeholder="John Doe" required>
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="signup-email">Email Address</label>
        <input type="email" class="input" id="signup-email" placeholder="you@example.com" required>
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="signup-phone">Phone Number</label>
        <input type="tel" class="input" id="signup-phone" placeholder="+91 98765 43210" required>
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="signup-password">Password</label>
        <input type="password" class="input" id="signup-password" placeholder="Min 6 characters" required minlength="6">
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label for="signup-role">I want to</label>
        <select class="input select" id="signup-role">
          <option value="user">🚗 Rent Cars (User)</option>
          <option value="host">🏠 List My Cars (Host)</option>
        </select>
      </div>
      <div style="margin-bottom: var(--space-6);">
        <label class="checkbox-label">
          <input type="checkbox" required> I agree to the <a href="#" style="color: var(--color-primary-light);">Terms of Service</a> and <a href="#" style="color: var(--color-primary-light);">Privacy Policy</a>
        </label>
      </div>
      <button type="submit" class="btn btn-primary btn-full btn-lg" id="signup-submit-btn">
        Create Account
      </button>
    </form>
  `;
}

function switchAuthTab(tab) {
  AppState.authModalTab = tab;
  renderAuthModal();
}

// ---- Quick Login for Demo ----
function quickLogin(role) {
  const accounts = {
    admin: { name: 'Admin', email: 'admin@driveease.com', phone: '+91 90000 00000', role: 'admin', walletBalance: 0, joinDate: 'Jan 2023' },
    user: { name: 'Demo User', email: 'demo@driveease.com', phone: '+91 98765 43210', role: 'user', walletBalance: 5000, joinDate: 'Jun 2024' },
    host: { name: 'Rahul Kumar', email: 'rahul@driveease.com', phone: '+91 87654 32100', role: 'host', walletBalance: 45000, joinDate: 'Aug 2023' },
  };

  const account = accounts[role];
  if (!account) return;

  AppState.isLoggedIn = true;
  AppState.currentUser = account;
  saveState();
  closeAuthModal();

  const roleEmoji = { admin: '⚡', user: '👤', host: '🚗' };
  showToast('success', `${roleEmoji[role]} Welcome!`, `Logged in as ${account.name} (${role})`);

  setTimeout(() => {
    renderApp();
    if (role === 'admin') {
      navigateTo('/admin');
    } else {
      router.resolve();
    }
  }, 300);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showToast('error', 'Error', 'Please fill in all fields');
    return;
  }

  // Check for known accounts
  const knownAccounts = {
    'admin@driveease.com': { name: 'Admin', role: 'admin', password: 'admin123', walletBalance: 0 },
    'demo@driveease.com': { name: 'Demo User', role: 'user', password: 'demo123', walletBalance: 5000 },
    'rahul@driveease.com': { name: 'Rahul Kumar', role: 'host', password: 'host123', walletBalance: 45000 },
  };

  const known = knownAccounts[email.toLowerCase()];
  if (known) {
    if (password !== known.password) {
      showToast('error', 'Wrong Password', 'Please check your credentials');
      return;
    }
    AppState.isLoggedIn = true;
    AppState.currentUser = {
      name: known.name,
      email: email.toLowerCase(),
      phone: '+91 98765 43210',
      role: known.role,
      walletBalance: known.walletBalance,
      joinDate: 'Jan 2024',
    };
  } else {
    // Generic login
    AppState.isLoggedIn = true;
    AppState.currentUser = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: email,
      phone: '+91 98765 43210',
      role: 'user',
      walletBalance: 1000,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
  }

  saveState();
  closeAuthModal();
  showToast('success', 'Welcome back!', `Logged in as ${AppState.currentUser.name} (${AppState.currentUser.role})`);

  setTimeout(() => {
    renderApp();
    if (AppState.currentUser.role === 'admin') {
      navigateTo('/admin');
    } else {
      router.resolve();
    }
  }, 300);
}

function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role')?.value || 'user';

  if (!name || !email || !phone || !password) {
    showToast('error', 'Error', 'Please fill in all fields');
    return;
  }

  // Save to IndexedDB
  if (db.ready) {
    db.add('users', {
      name, email, phone, password, role,
      walletBalance: 1000,
      joinDate: new Date().toISOString(),
      status: 'active',
    }).catch(e => console.warn('DB save failed:', e));
  }

  AppState.isLoggedIn = true;
  AppState.currentUser = {
    name, email, phone, role,
    walletBalance: 1000,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  saveState();
  closeAuthModal();
  showToast('success', 'Account Created!', `Welcome to DriveEase, ${name.split(' ')[0]}! (${role})`);

  setTimeout(() => {
    renderApp();
    if (role === 'host') {
      navigateTo('/host');
    } else {
      router.resolve();
    }
  }, 300);
}

function handleSocialLogin(provider) {
  AppState.isLoggedIn = true;
  AppState.currentUser = {
    name: 'Alex Johnson',
    email: `alex.johnson@${provider}.com`,
    phone: '+91 98765 43210',
    role: 'user',
    walletBalance: 2000,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  saveState();
  closeAuthModal();
  showToast('success', 'Welcome!', `Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);

  setTimeout(() => {
    renderApp();
    router.resolve();
  }, 300);
}

function handleLogout() {
  AppState.isLoggedIn = false;
  AppState.currentUser = null;
  AppState.adminTab = 'overview';
  AppState.financeTab = 'wallet';
  saveState();
  showToast('info', 'Logged Out', 'See you soon!');
  navigateTo('/');
  setTimeout(() => {
    renderApp();
    router.resolve();
  }, 100);
}
