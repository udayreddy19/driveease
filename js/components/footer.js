// ========================================
// DriveEase — Footer Component
// ========================================

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="navbar-logo" href="#/" style="margin-bottom: var(--space-2);">
              <div class="navbar-logo-icon">🚗</div>
              <span>Drive<span style="color: var(--color-primary-light)">Ease</span></span>
            </a>
            <p>India's most trusted self-drive car rental platform. Choose from 25,000+ cars across 50+ cities.</p>
            <div class="footer-social">
              <span class="footer-social-icon" title="Facebook">f</span>
              <span class="footer-social-icon" title="Twitter">𝕏</span>
              <span class="footer-social-icon" title="Instagram">📸</span>
              <span class="footer-social-icon" title="LinkedIn">in</span>
            </div>
          </div>

          <div>
            <h4 class="footer-title">Product</h4>
            <div class="footer-links">
              <a class="footer-link" href="#/search">Browse Cars</a>
              <a class="footer-link" href="#/host">Become a Host</a>
              <a class="footer-link" href="#/search?type=luxury">Luxury Cars</a>
              <a class="footer-link" href="#/search?fuel=electric">Electric Cars</a>
              <span class="footer-link">Corporate Rentals</span>
              <span class="footer-link">Long Term Rentals</span>
            </div>
          </div>

          <div>
            <h4 class="footer-title">Company</h4>
            <div class="footer-links">
              <span class="footer-link">About Us</span>
              <span class="footer-link">Careers</span>
              <span class="footer-link">Blog</span>
              <span class="footer-link">Press</span>
              <span class="footer-link">Partners</span>
              <span class="footer-link">Contact</span>
            </div>
          </div>

          <div>
            <h4 class="footer-title">Support</h4>
            <div class="footer-links">
              <span class="footer-link">Help Center</span>
              <span class="footer-link">Safety</span>
              <span class="footer-link">Terms of Service</span>
              <span class="footer-link">Privacy Policy</span>
              <span class="footer-link">Cancellation Policy</span>
              <span class="footer-link">Insurance</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} DriveEase. All rights reserved.</p>
          <div style="display: flex; gap: var(--space-4);">
            <span class="footer-link">🇮🇳 India</span>
            <span class="footer-link">English</span>
            <span class="footer-link">₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
