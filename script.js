const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.reveal');
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}
const updateActiveLink = () => {
  const scrollPosition = window.scrollY + 120;
  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const start = section.offsetTop;
    const end = start + section.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) {
      return;
    }
    if (scrollPosition >= start && scrollPosition < end) {
      navAnchors.forEach((anchor) => anchor.classList.remove('active'));
      link.classList.add('active');
    }
  });
};
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);
revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
