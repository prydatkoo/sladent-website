/***** CAROUSEL SCRIPT *****/
let slideIndex = 0;
const slides = document.getElementsByClassName("carousel-slide");

function showSlide(index) {
  if (slides.length === 0) return;

  // Reset all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // Calculate the correct index
  slideIndex = (index + slides.length) % slides.length;

  // Activate the current slide
  slides[slideIndex].classList.add("active");
}

// Initialize carousel
if (slides.length > 0) {
  showSlide(slideIndex);

  // Auto-play every 5 seconds
  setInterval(() => {
    showSlide(slideIndex + 1);
  }, 5000);
}

/***** MOBILE MENU SCRIPT *****/
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/***** MAKE PHOTOS CLICKABLE *****/
function openModal(imageSrc) {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex"; // use flex to center content
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById("photoModal");
  modal.style.display = "none";
}
