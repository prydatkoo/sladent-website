// =========================================================================
// SLADENT DENTISTRY - OPTIMIZED JAVASCRIPT
// Clean, modular, and maintainable code
// =========================================================================

'use strict';

// =========================================================================
// CONFIGURATION
// =========================================================================
const CONFIG = {
  carousel: {
    interval: 6000,
    transitionSpeed: 1500
  },
  animations: {
    observerThreshold: 0.1,
    observerMargin: '0px 0px -100px 0px'
  },
  typewriter: {
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseAtEnd: 2500,
    pauseBeforeNext: 500,
    startDelay: 2000
  }
};

// =========================================================================
// CAROUSEL MODULE
// =========================================================================
const CarouselModule = (() => {
  let slideIndex = 0;
  let carouselInterval;
  let slides;
  let container;

  const init = () => {
    slides = document.getElementsByClassName('carousel-slide');
    container = document.querySelector('.carousel-container');
    
    if (slides.length === 0) return;

    showSlide(slideIndex);
    startAutoplay();
    setupPauseOnHover();
  };

  const showSlide = (index) => {
    Array.from(slides).forEach(slide => slide.classList.remove('active'));
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
  };

  const startAutoplay = () => {
    carouselInterval = setInterval(() => {
      showSlide(slideIndex + 1);
    }, CONFIG.carousel.interval);
  };

  const stopAutoplay = () => {
    clearInterval(carouselInterval);
  };

  const setupPauseOnHover = () => {
    if (!container) return;
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  };

  return { init };
})();

// =========================================================================
// NAVIGATION MODULE - Enhanced for smooth mobile experience
// =========================================================================
const NavigationModule = (() => {
  let hamburger;
  let navLinks;

  const init = () => {
    hamburger = document.getElementById('hamburger');
    navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;

    setupEventListeners();
    setActiveLink();
    handleResize();
  };

  const setupEventListeners = () => {
    hamburger.addEventListener('click', handleToggle);
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);
    setupSwipeGestures();
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const isOpen = navLinks.classList.contains('show');
    
    if (isOpen) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    navLinks.classList.add('show');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Закрити меню');
    if (window.innerWidth <= 768) {
      navLinks.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('nav-open');

    if (document.activeElement === hamburger) {
      const firstLink = navLinks.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    }
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Відкрити меню');

    if (window.innerWidth <= 768) {
      navLinks.setAttribute('aria-hidden', 'true');
    } else {
      navLinks.removeAttribute('aria-hidden');
    }
    document.body.classList.remove('nav-open');

    if (restoreFocus) {
      hamburger.focus();
    }
  };

  const handleLinkClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    
    // Only prevent default and close menu if it's a navigation link
    if (href && href !== '#' && !href.includes('javascript')) {
      closeMenu();
      // Let the browser handle the navigation naturally
    }
  };

  const handleOutsideClick = (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      if (navLinks.classList.contains('show')) {
        closeMenu();
      }
    }
  };

  const setupSwipeGestures = () => {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    navLinks.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    navLinks.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      
      if (diffX > 50) {
        closeMenu();
        isDragging = false;
      }
    }, { passive: true });

    navLinks.addEventListener('touchend', () => {
      isDragging = false;
    }, { passive: true });
  };

  const handleKeydown = (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && navLinks.classList.contains('show')) {
      closeMenu({ restoreFocus: true });
    }
  };

  const handleResize = () => {
    if (!navLinks || !hamburger) return;

    if (window.innerWidth > 768) {
      navLinks.classList.remove('show');
      navLinks.removeAttribute('aria-hidden');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Відкрити меню');
      document.body.classList.remove('nav-open');
    } else if (!navLinks.classList.contains('show')) {
      navLinks.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-label', 'Відкрити меню');
    }
  };

  const setActiveLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a').forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  return { init };
})();

// =========================================================================
// INTERSECTION OBSERVER MODULE
// =========================================================================
const IntersectionObserverModule = (() => {
  const init = () => {
    const elements = document.querySelectorAll('.fade-in, .scale-in, .slide-up');
    
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: CONFIG.animations.observerThreshold,
        rootMargin: CONFIG.animations.observerMargin
      }
    );

    elements.forEach(el => observer.observe(el));
  };

  return { init };
})();

// =========================================================================
// MODAL MODULE (for photo gallery)
// =========================================================================
const ModalModule = (() => {
  let modal;
  let modalImg;

  const init = () => {
    modal = document.getElementById('photoModal');
    modalImg = document.getElementById('modalImg');
    
    if (!modal || !modalImg) return;

    setupModalEvents();
  };

  const setupModalEvents = () => {
    const galleryImages = document.querySelectorAll('.team-gallery img, .gallery img');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });

    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  return { init };
})();

// =========================================================================
// TYPEWRITER MODULE
// =========================================================================
const TypewriterModule = (() => {
  const init = () => {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const texts = [
      'використовує новітні технології',
      'використовує 3D діагностику',
      'поєднує професіоналізм із сердечністю'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isPaused) {
        setTimeout(type, isDeleting ? CONFIG.typewriter.pauseBeforeNext : CONFIG.typewriter.pauseAtEnd);
        isPaused = false;
        return;
      }

      if (!isDeleting) {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          isPaused = true;
        }
      } else {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          isPaused = true;
        }
      }

      const speed = isDeleting ? CONFIG.typewriter.deleteSpeed : CONFIG.typewriter.typeSpeed;
      setTimeout(type, speed);
    };

    setTimeout(() => type(), CONFIG.typewriter.startDelay);
  };

  return { init };
})();

// =========================================================================
// SMOOTH SCROLL MODULE
// =========================================================================
const SmoothScrollModule = (() => {
  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  return { init };
})();

// =========================================================================
// ACCESSIBILITY MODULE
// =========================================================================
const AccessibilityModule = (() => {
  const init = () => {
    // Handle focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    // Announce live regions
    setupLiveRegions();
  };

  const setupLiveRegions = () => {
    const liveRegions = document.querySelectorAll('[aria-live]');
    liveRegions.forEach(region => {
      const observer = new MutationObserver(() => {
        // Content changed, screen reader will announce
      });
      observer.observe(region, { childList: true, characterData: true, subtree: true });
    });
  };

  return { init };
})();

// =========================================================================
// IMAGE OPTIMIZATION MODULE
// =========================================================================
const ImageOptimizationModule = (() => {
  const init = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      return;
    }

    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  return { init };
})();

// =========================================================================
// SCROLL EFFECTS MODULE
// =========================================================================
const ScrollEffectsModule = (() => {
  const init = () => {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  };

  return { init };
})();

// =========================================================================
// TESTIMONIAL SLIDER MODULE
// =========================================================================
const TestimonialSliderModule = (() => {
  let currentSlide = 0;
  let slides;
  let slider;

  const init = () => {
    slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    slides = slider.querySelectorAll('.testimonial-item');
    if (slides.length === 0) return;

    showSlide(currentSlide);
  };

  const showSlide = (n) => {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  window.moveTestimonial = (direction) => {
    showSlide(currentSlide + direction);
  };

  return { init };
})();

// =========================================================================
// PAGE LOAD MODULE
// =========================================================================
const PageLoadModule = (() => {
  const init = () => {
    document.body.classList.add('loaded');
    
    // Remove loading indicators if any
    const loaders = document.querySelectorAll('.loader, .loading');
    loaders.forEach(loader => loader.remove());
  };

  return { init };
})();

// =========================================================================
// BOOKING WIDGET FUNCTIONS - Redirect to contact page
// =========================================================================
window.openBookingWidget = (serviceName = '') => {
  if (serviceName) {
    sessionStorage.setItem('selectedService', serviceName);
  }
  window.location.href = 'contact.html#booking-form';
};

window.closeBookingWidget = () => {
  // Not used but kept for compatibility
  console.log('Booking widget closed');
};

// =========================================================================
// FAQ TOGGLE FUNCTION
// =========================================================================
window.toggleFAQ = function(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Toggle current item
  if (!isActive) {
    faqItem.classList.add('active');
  }
};

// Close modal function (for photo gallery)
window.closeModal = function() {
  const modal = document.getElementById('photoModal');
  if (modal) {
    modal.style.display = 'none';
  }
};

// =========================================================================
// INITIALIZATION
// =========================================================================
const App = (() => {
  const init = () => {
    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
      CarouselModule.init();
      NavigationModule.init();
      IntersectionObserverModule.init();
      ModalModule.init();
      TypewriterModule.init();
      SmoothScrollModule.init();
      AccessibilityModule.init();
      ImageOptimizationModule.init();
      ScrollEffectsModule.init();
      TestimonialSliderModule.init();
    });

    // Window Load
    window.addEventListener('load', () => {
      PageLoadModule.init();
    });

    // Console branding
    console.log(
      '%cSladent Dentistry',
      'color: #0a4d68; font-size: 20px; font-weight: bold; padding: 10px;'
    );
    console.log(
      '%cProfessional Dental Care',
      'color: #5a9a96; font-size: 12px;'
    );
  };

  return { init };
})();

// Initialize the app
App.init();
