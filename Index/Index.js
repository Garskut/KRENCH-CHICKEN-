// Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let slideInterval;

// Initialize slider
function initSlider() {
    // Set first slide as active
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Start auto slide
    startSlideInterval();
}

// Start auto slide interval
function startSlideInterval() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Reset interval when manually changing slides
function resetInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Go to specific slide
function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide index
    currentSlide = index;
    
    // Handle index out of bounds
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    // Add active class to new current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide function
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Previous slide function
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Event listeners for slider controls
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-index'));
        goToSlide(slideIndex);
        resetInterval();
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Order button animation
const orderButtons = document.querySelectorAll('.btn-order');

orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('clicked');
        
        // Show order confirmation message
        const card = this.closest('.menu-card');
        const menuName = card.querySelector('h3').textContent;
        alert(`Terima kasih telah memesan ${menuName}! Pesanan Anda sedang diproses.`);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
});

// Google Maps Integration
