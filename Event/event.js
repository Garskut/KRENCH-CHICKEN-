// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Modal Functionality
const modal = document.querySelector('.modal');
const termsBtn = document.querySelector('.btn-terms');
const closeModal = document.querySelector('.close-modal');

// Open modal
termsBtn.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.event-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial animation setup
document.querySelectorAll('.event-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
// Trigger initial check
revealOnScroll();