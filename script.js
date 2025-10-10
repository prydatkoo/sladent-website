// =========================================================================
// SLADENT DENTISTRY - PROFESSIONAL JAVASCRIPT
// Modular, clean, and maintainable code structure
// =========================================================================

'use strict';

// =========================================================================
// CONFIGURATION
// =========================================================================
const CONFIG = {
  carousel: {
    interval: 6000,
    transitionSpeed: 2000
  },
  animations: {
    staggerDelay: 30,
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
// NAVIGATION MODULE
// =========================================================================
const NavigationModule = (() => {
  let hamburger;
  let navLinks;
  let isOpen = false;

  const init = () => {
    hamburger = document.getElementById('hamburger');
    navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;

    setupEventListeners();
    setActiveLink();
  };

  const setupEventListeners = () => {
    hamburger.addEventListener('click', handleToggle);
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
    document.addEventListener('click', handleOutsideClick);
    setupSwipeGestures();
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    isOpen = navLinks.classList.contains('show');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    navLinks.classList.add('show');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    animateMenuItems(true);
  };

  const closeMenu = () => {
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    animateMenuItems(false);
  };

  const animateMenuItems = (opening) => {
    const items = navLinks.querySelectorAll('li');
    items.forEach((item, index) => {
      const delay = opening ? 100 + (index * CONFIG.animations.staggerDelay) : index * 10;
      setTimeout(() => {
        item.style.transform = opening ? 'translateY(0)' : 'translateY(15px)';
        item.style.opacity = opening ? '1' : '0';
      }, delay);
    });
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    closeMenu();
    
    setTimeout(() => {
      if (href && href !== '#') {
        window.location.href = href;
      }
    }, 300);
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
    });

    navLinks.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      if (diffX > 50) {
        closeMenu();
        isDragging = false;
      }
    });

    navLinks.addEventListener('touchend', () => {
      isDragging = false;
    });
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
// SCROLL EFFECTS MODULE
// =========================================================================
const ScrollEffectsModule = (() => {
  let header;
  let lastScroll = 0;

  const init = () => {
    header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', debounce(handleScroll, 10));
    setupParallax();
  };

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  const setupParallax = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
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
    const options = {
      threshold: CONFIG.animations.observerThreshold,
      rootMargin: CONFIG.animations.observerMargin
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    const elements = document.querySelectorAll(
      '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .feature-box, .team-photo'
    );

    elements.forEach(el => observer.observe(el));
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  };

  return { init };
})();

// =========================================================================
// MODAL MODULE
// =========================================================================
const ModalModule = (() => {
  let modal;
  let modalImg;

  const init = () => {
    modal = document.getElementById('photoModal');
    modalImg = document.getElementById('modalImg');
    
    if (!modal || !modalImg) return;

    setupEventListeners();
  };

  const setupEventListeners = () => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  const open = (imageSrc) => {
    if (!modal || !modalImg) return;
    
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  return { init, open, close };
})();

// =========================================================================
// TYPEWRITER MODULE
// =========================================================================
const TypewriterModule = (() => {
  let element;
  let phrases = [
    'дбає про вашу усмішку',
    'поєднує професіоналізм і турботу',
    'використовує новітні технології',
    'гарантує комфорт і безпеку',
    'створює здорові усмішки'
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = '';
  let isDeleting = false;

  const init = () => {
    element = document.getElementById('typewriter');
    if (!element) return;

    setTimeout(type, CONFIG.typewriter.startDelay);
  };

  const type = () => {
    const fullText = phrases[phraseIndex];
    
    if (isDeleting) {
      currentPhrase = fullText.substring(0, letterIndex - 1);
      letterIndex--;
    } else {
      currentPhrase = fullText.substring(0, letterIndex + 1);
      letterIndex++;
    }
    
    element.textContent = currentPhrase;
    
    let typeSpeed = isDeleting ? CONFIG.typewriter.deleteSpeed : CONFIG.typewriter.typeSpeed;
    
    if (!isDeleting && letterIndex === fullText.length) {
      typeSpeed = CONFIG.typewriter.pauseAtEnd;
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = CONFIG.typewriter.pauseBeforeNext;
    }
    
    setTimeout(type, typeSpeed);
  };

  return { init };
})();

// =========================================================================
// UTILITY FUNCTIONS
// =========================================================================
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// =========================================================================
// IMAGE OPTIMIZATION
// =========================================================================
const ImageOptimizationModule = (() => {
  const init = () => {
    preloadCarouselImages();
    setupLazyLoading();
  };

  const preloadCarouselImages = () => {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    carouselImages.forEach(img => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    });
  };

  const setupLazyLoading = () => {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  };

  return { init };
})();

// =========================================================================
// SMOOTH SCROLL
// =========================================================================
const SmoothScrollModule = (() => {
  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { init };
})();

// =========================================================================
// ACCESSIBILITY
// =========================================================================
const AccessibilityModule = (() => {
  const init = () => {
    setupKeyboardNavigation();
    setupFocusManagement();
  };

  const setupKeyboardNavigation = () => {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
      hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          hamburger.click();
        }
      });
    }
  };

  const setupFocusManagement = () => {
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('photoModal');
      if (modal && modal.style.display === 'flex' && e.key === 'Tab') {
        e.preventDefault();
      }
    });
  };

  return { init };
})();

// =========================================================================
// PAGE LOAD ANIMATIONS
// =========================================================================
const PageLoadModule = (() => {
  const init = () => {
    document.body.classList.add('loaded');
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.animationDelay = '0s';
    }
  };

  return { init };
})();

// =========================================================================
// GLOBAL MODAL FUNCTIONS (for inline onclick attributes)
// =========================================================================
window.openModal = (imageSrc) => {
  ModalModule.open(imageSrc);
};

window.closeModal = () => {
  ModalModule.close();
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
    });

    // Window Load
    window.addEventListener('load', () => {
      PageLoadModule.init();
    });

    // Console branding
    console.log(
      '%cSladent Dentistry',
      'color: #2c5f5d; font-size: 20px; font-weight: bold; padding: 10px;'
    );
    console.log(
      '%cProfessional Dental Care',
      'color: #5a9a96; font-size: 12px;'
    );
  };

  return { init };
})();

// Start the application
App.init();
