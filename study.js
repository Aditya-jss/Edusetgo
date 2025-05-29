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
function activateCountryTab(country) {
    // Remove active class from all tabs and content
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.country-tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; // Ensure it's hidden
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
    });

    // Add active class to clicked tab and corresponding content
    const button = Array.from(tabButtons).find(btn => btn.dataset.country === country);
    if (button) {
        button.classList.add('active');
    }

    const content = document.getElementById(`${country}-content`);
    if (content) {
        content.classList.add('active');
        content.style.display = 'block'; // Ensure it's visible
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 50);

        // Animate steps within the active tab
        const steps = content.querySelectorAll('.step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('visible');
            }, index * 100);
        });
    } else {
        console.error(`Content for country "${country}" not found. Check if the ID "${country}-content" exists in the HTML.`);
    }
}

// Add click event to tab buttons
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const country = button.dataset.country;
        activateCountryTab(country);
    });
});

// Set default tab (USA) on page load
document.addEventListener('DOMContentLoaded', () => {
    activateCountryTab('usa'); // Default to USA
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
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

// Exam Modal Functionality
const examData = {
    ielts: {
        title: 'IELTS',
        icon: 'fas fa-microphone',
        description: 'IELTS is the world\'s most popular English language proficiency test for higher education and global migration. It assesses your ability to listen, read, write and speak in English.',
        score: 'Band 6.0 - 9.0 (9.0 being the highest)',
        duration: '2 hours 45 minutes',
        sections: ['Listening (30 minutes)', 'Reading (60 minutes)', 'Writing (60 minutes)', 'Speaking (11-14 minutes)'],
        fee: '$215 - $310 (varies by country)',
        validity: '2 years from test date'
    },
    toefl: {
        title: 'TOEFL',
        icon: 'fas fa-laptop',
        description: 'TOEFL iBT test measures your ability to use and understand English at the university level. It evaluates how well you combine your listening, reading, speaking and writing skills.',
        score: '0 - 120 points (each section 0-30)',
        duration: '3 hours',
        sections: ['Reading (54-72 minutes)', 'Listening (41-57 minutes)', 'Speaking (17 minutes)', 'Writing (50 minutes)'],
        fee: '$185 - $300 (varies by location)',
        validity: '2 years from test date'
    },
    gre: {
        title: 'GRE',
        icon: 'fas fa-calculator',
        description: 'The GRE General Test measures your verbal reasoning, quantitative reasoning, critical thinking and analytical writing skills for graduate school admissions.',
        score: '260 - 340 (130-170 per section)',
        duration: '3 hours 45 minutes',
        sections: ['Analytical Writing (60 minutes)', 'Verbal Reasoning (60 minutes)', 'Quantitative Reasoning (70 minutes)'],
        fee: '$205 worldwide',
        validity: '5 years from test date'
    },
    duolingo: {
        title: 'Duolingo English Test',
        icon: 'fas fa-language',
        description: 'A convenient, fast, and affordable English proficiency test that can be taken online anytime, anywhere. Accepted by thousands of universities worldwide.',
        score: '10 - 160 points',
        duration: '1 hour',
        sections: ['Adaptive Test (45 minutes)', 'Video Interview (10 minutes)', 'Writing Sample (5 minutes)'],
        fee: '$49 worldwide',
        validity: '2 years from test date'
    },
    pte: {
        title: 'PTE Academic',
        icon: 'fas fa-headphones',
        description: 'PTE Academic is a computer-based English language test trusted by universities, colleges and governments around the world for study abroad and immigration purposes.',
        score: '10 - 90 points',
        duration: '3 hours',
        sections: ['Speaking & Writing (77-93 minutes)', 'Reading (32-41 minutes)', 'Listening (45-57 minutes)'],
        fee: '$200 - $250 (varies by location)',
        validity: '2 years from test date'
    },
    gmat: {
        title: 'GMAT',
        icon: 'fas fa-chart-line',
        description: 'The GMAT exam measures your command of basic arithmetic, algebra, geometry, multi-source data analysis, and grammar for business school admissions.',
        score: '200 - 800 points',
        duration: '3 hours 7 minutes',
        sections: ['Analytical Writing (30 minutes)', 'Integrated Reasoning (30 minutes)', 'Quantitative (62 minutes)', 'Verbal (65 minutes)'],
        fee: '$250 worldwide',
        validity: '5 years from test date'
    }
};

function openModal(examType) {
    const modal = document.getElementById('examModal');
    const data = examData[examType];
    
    if (!modal || !data) return;
    
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalIcon').innerHTML = `<i class="${data.icon}"></i>`;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalScore').textContent = data.score;
    document.getElementById('modalDuration').textContent = data.duration;
    document.getElementById('modalFee').textContent = data.fee;
    document.getElementById('modalValidity').textContent = data.validity;
    
    const sectionsList = document.getElementById('modalSections');
    sectionsList.innerHTML = '';
    data.sections.forEach(section => {
        const li = document.createElement('li');
        li.textContent = section;
        sectionsList.appendChild(li);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('examModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showExamDetails(examType) {
    openModal(examType);
}

function getExamTypeFromTitle(title) {
    const titleMap = {
        'IELTS': 'IELTS',
        'TOEFL': 'TOEFL',
        'GRE': 'GRE',
        'Duolingo English Test': 'Duolingo English Test',
        'PTE Academic': 'PTE Academic',
        'GMAT': 'GMAT'
    };
    return titleMap[title] || title;
}

function showPrepResources(examType) {
    const prepResources = {
        'IELTS': {
            official: 'https://www.ielts.org/for-test-takers/test-preparation',
            resources: [
                { name: 'Official IELTS Practice Tests', url: 'https://www.ielts.org/for-test-takers/test-preparation/free-practice-tests' },
                { name: 'IELTS Preparation Course - British Council', url: 'https://www.futurelearn.com/courses/understanding-ielts' },
                { name: 'Cambridge IELTS Books', url: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/cambridge-english-exams-ielts/cambridge-ielts' },
                { name: 'IELTS Liz - Free Lessons', url: 'https://ieltsliz.com/' }
            ]
        },
        'TOEFL': {
            official: 'https://www.ets.org/toefl/test-takers/ibt/prepare/',
            resources: [
                { name: 'TOEFL iBT Free Practice Test', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/tests/' },
                { name: 'Official TOEFL iBT Tests', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/official-toefl-ibt-tests/' },
                { name: 'TOEFL Go! Official App', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/toefl-go-global/' },
                { name: 'Magoosh TOEFL Prep', url: 'https://magoosh.com/toefl/' }
            ]
        },
        'GRE': {
            official: 'https://www.ets.org/gre/test-takers/general-test/prepare/',
            resources: [
                { name: 'Official GRE Practice Tests', url: 'https://www.ets.org/gre/test-takers/general-test/prepare/powerprep/' },
                { name: 'GRE Official Guide', url: 'https://www.ets.org/gre/test-takers/general-test/prepare/official-gre-guide/' },
                { name: 'Manhattan Prep GRE', url: 'https://www.manhattanprep.com/gre/' },
                { name: 'Kaplan GRE Prep', url: 'https://www.kaptest.com/gre' }
            ]
        },
        'Duolingo English Test': {
            official: 'https://englishtest.duolingo.com/prepare',
            resources: [
                { name: 'Official Practice Test', url: 'https://englishtest.duolingo.com/prepare' },
                { name: 'Duolingo English Test Tips', url: 'https://englishtest.duolingo.com/applicants/test-taking-tips' },
                { name: 'Sample Questions', url: 'https://englishtest.duolingo.com/applicants/sample-test' },
                { name: 'Test Format Guide', url: 'https://englishtest.duolingo.com/applicants/test-overview' }
            ]
        },
        'PTE Academic': {
            official: 'https://pearsonpte.com/preparation/',
            resources: [
                { name: 'Official PTE Practice Tests', url: 'https://pearsonpte.com/preparation/practice-tests/' },
                { name: 'PTE Academic Preparation Course', url: 'https://pearsonpte.com/preparation/courses/' },
                { name: 'PTE Study Materials', url: 'https://pearsonpte.com/preparation/study-materials/' },
                { name: 'E2Language PTE Prep', url: 'https://www.e2language.com/pte/' }
            ]
        },
        'GMAT': {
            official: 'https://www.mba.com/exams/gmat-exam/prepare',
            resources: [
                { name: 'Official GMAT Practice Exams', url: 'https://www.mba.com/exams/gmat-exam/prepare/practice-exams' },
                { name: 'GMAT Official Guide', url: 'https://www.mba.com/exams/gmat-exam/prepare/gmat-official-guide' },
                { name: 'Manhattan Prep GMAT', url: 'https://www.manhattanprep.com/gmat/' },
                { name: 'Magoosh GMAT Prep', url: 'https://magoosh.com/gmat/' }
            ]
        }
    };

    const resources = prepResources[examType];
    if (!resources) return;

    const prepModal = document.createElement('div');
    prepModal.className = 'prep-modal-overlay';
    prepModal.innerHTML = `
        <div class="prep-modal-container">
            <div class="prep-modal-header">
                <h3><i class="fas fa-book-open"></i> ${examType} Preparation Resources</h3>
                <button class="prep-close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="prep-modal-content">
                <div class="official-prep">
                    <h4><i class="fas fa-star"></i> Official Resources</h4>
                    <a href="${resources.official}" target="_blank" class="official-link">
                        <i class="fas fa-external-link-alt"></i>
                        Official ${examType} Preparation Page
                    </a>
                </div>
                <div class="prep-resources">
                    <h4><i class="fas fa-list"></i> Recommended Study Materials</h4>
                    <div class="resource-grid">
                        ${resources.resources.map(resource => `
                            <div class="resource-item">
                                <i class="fas fa-book"></i>
                                <span>${resource.name}</span>
                                <a href="${resource.url}" target="_blank" class="resource-link">
                                    <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="prep-tips">
                    <h4><i class="fas fa-lightbulb"></i> Quick Study Tips</h4>
                    <ul class="tips-list">
                        ${getStudyTips(examType).map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    const prepModalStyles = document.createElement('style');
    prepModalStyles.textContent = `
        .prep-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            backdrop-filter: blur(5px);
        }
        .prep-modal-container {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        .prep-modal-header {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 20px 20px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .prep-modal-content {
            padding: 2rem;
        }
        .official-prep, .prep-resources, .prep-tips {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 15px;
            border-left: 4px solid #667eea;
        }
        .official-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        .official-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
            color: white;
        }
        .resource-grid {
            display: grid;
            gap: 1rem;
            margin-top: 1rem;
        }
        .resource-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        .resource-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        .resource-item i {
            color: #667eea;
            font-size: 1.2rem;
        }
        .resource-item span {
            flex: 1;
            font-weight: 500;
        }
        .resource-link {
            color: #667eea;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        .resource-link:hover {
            background: #667eea;
            color: white;
            transform: translateX(3px);
        }
        .tips-list {
            list-style: none;
            padding: 0;
            margin-top: 1rem;
        }
        .tips-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 1.5rem;
        }
        .tips-list li::before {
            content: '💡';
            position: absolute;
            left: 0;
        }
        .prep-close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        }
        .prep-close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }
        @media (max-width: 768px) {
            .prep-modal-container {
                width: 95%;
                margin: 1rem;
            }
            .prep-modal-header {
                padding: 1.5rem;
            }
            .prep-modal-content {
                padding: 1.5rem;
            }
        }
    `;

    document.head.appendChild(prepModalStyles);
    document.body.appendChild(prepModal);

    const closePrepModal = () => {
        prepModal.remove();
        prepModalStyles.remove();
    };

    prepModal.querySelector('.prep-close-btn').addEventListener('click', closePrepModal);
    prepModal.addEventListener('click', (e) => {
        if (e.target === prepModal) closePrepModal();
    });
}

function getStudyTips(examType) {
    const tipsByExam = {
        'IELTS': [
            'Practice all four skills: Reading, Writing, Listening, and Speaking daily',
            'Take timed practice tests to improve your speed',
            'Read English newspapers and academic articles regularly',
            'Practice speaking with native speakers or language exchange partners',
            'Focus on time management - each section has strict time limits'
        ],
        'TOEFL': [
            'Get familiar with the computer-based format before test day',
            'Practice note-taking skills for listening and reading sections',
            'Build academic vocabulary through reading scholarly articles',
            'Practice integrated tasks that combine multiple skills',
            'Use official ETS materials for the most accurate practice'
        ],
        'GRE': [
            'Build vocabulary systematically using flashcards or apps',
            'Practice quantitative reasoning without a calculator first',
            'Read complex texts to improve verbal reasoning',
            'Learn to identify and eliminate obviously wrong answer choices',
            'Take full-length practice tests under timed conditions'
        ],
        'Duolingo English Test': [
            'Ensure you have a stable internet connection and quiet environment',
            'Practice typing quickly and accurately',
            'Familiarize yourself with the adaptive test format',
            'Speak clearly during the video interview section',
            'Take the practice test multiple times before the real exam'
        ],
        'PTE Academic': [
            'Practice with computer-based format and get used to the interface',
            'Work on your pronunciation and speaking clarity',
            'Improve typing speed for writing tasks',
            'Practice integrated tasks that test multiple skills simultaneously',
            'Use official Pearson preparation materials'
        ],
        'GMAT': [
            'Master data sufficiency question types unique to GMAT',
            'Practice mental math to save time on quantitative section',
            'Learn to identify critical reasoning question patterns',
            'Focus on sentence correction grammar rules',
            'Take adaptive practice tests to simulate real exam conditions'
        ]
    };
    return tipsByExam[examType] || [];
}

// Exam Cards Interaction
examCards.forEach(card => {
    card.addEventListener('click', () => {
        const examType = card.dataset.exam;
        openModal(examType);
    });

    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
});

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

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('-') || text.includes('K') || text.includes('+')) {
                    stat.style.opacity = '0';
                    stat.style.transform = 'translateY(20px)';
                    stat.style.transition = 'all 0.6s ease';
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, 300);
                    return;
                }
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
        dropdownTimeout = setTimeout(() => {}, 100);
    });
}

// CTA Button Animation
// CTA Button Animation (continued)
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

    // Modal Event Listeners
    const examButtons = document.querySelectorAll('.exam-btn');
    examButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const examType = this.getAttribute('data-exam');
            if (examType) {
                openModal(examType);
            }
        });
    });

    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    const examModal = document.getElementById('examModal');
    if (examModal) {
        examModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Register Now buttons - redirect to official exam registration sites
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalTitle = document.getElementById('modalTitle').textContent;
            const examType = getExamTypeFromTitle(modalTitle);

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const registrationUrls = {
                'IELTS': 'https://www.ielts.org/book-a-test',
                'TOEFL': 'https://www.ets.org/toefl/test-takers/ibt/register/',
                'GRE': 'https://www.ets.org/gre/test-takers/general-test/register/',
                'Duolingo English Test': 'https://englishtest.duolingo.com/',
                'PTE Academic': 'https://pearsonpte.com/book-now/',
                'GMAT': 'https://www.mba.com/exams/gmat-exam/register'
            };

            const url = registrationUrls[examType];
            if (url) {
                setTimeout(() => {
                    if (confirm(`You will be redirected to the official ${examType} registration page. Continue?`)) {
                        window.open(url, '_blank');
                    }
                }, 200);
            }
        });
    });

    // Preparation Materials buttons - redirect to official prep resources
    const prepButtons = document.querySelectorAll('.prep-btn');
    prepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalTitle = document.getElementById('modalTitle').textContent;
            const examType = getExamTypeFromTitle(modalTitle);

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            showPrepResources(examType);
        });
    });

    console.log('Study page loaded successfully!');
});
