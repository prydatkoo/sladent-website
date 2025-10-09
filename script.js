/***** MODERN CAROUSEL WITH SMOOTH TRANSITIONS *****/
let slideIndex = 0;
let carouselInterval;
const slides = document.getElementsByClassName("carousel-slide");

function showSlide(index) {
  if (slides.length === 0) return;

  // Remove active class from all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // Calculate the correct index with wrapping
  slideIndex = (index + slides.length) % slides.length;

  // Activate the current slide
  slides[slideIndex].classList.add("active");
}

// Initialize carousel
if (slides.length > 0) {
  showSlide(slideIndex);

  // Auto-play every 6 seconds for smooth transitions
  carouselInterval = setInterval(() => {
    showSlide(slideIndex + 1);
  }, 6000);

  // Pause carousel on hover for better UX
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(() => {
        showSlide(slideIndex + 1);
      }, 6000);
    });
  }
}

/***** ENHANCED MOBILE MENU WITH LIQUID GLASS EFFECTS *****/
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  
  // Enhanced hamburger click with smooth animations
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const isOpen = navLinks.classList.contains("show");
    
    if (isOpen) {
      // Close menu with smooth animation
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
      
      // Add close animation delay for menu items
      const navItems = navLinks.querySelectorAll("li");
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = "translateY(15px)";
          item.style.opacity = "0";
        }, index * 10);
      });
    } else {
      // Open menu with smooth animation
      navLinks.classList.add("show");
      hamburger.classList.add("active");
      document.body.style.overflow = "hidden";
      
      // Animate menu items in with staggered delay
      const navItems = navLinks.querySelectorAll("li");
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = "translateY(0)";
          item.style.opacity = "1";
        }, 100 + (index * 30));
      });
      
      // Add subtle logo animation when menu opens
      const logoLink = document.querySelector('.logo-link');
      if (logoLink) {
        setTimeout(() => {
          logoLink.style.transform = "scale(0.95)";
          setTimeout(() => {
            logoLink.style.transform = "scale(1)";
          }, 150);
        }, 100);
      }
    }
  });

  // Close menu when clicking on a link with smooth animation
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Get the href and navigate after animation
      const href = item.getAttribute("href");
      
      // Close menu first
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
      
      // Navigate after a short delay for smooth transition
      setTimeout(() => {
        if (href && href !== "#") {
          window.location.href = href;
        }
      }, 300);
    });
  });

  // Close menu when clicking outside with enhanced detection
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      if (navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
        
        // Reset menu items animation
        const navItems = navLinks.querySelectorAll("li");
        navItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = "translateY(15px)";
            item.style.opacity = "0";
          }, index * 8);
        });
      }
    }
  });

  // Add swipe gesture support for mobile
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  navLinks.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  navLinks.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    
    // If swiping left (closing gesture)
    if (diffX > 50) {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
      isDragging = false;
    }
  });

  navLinks.addEventListener("touchend", () => {
    isDragging = false;
  });
}

/***** HEADER SCROLL EFFECT *****/
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add background to header on scroll
  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

/***** SMOOTH SCROLL FOR ANCHOR LINKS *****/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

/***** INTERSECTION OBSERVER FOR SCROLL ANIMATIONS *****/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add delay for staggered animation effect
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
      
      // Optional: stop observing after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
const animatedElements = document.querySelectorAll(
  ".fade-in, .fade-in-left, .fade-in-right, .scale-in, .feature-box, .team-photo"
);

animatedElements.forEach((el) => {
  observer.observe(el);
});

/***** ENHANCED PHOTO MODAL WITH ANIMATIONS *****/
function openModal(imageSrc) {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");

  if (modal && modalImg) {
    modal.style.display = "flex";
  modalImg.src = imageSrc;
    document.body.style.overflow = "hidden";

    // Add click outside to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

function closeModal() {
  const modal = document.getElementById("photoModal");
  
  if (modal) {
  modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

/***** PARALLAX EFFECT FOR HERO SECTION *****/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector(".hero-section");
  
  if (heroSection && scrolled < window.innerHeight) {
    const parallaxSpeed = 0.5;
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

/***** PRELOAD IMAGES FOR SMOOTH CAROUSEL *****/
window.addEventListener("DOMContentLoaded", () => {
  const carouselImages = document.querySelectorAll(".carousel-slide img");
  
  carouselImages.forEach((img) => {
    const newImg = new Image();
    newImg.src = img.src;
  });
});

/***** ADD LOADING ANIMATION *****/
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  
  // Trigger initial animations
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.animationDelay = "0s";
  }
});

/***** FEATURE BOX HOVER EFFECT ENHANCEMENT *****/
const featureBoxes = document.querySelectorAll(".feature-box");

featureBoxes.forEach((box) => {
  box.addEventListener("mouseenter", function() {
    this.style.setProperty("--hover-scale", "1.02");
  });
  
  box.addEventListener("mouseleave", function() {
    this.style.setProperty("--hover-scale", "1");
  });
});

/***** TEAM PHOTO RIPPLE EFFECT *****/
const teamPhotos = document.querySelectorAll(".team-photo");

teamPhotos.forEach((photo) => {
  photo.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/***** LAZY LOADING FOR IMAGES *****/
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}

/***** SMOOTH PAGE TRANSITIONS *****/
document.addEventListener("DOMContentLoaded", () => {
  // Fade in page content
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";
  
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

/***** NAVIGATION LINK ACTIVE STATE *****/
window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");
  
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});

/***** ENHANCED BUTTON INTERACTIONS *****/
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-5px) scale(1.05)";
  });
  
  btn.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0) scale(1)";
  });
  
  btn.addEventListener("mousedown", function() {
    this.style.transform = "translateY(-2px) scale(1.02)";
  });
  
  btn.addEventListener("mouseup", function() {
    this.style.transform = "translateY(-5px) scale(1.05)";
  });
});

/***** PERFORMANCE OPTIMIZATION *****/
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
  // Add any additional scroll-based operations here
}, 10);

window.addEventListener("scroll", debouncedScroll);

/***** ACCESSIBILITY ENHANCEMENTS *****/
// Add keyboard navigation for modals
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("photoModal");
  
  if (modal && modal.style.display === "flex") {
    if (e.key === "Tab") {
      e.preventDefault(); // Keep focus within modal
    }
  }
});

// Focus management for mobile menu
if (hamburger && navLinks) {
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  });
}

/***** BEAUTIFUL TYPEWRITER EFFECT *****/
const typewriterElement = document.getElementById('typewriter');

if (typewriterElement) {
  const phrases = [
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
  
  function typeWriter() {
    const fullText = phrases[phraseIndex];
    
    if (isDeleting) {
      currentPhrase = fullText.substring(0, letterIndex - 1);
      letterIndex--;
    } else {
      currentPhrase = fullText.substring(0, letterIndex + 1);
      letterIndex++;
    }
    
    typewriterElement.textContent = currentPhrase;
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && letterIndex === fullText.length) {
      typeSpeed = 2500; // Pause at end
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  // Start typing after page loads
  setTimeout(() => {
    typeWriter();
  }, 2000);
}

/***** CONSOLE WELCOME MESSAGE *****/
console.log(
  "%cWelcome to Sladent! 🦷",
  "color: #45b39d; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);"
);
console.log(
  "%cМодерна стоматологія з турботою про вашу усмішку ✨",
  "color: #16a085; font-size: 14px; font-weight: 500;"
);
