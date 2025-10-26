// Mobile Navigation dengan Animasi
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    if (hamburger && navUl) {
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle scroll pada body saat menu aktif
            if (navUl.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Menutup menu saat link diklik
        const navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navUl.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});