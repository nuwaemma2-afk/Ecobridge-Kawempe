/* =====================================================
   EcoBridge Kawempe - JavaScript
   Interactive elements and smooth animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeButtons();
});

/* =====================================================
   Navigation Functions
   ===================================================== */

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/* =====================================================
   Scroll Effects
   ===================================================== */

function initializeScrollEffects() {
    // Add scroll listener for navbar effects
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Intersection Observer for fade-in effects
    observeElements();
}

function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all cards and sections
    const cards = document.querySelectorAll('.mission-card');
    cards.forEach(card => observer.observe(card));

    const sections = document.querySelectorAll('.about, .mission, .contact');
    sections.forEach(section => observer.observe(section));
}

/* =====================================================
   Button Functions
   ===================================================== */

function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = createRipple(e);
            this.appendChild(ripple);
            
            // Example action for buttons
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('learn')) {
                smoothScroll('#about');
            } else if (buttonText.includes('involved')) {
                smoothScroll('#contact');
            }

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* =====================================================
   Ripple Effect
   ===================================================== */

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    return ripple;
}

/* =====================================================
   Smooth Scrolling
   ===================================================== */

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* =====================================================
   Performance Optimization
   ===================================================== */

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Lazy loading for images (if added in future)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* =====================================================
   Accessibility Enhancements
   ===================================================== */

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add focus visible styles
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

/* =====================================================
   Utility Functions
   ===================================================== */

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/* =====================================================
   Analytics & Tracking (Optional)
   ===================================================== */

// Track button clicks (example)
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Add your analytics code here (Google Analytics, etc.)
}

/* =====================================================
   Mobile & Tablet Detection
   ===================================================== */

const isMobile = () => window.innerWidth <= 768;
const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1024;
const isDesktop = () => window.innerWidth > 1024;

// Handle responsive adjustments
window.addEventListener('resize', debounce(function() {
    console.log('Responsive: Mobile:', isMobile(), 'Tablet:', isTablet(), 'Desktop:', isDesktop());
}, 250));

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

/* =====================================================
   Console Messages (Development)
   ===================================================== */

console.log('%c🌿 Welcome to EcoBridge Kawempe 🌿', 'color: #4BBA5B; font-size: 20px; font-weight: bold;');
console.log('%cBridging Communities to a Sustainable Future', 'color: #064929; font-size: 14px;');
