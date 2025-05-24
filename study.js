// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const tabButtons = document.querySelectorAll('.tab-btn');
const examCards = document.querySelectorAll('.exam-card');
const heroButtons = document.querySelectorAll('.hero-buttons button');

// Mobile Navigation Toggle
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
        }
    });
}

// Country Tabs Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const country = button.dataset.country;

        // Remove active class from all tabs and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.country-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        const content = document.getElementById(`${country}-content`);
        if (content) {
            content.classList.add('active');

            // Add animation effect
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';

            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
                content.style.transition = 'all 0.5s ease';
            }, 50);
        }
    });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Hero Buttons Click Events
heroButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

// Exam Cards Interaction
examCards.forEach(card => {
    card.addEventListener('click', () => {
        const examType = card.dataset.exam;
        showExamDetails(examType);
    });

    // Add hover effect with cursor
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
});

// Show Exam Details (Modal or Alert)
function showExamDetails(examType) {
    const examInfo = {
        ielts: {
            name: 'IELTS',
            fullName: 'International English Language Testing System',
            description: 'IELTS is designed to test the language ability of candidates who want to study or work where English is used as the language of communication.',
            sections: ['Listening (30 min)', 'Reading (60 min)', 'Writing (60 min)', 'Speaking (11-14 min)'],
            tips: ['Practice with official materials', 'Focus on time management', 'Improve vocabulary', 'Take mock tests']
        },
        toefl: {
            name: 'TOEFL',
            fullName: 'Test of English as a Foreign Language',
            description: 'TOEFL is an internet-based test that measures your ability to use and understand English at the university level.',
            sections: ['Reading (54-72 min)', 'Listening (41-57 min)', 'Speaking (17 min)', 'Writing (50 min)'],
            tips: ['Practice note-taking', 'Familiarize with computer interface', 'Work on academic vocabulary', 'Practice integrated tasks']
        },
        gre: {
            name: 'GRE',
            fullName: 'Graduate Record Examination',
            description: 'GRE is required for admission to graduate programs in various fields including business and law.',
            sections: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
            tips: ['Learn vocabulary systematically', 'Practice mental math', 'Read academic texts', 'Time management is crucial']
        },
        duolingo: {
            name: 'Duolingo English Test',
            fullName: 'Duolingo English Test',
            description: 'A convenient, fast, and affordable English proficiency test accepted by thousands of universities worldwide.',
            sections: ['Adaptive Test (45 min)', 'Video Interview (10 min)', 'Writing Sample (5 min)'],
            tips: ['Take practice tests', 'Ensure stable internet', 'Practice typing speed', 'Speak clearly during video interview']
        },
        pte: {
            name: 'PTE Academic',
            fullName: 'Pearson Test of English Academic',
            description: 'PTE Academic is a computer-based English language test for non-native English speakers wanting to study abroad.',
            sections: ['Speaking & Writing (77-93 min)', 'Reading (32-41 min)', 'Listening (45-57 min)'],
            tips: ['Practice with computer-based format', 'Work on pronunciation', 'Improve typing speed', 'Familiarize with question types']
        },
        gmat: {
            name: 'GMAT',
            fullName: 'Graduate Management Admission Test',
            description: 'GMAT is required for admission to graduate business programs (MBA) worldwide.',
            sections: ['Analytical Writing (30 min)', 'Integrated Reasoning (30 min)', 'Quantitative (62 min)', 'Verbal (65 min)'],
            tips: ['Master data sufficiency', 'Practice critical reasoning', 'Improve mental math', 'Learn to eliminate wrong answers']
        }
    };

    const exam = examInfo[examType];
    if (exam) {
        alert(`${exam.name} - ${exam.fullName}\n\n${exam.description}\n\nSections:\n${exam.sections.join('\n')}\n\nTips:\n${exam.tips.join('\n')}`);
    }
}

// Scroll Animation Observer
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

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.exam-card, .material-card, .tip-card, .course-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Course Item Hover Effects
const courseItems = document.querySelectorAll('.course-item');
courseItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Material Card Animations
const materialCards = document.querySelectorAll('.material-card');
materialCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
        card.style.boxShadow = 'none';
    });
});

// Tip Cards Staggered Animation
const tipCards = document.querySelectorAll('.tip-card');
tipCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.float-item');
floatingElements.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.2) rotateZ(10deg)';
        element.style.background = 'rgba(255, 255, 255, 0.3)';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1) rotateZ(0deg)';
        element.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Counter Animation for Statistics
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString() + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Statistics Animation Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Skip animation for text that contains ranges (like "$20K-$45K") or non-numeric content
                if (text.includes('-') || text.includes('K') || text.includes('+')) {
                    // Just add a fade-in animation instead of counter animation
                    stat.style.opacity = '0';
                    stat.style.transform = 'translateY(20px)';
                    stat.style.transition = 'all 0.6s ease';
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, 300);
                    return;
                }
                // Only animate pure numbers
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (!isNaN(number) && number > 0) {
                    stat.dataset.suffix = text.replace(/[\d,]/g, '');
                    animateCounter(stat, 0, number, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const countryStats = document.querySelectorAll('.country-stats');
countryStats.forEach(stat => statsObserver.observe(stat));

// Dropdown Menu Enhancement
const dropdown = document.getElementById('servicesDropdown');
let dropdownTimeout;

if (dropdown) {
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            // Add any cleanup if needed
        }, 100);
    });
}

// CTA Button Animation
const ctaButton = document.querySelector('.cta-section .btn-primary');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        ctaButton.style.position = 'relative';
        ctaButton.style.overflow = 'hidden';
        ctaButton.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
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

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll to Top Functionality
let scrollToTopBtn;

function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollToTopBtn);
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', () => {
    if (!scrollToTopBtn) createScrollToTopButton();

    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to cards
    const cards = document.querySelectorAll('.exam-card, .material-card, .tip-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    console.log('Study page loaded successfully!');
});