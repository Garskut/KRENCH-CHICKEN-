// PDF Viewer Functionality
class PDFViewer {
    constructor(viewerId, pdfPath) {
        this.viewerId = viewerId;
        this.pdfPath = pdfPath;
        this.container = document.getElementById(viewerId);
        this.pdfDoc = null;
        this.pdfInstance = null;
        this.currentScale = this.calculateScale(); // Dynamically calculate scale based on screen size
        this.totalPages = 0;
        this.currentPage = 1;
        this.viewerContainer = null;
        
        // Add resize listener to adjust scale when window size changes
        window.addEventListener('resize', () => {
            this.currentScale = this.calculateScale();
            if (this.pdfDoc) {
                this.renderAllPages();
            }
        });
        
        this.init();
    }
    
    // Calculate appropriate scale based on screen width
    calculateScale() {
        const width = window.innerWidth;
        if (width <= 480) { // Mobile phones
            return 0.5; // Smaller scale for mobile
        } else if (width <= 768) { // Tablets
            return 0.65;
        } else {
            return 0.8; // Desktop
        }
    }
    
    // Calculate container height based on screen size
    calculateContainerHeight() {
        // Use fixed height to ensure scrollability
        return '100vh'; // Full viewport height to allow scrolling
    }
    
    async init() {
        try {
            // Initialize PDF.js
            const pdfjsLib = window.pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            
            // Load the PDF
            this.pdfDoc = await pdfjsLib.getDocument(this.pdfPath).promise;
            this.totalPages = this.pdfDoc.numPages;
            
            // Create viewer container
            this.createViewerContainer();
            
            // Render all pages
            await this.renderAllPages();
            
            // Add event listeners for zooming and touch
            this.addEventListeners();
            
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.showError();
        }
    }
    
    createViewerContainer() {
        // Create the viewer container
        this.container.innerHTML = '';
        
        // Create main container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'pdf-main-container';
        mainContainer.style.width = '100%';
        mainContainer.style.maxWidth = '100%';
        mainContainer.style.margin = '0 auto';
        this.container.appendChild(mainContainer);
        
        // Create viewer container
        const viewerDiv = document.createElement('div');
        viewerDiv.className = 'pdfjs-viewer';
        viewerDiv.style.overflow = 'auto';
        viewerDiv.style.height = this.calculateContainerHeight();
        viewerDiv.style.width = '100%';
        viewerDiv.style.maxWidth = '100%';
        viewerDiv.style.border = '5px solid #FFC107'; // Warna kuning dari logo Krench Chicken
        viewerDiv.style.borderRadius = '8px';
        viewerDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        viewerDiv.style.backgroundColor = '#f9f9f9';
        viewerDiv.style.overflowX = 'hidden'; // Prevent horizontal scrolling
        mainContainer.appendChild(viewerDiv);
        this.viewerContainer = viewerDiv;
    }
    
    async renderAllPages() {
        try {
            // Clear the viewer
            this.viewerContainer.innerHTML = '';
            
            // Add loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.textContent = 'Loading menu...';
            loadingDiv.style.textAlign = 'center';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.fontFamily = 'Arial, sans-serif';
            this.viewerContainer.appendChild(loadingDiv);
            
            // Create a container for all pages
            const pagesContainer = document.createElement('div');
            pagesContainer.className = 'pdf-pages-container';
            pagesContainer.style.display = 'flex';
            pagesContainer.style.flexDirection = 'column';
            pagesContainer.style.alignItems = 'center';
            pagesContainer.style.gap = '10px';
            pagesContainer.style.padding = '10px';
            pagesContainer.style.width = '100%';
            
            // Render each page
            for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
                // Get the page
                const page = await this.pdfDoc.getPage(pageNum);
                
                // Create page container
                const pageDiv = document.createElement('div');
                pageDiv.className = 'page';
                pageDiv.dataset.pageNumber = pageNum;
                pageDiv.style.margin = '0 auto';
                pageDiv.style.width = '100%';
                pageDiv.style.maxWidth = '100%';
                pageDiv.style.textAlign = 'center';
                
                // Create canvas for this page
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                // Calculate viewport with current scale
                const viewport = page.getViewport({ scale: this.currentScale });
                
                // Set canvas dimensions
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                // Make canvas responsive
                canvas.style.width = '100%';
                canvas.style.height = 'auto';
                canvas.style.maxWidth = '100%';
                canvas.style.display = 'block';
                canvas.style.margin = '0 auto';
                
                pageDiv.appendChild(canvas);
                
                // Render the page
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;
                
                // Add the page to the container
                pagesContainer.appendChild(pageDiv);
            }
            
            // Remove loading indicator and add pages container
            this.viewerContainer.innerHTML = '';
            this.viewerContainer.appendChild(pagesContainer);
            
        } catch (error) {
            console.error(`Error rendering pages:`, error);
            this.showError = (message) => {
                this.viewerContainer.innerHTML = `<div style="color: red; padding: 20px; text-align: center;">${message || 'Error loading PDF'}</div>`;
            };
            this.showError(error.message);
        }
    }
    
    addEventListeners() {
        // Add pinch-to-zoom for mobile
        let initialDistance = 0;
        
        this.viewerContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        }, { passive: true });
        
        this.viewerContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                const currentDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                
                if (initialDistance > 0) {
                    const delta = currentDistance / initialDistance;
                    if (delta > 1.1 || delta < 0.9) {
                        const newScale = this.currentScale * delta;
                        if (newScale >= 0.5 && newScale <= 3.0) {
                            this.zoom(newScale);
                            initialDistance = currentDistance;
                        }
                    }
                }
            }
        }, { passive: true });
        
        // Add mouse wheel zoom for desktop
        this.viewerContainer.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                const newScale = Math.max(0.5, Math.min(3.0, this.currentScale + delta));
                this.zoom(newScale);
            }
        }, { passive: false });
    }
    
    async zoom(newScale) {
        if (newScale === this.currentScale) return;
        
        this.currentScale = newScale;
        
        // Re-render all pages with new scale
        await this.renderAllPages();
    }
    
    showError() {
        this.container.innerHTML = `
            <div class="pdf-error" style="text-align: center; padding: 20px;">
                <p style="color: #e74c3c; font-weight: bold;">Gagal memuat menu PDF.</p>
                <p>Silakan coba lagi nanti.</p>
            </div>
        `;
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.nav = document.querySelector('nav ul');
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => {
            this.nav.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        this.nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.nav.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth scroll for anchor links
function smoothScroll() {
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
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(title);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize single PDF viewer
    new PDFViewer('pdf-container', '../PDF/MENU TERBARU KC.pdf');
    
    // Initialize mobile navigation
    new MobileNav();
    
    // Initialize smooth scrolling
    smoothScroll();
    
    // Initialize animations
    initAnimations();
    
    // Add loading class removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading if needed
// initLazyLoading();