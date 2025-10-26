// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            navUl.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Ensure all navigation links are clickable
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow the link to work
            e.stopPropagation();
        });
    });
    
    // Ensure the form is properly displayed
    const partnershipForm = document.querySelector('.partnership-form-content');
    if (partnershipForm) {
        partnershipForm.style.display = 'block';
    }
    

});



// Google Maps sudah menggunakan iframe embed seperti di Beranda
// Tidak perlu JavaScript API yang kompleks

// Google Maps sudah dimuat langsung dari HTML, tidak perlu dynamic loading

// Form Submission Handler untuk partnership form
const partnershipForm = document.querySelector('.partnership-form-content');
if (partnershipForm) {
    partnershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data form
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Ubah teks tombol
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulasi pengiriman form
        setTimeout(() => {
            // Simulasi sukses
            showNotification('Request berhasil dikirim! Tim kami akan segera menghubungi Anda.', 'success');
            this.reset();
            
            // Reset tombol
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification Function
function showNotification(message, type) {
    // Hapus notifikasi yang ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style notifikasi
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Event listener untuk tombol close
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Enhanced Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add a slight delay for staggered animation
                    const delay = Array.from(elements).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) translateX(0)';
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            // Set initial state for scroll reveal elements
            if (element.classList.contains('scroll-reveal')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            } else if (element.classList.contains('scroll-reveal-left')) {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-50px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            } else if (element.classList.contains('scroll-reveal-right')) {
                element.style.opacity = '0';
                element.style.transform = 'translateX(50px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
            observer.observe(element);
        });
    } else {
        // Fallback untuk browser lama
        elements.forEach(element => {
            element.classList.add('visible');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0)';
        });
    }
}

// Form Validation
function setupFormValidation() {
    const form = document.querySelector('.partnership-form-content');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Hapus error sebelumnya
    clearError(e);
    
    // Validasi berdasarkan tipe field
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Field ini wajib diisi';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Format email tidak valid';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Nomor telepon tidak valid';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '#e9ecef';
}

function showFieldError(field, message) {
    field.style.borderColor = '#f44336';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #f44336;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Smooth scroll behavior
function initSmoothScroll() {
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add smooth scroll behavior to CSS
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Ensure form visibility
function ensureFormVisibility() {
    const formSection = document.querySelector('.partnership-section');
    const formImage = document.querySelector('.partnership-image');
    const formContent = document.querySelector('.partnership-form');
    
    if (formSection) {
        // Ensure form is always visible
        formSection.style.opacity = '1';
        formSection.style.transform = 'translateY(0)';
        formSection.classList.add('visible');
        
        // Ensure image is always visible
        if (formImage) {
            formImage.style.opacity = '1';
            formImage.style.transform = 'translateY(0)';
            formImage.style.display = 'block';
            formImage.style.visibility = 'visible';
        }
        
        // Ensure form content is always visible
        if (formContent) {
            formContent.style.opacity = '1';
            formContent.style.transform = 'translateY(0)';
            formContent.style.display = 'block';
            formContent.style.visibility = 'visible';
        }
        
        // Add a scroll listener to ensure form stays visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('visible');
                    
                    // Hide scroll indicator when form is visible
                    const scrollIndicator = document.querySelector('.scroll-indicator');
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            if (scrollIndicator.parentNode) {
                                scrollIndicator.remove();
                            }
                        }, 300);
                    }
                } else {
                    // Keep form visible even when not intersecting
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(formSection);
    }
}

// Map loading indicator tidak diperlukan karena API dimuat langsung dari HTML

// Initialize semua fungsi saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup other functions
    animateOnScroll();
    setupFormValidation();
    initSmoothScroll();
    ensureFormVisibility();
    
    // Google Maps menggunakan iframe embed, tidak perlu timeout fallback
    
    // Force form and image visibility on page load
    setTimeout(() => {
        const formSection = document.querySelector('.partnership-section');
        const formImage = document.querySelector('.partnership-image');
        const formContent = document.querySelector('.partnership-form');
        
        if (formSection) {
            formSection.style.opacity = '1';
            formSection.style.transform = 'translateY(0)';
            formSection.style.display = 'block';
            formSection.style.visibility = 'visible';
            formSection.classList.add('visible');
        }
        
        if (formImage) {
            formImage.style.opacity = '1';
            formImage.style.transform = 'translateY(0)';
            formImage.style.display = 'block';
            formImage.style.visibility = 'visible';
        }
        
        if (formContent) {
            formContent.style.opacity = '1';
            formContent.style.transform = 'translateY(0)';
            formContent.style.display = 'block';
            formContent.style.visibility = 'visible';
        }
    }, 100);
    
    // Tambahkan class untuk animasi
    const locationSection = document.querySelector('.location-section');
    const formSection = document.querySelector('.partnership-section');
    
    if (locationSection) {
        locationSection.classList.add('fade-in');
    }
    
    // Ensure form section is properly initialized and always visible
    if (formSection) {
        // Remove any scroll reveal classes that might hide the form
        formSection.classList.remove('scroll-reveal');
        formSection.style.opacity = '1';
        formSection.style.transform = 'translateY(0)';
        formSection.classList.add('visible');
        
        const formImage = formSection.querySelector('.partnership-image');
        const formContent = formSection.querySelector('.partnership-form');
        
        // Apply scroll reveal only to image and content, not the whole section
        if (formImage && !formImage.classList.contains('scroll-reveal-left')) {
            formImage.classList.add('scroll-reveal-left');
        }
        if (formContent && !formContent.classList.contains('scroll-reveal-right')) {
            formContent.classList.add('scroll-reveal-right');
        }
    }
    
    // Add a scroll indicator to help users find the form
    addScrollIndicator();
    
    // Add scroll listener to ensure form and image stay visible
    window.addEventListener('scroll', function() {
        const formSection = document.querySelector('.partnership-section');
        const formImage = document.querySelector('.partnership-image');
        const formContent = document.querySelector('.partnership-form');
        
        if (formSection) {
            formSection.style.opacity = '1';
            formSection.style.transform = 'translateY(0)';
            formSection.style.display = 'block';
            formSection.style.visibility = 'visible';
        }
        
        if (formImage) {
            formImage.style.opacity = '1';
            formImage.style.transform = 'translateY(0)';
            formImage.style.display = 'block';
            formImage.style.visibility = 'visible';
        }
        
        if (formContent) {
            formContent.style.opacity = '1';
            formContent.style.transform = 'translateY(0)';
            formContent.style.display = 'block';
            formContent.style.visibility = 'visible';
        }
    });
});

// Add scroll indicator
function addScrollIndicator() {
    // Check if form section exists
    const formSection = document.querySelector('.partnership-section');
    if (!formSection) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
        <div class="scroll-arrow">
            <i class="fas fa-chevron-down"></i>
            <span>Scroll untuk melihat form</span>
        </div>
    `;
    
    indicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #F9B906;
        color: white;
        padding: 15px 20px;
        border-radius: 50px;
        box-shadow: 0 5px 15px rgba(249, 185, 6, 0.3);
        z-index: 1000;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 600;
        opacity: 0;
        transform: translateY(20px);
    `;
    
    // Click to scroll to form
    indicator.addEventListener('click', () => {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    document.body.appendChild(indicator);
    
    // Animate in
    setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
    }, 1000);
    
    // Hide indicator when form is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                indicator.style.opacity = '0';
                indicator.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();
                    }
                }, 300);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(formSection);
    
    // Auto hide after 8 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove();
                }
            }, 300);
        }
    }, 8000);
}

// CSS untuk animasi notifikasi dan map fallback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .map-fallback {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #f8f9fa;
        border-radius: 15px;
        padding: 40px 20px;
        text-align: center;
    }
    
    .map-fallback i {
        font-size: 3rem;
        color: #F9B906;
        margin-bottom: 20px;
    }
    
    .map-fallback h3 {
        color: #333;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }
    
    .map-fallback p {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    /* Scroll reveal animations */
    .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-reveal-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-reveal-left.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .scroll-reveal-right {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-reveal-right.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Partnership section specific styles - Always visible */
    .partnership-section {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.8s ease, transform 0.8s ease;
        display: block !important;
        visibility: visible !important;
    }
    
    .partnership-section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Ensure form content is always visible */
    .partnership-form {
        opacity: 1 !important;
        transform: translateY(0) !important;
        display: block !important;
        visibility: visible !important;
    }
    
    .partnership-form-content {
        opacity: 1 !important;
        transform: translateY(0) !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Ensure partnership image is visible */
    .partnership-image {
        opacity: 1 !important;
        transform: translateY(0) !important;
        display: block !important;
        visibility: visible !important;
    }
    
    .partnership-image img {
        opacity: 1 !important;
        transform: translateY(0) !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Scroll indicator animation */
    .scroll-indicator:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(249, 185, 6, 0.4);
    }
    
    .scroll-arrow {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .scroll-arrow i {
        animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-5px);
        }
        60% {
            transform: translateY(-3px);
        }
    }
    
    /* Ensure form section is visible */
    .contact-form-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
    
    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Map loading indicator */
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #F9B906;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .map-loading-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #f8f9fa;
        border-radius: 15px;
        padding: 40px 20px;
        text-align: center;
    }
    
    .map-loading-indicator p {
        margin: 0;
        font-size: 14px;
        color: #666;
    }
    
    /* Map container styles */
    #map {
        width: 100%;
        height: 400px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .map-container {
        position: relative;
        width: 100%;
        height: 400px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    /* Iframe fallback styles */
    #map iframe {
        width: 100%;
        height: 400px;
        border: none;
        border-radius: 15px;
    }
`;
document.head.appendChild(style);