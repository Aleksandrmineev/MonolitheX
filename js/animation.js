export function initHeadlineAnimation() {
  const animatedEls = document.querySelectorAll('.animate-from-left');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    animatedEls.forEach((el) => observer.observe(el));
  }
}
