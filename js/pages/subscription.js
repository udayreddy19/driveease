// ========================================
// DriveEase — Subscriptions Page
// ========================================

const SUBSCRIPTION_PLANS = [
  {
    id: 'flexi',
    name: 'Flexi',
    tagline: 'Try before you commit',
    duration: '1 Month',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    features: [
      '1 month commitment',
      'Unlimited kms',
      '24/7 roadside assistance',
      'Damage protection included',
      'Flexible cancellation',
    ],
    plans: [
      { type: 'Hatchback', car: 'Maruti Swift / i20', price: 15999, originalPrice: 19999, emoji: '🚗' },
      { type: 'Sedan', car: 'Honda City / Verna', price: 22999, originalPrice: 27999, emoji: '🚘' },
      { type: 'SUV', car: 'Creta / Seltos', price: 29999, originalPrice: 35999, emoji: '🚙' },
      { type: 'Luxury', car: 'BMW 3 / C-Class', price: 59999, originalPrice: 74999, emoji: '🏎️' },
    ],
    popular: false,
  },
  {
    id: 'value',
    name: 'Value',
    tagline: 'Most Popular Choice',
    duration: '3 Months',
    icon: '🔥',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
    features: [
      '3 month commitment',
      'Unlimited kms',
      '24/7 roadside assistance',
      'Damage protection included',
      'Free car swap once',
      '₹500 fuel credits/month',
      'Priority customer support',
    ],
    plans: [
      { type: 'Hatchback', car: 'Maruti Swift / i20', price: 13999, originalPrice: 19999, emoji: '🚗' },
      { type: 'Sedan', car: 'Honda City / Verna', price: 19999, originalPrice: 27999, emoji: '🚘' },
      { type: 'SUV', car: 'Creta / Seltos', price: 25999, originalPrice: 35999, emoji: '🚙' },
      { type: 'Luxury', car: 'BMW 3 / C-Class', price: 49999, originalPrice: 74999, emoji: '🏎️' },
    ],
    popular: true,
  },
  {
    id: 'super',
    name: 'Super Saver',
    tagline: 'Maximum Savings',
    duration: '6 Months',
    icon: '💎',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    features: [
      '6 month commitment',
      'Unlimited kms',
      '24/7 roadside assistance',
      'Damage protection included',
      'Free car swap twice',
      '₹1000 fuel credits/month',
      'Priority customer support',
      'Free maintenance',
      'Airport transfers (2/month)',
    ],
    plans: [
      { type: 'Hatchback', car: 'Maruti Swift / i20', price: 11999, originalPrice: 19999, emoji: '🚗' },
      { type: 'Sedan', car: 'Honda City / Verna', price: 17999, originalPrice: 27999, emoji: '🚘' },
      { type: 'SUV', car: 'Creta / Seltos', price: 22999, originalPrice: 35999, emoji: '🚙' },
      { type: 'Luxury', car: 'BMW 3 / C-Class', price: 44999, originalPrice: 74999, emoji: '🏎️' },
    ],
    popular: false,
  },
  {
    id: 'annual',
    name: 'Annual',
    tagline: 'Own-Like Experience',
    duration: '12 Months',
    icon: '👑',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
    features: [
      '12 month commitment',
      'Unlimited kms',
      '24/7 roadside assistance',
      'Damage protection included',
      'Unlimited car swaps',
      '₹2000 fuel credits/month',
      'Dedicated relationship manager',
      'Free maintenance & servicing',
      'Airport transfers (4/month)',
      'Option to buy at discounted price',
    ],
    plans: [
      { type: 'Hatchback', car: 'Maruti Swift / i20', price: 9999, originalPrice: 19999, emoji: '🚗' },
      { type: 'Sedan', car: 'Honda City / Verna', price: 14999, originalPrice: 27999, emoji: '🚘' },
      { type: 'SUV', car: 'Creta / Seltos', price: 19999, originalPrice: 35999, emoji: '🚙' },
      { type: 'Luxury', car: 'BMW 3 / C-Class', price: 39999, originalPrice: 74999, emoji: '🏎️' },
    ],
    popular: false,
  },
];

const SUBSCRIPTION_CARS = [
  { id: 's1', name: 'Maruti Swift', brand: 'Maruti Suzuki', year: 2024, type: 'hatchback', emoji: '🚗', fuel: 'Petrol', seats: 5, transmission: 'Manual', monthlyPrice: 11999, color: '#3b82f6' },
  { id: 's2', name: 'Hyundai i20', brand: 'Hyundai', year: 2024, type: 'hatchback', emoji: '🚗', fuel: 'Petrol', seats: 5, transmission: 'Manual', monthlyPrice: 13499, color: '#10b981' },
  { id: 's3', name: 'Honda City', brand: 'Honda', year: 2024, type: 'sedan', emoji: '🚘', fuel: 'Petrol', seats: 5, transmission: 'Automatic', monthlyPrice: 17999, color: '#f59e0b' },
  { id: 's4', name: 'Hyundai Verna', brand: 'Hyundai', year: 2025, type: 'sedan', emoji: '🚘', fuel: 'Petrol', seats: 5, transmission: 'Automatic', monthlyPrice: 19999, color: '#8b5cf6' },
  { id: 's5', name: 'Hyundai Creta', brand: 'Hyundai', year: 2025, type: 'suv', emoji: '🚙', fuel: 'Diesel', seats: 5, transmission: 'Automatic', monthlyPrice: 22999, color: '#ef4444' },
  { id: 's6', name: 'Kia Seltos', brand: 'Kia', year: 2025, type: 'suv', emoji: '🚙', fuel: 'Petrol', seats: 5, transmission: 'Automatic', monthlyPrice: 24999, color: '#6366f1' },
  { id: 's7', name: 'Mahindra XUV700', brand: 'Mahindra', year: 2025, type: 'suv', emoji: '🚙', fuel: 'Diesel', seats: 7, transmission: 'Automatic', monthlyPrice: 29999, color: '#dc2626' },
  { id: 's8', name: 'BMW 3 Series', brand: 'BMW', year: 2024, type: 'luxury', emoji: '🏎️', fuel: 'Petrol', seats: 5, transmission: 'Automatic', monthlyPrice: 44999, color: '#1e40af' },
];

// ---- State ----
let subState = {
  selectedPlan: 'value',
  selectedCarType: 'all',
  selectedDuration: '3',
  calcCarType: 'sedan',
  calcDuration: '6',
  activeTab: 'plans', // plans | cars | my-subscriptions
};

function renderSubscriptionPage() {
  const hasActiveSub = AppState.currentUser && AppState.subscriptions && AppState.subscriptions.length > 0;
  
  return `
    <!-- Subscription Hero -->
    <section class="sub-hero">
      <div class="container">
        <div class="sub-hero-content">
          <div class="sub-hero-badge animate-fade-in-up">🚗 CAR SUBSCRIPTION</div>
          <h1 class="sub-hero-title animate-fade-in-up">Drive Your Dream Car<br><span class="sub-hero-accent">Without Owning It</span></h1>
          <p class="sub-hero-desc animate-fade-in-up animate-delay-1">Monthly car subscriptions from ₹9,999/mo. All-inclusive — insurance, maintenance, roadside assistance. Zero down payment.</p>
          <div class="sub-hero-stats animate-fade-in-up animate-delay-2">
            <div class="sub-hero-stat">
              <div class="sub-hero-stat-value">5,000+</div>
              <div class="sub-hero-stat-label">Active Subscribers</div>
            </div>
            <div class="sub-hero-stat">
              <div class="sub-hero-stat-value">₹0</div>
              <div class="sub-hero-stat-label">Down Payment</div>
            </div>
            <div class="sub-hero-stat">
              <div class="sub-hero-stat-value">50+</div>
              <div class="sub-hero-stat-label">Car Models</div>
            </div>
            <div class="sub-hero-stat">
              <div class="sub-hero-stat-value">30+</div>
              <div class="sub-hero-stat-label">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <section style="background: white; border-bottom: 1px solid var(--color-border); position: sticky; top: 60px; z-index: 90;">
      <div class="container">
        <div class="sub-tabs">
          <button class="sub-tab ${subState.activeTab === 'plans' ? 'active' : ''}" onclick="switchSubTab('plans')">📋 Plans & Pricing</button>
          <button class="sub-tab ${subState.activeTab === 'cars' ? 'active' : ''}" onclick="switchSubTab('cars')">🚗 Available Cars</button>
          <button class="sub-tab ${subState.activeTab === 'my-subscriptions' ? 'active' : ''}" onclick="switchSubTab('my-subscriptions')">📊 My Subscriptions</button>
        </div>
      </div>
    </section>

    <div id="sub-content">
      ${renderSubTabContent()}
    </div>
  `;
}

function renderSubTabContent() {
  switch (subState.activeTab) {
    case 'cars': return renderSubCarsTab();
    case 'my-subscriptions': return renderMySubscriptionsTab();
    default: return renderSubPlansTab();
  }
}

function switchSubTab(tab) {
  subState.activeTab = tab;
  const el = document.getElementById('sub-content');
  if (el) el.innerHTML = renderSubTabContent();
  // Update tab buttons
  document.querySelectorAll('.sub-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(tab.replace('-', ' ').split(' ')[0]));
  });
  // Re-highlight the correct tab
  document.querySelectorAll('.sub-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.sub-tab')[tab === 'plans' ? 0 : tab === 'cars' ? 1 : 2]?.classList.add('active');
}

// ========== Plans Tab ==========
function renderSubPlansTab() {
  return `
    <!-- Duration Selector -->
    <section style="background: white; padding: var(--space-6) 0;">
      <div class="container">
        <div class="sub-duration-selector">
          <span style="font-weight: 600; color: var(--color-text-secondary); font-size: var(--text-sm);">Select Duration:</span>
          <div class="sub-duration-pills">
            <button class="sub-pill ${subState.selectedDuration === '1' ? 'active' : ''}" onclick="selectSubDuration('1')">1 Month</button>
            <button class="sub-pill ${subState.selectedDuration === '3' ? 'active' : ''}" onclick="selectSubDuration('3')">3 Months <span class="sub-pill-badge">POPULAR</span></button>
            <button class="sub-pill ${subState.selectedDuration === '6' ? 'active' : ''}" onclick="selectSubDuration('6')">6 Months</button>
            <button class="sub-pill ${subState.selectedDuration === '12' ? 'active' : ''}" onclick="selectSubDuration('12')">12 Months <span class="sub-pill-badge save">SAVE 50%</span></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan Cards -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Choose Your Plan</h2>
        <p class="section-subtitle">All plans include insurance, maintenance & roadside assistance</p>
        <div class="sub-plan-grid">
          ${renderPlanCards()}
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="section" style="background: white;">
      <div class="container">
        <h2 class="section-title">Compare Plans</h2>
        <p class="section-subtitle">See what's included in each plan</p>
        <div class="sub-compare-table-wrapper">
          ${renderComparisonTable()}
        </div>
      </div>
    </section>

    <!-- Earnings Calculator -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Savings Calculator</h2>
        <p class="section-subtitle">See how much you save compared to buying or renting daily</p>
        <div class="sub-calculator card">
          ${renderSavingsCalculator()}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" style="background: white;">
      <div class="container">
        <h2 class="section-title">How Car Subscription Works</h2>
        <p class="section-subtitle">Get started in 4 simple steps</p>
        <div class="sub-steps-grid">
          <div class="sub-step-card animate-fade-in-up">
            <div class="sub-step-icon" style="background: rgba(99, 102, 241, 0.1); color: #6366F1;">📋</div>
            <div class="sub-step-number">1</div>
            <h4>Choose Plan & Car</h4>
            <p>Select duration, car type, and the car that fits your lifestyle.</p>
          </div>
          <div class="sub-step-card animate-fade-in-up animate-delay-1">
            <div class="sub-step-icon" style="background: rgba(245, 158, 11, 0.1); color: #F59E0B;">📄</div>
            <div class="sub-step-number">2</div>
            <h4>Upload Documents</h4>
            <p>Submit your license, Aadhaar, and address proof. KYC takes just 2 hours.</p>
          </div>
          <div class="sub-step-card animate-fade-in-up animate-delay-2">
            <div class="sub-step-icon" style="background: rgba(16, 185, 129, 0.1); color: #10B981;">💳</div>
            <div class="sub-step-number">3</div>
            <h4>Pay & Get Delivery</h4>
            <p>Pay first month + refundable deposit. Car delivered to your doorstep.</p>
          </div>
          <div class="sub-step-card animate-fade-in-up animate-delay-3">
            <div class="sub-step-icon" style="background: rgba(168, 85, 247, 0.1); color: #A855F7;">🚗</div>
            <div class="sub-step-number">4</div>
            <h4>Drive & Enjoy</h4>
            <p>Use the car as your own. We handle insurance, maintenance & servicing.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">What Subscribers Say</h2>
        <p class="section-subtitle">Real experiences from real subscribers</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6);">
          ${renderSubTestimonials()}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" style="background: white;">
      <div class="container container-sm">
        <h2 class="section-title">Subscription FAQs</h2>
        <p class="section-subtitle">Everything you need to know about car subscriptions</p>
        ${renderSubFAQs()}
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-banner animate-fade-in-up" style="background: linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%);">
          <div style="font-size: 3rem; margin-bottom: var(--space-3);">🚗</div>
          <h2>Ready to Subscribe?</h2>
          <p style="max-width: 500px; margin-left: auto; margin-right: auto; margin-bottom: var(--space-6);">Start your car subscription today. No EMIs, no hidden charges, zero down payment.</p>
          <button class="btn btn-lg" style="background: white; color: var(--color-primary); font-weight: 700;" onclick="handleSubscribe()">
            Get Started → 
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderPlanCards() {
  const planMap = { '1': 'flexi', '3': 'value', '6': 'super', '12': 'annual' };
  const activePlanId = planMap[subState.selectedDuration] || 'value';
  const activePlan = SUBSCRIPTION_PLANS.find(p => p.id === activePlanId);
  
  if (!activePlan) return '';

  return activePlan.plans.map(plan => {
    const savings = plan.originalPrice - plan.price;
    const savingsPercent = Math.round((savings / plan.originalPrice) * 100);
    
    return `
      <div class="sub-plan-card ${activePlan.popular ? 'popular' : ''}">
        ${activePlan.popular ? '<div class="sub-plan-popular-badge">🔥 MOST POPULAR</div>' : ''}
        <div class="sub-plan-emoji">${plan.emoji}</div>
        <div class="sub-plan-type">${plan.type}</div>
        <div class="sub-plan-car">${plan.car}</div>
        <div class="sub-plan-pricing">
          <div class="sub-plan-original">₹${plan.originalPrice.toLocaleString()}/mo</div>
          <div class="sub-plan-price">₹${plan.price.toLocaleString()}<span class="sub-plan-unit">/mo</span></div>
          <div class="sub-plan-savings">Save ₹${savings.toLocaleString()} (${savingsPercent}% off)</div>
        </div>
        <div class="sub-plan-features">
          ${activePlan.features.map(f => `<div class="sub-plan-feature">✅ ${f}</div>`).join('')}
        </div>
        <button class="sub-plan-btn" style="background: ${activePlan.gradient};" onclick="handleSubscribe('${plan.type}', '${activePlan.id}')">
          Subscribe Now
        </button>
        <div class="sub-plan-trial">7-day free trial · Cancel anytime</div>
      </div>
    `;
  }).join('');
}

function renderComparisonTable() {
  const features = [
    { name: 'Monthly Price (Sedan)', flexi: '₹22,999', value: '₹19,999', super: '₹17,999', annual: '₹14,999' },
    { name: 'Commitment Period', flexi: '1 Month', value: '3 Months', super: '6 Months', annual: '12 Months' },
    { name: 'Unlimited Kms', flexi: '✅', value: '✅', super: '✅', annual: '✅' },
    { name: 'Insurance & Registration', flexi: '✅', value: '✅', super: '✅', annual: '✅' },
    { name: 'Roadside Assistance', flexi: '✅', value: '✅', super: '✅', annual: '✅' },
    { name: 'Damage Protection', flexi: '✅', value: '✅', super: '✅', annual: '✅' },
    { name: 'Car Swaps', flexi: '❌', value: '1 / tenure', super: '2 / tenure', annual: 'Unlimited' },
    { name: 'Fuel Credits', flexi: '❌', value: '₹500/mo', super: '₹1,000/mo', annual: '₹2,000/mo' },
    { name: 'Priority Support', flexi: '❌', value: '✅', super: '✅', annual: '✅' },
    { name: 'Free Maintenance', flexi: '❌', value: '❌', super: '✅', annual: '✅' },
    { name: 'Airport Transfers', flexi: '❌', value: '❌', super: '2/mo', annual: '4/mo' },
    { name: 'Dedicated Manager', flexi: '❌', value: '❌', super: '❌', annual: '✅' },
    { name: 'Buy Option', flexi: '❌', value: '❌', super: '❌', annual: '✅' },
  ];

  return `
    <table class="sub-compare-table">
      <thead>
        <tr>
          <th>Features</th>
          <th>⚡ Flexi</th>
          <th class="highlight">🔥 Value</th>
          <th>💎 Super Saver</th>
          <th>👑 Annual</th>
        </tr>
      </thead>
      <tbody>
        ${features.map(f => `
          <tr>
            <td class="feature-name">${f.name}</td>
            <td>${f.flexi}</td>
            <td class="highlight">${f.value}</td>
            <td>${f.super}</td>
            <td>${f.annual}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderSavingsCalculator() {
  const carPrices = {
    hatchback: { buy: 800000, emi: 15000, daily: 1299, sub: { '1': 15999, '3': 13999, '6': 11999, '12': 9999 } },
    sedan: { buy: 1200000, emi: 22000, daily: 1899, sub: { '1': 22999, '3': 19999, '6': 17999, '12': 14999 } },
    suv: { buy: 1800000, emi: 32000, daily: 2799, sub: { '1': 29999, '3': 25999, '6': 22999, '12': 19999 } },
    luxury: { buy: 4500000, emi: 78000, daily: 6999, sub: { '1': 59999, '3': 49999, '6': 44999, '12': 39999 } },
  };

  const car = carPrices[subState.calcCarType] || carPrices.sedan;
  const subPrice = car.sub[subState.calcDuration] || car.sub['6'];
  const dailyRentalMonthly = car.daily * 30;
  const emiTotal = car.emi;
  const savingsVsDaily = dailyRentalMonthly - subPrice;
  const savingsVsEmi = emiTotal > subPrice ? 0 : subPrice - emiTotal; // EMI is usually cheaper but requires down payment

  return `
    <div class="sub-calc-grid">
      <div class="sub-calc-inputs">
        <h3 style="margin-bottom: var(--space-4);">Configure</h3>
        <div style="margin-bottom: var(--space-4);">
          <label style="font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); display: block; margin-bottom: var(--space-2);">Car Type</label>
          <div class="sub-calc-options">
            <button class="sub-pill ${subState.calcCarType === 'hatchback' ? 'active' : ''}" onclick="updateCalc('hatchback')">🚗 Hatchback</button>
            <button class="sub-pill ${subState.calcCarType === 'sedan' ? 'active' : ''}" onclick="updateCalc('sedan')">🚘 Sedan</button>
            <button class="sub-pill ${subState.calcCarType === 'suv' ? 'active' : ''}" onclick="updateCalc('suv')">🚙 SUV</button>
            <button class="sub-pill ${subState.calcCarType === 'luxury' ? 'active' : ''}" onclick="updateCalc('luxury')">🏎️ Luxury</button>
          </div>
        </div>
        <div>
          <label style="font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); display: block; margin-bottom: var(--space-2);">Duration</label>
          <div class="sub-calc-options">
            <button class="sub-pill ${subState.calcDuration === '1' ? 'active' : ''}" onclick="updateCalcDuration('1')">1 Month</button>
            <button class="sub-pill ${subState.calcDuration === '3' ? 'active' : ''}" onclick="updateCalcDuration('3')">3 Months</button>
            <button class="sub-pill ${subState.calcDuration === '6' ? 'active' : ''}" onclick="updateCalcDuration('6')">6 Months</button>
            <button class="sub-pill ${subState.calcDuration === '12' ? 'active' : ''}" onclick="updateCalcDuration('12')">12 Months</button>
          </div>
        </div>
      </div>
      <div class="sub-calc-results">
        <h3 style="margin-bottom: var(--space-4);">Monthly Cost Comparison</h3>
        <div class="sub-calc-bars">
          <div class="sub-calc-bar-row">
            <span class="sub-calc-bar-label">Daily Rental</span>
            <div class="sub-calc-bar-track">
              <div class="sub-calc-bar-fill" style="width: 100%; background: #EF4444;"></div>
            </div>
            <span class="sub-calc-bar-value">₹${dailyRentalMonthly.toLocaleString()}</span>
          </div>
          <div class="sub-calc-bar-row">
            <span class="sub-calc-bar-label">Car EMI</span>
            <div class="sub-calc-bar-track">
              <div class="sub-calc-bar-fill" style="width: ${Math.round((emiTotal / dailyRentalMonthly) * 100)}%; background: #F59E0B;"></div>
            </div>
            <span class="sub-calc-bar-value">₹${emiTotal.toLocaleString()}*</span>
          </div>
          <div class="sub-calc-bar-row highlight">
            <span class="sub-calc-bar-label">Subscription</span>
            <div class="sub-calc-bar-track">
              <div class="sub-calc-bar-fill" style="width: ${Math.round((subPrice / dailyRentalMonthly) * 100)}%; background: linear-gradient(90deg, #6366F1, #8B5CF6);"></div>
            </div>
            <span class="sub-calc-bar-value" style="color: var(--color-primary); font-weight: 700;">₹${subPrice.toLocaleString()}</span>
          </div>
        </div>
        <div class="sub-calc-savings-card">
          <div class="sub-calc-savings-icon">💰</div>
          <div>
            <div class="sub-calc-savings-label">You save vs daily rental</div>
            <div class="sub-calc-savings-value">₹${savingsVsDaily.toLocaleString()}/month</div>
          </div>
        </div>
        <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-3);">*EMI excludes down payment (20-25%), insurance, maintenance & registration</p>
      </div>
    </div>
  `;
}

function renderSubTestimonials() {
  const testimonials = [
    { 
      name: 'Rahul Menon', city: 'Bangalore', 
      text: 'Switched from EMI to subscription and couldn\'t be happier. No maintenance worries, no insurance hassle. I just drive and pay monthly. Saved me so much stress!',
      plan: 'Value · Hyundai Creta', rating: 5, months: 8
    },
    { 
      name: 'Priya Agarwal', city: 'Mumbai', 
      text: 'Perfect for someone who relocates frequently. Got a Honda City subscription for 6 months and the flexibility was amazing. Swapped to an SUV for a road trip too!',
      plan: 'Super Saver · Honda City', rating: 5, months: 6
    },
    { 
      name: 'Karthik S.', city: 'Hyderabad', 
      text: 'The annual plan is incredible value. I drive a BMW 3 Series for less than what most people pay in EMIs. Plus zero down payment and free maintenance. Game changer.',
      plan: 'Annual · BMW 3 Series', rating: 5, months: 12
    },
  ];

  return testimonials.map(t => `
    <div class="card" style="padding: var(--space-6);">
      <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);">
        <div class="avatar">${t.name.split(' ').map(n => n[0]).join('')}</div>
        <div>
          <div style="font-weight: 600; font-size: var(--text-sm);">${t.name}</div>
          <div style="font-size: var(--text-xs); color: var(--color-text-muted);">${t.city} · ${t.months} months</div>
        </div>
        <div style="margin-left: auto; color: var(--color-warning);">${'★'.repeat(t.rating)}</div>
      </div>
      <p style="font-size: var(--text-sm); color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin-bottom: var(--space-3);">"${t.text}"</p>
      <div style="font-size: var(--text-xs); color: var(--color-primary); font-weight: 600; background: var(--color-primary-subtle); padding: 4px 10px; border-radius: var(--radius-full); display: inline-block;">${t.plan}</div>
    </div>
  `).join('');
}

function renderSubFAQs() {
  const faqs = [
    { q: 'What is a car subscription?', a: 'A car subscription is a flexible alternative to buying or leasing. You pay a fixed monthly fee that covers the car, insurance, maintenance, and roadside assistance. No EMIs, no down payment, and you can cancel or swap anytime based on your plan.' },
    { q: 'What documents are required?', a: 'You need: (1) Valid driving license, (2) Aadhaar card, (3) Address proof (utility bill / bank statement), (4) PAN card. KYC verification takes about 2 hours.' },
    { q: 'Is there a security deposit?', a: 'Yes, a refundable security deposit is required — ₹15,000 for hatchbacks, ₹25,000 for sedans/SUVs, and ₹50,000 for luxury cars. This is fully refunded when you end your subscription.' },
    { q: 'Can I swap my car?', a: 'Yes! Value plan allows 1 swap, Super Saver allows 2 swaps, and Annual plan offers unlimited swaps. You can switch between car models of the same or higher tier (with price adjustment).' },
    { q: 'What happens if the car needs servicing?', a: 'Regular maintenance and servicing is handled by us at no extra cost (Super Saver & Annual plans). For Flexi and Value plans, routine servicing is covered but wear & tear items may have additional charges.' },
    { q: 'Can I cancel my subscription?', a: 'Yes. Flexi plan has no cancellation fee. Value plan has a 1-month notice period. Super Saver has a 2-month notice. Annual plan has a 3-month notice or early termination fee of 2 months\' rent.' },
    { q: 'Is the km limit really unlimited?', a: 'Yes! All our subscription plans come with truly unlimited kilometers. There are no hidden per-km charges. Drive as much as you want.' },
    { q: 'Can I take the car on road trips or out of city?', a: 'Absolutely! You can drive anywhere in India. Just inform us if you plan to be away for more than 7 days so we can adjust any scheduled maintenance.' },
  ];

  return faqs.map((faq, i) => `
    <div class="card" style="margin-bottom: var(--space-3); cursor: pointer;" onclick="toggleSubFAQ(${i})">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-5);">
        <h4 style="font-size: var(--text-sm); font-weight: 600;">${faq.q}</h4>
        <span id="sub-faq-icon-${i}" style="color: var(--color-text-muted); transition: transform 0.3s;">▾</span>
      </div>
      <div id="sub-faq-answer-${i}" style="display: none; padding: 0 var(--space-5) var(--space-4); font-size: var(--text-sm); color: var(--color-text-tertiary); line-height: var(--leading-relaxed);">
        ${faq.a}
      </div>
    </div>
  `).join('');
}

// ========== Cars Tab ==========
function renderSubCarsTab() {
  return `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Available Subscription Cars</h2>
        <p class="section-subtitle">Choose from our curated fleet of subscription-ready vehicles</p>

        <!-- Filters -->
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-6); justify-content: center;">
          <button class="filter-chip ${subState.selectedCarType === 'all' ? 'active' : ''}" onclick="filterSubCars('all')">🚗 All Cars</button>
          <button class="filter-chip ${subState.selectedCarType === 'hatchback' ? 'active' : ''}" onclick="filterSubCars('hatchback')">🚗 Hatchbacks</button>
          <button class="filter-chip ${subState.selectedCarType === 'sedan' ? 'active' : ''}" onclick="filterSubCars('sedan')">🚘 Sedans</button>
          <button class="filter-chip ${subState.selectedCarType === 'suv' ? 'active' : ''}" onclick="filterSubCars('suv')">🚙 SUVs</button>
          <button class="filter-chip ${subState.selectedCarType === 'luxury' ? 'active' : ''}" onclick="filterSubCars('luxury')">🏎️ Luxury</button>
        </div>

        <div class="sub-cars-grid" id="sub-cars-grid">
          ${renderSubCarCards()}
        </div>
      </div>
    </section>
  `;
}

function renderSubCarCards() {
  let cars = SUBSCRIPTION_CARS;
  if (subState.selectedCarType !== 'all') {
    cars = cars.filter(c => c.type === subState.selectedCarType);
  }

  if (cars.length === 0) {
    return `<div style="text-align: center; padding: var(--space-12); color: var(--color-text-muted);">
      <div style="font-size: 3rem; margin-bottom: var(--space-3);">🔍</div>
      <p>No cars found in this category. Try another filter.</p>
    </div>`;
  }

  return cars.map(car => {
    const discountedPrice = Math.round(car.monthlyPrice * 0.75); // 6-month price

    return `
      <div class="sub-car-card">
        <div class="sub-car-card-image">
          <div class="sub-car-card-emoji">${car.emoji}</div>
          <div class="sub-car-card-badge">${car.type.toUpperCase()}</div>
        </div>
        <div class="sub-car-card-body">
          <div class="sub-car-card-title">${car.name}</div>
          <div class="sub-car-card-brand">${car.brand} · ${car.year}</div>
          <div class="sub-car-card-specs">
            <span>⛽ ${car.fuel}</span>
            <span>⚙️ ${car.transmission}</span>
            <span>💺 ${car.seats} Seats</span>
          </div>
          <div class="sub-car-card-pricing">
            <div>
              <span class="sub-car-card-original">₹${car.monthlyPrice.toLocaleString()}</span>
              <span class="sub-car-card-price">₹${discountedPrice.toLocaleString()}</span>
              <span class="sub-car-card-period">/month</span>
            </div>
            <div class="sub-car-card-save">Save ${25}% with 6-month plan</div>
          </div>
          <button class="sub-plan-btn" onclick="handleSubscribeCar('${car.id}')">Subscribe</button>
        </div>
      </div>
    `;
  }).join('');
}

// ========== My Subscriptions Tab ==========
function renderMySubscriptionsTab() {
  if (!AppState.currentUser) {
    return `
      <section class="section">
        <div class="container" style="text-align: center; padding: var(--space-16) 0;">
          <div style="font-size: 4rem; margin-bottom: var(--space-4);">🔒</div>
          <h2 style="margin-bottom: var(--space-3);">Login Required</h2>
          <p style="color: var(--color-text-muted); margin-bottom: var(--space-6);">Please login to view and manage your subscriptions.</p>
          <button class="btn btn-primary btn-lg" onclick="openAuthModal()">Login / Sign Up</button>
        </div>
      </section>
    `;
  }

  const subs = AppState.subscriptions || [];
  
  if (subs.length === 0) {
    return `
      <section class="section">
        <div class="container" style="text-align: center; padding: var(--space-16) 0;">
          <div style="font-size: 4rem; margin-bottom: var(--space-4);">🚗</div>
          <h2 style="margin-bottom: var(--space-3);">No Active Subscriptions</h2>
          <p style="color: var(--color-text-muted); margin-bottom: var(--space-6); max-width: 400px; margin-left: auto; margin-right: auto;">You don't have any active car subscriptions yet. Browse our plans and start driving your dream car today!</p>
          <button class="btn btn-primary btn-lg" onclick="switchSubTab('plans')">Browse Plans</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="section">
      <div class="container">
        <h2 class="section-title">My Subscriptions</h2>
        <p class="section-subtitle">Manage your active car subscriptions</p>
        <div style="display: grid; gap: var(--space-6);">
          ${subs.map(sub => renderSubscriptionCard(sub)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderSubscriptionCard(sub) {
  const statusColors = {
    active: { bg: '#ECFDF5', color: '#059669', text: 'Active' },
    pending: { bg: '#FFF7ED', color: '#D97706', text: 'Pending KYC' },
    paused: { bg: '#FEF2F2', color: '#DC2626', text: 'Paused' },
    expired: { bg: '#F1F5F9', color: '#64748B', text: 'Expired' },
  };
  const status = statusColors[sub.status] || statusColors.active;
  const startDate = new Date(sub.startDate);
  const endDate = new Date(sub.endDate);
  const today = new Date();
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysUsed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  const progress = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));

  return `
    <div class="card" style="padding: 0; overflow: hidden;">
      <div style="display: grid; grid-template-columns: auto 1fr auto; gap: var(--space-6); padding: var(--space-6); align-items: center;">
        <div style="font-size: 4rem; text-align: center; min-width: 80px;">${sub.emoji || '🚗'}</div>
        <div>
          <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
            <h3 style="font-size: var(--text-lg); font-weight: 700;">${sub.carName}</h3>
            <span style="background: ${status.bg}; color: ${status.color}; font-size: var(--text-xs); font-weight: 600; padding: 3px 10px; border-radius: var(--radius-full);">${status.text}</span>
          </div>
          <div style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3);">${sub.plan} Plan · ${sub.duration}</div>
          <div style="display: flex; gap: var(--space-6); font-size: var(--text-xs); color: var(--color-text-secondary);">
            <span>📅 ${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} — ${endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span>🛣️ ${sub.kmDriven?.toLocaleString() || '0'} km driven</span>
          </div>
          <div style="margin-top: var(--space-3);">
            <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 4px;">
              <span>${daysUsed} days used</span>
              <span>${Math.max(0, totalDays - daysUsed)} days remaining</span>
            </div>
            <div style="height: 6px; background: var(--color-border); border-radius: var(--radius-full); overflow: hidden;">
              <div style="height: 100%; width: ${progress}%; background: linear-gradient(90deg, #6366F1, #8B5CF6); border-radius: var(--radius-full); transition: width 1s ease;"></div>
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-text);">₹${sub.monthlyPrice?.toLocaleString()}</div>
          <div style="font-size: var(--text-xs); color: var(--color-text-muted);">/month</div>
          <div style="margin-top: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2);">
            <button class="btn btn-sm" style="font-size: var(--text-xs);" onclick="showToast('info', 'Swap Car', 'Our team will contact you within 24 hours for car swap.')">🔄 Swap Car</button>
            <button class="btn btn-sm" style="font-size: var(--text-xs); border-color: #EF4444; color: #EF4444;" onclick="showToast('warning', 'Cancel', 'Please call support to cancel your subscription.')">Cancel</button>
          </div>
        </div>
      </div>
      <div style="background: var(--color-surface); padding: var(--space-3) var(--space-6); display: flex; gap: var(--space-6); font-size: var(--text-xs); color: var(--color-text-secondary); border-top: 1px solid var(--color-border);">
        <span>📞 Next service: ${sub.nextService || 'N/A'}</span>
        <span>🛡️ Insurance: Active</span>
        <span>🔧 Maintenance: Covered</span>
        <span style="margin-left: auto; color: var(--color-primary); font-weight: 600; cursor: pointer;" onclick="showToast('info', 'Invoice', 'Invoice downloaded successfully!')">📄 Download Invoice</span>
      </div>
    </div>
  `;
}

// ========== Actions ==========
function selectSubDuration(duration) {
  subState.selectedDuration = duration;
  const el = document.getElementById('sub-content');
  if (el) el.innerHTML = renderSubTabContent();
}

function updateCalc(carType) {
  subState.calcCarType = carType;
  const calcEl = document.querySelector('.sub-calculator');
  if (calcEl) calcEl.innerHTML = renderSavingsCalculator();
}

function updateCalcDuration(duration) {
  subState.calcDuration = duration;
  const calcEl = document.querySelector('.sub-calculator');
  if (calcEl) calcEl.innerHTML = renderSavingsCalculator();
}

function filterSubCars(type) {
  subState.selectedCarType = type;
  const grid = document.getElementById('sub-cars-grid');
  if (grid) grid.innerHTML = renderSubCarCards();
  // Update filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const chipType = chip.onclick?.toString().match(/'(\w+)'/)?.[1];
    chip.classList.toggle('active', chipType === type);
  });
}

function toggleSubFAQ(index) {
  const answer = document.getElementById(`sub-faq-answer-${index}`);
  const icon = document.getElementById(`sub-faq-icon-${index}`);
  if (!answer) return;
  if (answer.style.display === 'none') {
    answer.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    answer.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function handleSubscribe(carType, planId) {
  if (!AppState.currentUser) {
    openAuthModal();
    return;
  }

  // Create a new subscription
  if (!AppState.subscriptions) AppState.subscriptions = [];
  
  const car = carType ? SUBSCRIPTION_CARS.find(c => c.type.toLowerCase() === carType.toLowerCase()) : SUBSCRIPTION_CARS[2]; // Default to Creta
  const plan = planId ? SUBSCRIPTION_PLANS.find(p => p.id === planId) : SUBSCRIPTION_PLANS[1]; // Default to Value
  const months = parseInt(plan?.duration?.match(/\d+/)?.[0] || '3');
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + months);

  const planPricing = plan?.plans?.find(p => p.type.toLowerCase() === (carType || 'suv').toLowerCase());

  const newSub = {
    id: 'SUB-' + Date.now(),
    carName: car?.name || 'Hyundai Creta',
    emoji: car?.emoji || '🚙',
    plan: plan?.name || 'Value',
    duration: plan?.duration || '3 Months',
    monthlyPrice: planPricing?.price || 25999,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    status: 'active',
    kmDriven: Math.floor(Math.random() * 2000) + 500,
    nextService: new Date(Date.now() + 30 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  };
  
  AppState.subscriptions.push(newSub);
  saveState();
  
  showToast('success', '🎉 Subscription Created!', `${newSub.carName} · ${newSub.plan} Plan · ₹${newSub.monthlyPrice.toLocaleString()}/mo`);
  
  // Switch to My Subscriptions tab
  setTimeout(() => switchSubTab('my-subscriptions'), 800);
}

function handleSubscribeCar(carId) {
  if (!AppState.currentUser) {
    openAuthModal();
    return;
  }
  
  const car = SUBSCRIPTION_CARS.find(c => c.id === carId);
  if (!car) return;

  if (!AppState.subscriptions) AppState.subscriptions = [];
  
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 6);

  const newSub = {
    id: 'SUB-' + Date.now(),
    carName: car.name,
    emoji: car.emoji,
    plan: 'Super Saver',
    duration: '6 Months',
    monthlyPrice: Math.round(car.monthlyPrice * 0.75),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    status: 'active',
    kmDriven: 0,
    nextService: new Date(Date.now() + 60 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  };
  
  AppState.subscriptions.push(newSub);
  saveState();
  
  showToast('success', '🎉 Subscription Created!', `${car.name} · Super Saver · ₹${newSub.monthlyPrice.toLocaleString()}/mo`);
  setTimeout(() => switchSubTab('my-subscriptions'), 800);
}
