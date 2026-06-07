// ========================================
// DriveEase — Auth Modal (Light Theme)
// ========================================

function openAuthModal() {
  const existing = document.getElementById('auth-overlay');
  if (existing) existing.remove();

  const html = `
    <div class="modal-overlay" id="auth-overlay" onclick="if(event.target===this) closeAuthModal()">
      <div class="modal" style="max-width: 440px;">
        <div class="modal-header">
          <h3>Welcome to DriveEase</h3>
          <button class="modal-close" onclick="closeAuthModal()">✕</button>
        </div>
        <div class="modal-body">
          <!-- Tabs -->
          <div class="modal-tabs">
            <button class="modal-tab active" onclick="switchAuthTab('login', this)">Login</button>
            <button class="modal-tab" onclick="switchAuthTab('signup', this)">Sign Up</button>
          </div>

          <div id="auth-form-content">
            ${renderLoginForm()}
          </div>

          <!-- Quick Login -->
          <div class="modal-divider">or quick login as</div>
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-secondary btn-sm" style="flex: 1; border-radius: var(--radius-full);" onclick="quickLogin('admin')">
              ⚡ Admin
            </button>
            <button class="btn btn-secondary btn-sm" style="flex: 1; border-radius: var(--radius-full);" onclick="quickLogin('user')">
              👤 User
            </button>
            <button class="btn btn-secondary btn-sm" style="flex: 1; border-radius: var(--radius-full);" onclick="quickLogin('host')">
              🚗 Host
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

function renderLoginForm() {
  return `
    <div id="login-form">
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label>Phone Number or Email</label>
        <input type="text" class="input" id="login-email" placeholder="Enter phone number or email" autofocus>
      </div>
      <div class="input-group" style="margin-bottom: var(--space-6);">
        <label>Password</label>
        <input type="password" class="input" id="login-password" placeholder="Enter your password"
               onkeydown="if(event.key==='Enter') handleLogin()">
      </div>
      <button class="btn btn-primary btn-full btn-lg" onclick="handleLogin()">Login</button>
    </div>
  `;
}

function renderSignupForm() {
  return `
    <div id="signup-form">
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label>Full Name</label>
        <input type="text" class="input" id="signup-name" placeholder="Enter your full name" autofocus>
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label>Email</label>
        <input type="email" class="input" id="signup-email" placeholder="Enter your email">
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label>Phone Number</label>
        <input type="tel" class="input" id="signup-phone" placeholder="Enter phone number">
      </div>
      <div class="input-group" style="margin-bottom: var(--space-4);">
        <label>Password</label>
        <input type="password" class="input" id="signup-password" placeholder="Create a password">
      </div>
      <div style="margin-bottom: var(--space-6);">
        <label style="font-size: var(--text-xs); font-weight: 600; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: var(--tracking-wider); display: block; margin-bottom: var(--space-2);">I want to</label>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn-outline btn-sm role-btn active" onclick="selectRole(this, 'user')" style="flex: 1; border-radius: var(--radius-full);">🚗 Rent Cars</button>
          <button class="btn btn-outline btn-sm role-btn" onclick="selectRole(this, 'host')" style="flex: 1; border-radius: var(--radius-full);">🏢 List My Cars</button>
        </div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" onclick="handleSignup()">Create Account</button>
    </div>
  `;
}

function switchAuthTab(tab, btn) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const content = document.getElementById('auth-form-content');
  if (content) {
    content.innerHTML = tab === 'login' ? renderLoginForm() : renderSignupForm();
    content.style.animation = 'fadeIn 0.2s var(--ease-out)';
  }
}

function selectRole(btn, role) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AppState._signupRole = role;
}

function handleLogin() {
  const email = document.getElementById('login-email')?.value?.trim();
  const password = document.getElementById('login-password')?.value?.trim();

  if (!email) {
    showToast('warning', 'Required', 'Please enter email or phone');
    return;
  }

  // Check known accounts
  const knownUsers = {
    'admin@driveease.com': { name: 'Admin User', email: 'admin@driveease.com', role: 'admin', id: 1, walletBalance: 10000, isVerified: true, phone: '9876543210', password: 'admin123' },
    'demo@driveease.com': { name: 'Udaykumar Thalamati', email: 'demo@driveease.com', role: 'user', id: 2, walletBalance: 5000, isVerified: true, phone: '9110530889', password: 'demo123' },
    'rahul@driveease.com': { name: 'Rahul Kumar', email: 'rahul@driveease.com', role: 'host', id: 3, walletBalance: 25000, isVerified: true, phone: '9876543211', password: 'host123' },
  };

  const foundUser = knownUsers[email];
  if (foundUser) {
    if (password && foundUser.password !== password) {
      showToast('error', 'Invalid Password', 'The password you entered is incorrect');
      return;
    }
    loginUser(foundUser);
  } else {
    // Create new user
    loginUser({
      name: email.split('@')[0] || 'User',
      email: email,
      role: 'user',
      id: Date.now(),
      walletBalance: 1000,
      isVerified: false,
      phone: '',
    });
  }
}

function handleSignup() {
  const name = document.getElementById('signup-name')?.value?.trim();
  const email = document.getElementById('signup-email')?.value?.trim();
  const phone = document.getElementById('signup-phone')?.value?.trim();
  const password = document.getElementById('signup-password')?.value?.trim();
  const role = AppState._signupRole || 'user';

  if (!name || !email) {
    showToast('warning', 'Required', 'Please fill in name and email');
    return;
  }

  loginUser({
    name,
    email,
    phone,
    role,
    id: Date.now(),
    walletBalance: 1000,
    isVerified: false,
  });
}

function quickLogin(role) {
  const users = {
    admin: { name: 'Admin User', email: 'admin@driveease.com', role: 'admin', id: 1, walletBalance: 10000, isVerified: true, phone: '9876543210' },
    user: { name: 'Udaykumar Thalamati', email: 'demo@driveease.com', role: 'user', id: 2, walletBalance: 5000, isVerified: true, phone: '9110530889' },
    host: { name: 'Rahul Kumar', email: 'rahul@driveease.com', role: 'host', id: 3, walletBalance: 25000, isVerified: true, phone: '9876543211' },
  };

  loginUser(users[role]);
}

function loginUser(user) {
  AppState.currentUser = user;
  localStorage.setItem('driveease_user', JSON.stringify(user));
  closeAuthModal();
  showToast('success', `Welcome, ${user.name}!`, `Logged in as ${user.role}`);

  // Redirect based on role
  if (user.role === 'admin') {
    navigateTo('/admin');
  } else if (user.role === 'host') {
    navigateTo('/host');
  } else {
    // Refresh current page to show logged-in state
    renderApp();
  }
}

function closeAuthModal() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.remove();
}
