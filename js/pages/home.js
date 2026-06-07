// ========================================
// DriveEase — Home Page
// ========================================

function renderHomePage() {
  const featuredCars = AppData.CARS.sort((a, b) => b.rating - a.rating).slice(0, 6);
  const topReviews = AppData.REVIEWS.filter(r => r.rating >= 4).slice(0, 3);

  return `
    <!-- Hero -->
    <section class="hero" id="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content animate-fade-in-up">
        <div class="hero-badge animate-fade-in delay-1">
          ⚡ India's #1 Self-Drive Car Rental
        </div>
        <h1>
          Drive Your Way,<br>
          <span>Anytime, Anywhere</span>
        </h1>
        <p class="hero-subtitle animate-fade-in delay-2">
          Choose from 25,000+ cars across 50+ cities. Book a self-drive car in minutes and hit the road with complete freedom.
        </p>

        <div class="animate-fade-in-up delay-3">
          ${renderSearchBar()}
        </div>

        <div class="hero-stats animate-fade-in delay-5">
          <div class="hero-stat">
            <div class="hero-stat-value" data-count="25000">25,000+</div>
            <div class="hero-stat-label">Cars Available</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value" data-count="50">50+</div>
            <div class="hero-stat-label">Cities</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value" data-count="2000000">20 Lakh+</div>
            <div class="hero-stat-label">Happy Customers</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">4.8 ★</div>
            <div class="hero-stat-label">App Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Cities -->
    <section class="section" id="cities-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>Popular Cities</h2>
          <p>Explore self-drive cars in your favorite city</p>
          <div class="section-line"></div>
        </div>
        <div class="cities-scroll reveal">
          ${AppData.CITIES.map(city => `
            <div class="city-card" onclick="navigateTo('/search?city=${city.id}')" id="city-${city.id}">
              <div class="city-card-img">${city.emoji}</div>
              <div class="city-card-name">${city.name}</div>
              <div class="city-card-count">${city.count}+ cars</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Cars -->
    <section class="section" style="background: var(--color-bg-secondary);" id="featured-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>Featured Cars</h2>
          <p>Handpicked cars with the best ratings and reviews</p>
          <div class="section-line"></div>
        </div>
        <div class="cars-grid reveal">
          ${featuredCars.map(car => renderCarCard(car)).join('')}
        </div>
        <div class="text-center" style="margin-top: var(--space-10);">
          <a href="#/search" class="btn btn-outline btn-lg" id="view-all-cars-btn">View All Cars →</a>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" id="how-it-works-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>How It Works</h2>
          <p>Get on the road in 3 simple steps</p>
          <div class="section-line"></div>
        </div>
        <div class="how-it-works-grid reveal">
          <div class="step-card">
            <div class="step-icon">
              <span class="step-number">1</span>
              🔍
            </div>
            <h4>Search & Choose</h4>
            <p>Browse thousands of cars by city, type, and budget. Find the perfect car for your trip.</p>
          </div>
          <div class="step-card">
            <div class="step-icon">
              <span class="step-number">2</span>
              📱
            </div>
            <h4>Book Instantly</h4>
            <p>Reserve your car in under 2 minutes. Flexible plans from 4 hours to monthly rentals.</p>
          </div>
          <div class="step-card">
            <div class="step-icon">
              <span class="step-number">3</span>
              🚗
            </div>
            <h4>Drive & Enjoy</h4>
            <p>Pick up your car and hit the road. Enjoy unlimited kms with 24/7 roadside assistance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why DriveEase -->
    <section class="section" style="background: var(--color-bg-secondary);" id="features-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>Why Choose DriveEase?</h2>
          <p>Experience the best self-drive car rental service in India</p>
          <div class="section-line"></div>
        </div>
        <div class="features-grid reveal">
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h4>100% Safe</h4>
            <p>All cars are sanitized, inspected, and come with comprehensive insurance coverage.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h4>Best Prices</h4>
            <p>Transparent pricing with no hidden charges. Get up to 50% off on weekly & monthly plans.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📞</div>
            <h4>24/7 Support</h4>
            <p>Round-the-clock customer support and roadside assistance, wherever you are.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h4>Flexible Plans</h4>
            <p>Rent by the hour, day, week, or month. Extend or modify your booking anytime.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" id="testimonials-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>What Our Customers Say</h2>
          <p>Real stories from real drivers</p>
          <div class="section-line"></div>
        </div>
        <div class="testimonials-grid reveal">
          ${topReviews.map(review => renderReviewCard(review)).join('')}
        </div>
      </div>
    </section>

    <!-- Host CTA -->
    <section class="section" id="host-cta-section">
      <div class="container">
        <div class="cta-banner reveal">
          <div class="cta-banner-bg"></div>
          <div class="cta-banner-content">
            <h2>🚗 Earn Money With Your Car</h2>
            <p>List your idle car on DriveEase and earn up to ₹50,000/month. Zero investment, maximum returns.</p>
            <a href="#/host" class="btn btn-lg" style="background: white; color: var(--color-primary-dark); font-weight: 700;" id="host-cta-btn">
              Become a Host →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- App Download -->
    <section class="section" style="background: var(--color-bg-secondary);" id="download-section">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-16); flex-wrap: wrap;">
          <div style="max-width: 500px;" class="reveal">
            <h2 style="margin-bottom: var(--space-4);">Download the DriveEase App</h2>
            <p style="margin-bottom: var(--space-6);">Book your next self-drive adventure on the go. Available on Android and iOS.</p>
            <div style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
              <button class="btn btn-secondary btn-lg" id="android-download-btn">
                <span style="font-size: 1.3em;">▶</span> Google Play
              </button>
              <button class="btn btn-secondary btn-lg" id="ios-download-btn">
                <span style="font-size: 1.3em;">🍎</span> App Store
              </button>
            </div>
          </div>
          <div class="reveal" style="font-size: 8rem; animation: float 3s ease-in-out infinite;">
            📱
          </div>
        </div>
      </div>
    </section>
  `;
}

function initHomePage() {
  initScrollReveal();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}
