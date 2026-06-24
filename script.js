/* ========================================================
   OROZCO STUDIO'S — Interactive Script (Cinematic Version)
   ======================================================== */

(function () {
  'use strict';

  // 1. ANIMACIÓN DE ENTRADA CINEMATOGRÁFICA
  window.addEventListener("load", () => {
    const tl = gsap.timeline();

    // Entrada elegante de la imagen Hero (Zoom suave)
    tl.fromTo(".hero-image",
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
    )
      // Entrada del texto y elementos
      .fromTo([".hero-tagline", ".hero-welcome"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" },
        "-=1.5"
      )
      .fromTo(".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );
  });

  // 2. EFECTO PARALLAX CINEMÁTICO AL HACER SCROLL
  window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    const heroImg = document.querySelector(".hero-image");
    if (heroImg) {
      // Mueve la imagen ligeramente hacia arriba al bajar
      heroImg.style.transform = `translateY(${scroll * 0.4}px)`;
    }
  });

  // 3. HEADER BEHAVIOR (Apple Style)
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. ANIMACIONES DE REVELADO AL BAJAR (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: "power4.out" });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    gsap.set(el, { opacity: 0, y: 50 });
    revealObserver.observe(el);
  });

  // 5. HOVER EFECTS PARA GALERÍA (Luxury feel)
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => gsap.to(item.querySelector('img'), { scale: 1.05, duration: 0.8 }));
    item.addEventListener('mouseleave', () => gsap.to(item.querySelector('img'), { scale: 1, duration: 0.8 }));
  });

})();

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

// Al hacer click en cualquier imagen del portafolio
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');

    // Animación GSAP (si la tienes activa) o CSS puro
    // El secreto es el cubic-bezier(0.34, 1.56, 0.64, 1) 
    // Ese .56 extra es el que hace que la imagen "rebote" un poco al abrirse.
  });
});

// Cerrar al hacer click en cualquier lado
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});