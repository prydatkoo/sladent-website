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
    'створює здорові усмішки',
    'надає комплексні послуги',
    'працює з любов\'ю до пацієнтів'
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

window.openDoctorModal = (doctorId) => {
  // Placeholder for doctor modal functionality
  console.log('Opening doctor modal:', doctorId);
  // TODO: Implement doctor modal with detailed bio
};

window.moveTestimonial = (direction) => {
  TestimonialSliderModule.move(direction);
};

// Booking Widget Global Functions - REDIRECT TO CONTACT PAGE
window.openBookingWidget = (serviceName = '') => {
  // Redirect to contact page where patients can fill out the form
  // If service name provided, store it in sessionStorage to pre-fill form
  if (serviceName) {
    sessionStorage.setItem('selectedService', serviceName);
  }
  window.location.href = 'contact.html#booking-form';
  return false;
};

window.closeBookingWidget = () => {
  // Not needed - using contact page
  return false;
};

// Legacy functions for compatibility
window.nextWidgetStep = () => {
  console.log('Using contact page form');
};

window.prevWidgetStep = () => {
  console.log('Using contact page form');
};

window.confirmWidgetBooking = () => {
  console.log('Using contact page form');
};

window.addToCalendar = () => {
  console.log('Using contact page form');
};

// =========================================================================
// TESTIMONIAL SLIDER MODULE
// =========================================================================
const TestimonialSliderModule = (() => {
  let currentSlide = 0;
  let slides = [];
  
  const init = () => {
    slides = document.querySelectorAll('.testimonial-card');
    if (slides.length === 0) return;
    
    showSlide(0);
    setupAutoPlay();
  };
  
  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  };
  
  const move = (direction) => {
    showSlide(currentSlide + direction);
  };
  
  const setupAutoPlay = () => {
    setInterval(() => {
      move(1);
    }, 7000);
  };
  
  return { init, move };
})();

// =========================================================================
// BOOKING WIDGET MODULE (DEPRECATED - Using Calendly instead)
// =========================================================================
// IMPORTANT: All booking functionality is now handled by Calendly
// This ensures NO DATABASE, NO BACKEND, completely secure third-party booking
// The BookingWidgetModule below is kept for reference but NOT USED
// =========================================================================
/*
const BookingWidgetModule = (() => {
  let currentStep = 1;
  let bookingData = {
    service: '',
    doctor: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  };
  
  let widget, overlay;
  
  const init = () => {
    widget = document.getElementById('bookingWidget');
    overlay = widget;
    
    if (!widget) return;
    
    setupServiceSelection();
    setupTimeSelection();
    setupDateInput();
    setupFormValidation();
    setupEscapeKey();
  };
  
  const open = () => {
    if (!widget) return;
    
    // Reset to step 1
    currentStep = 1;
    updateStepDisplay();
    
    // Show widget
    widget.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to tomorrow
    const dateInput = document.getElementById('widgetDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }
  };
  
  const close = () => {
    if (!widget) return;
    
    widget.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after animation
    setTimeout(() => {
      resetWidget();
    }, 300);
  };
  
  const resetWidget = () => {
    currentStep = 1;
    bookingData = {
      service: '',
      doctor: '',
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };
    
    // Clear selections
    document.querySelectorAll('.service-selection-card').forEach(card => {
      card.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot').forEach(slot => {
      slot.classList.remove('selected');
    });
    
    // Clear form inputs
    const inputs = widget.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });
    
    updateStepDisplay();
  };
  
  const setupServiceSelection = () => {
    const serviceCards = document.querySelectorAll('.service-selection-card');
    const nextBtn = document.getElementById('step1NextBtn');
    
    serviceCards.forEach(card => {
      card.addEventListener('click', function() {
        serviceCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        bookingData.service = this.dataset.service;
        
        if (nextBtn) nextBtn.disabled = false;
      });
    });
  };
  
  const setupTimeSelection = () => {
    const timeSlots = document.querySelectorAll('.time-slot');
    const nextBtn = document.getElementById('step2NextBtn');
    
    timeSlots.forEach(slot => {
      slot.addEventListener('click', function() {
        if (this.disabled) return;
        
        timeSlots.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
        bookingData.time = this.dataset.time;
        
        validateStep2();
      });
    });
    
    // Date change listener
    const dateInput = document.getElementById('widgetDate');
    if (dateInput) {
      dateInput.addEventListener('change', function() {
        bookingData.date = this.value;
        validateStep2();
      });
    }
    
    // Doctor selection
    const doctorSelect = document.getElementById('widgetDoctor');
    if (doctorSelect) {
      doctorSelect.addEventListener('change', function() {
        bookingData.doctor = this.value;
      });
    }
  };
  
  const validateStep2 = () => {
    const nextBtn = document.getElementById('step2NextBtn');
    if (nextBtn) {
      nextBtn.disabled = !(bookingData.date && bookingData.time);
    }
  };
  
  const setupDateInput = () => {
    const dateInput = document.getElementById('widgetDate');
    if (!dateInput) return;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  };
  
  const setupFormValidation = () => {
    const inputs = [
      'widgetFirstName',
      'widgetLastName',
      'widgetPhone',
      'widgetEmail'
    ];
    
    inputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('input', validateStep3);
      }
    });
    
    const checkbox = document.getElementById('widgetPrivacyAgree');
    if (checkbox) {
      checkbox.addEventListener('change', validateStep3);
    }
  };
  
  const validateStep3 = () => {
    const firstName = document.getElementById('widgetFirstName')?.value.trim();
    const lastName = document.getElementById('widgetLastName')?.value.trim();
    const phone = document.getElementById('widgetPhone')?.value.trim();
    const email = document.getElementById('widgetEmail')?.value.trim();
    const privacyAgree = document.getElementById('widgetPrivacyAgree')?.checked;
    
    const confirmBtn = document.getElementById('step3ConfirmBtn');
    if (confirmBtn) {
      const isValid = firstName && lastName && phone && email && privacyAgree;
      confirmBtn.disabled = !isValid;
    }
  };
  
  const setupEscapeKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && widget && widget.classList.contains('active')) {
        close();
      }
    });
    
    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          close();
        }
      });
    }
  };
  
  const nextStep = () => {
    if (currentStep < 3) {
      currentStep++;
      updateStepDisplay();
      widget.querySelector('.booking-widget-content').scrollTop = 0;
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      currentStep--;
      updateStepDisplay();
      widget.querySelector('.booking-widget-content').scrollTop = 0;
    }
  };
  
  const updateStepDisplay = () => {
    // Update progress indicators
    document.querySelectorAll('.widget-progress-step').forEach((step, index) => {
      step.classList.remove('active', 'completed');
      if (index + 1 === currentStep) {
        step.classList.add('active');
      } else if (index + 1 < currentStep) {
        step.classList.add('completed');
      }
    });
    
    // Update step content
    document.querySelectorAll('.widget-step').forEach((step, index) => {
      step.classList.remove('active');
      if (index + 1 === currentStep) {
        step.classList.add('active');
      }
    });
  };
  
  const confirmBooking = () => {
    // Collect all data
    bookingData.firstName = document.getElementById('widgetFirstName')?.value.trim();
    bookingData.lastName = document.getElementById('widgetLastName')?.value.trim();
    bookingData.phone = document.getElementById('widgetPhone')?.value.trim();
    bookingData.email = document.getElementById('widgetEmail')?.value.trim();
    
    // Validate
    if (!bookingData.firstName || !bookingData.lastName || !bookingData.phone || !bookingData.email) {
      alert('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }
    
    if (!document.getElementById('widgetPrivacyAgree')?.checked) {
      alert('Будь ласка, погодьтесь з політикою конфіденційності');
      return;
    }
    
    // Show confirmation
    displayConfirmation();
    currentStep = 4;
    updateStepDisplay();
    
    // Here you would normally send data to server
    console.log('Booking confirmed:', bookingData);
    
    // Simulate sending data to secure PMS
    // In production, this would be an encrypted API call
    simulateSecureSubmission();
  };
  
  const displayConfirmation = () => {
    const serviceNames = {
      'consultation': 'Нова консультація / New Patient Consultation',
      'checkup': 'Огляд та чистка / Check-up & Cleaning',
      'implant': 'Консультація по імплантах / Implant Consultation',
      'other': 'Інше / Other Services'
    };
    
    const doctorNames = {
      'doctor1': 'Доктор Ярослав Придатко',
      'doctor2': 'Доктор Юрій Придатко',
      'doctor3': 'Доктор Світлана Придатко',
      '': 'Будь-який доступний лікар'
    };
    
    // Format date
    const date = new Date(bookingData.date);
    const formattedDate = date.toLocaleDateString('uk-UA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
    
    // Update confirmation display
    document.getElementById('confirmServiceText').textContent = serviceNames[bookingData.service];
    document.getElementById('confirmDateText').textContent = formattedDate;
    document.getElementById('confirmTimeText').textContent = bookingData.time;
    document.getElementById('confirmDoctorText').textContent = doctorNames[bookingData.doctor];
    document.getElementById('confirmPatientText').textContent = `${bookingData.firstName} ${bookingData.lastName}`;
  };
  
  const simulateSecureSubmission = () => {
    // This simulates a secure, encrypted submission to a Patient Management System
    // In production, this would use HTTPS POST to a secure API endpoint
    console.log('🔒 Secure encrypted submission to PMS...');
    console.log('✅ Data encrypted using TLS/SSL');
    console.log('📧 Confirmation email queued');
    console.log('📅 Appointment added to clinic calendar');
  };
  
  const addToCalendar = () => {
    // Generate Google Calendar link
    const serviceNames = {
      'consultation': 'Нова консультація',
      'checkup': 'Огляд та чистка',
      'implant': 'Консультація по імплантах',
      'other': 'Інше'
    };
    
    const title = `${serviceNames[bookingData.service]} - Sladent`;
    const location = 'просп. Злуки 8, м. Тернопіль';
    const details = `Візит до стоматології Sladent (Стоматологія Родини Придатко)`;
    
    // Create date-time for calendar
    const [year, month, day] = bookingData.date.split('-');
    const [hour, minute] = bookingData.time.split(':');
    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour
    
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalUrl, '_blank');
  };
  
  return {
    init,
    open,
    close,
    nextStep,
    prevStep,
    confirmBooking,
    addToCalendar
  };
})();
*/
// END OF DEPRECATED BOOKING MODULE

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
      // BookingWidgetModule.init(); // REMOVED - Using Calendly instead
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

// FAQ Toggle Function
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

// Start the application
App.init();
