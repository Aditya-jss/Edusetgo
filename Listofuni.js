// Sample university data
const universitiesData = [
    {
        id: 1,
        name: "Harvard University",
        country: "USA",
        location: "Cambridge, Massachusetts",
        fees: 54000,
        ranking: "#1 Global",
        exams: ["TOEFL", "SAT"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Business", "Medicine", "Arts"],
        website: "https://www.harvard.edu"
    },
    {
        id: 2,
        name: "Stanford University",
        country: "USA",
        location: "Stanford, California",
        fees: 56000,
        ranking: "#2 Global",
        exams: ["TOEFL", "GRE", "GMAT"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Business"],
        website: "https://www.stanford.edu"
    },
    {
        id: 3,
        name: "University of Oxford",
        country: "UK",
        location: "Oxford, England",
        fees: 45000,
        ranking: "#3 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Medicine", "Science"],
        website: "https://www.ox.ac.uk"
    },
    {
        id: 4,
        name: "University of Cambridge",
        country: "UK",
        location: "Cambridge, England",
        fees: 44000,
        ranking: "#4 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Science", "Arts"],
        website: "https://www.cam.ac.uk"
    },
    {
        id: 5,
        name: "MIT",
        country: "USA",
        location: "Cambridge, Massachusetts",
        fees: 55000,
        ranking: "#5 Global",
        exams: ["TOEFL", "GRE", "SAT"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Science"],
        website: "https://www.mit.edu"
    },
    {
        id: 6,
        name: "University of Toronto",
        country: "Canada",
        location: "Toronto, Ontario",
        fees: 35000,
        ranking: "#18 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Medicine", "Business"],
        website: "https://www.utoronto.ca"
    },
    {
        id: 7,
        name: "University of Melbourne",
        country: "Australia",
        location: "Melbourne, Victoria",
        fees: 38000,
        ranking: "#33 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Engineering", "Medicine"],
        website: "https://www.unimelb.edu.au"
    },
    {
        id: 8,
        name: "ETH Zurich",
        country: "Switzerland",
        location: "Zurich",
        fees: 1500,
        ranking: "#8 Global",
        exams: ["TOEFL", "IELTS"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Science"],
        website: "https://ethz.ch"
    },
    {
        id: 9,
        name: "Technical University of Munich",
        country: "Germany",
        location: "Munich, Bavaria",
        fees: 3000,
        ranking: "#50 Global",
        exams: ["TOEFL", "IELTS"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Computer Science", "Science"],
        website: "https://www.tum.de"
    },
    {
        id: 10,
        name: "Sorbonne University",
        country: "France",
        location: "Paris",
        fees: 4000,
        ranking: "#72 Global",
        exams: ["TOEFL", "IELTS"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Arts", "Science", "Medicine"],
        website: "https://www.sorbonne-universite.fr"
    },
    {
        id: 11,
        name: "University of Amsterdam",
        country: "Netherlands",
        location: "Amsterdam",
        fees: 12000,
        ranking: "#58 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Business", "Arts", "Science"],
        website: "https://www.uva.nl"
    },
    {
        id: 12,
        name: "McGill University",
        country: "Canada",
        location: "Montreal, Quebec",
        fees: 32000,
        ranking: "#31 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Medicine", "Engineering", "Arts"],
        website: "https://www.mcgill.ca"
    },
    {
        id: 13,
        name: "Australian National University",
        country: "Australia",
        location: "Canberra, ACT",
        fees: 40000,
        ranking: "#27 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Science", "Arts", "Engineering"],
        website: "https://www.anu.edu.au"
    },
    {
        id: 14,
        name: "Imperial College London",
        country: "UK",
        location: "London, England",
        fees: 47000,
        ranking: "#6 Global",
        exams: ["IELTS", "TOEFL"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Medicine", "Science"],
        website: "https://www.imperial.ac.uk"
    },
    {
        id: 15,
        name: "California Institute of Technology",
        country: "USA",
        location: "Pasadena, California",
        fees: 58000,
        ranking: "#7 Global",
        exams: ["TOEFL", "SAT", "GRE"],
        levels: ["Bachelor", "Master", "PhD"],
        fields: ["Engineering", "Science", "Computer Science"],
        website: "https://www.caltech.edu"
    }
];

class UniversityBrowser {
    constructor() {
        this.universities = [...universitiesData];
        this.filteredUniversities = [...universitiesData];
        this.currentSort = 'name';
        this.filters = {
            countries: [],
            exams: [],
            levels: [],
            fields: [],
            minFees: 0,
            maxFees: 80000
        };
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.setupRangeSliders();
        this.renderUniversities();
        this.updateResultsCount();
    }

    setupNavigation() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const dropdowns = document.querySelectorAll('.dropdown');

        // Mobile toggle functionality
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Dropdown functionality for mobile
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && navMenu) {
                navMenu.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu) {
                navMenu.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    setupEventListeners() {
        // Sort dropdown
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortAndRender();
        });
        
        // Clear filters button
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
        
        // Filter checkboxes
        this.setupFilterCheckboxes('countryFilters', 'countries');
        this.setupFilterCheckboxes('examFilters', 'exams');
        this.setupFilterCheckboxes('levelFilters', 'levels');
        this.setupFilterCheckboxes('fieldFilters', 'fields');
    }
    
    setupFilterCheckboxes(containerId, filterType) {
        const container = document.getElementById(containerId);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFilter(filterType, checkbox.value, checkbox.checked);
            });
        });
    }
    
    setupRangeSliders() {
        const minFeesSlider = document.getElementById('minFees');
        const maxFeesSlider = document.getElementById('maxFees');
        const minFeesValue = document.getElementById('minFeesValue');
        const maxFeesValue = document.getElementById('maxFeesValue');
        
        const updateRangeValues = () => {
            const minVal = parseInt(minFeesSlider.value);
            const maxVal = parseInt(maxFeesSlider.value);
            
            // Ensure min doesn't exceed max
            if (minVal >= maxVal) {
                minFeesSlider.value = maxVal - 1000;
            }
            
            // Ensure max doesn't go below min
            if (maxVal <= minVal) {
                maxFeesSlider.value = minVal + 1000;
            }
            
            const finalMin = parseInt(minFeesSlider.value);
            const finalMax = parseInt(maxFeesSlider.value);
            
            minFeesValue.textContent = `$${finalMin.toLocaleString()}`;
            maxFeesValue.textContent = `$${finalMax.toLocaleString()}`;
            
            this.filters.minFees = finalMin;
            this.filters.maxFees = finalMax;
            
            this.applyFilters();
        };
        
        minFeesSlider.addEventListener('input', updateRangeValues);
        maxFeesSlider.addEventListener('input', updateRangeValues);
    }
    
    updateFilter(filterType, value, isChecked) {
        if (isChecked) {
            if (!this.filters[filterType].includes(value)) {
                this.filters[filterType].push(value);
            }
        } else {
            this.filters[filterType] = this.filters[filterType].filter(item => item !== value);
        }
        
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredUniversities = this.universities.filter(university => {
            // Country filter
            if (this.filters.countries.length > 0 && 
                !this.filters.countries.includes(university.country)) {
                return false;
            }
            
            // Exams filter
            if (this.filters.exams.length > 0 && 
                !this.filters.exams.some(exam => university.exams.includes(exam))) {
                return false;
            }
            
            // Levels filter
            if (this.filters.levels.length > 0 && 
                !this.filters.levels.some(level => university.levels.includes(level))) {
                return false;
            }
            
            // Fields filter
            if (this.filters.fields.length > 0 && 
                !this.filters.fields.some(field => university.fields.includes(field))) {
                return false;
            }
            
            // Fees filter
            if (university.fees < this.filters.minFees || university.fees > this.filters.maxFees) {
                return false;
            }
            
            return true;
        });
        
        this.sortAndRender();
    }
    
    sortUniversities() {
        this.filteredUniversities.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'nameDesc':
                    return b.name.localeCompare(a.name);
                case 'fees':
                    return a.fees - b.fees;
                case 'feesDesc':
                    return b.fees - a.fees;
                case 'ranking':
                    const rankA = parseInt(a.ranking.replace(/[^\d]/g, ''));
                    const rankB = parseInt(b.ranking.replace(/[^\d]/g, ''));
                    return rankA - rankB;
                case 'country':
                    return a.country.localeCompare(b.country);
                default:
                    return 0;
            }
        });
    }
    
    sortAndRender() {
        this.sortUniversities();
        this.renderUniversities();
        this.updateResultsCount();
    }
    
    renderUniversities() {
        const container = document.getElementById('universitiesList');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const noResults = document.getElementById('noResults');
        
        // Show loading
        loadingSpinner.style.display = 'block';
        container.innerHTML = '';
        noResults.style.display = 'none';
        
        // Simulate loading delay
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            
            if (this.filteredUniversities.length === 0) {
                noResults.style.display = 'block';
                return;
            }
            
            const universitiesHTML = this.filteredUniversities.map(university => 
                this.createUniversityCard(university)
            ).join('');
            
            container.innerHTML = universitiesHTML;
            
            // Add animation to cards
            const cards = container.querySelectorAll('.university-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 500);
    }
    
    createUniversityCard(university) {
        const examTags = university.exams.map(exam => 
            `<span class="tag exam">${exam}</span>`
        ).join('');
        
        const levelTags = university.levels.map(level => 
            `<span class="tag level">${level}</span>`
        ).join('');
        
        const fieldTags = university.fields.map(field => 
            `<span class="tag field">${field}</span>`
        ).join('');
        
        return `
            <div class="university-card" data-id="${university.id}">
                <div class="university-header">
                    <h3 class="university-name">${university.name}</h3>
                    <div class="university-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${university.location}
                    </div>
                </div>
                
                <div class="university-body">
                    <div class="university-info">
                        <div class="info-row">
                            <span class="info-label">
                                <i class="fas fa-trophy"></i>
                                Ranking
                            </span>
                            <span class="info-value ranking">${university.ranking}</span>
                        </div>
                        
                        <div class="info-row">
                            <span class="info-label">
                                <i class="fas fa-dollar-sign"></i>
                                Annual Fees
                            </span>
                            <span class="info-value fees">$${university.fees.toLocaleString()}</span>
                        </div>
                        
                        <div class="info-row">
                            <span class="info-label">
                                <i class="fas fa-flag"></i>
                                Country
                            </span>
                            <span class="info-value">${university.country}</span>
                        </div>
                    </div>
                    
                    <div class="university-tags">
                        ${examTags}
                        ${levelTags}
                        ${fieldTags}
                    </div>
                </div>
                
                <div class="university-footer">
                    <a href="${university.website}" target="_blank" class="visit-website">
                        <i class="fas fa-external-link-alt"></i>
                        Visit Website
                    </a>
                </div>
            </div>
        `;
    }
    
    updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        const count = this.filteredUniversities.length;
        countElement.textContent = `Showing ${count} ${count === 1 ? 'university' : 'universities'}`;
    }
    
    clearAllFilters() {
        // Reset filter object
        this.filters = {
            countries: [],
            exams: [],
            levels: [],
            fields: [],
            minFees: 0,
            maxFees: 80000
        };
        
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset range sliders
        document.getElementById('minFees').value = 0;
        document.getElementById('maxFees').value = 80000;
        document.getElementById('minFeesValue').textContent = '$0';
        document.getElementById('maxFeesValue').textContent = '$80,000';
        
        // Reset sort
        document.getElementById('sortBy').value = 'name';
        this.currentSort = 'name';
        
        // Apply filters (which will show all universities)
        this.applyFilters();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UniversityBrowser();
});

// Add some utility functions for enhanced functionality
function getCountryFlag(country) {
    const flags = {
        'USA': '🇺🇸',
        'UK': '🇬🇧',
        'Canada': '🇨🇦',
        'Australia': '🇦🇺',
        'Germany': '🇩🇪',
        'France': '🇫🇷',
        'Netherlands': '🇳🇱',
        'Switzerland': '🇨🇭'
    };
    return flags[country] || '🌍';
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
            <i class="fas fa-exclamation-triangle"></i>
            Something went wrong. Please refresh the page and try again.
        </div>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(errorDiv, container.firstChild);
    }
});

// Performance optimization for large datasets
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

// Smooth scroll functionality for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#') && href !== '#') {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
});