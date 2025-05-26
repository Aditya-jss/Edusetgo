// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCountryTabs();
    initializeAnimations();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const servicesDropdown = document.getElementById('servicesDropdown');

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            if (navMenu.classList.contains('active')) {
                mobileToggle.innerHTML = '✕';
                mobileToggle.style.transform = 'rotate(180deg)';
            } else {
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Country tabs functionality
function initializeCountryTabs() {
    const countryTabs = document.querySelectorAll('.country-tab');
    const countryContents = document.querySelectorAll('.country-content');

    countryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            
            // Remove active class from all tabs and contents
            countryTabs.forEach(t => t.classList.remove('active'));
            countryContents.forEach(c => c.classList.remove('active'));
            
            // Add loading effect
            const visaContent = document.querySelector('.visa-content');
            visaContent.classList.add('loading');
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(`${country}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Animate content appearance
                    animateContentEntry(targetContent);
                }
                
                // Remove loading effect
                visaContent.classList.remove('loading');
                
                // Smooth scroll to content
                visaContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
}

// Animation functions
function initializeAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.visa-card, .tip-card, .country-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateContentEntry(content) {
    const cards = content.querySelectorAll('.visa-card, .tip-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Keep the same gradient background but adjust shadow and backdrop blur
        if (currentScrollY > 100) {
            header.style.background = 'linear-gradient(135deg, #011e3e 0%, #00a0e3 100%)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #011e3e 0%, #00a0e3 100%)';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show header on scroll (optional - you can remove this if you want header always visible)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Enhanced tip card interactions
function initializeTipCardEffects() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(10px) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Visa card hover effects
function initializeVisaCardEffects() {
    const visaCards = document.querySelectorAll('.visa-card');
    
    visaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Country tab enhanced interactions
function enhanceCountryTabs() {
    const countryTabs = document.querySelectorAll('.country-tab');
    
    countryTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }
        });
    });
}

// Initialize enhanced effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeTipCardEffects();
        initializeVisaCardEffects();
        enhanceCountryTabs();
    }, 500);
});

// Copy to clipboard functionality for important information
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
        
        // Visual feedback
        element.style.background = '#28a745';
        element.style.color = 'white';
        setTimeout(() => {
            element.style.background = '';
            element.style.color = '';
        }, 1000);
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Add copy functionality to fees and processing times
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const feeElements = document.querySelectorAll('.fees-info p, .processing-info p');
        
        feeElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy';
            
            element.addEventListener('click', function() {
                copyToClipboard(this.textContent, this);
            });
        });
    }, 1000);
});

// Smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('.country-selection, .visa-content, .cta-section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        revealObserver.observe(section);
    });
}

// Initialize section reveals
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(revealSections, 100);
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);