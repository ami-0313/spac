/* HERO SLIDER WITH ZOOM */
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if(i === index) slide.classList.add('active');
  });
}

// Initial display
showSlide(currentSlide);

// Auto slide every 4 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 4000);

/* DYNAMIC FULLY AUTOMATED GALLERY (NO LIGHTBOX) */
const galleryContainer = document.getElementById('galleryContainer');
const totalImages = 6;  // Update if more images are added
const galleryPath = 'images/gallery/';

for (let i = 1; i <= totalImages; i++) {
  const col = document.createElement('div');
  col.className = 'col-md-4 fade-in';

  const img = document.createElement('img');
  img.src = `${galleryPath}gallery${i}.jpg`;
  img.className = 'img-fluid gallery-img';
  img.alt = `Gallery Image ${i}`;

  // Append directly without lightbox
  col.appendChild(img);
  galleryContainer.appendChild(col);
}

/* FADE IN ON SCROLL */
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

/* NAVBAR ACTIVE LINK ON SCROLL */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if(pageYOffset >= sectionTop){
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${current}`){
      link.classList.add('active');
    }
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
