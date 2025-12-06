/* ============================================
   PROFESSIONAL REAL ESTATE - MAIN JS
   Enhanced Interactions & Animations
   ============================================ */

// Year in Footer
const date = new Date();
document.querySelector('.year').innerHTML = date.getFullYear();

// Auto-hide Messages
setTimeout(function() {
  $('#message').fadeOut('slow');
}, 3000);

// Navbar Scroll Effect
$(window).on('scroll', function() {
  if ($(window).scrollTop() > 100) {
    $('.navbar').addClass('scrolled');
  } else {
    $('.navbar').removeClass('scrolled');
  }
});

// Smooth Scrolling for Anchor Links
$('a[href^="#"]').on('click', function(e) {
  const target = $(this.getAttribute('href'));
  if (target.length) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top - 80
    }, 1000, 'easeInOutExpo');
  }
});

// Animate Elements on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe listing cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card.listing-preview');
  cards.forEach(card => {
    observer.observe(card);
  });
  
  const services = document.querySelectorAll('#services .col-12');
  services.forEach(service => {
    observer.observe(service);
  });
});

// Mobile Menu Close on Link Click
$('.navbar-nav .nav-link').on('click', function() {
  if ($(window).width() < 992) {
    $('.navbar-collapse').collapse('hide');
  }
});

// Form Input Focus Animation
$('.form-control, select').on('focus', function() {
  $(this).parent().addClass('input-focused');
});

$('.form-control, select').on('blur', function() {
  $(this).parent().removeClass('input-focused');
});

// Add loading state to search button
$('.search form').on('submit', function() {
  const btn = $(this).find('.btn-secondary');
  btn.html('<i class="fas fa-spinner fa-spin"></i> Searching...');
  btn.prop('disabled', true);
});

// Lazy Loading for Images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Tooltip Initialization (if Bootstrap tooltips are used)
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Price Formatting Animation
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = '$' + Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Enhanced Card Hover Effect
$('.card.listing-preview').on('mouseenter', function() {
  $(this).find('.listing-img').css('transform', 'scale(1.08)');
}).on('mouseleave', function() {
  $(this).find('.listing-img').css('transform', 'scale(1)');
});

// Preload Critical Images
function preloadImages() {
  const images = [
    '/static/img/showcase.jpg',
    '/static/img/building.jpg'
  ];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize on DOM Ready
$(document).ready(function() {
  preloadImages();
  
  // Add smooth reveal animation to hero content
  $('.home-search').addClass('animate-fade-in-up');
  
  // Stagger animation for service items
  $('#services .col-12').each(function(index) {
    $(this).css('animation-delay', (index * 0.15) + 's');
  });
});