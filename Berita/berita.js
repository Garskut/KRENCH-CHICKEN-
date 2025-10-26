// JavaScript untuk halaman berita
document.addEventListener('DOMContentLoaded', () => {
    const readButtons = document.querySelectorAll('.news-card__button');

    readButtons.forEach((button) => {
        button.addEventListener('click', () => {
            alert('Artikel akan segera dibuka');
        });
    });

    initNavbarInteraction();
});

function initNavbarInteraction() {
    const originalHamburger = document.querySelector('.hamburger');
    const originalNavMenu = document.querySelector('nav ul');

    if (!originalHamburger || !originalNavMenu) return;

    const cleanHamburger = originalHamburger.cloneNode(true);
    originalHamburger.parentNode.replaceChild(cleanHamburger, originalHamburger);

    const cleanNavMenu = originalNavMenu.cloneNode(true);
    originalNavMenu.parentNode.replaceChild(cleanNavMenu, originalNavMenu);

    cleanHamburger.addEventListener('click', () => {
        cleanNavMenu.classList.toggle('active');
        cleanHamburger.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        const clickedInsideMenu = cleanNavMenu.contains(event.target);
        const clickedHamburger = cleanHamburger.contains(event.target);

        if (!clickedInsideMenu && !clickedHamburger && cleanNavMenu.classList.contains('active')) {
            cleanNavMenu.classList.remove('active');
            cleanHamburger.classList.remove('active');
        }
    });

    cleanNavMenu.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            cleanNavMenu.classList.remove('active');
            cleanHamburger.classList.remove('active');
        });
    });
}
