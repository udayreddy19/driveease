// ========================================
// DriveEase — 404 Page
// ========================================

function renderNotFoundPage() {
  return `
    <div class="not-found-page">
      <div style="max-width: 500px; padding: var(--space-6);">
        <div class="not-found-code animate-fade-in">404</div>
        <h2 style="margin: var(--space-4) 0;" class="animate-fade-in-up delay-1">Page Not Found</h2>
        <p style="margin-bottom: var(--space-8);" class="animate-fade-in-up delay-2">
          Looks like you took a wrong turn. The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="animate-fade-in-up delay-3" style="display: flex; gap: var(--space-4); justify-content: center;">
          <a href="#/" class="btn btn-primary btn-lg">← Go Home</a>
          <a href="#/search" class="btn btn-secondary btn-lg">Browse Cars</a>
        </div>
      </div>
    </div>
  `;
}
