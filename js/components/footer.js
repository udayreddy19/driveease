// ========================================
// DriveEase — Footer
// ========================================

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">🚗 DriveEase</div>
            <p class="footer-desc">India's leading self-drive car rental platform. Choose from 25,000+ verified cars across 50+ cities. Drive unlimited, pay fairly.</p>
            <div style="display: flex; gap: var(--space-3);">
              <a href="#" class="btn btn-sm" style="background: rgba(255,255,255,0.1); color: white; border-radius: var(--radius-full);">📱 App Store</a>
              <a href="#" class="btn btn-sm" style="background: rgba(255,255,255,0.1); color: white; border-radius: var(--radius-full);">🤖 Play Store</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <a href="#/search" class="footer-link">Browse Cars</a>
            <a href="#/host" class="footer-link">Become a Host</a>
            <a href="#" class="footer-link">Daily Drives</a>
            <a href="#" class="footer-link">Subscription</a>
            <a href="#" class="footer-link">Weekday Pass</a>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <a href="#" class="footer-link">About Us</a>
            <a href="#" class="footer-link">Careers</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">Investor Relations</a>
            <a href="#" class="footer-link">Press Kit</a>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <a href="#" class="footer-link">Help Center</a>
            <a href="#" class="footer-link">Contact Us</a>
            <a href="#" class="footer-link">Terms & Conditions</a>
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Cancellation Policy</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} DriveEase. All rights reserved.</span>
          <span>Made with 💜 in India</span>
        </div>
      </div>
    </footer>
  `;
}
