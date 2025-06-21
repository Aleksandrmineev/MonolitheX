export function initCitySelector() {
  const locationToggle = document.querySelector('.header__location-toggle');
  const locationDropdown = document.querySelector('.header__location-dropdown');
  const locationCurrent = document.querySelector('.header__location-current');

  if (locationToggle && locationDropdown && locationCurrent) {
    locationToggle.addEventListener('click', function (e) {
      e.preventDefault();
      locationDropdown.classList.toggle('is-open');
    });

    locationDropdown.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedCity = this.dataset.city;
        locationCurrent.textContent = selectedCity;
        locationDropdown.classList.remove('is-open');
      });
    });

    document.addEventListener('click', function (e) {
      if (
        !locationToggle.contains(e.target) &&
        !locationDropdown.contains(e.target)
      ) {
        locationDropdown.classList.remove('is-open');
      }
    });
  }

  const locationTown = document.querySelector('.header__location-town');
  if (locationTown) {
    function updateLocationTownText() {
      locationTown.textContent =
        window.innerWidth <= 550 ? 'Город:' : 'Ваш город:';
    }

    window.addEventListener('resize', updateLocationTownText);
    updateLocationTownText();
  }
}
