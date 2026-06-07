// ========================================
// DriveEase — Car Card Component
// ========================================

function renderCarCard(car) {
  const isFav = AppState.favorites.includes(car.id);
  const starsHtml = renderStars(car.rating);

  return `
    <div class="card car-card" onclick="navigateTo('/car/${car.id}')" id="car-card-${car.id}">
      <div class="card-img-wrapper">
        <div class="car-card-image" style="background-color: ${car.color}15;">
          ${car.image
            ? `<img src="${car.image}" alt="${car.name}" loading="lazy">`
            : `<span>${car.emoji}</span>`
          }
          <span class="badge badge-primary car-card-type">${car.type}</span>
          <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${car.id})" aria-label="Toggle favorite" id="fav-btn-${car.id}">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      <div class="car-card-body">
        <div class="car-card-header">
          <div>
            <div class="car-card-name">${car.name}</div>
            <div class="car-card-brand">${car.brand} · ${car.year}</div>
          </div>
          <div class="car-card-rating">
            ⭐ ${car.rating}
          </div>
        </div>
        <div class="car-card-specs">
          <span class="car-card-spec">
            <span class="car-card-spec-icon">⚙️</span> ${car.transmission}
          </span>
          <span class="car-card-spec">
            <span class="car-card-spec-icon">⛽</span> ${car.fuel}
          </span>
          <span class="car-card-spec">
            <span class="car-card-spec-icon">👥</span> ${car.seats} seats
          </span>
        </div>
        <div class="car-card-footer">
          <div class="price">
            <span class="price-amount">₹${car.pricePerHour}</span>
            <span class="price-unit">/hr</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); navigateTo('/car/${car.id}')">
            Book Now
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating, size = '') {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += i <= Math.floor(rating) ? '★' : (i - 0.5 <= rating ? '★' : '<span class="star-empty">★</span>');
  }
  html += '</div>';
  return html;
}
