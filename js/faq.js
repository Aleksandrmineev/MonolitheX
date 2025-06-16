document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove('active');
        }
      });

      item.classList.toggle('active');

      // Прокрутка к открытому элементу
      setTimeout(() => {
        if (item.classList.contains('active')) {
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 300);
    });
  });
});
