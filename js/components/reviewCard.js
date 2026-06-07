// ========================================
// DriveEase — Review Card Component
// ========================================

function renderReviewCard(review) {
  return `
    <div class="review-card">
      <div class="review-card-header">
        <div class="avatar">${review.avatar}</div>
        <div class="review-card-info">
          <h5>${review.user}</h5>
          <small>${review.date}</small>
        </div>
      </div>
      <div class="review-card-stars" style="margin-bottom: var(--space-3);">
        ${renderStars(review.rating)}
      </div>
      <p class="review-card-text">"${review.text}"</p>
    </div>
  `;
}
