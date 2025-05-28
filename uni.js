// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const servicesDropdown = document.getElementById('servicesDropdown');

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    if (servicesDropdown) {
        const dropdownToggle = servicesDropdown.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    servicesDropdown.classList.toggle('active');
                }
            });
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            if (servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }
        }
    });
});

// ===== FORM INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const englishTestSelect = document.getElementById('englishTest');
    const englishScoreInput = document.getElementById('englishScore');
    const englishHelp = document.getElementById('englishHelp');
    const profileForm = document.getElementById('profileForm');
    const searchBtn = document.getElementById('searchBtn');
    const resultsSection = document.getElementById('resultsSection');

    // Dynamic help text for English test scores
    if (englishTestSelect && englishScoreInput && englishHelp) {
        englishTestSelect.addEventListener('change', function() {
            const selectedTest = this.value;
            
            if (selectedTest === 'IELTS') {
                englishHelp.textContent = 'IELTS: 0.0 - 9.0 (Band scores)';
                englishScoreInput.placeholder = 'Enter IELTS score (e.g., 7.0)';
                englishScoreInput.setAttribute('max', '9.0');
                englishScoreInput.setAttribute('min', '0.0');
                englishScoreInput.setAttribute('step', '0.5');
            } else if (selectedTest === 'TOEFL') {
                englishHelp.textContent = 'TOEFL: 0 - 120 (Total score)';
                englishScoreInput.placeholder = 'Enter TOEFL score (e.g., 100)';
                englishScoreInput.setAttribute('max', '120');
                englishScoreInput.setAttribute('min', '0');
                englishScoreInput.setAttribute('step', '1');
            } else {
                englishHelp.textContent = 'IELTS: 0.0 - 9.0 | TOEFL: 0 - 120';
                englishScoreInput.placeholder = 'Enter your score';
                englishScoreInput.removeAttribute('max');
                englishScoreInput.removeAttribute('min');
            }
            
            // Clear the current value when test type changes
            englishScoreInput.value = '';
        });
    }

    // Form validation and submission
    if (profileForm && searchBtn && resultsSection) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const profileData = {
                cgpa: document.getElementById('cgpa').value,
                greScore: document.getElementById('greScore').value,
                englishTest: document.getElementById('englishTest').value,
                englishScore: document.getElementById('englishScore').value,
                programLevel: document.getElementById('programLevel').value,
                course: document.getElementById('course').value
            };

            // Validate form data
            if (!validateForm(profileData)) {
                return;
            }

            // Show loading state
            searchBtn.classList.add('loading');
            searchBtn.disabled = true;

            // Simulate API call and show results
            setTimeout(() => {
                showResults(profileData);
                searchBtn.classList.remove('loading');
                searchBtn.disabled = false;
            }, 2500);
        });
    }

    // Form validation function
    function validateForm(data) {
        let isValid = true;
        const errors = [];

        // CGPA validation
        if (!data.cgpa || data.cgpa < 0 || data.cgpa > 4.0) {
            errors.push('Please enter a valid CGPA between 0.0 and 4.0');
            isValid = false;
        }

        // GRE validation
        if (!data.greScore || data.greScore < 260 || data.greScore > 340) {
            errors.push('Please enter a valid GRE score between 260 and 340');
            isValid = false;
        }

        // English test validation
        if (!data.englishTest) {
            errors.push('Please select an English test type');
            isValid = false;
        }

        // English score validation
        if (!data.englishScore) {
            errors.push('Please enter your English test score');
            isValid = false;
        } else if (data.englishTest === 'IELTS' && (data.englishScore < 0 || data.englishScore > 9)) {
            errors.push('IELTS score must be between 0.0 and 9.0');
            isValid = false;
        } else if (data.englishTest === 'TOEFL' && (data.englishScore < 0 || data.englishScore > 120)) {
            errors.push('TOEFL score must be between 0 and 120');
            isValid = false;
        }

        // Program level validation
        if (!data.programLevel) {
            errors.push('Please select a program level');
            isValid = false;
        }

        // Course validation
        if (!data.course) {
            errors.push('Please select a field of study');
            isValid = false;
        }

        // Show errors if any
        if (!isValid) {
            showErrorMessage(errors);
        }

        return isValid;
    }

    // Show error messages
    function showErrorMessage(errors) {
        const errorHtml = `
            <div class="error-message">
                <h3><i class="fas fa-exclamation-triangle"></i> Please fix the following errors:</h3>
                <ul style="text-align: left; max-width: 400px; margin: 1rem auto;">
                    ${errors.map(error => `<li style="margin: 0.5rem 0;">${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        resultsSection.innerHTML = errorHtml;
        resultsSection.classList.add('show');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Show university results
    function showResults(profileData) {
        const universities = generateUniversityRecommendations(profileData);
        
        if (universities.length === 0) {
            showNoResultsMessage(profileData);
            return;
        }

        const resultsHtml = universities.map(university => `
            <div class="university-card">
                <div class="university-header">
                    <div class="university-logo">
                        ${university.name.charAt(0)}
                    </div>
                    <div class="university-info">
                        <h3>${university.name}</h3>
                        <p class="university-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${university.location}
                        </p>
                    </div>
                    
                </div>
                
                <div class="university-details">
                    <div class="detail-card">
                        <h4><i class="fas fa-graduation-cap"></i> Program Information</h4>
                        <ul class="requirements-list">
                            <li><i class="fas fa-check"></i> ${university.program}</li>
                            <li><i class="fas fa-check"></i> Duration: ${university.duration}</li>
                            <li><i class="fas fa-check"></i> Tuition: ${university.tuition}</li>
                        </ul>
                    </div>
                    
                    <div class="detail-card">
                        <h4><i class="fas fa-clipboard-list"></i> Admission Requirements</h4>
                        <ul class="requirements-list">
                            <li><i class="fas fa-check"></i> Min CGPA: ${university.requirements.cgpa}</li>
                            <li><i class="fas fa-check"></i> Min GRE: ${university.requirements.gre}</li>
                            <li><i class="fas fa-check"></i> ${university.requirements.english}</li>
                        </ul>
                    </div>
                    
                    <div class="detail-card">
                        <h4><i class="fas fa-star"></i> University Highlights</h4>
                        <ul class="requirements-list">
                            ${university.highlights.map(highlight => `
                                <li><i class="fas fa-star"></i> ${highlight}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="university-actions">
                    <button class="action-button primary" onclick="applyToUniversity('${university.name}')">
                        <i class="fas fa-paper-plane"></i>
                        Apply Now
                    </button>
                    <button class="action-button secondary" onclick="learnMore('${university.name}')">
                        <i class="fas fa-info-circle"></i>
                        Learn More
                    </button>
                </div>
            </div>
        `).join('');

        resultsSection.innerHTML = `
            <div style="padding: 2rem; text-align: center; border-bottom: 1px solid var(--border-color);">
                <h3 style="color: var(--success-color); margin-bottom: 1rem;">
                    <i class="fas fa-check-circle"></i> Found ${universities.length} Perfect Matches!
                </h3>
                <p style="color: var(--text-secondary); margin-bottom: 0;">
                    Based on your academic profile, here are the universities that best match your qualifications.
                </p>
            </div>
            ${resultsHtml}
        `;
        
        resultsSection.classList.add('show');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Generate university recommendations based on user profile
    function generateUniversityRecommendations(profileData) {
        const universities = [
    // Top Tier Universities (Ivy League + Equivalent)
    {
        name: "Massachusetts Institute of Technology",
        location: "Cambridge, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,750/year' : '$57,400/year',
        requirements: {
            cgpa: '3.8+',
            gre: '325+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.5+' : '110+'}`
        },
        highlights: [
            'Top 1 in Engineering',
            'Excellent Research Facilities',
            'Strong Industry Connections',
            '95% Employment Rate'
        ],
        minCgpa: 3.8,
        minGre: 325,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.5 : 110
    },
    {
        name: "Stanford University",
        location: "Stanford, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,416/year' : '$56,169/year',
        requirements: {
            cgpa: '3.7+',
            gre: '320+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '105+'}`
        },
        highlights: [
            'Silicon Valley Location',
            'Innovation Hub',
            'Startup Incubator',
            'World-Class Faculty'
        ],
        minCgpa: 3.7,
        minGre: 320,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 105
    },
    {
        name: "Harvard University",
        location: "Cambridge, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$54,768/year' : '$51,925/year',
        requirements: {
            cgpa: '3.8+',
            gre: '325+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.5+' : '110+'}`
        },
        highlights: [
            'Ivy League Prestige',
            'World-Renowned Faculty',
            'Extensive Alumni Network',
            'Research Excellence'
        ],
        minCgpa: 3.8,
        minGre: 325,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.5 : 110
    },
    {
        name: "California Institute of Technology",
        location: "Pasadena, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$56,394/year' : '$56,394/year',
        requirements: {
            cgpa: '3.8+',
            gre: '325+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.5+' : '110+'}`
        },
        highlights: [
            'Top STEM Research',
            'Small Class Sizes',
            'Nobel Prize Winners',
            'NASA Partnerships'
        ],
        minCgpa: 3.8,
        minGre: 325,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.5 : 110
    },
    {
        name: "Princeton University",
        location: "Princeton, NJ, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$56,010/year' : '$56,010/year',
        requirements: {
            cgpa: '3.8+',
            gre: '325+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.5+' : '110+'}`
        },
        highlights: [
            'Ivy League Excellence',
            'Beautiful Campus',
            'Strong Liberal Arts',
            'Elite Alumni Network'
        ],
        minCgpa: 3.8,
        minGre: 325,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.5 : 110
    },
    {
        name: "Yale University",
        location: "New Haven, CT, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$48,300/year' : '$62,250/year',
        requirements: {
            cgpa: '3.8+',
            gre: '325+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.5+' : '110+'}`
        },
        highlights: [
            'Ivy League Tradition',
            'Gothic Architecture',
            'Secret Societies',
            'Presidential Alumni'
        ],
        minCgpa: 3.8,
        minGre: 325,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.5 : 110
    },
    {
        name: "Columbia University",
        location: "New York, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$51,008/year' : '$66,139/year',
        requirements: {
            cgpa: '3.7+',
            gre: '320+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '105+'}`
        },
        highlights: [
            'NYC Location',
            'Journalism School',
            'Research Powerhouse',
            'Urban Campus'
        ],
        minCgpa: 3.7,
        minGre: 320,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 105
    },
    {
        name: "University of Pennsylvania",
        location: "Philadelphia, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$45,890/year' : '$63,452/year',
        requirements: {
            cgpa: '3.7+',
            gre: '320+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '105+'}`
        },
        highlights: [
            'Wharton Business School',
            'Ivy League Status',
            'Urban Setting',
            'Strong Alumni Network'
        ],
        minCgpa: 3.7,
        minGre: 320,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 105
    },
    {
        name: "Cornell University",
        location: "Ithaca, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,500/year' : '$62,456/year',
        requirements: {
            cgpa: '3.6+',
            gre: '318+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '102+'}`
        },
        highlights: [
            'Agricultural Excellence',
            'Engineering Strength',
            'Beautiful Campus',
            'Research Intensive'
        ],
        minCgpa: 3.6,
        minGre: 318,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 102
    },
    {
        name: "Dartmouth College",
        location: "Hanover, NH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,458/year' : '$59,458/year',
        requirements: {
            cgpa: '3.7+',
            gre: '320+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '105+'}`
        },
        highlights: [
            'Liberal Arts Focus',
            'Outdoor Recreation',
            'Strong Alumni Bond',
            'Quarter System'
        ],
        minCgpa: 3.7,
        minGre: 320,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 105
    },
    {
        name: "Brown University",
        location: "Providence, RI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$63,179/year' : '$63,179/year',
        requirements: {
            cgpa: '3.7+',
            gre: '320+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '105+'}`
        },
        highlights: [
            'Open Curriculum',
            'Creative Freedom',
            'Ivy League Status',
            'Diverse Programs'
        ],
        minCgpa: 3.7,
        minGre: 320,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 105
    },

    // Top Public Universities
    {
        name: "University of California, Berkeley",
        location: "Berkeley, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$44,066/year' : '$43,980/year',
        requirements: {
            cgpa: '3.5+',
            gre: '315+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '100+'}`
        },
        highlights: [
            'Public Ivy League',
            'Diverse Student Body',
            'Research Excellence',
            'Beautiful Campus'
        ],
        minCgpa: 3.5,
        minGre: 315,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 100
    },
    {
        name: "University of California, Los Angeles",
        location: "Los Angeles, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$44,066/year' : '$43,473/year',
        requirements: {
            cgpa: '3.5+',
            gre: '315+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '100+'}`
        },
        highlights: [
            'Entertainment Industry',
            'Sports Excellence',
            'Research University',
            'Sunny Weather'
        ],
        minCgpa: 3.5,
        minGre: 315,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 100
    },
    {
        name: "University of California, San Diego",
        location: "San Diego, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$44,066/year' : '$44,487/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Biotech Hub',
            'Beach Location',
            'Research Focus',
            'STEM Excellence'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },
    {
        name: "University of Michigan, Ann Arbor",
        location: "Ann Arbor, MI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$49,508/year' : '$52,266/year',
        requirements: {
            cgpa: '3.5+',
            gre: '315+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '100+'}`
        },
        highlights: [
            'Big Ten Sports',
            'Engineering Excellence',
            'Ross Business School',
            'Research Powerhouse'
        ],
        minCgpa: 3.5,
        minGre: 315,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 100
    },
    {
        name: "University of Virginia",
        location: "Charlottesville, VA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$34,648/year' : '$56,837/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Jefferson\'s University',
            'Historic Campus',
            'Honor Code',
            'Strong Traditions'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },
    {
        name: "University of North Carolina, Chapel Hill",
        location: "Chapel Hill, NC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$28,346/year' : '$38,996/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '95+'}`
        },
        highlights: [
            'Public Ivy',
            'Basketball Tradition',
            'Journalism School',
            'Beautiful Campus'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 95
    },
    

    // Technology Focused Universities
    {
        name: "Carnegie Mellon University",
        location: "Pittsburgh, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$52,040/year' : '$58,924/year',
        requirements: {
            cgpa: '3.6+',
            gre: '318+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '102+'}`
        },
        highlights: [
            'Top CS Program',
            'Strong Alumni Network',
            'Industry Partnerships',
            'Cutting-edge Research'
        ],
        minCgpa: 3.6,
        minGre: 318,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 102
    },

    {
        name: "Georgia Institute of Technology",
        location: "Atlanta, GA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,140/year' : '$33,794/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Engineering Excellence',
            'Tech Industry Hub',
            'Co-op Programs',
            'Innovation Focus'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },
    {
        name: "University of Washington",
        location: "Seattle, WA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$39,906/year' : '$38,166/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '92+'}`
        },
        highlights: [
            'Tech Hub Location',
            'Affordable Tuition',
            'Great Weather',
            'Strong Research'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 92
    },
    {
        name: "University of Illinois Urbana-Champaign",
        location: "Urbana, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$34,330/year' : '$35,110/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '92+'}`
        },
        highlights: [
            'Engineering Powerhouse',
            'Research Excellence',
            'Big Ten Network',
            'Affordable Excellence'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 92
    },
    {
        name: "Purdue University",
        location: "West Lafayette, IN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,132/year' : '$28,794/year',
        requirements: {
            cgpa: '3.2+',
            gre: '308+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Engineering Excellence',
            'Aerospace Programs',
            'Research Focus',
            'Strong Alumni'
        ],
        minCgpa: 3.2,
        minGre: 308,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },

    // Strong Research Universities
    {
        name: "Johns Hopkins University",
        location: "Baltimore, MD, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,720/year' : '$60,480/year',
        requirements: {
            cgpa: '3.6+',
            gre: '318+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '102+'}`
        },
        highlights: [
            'Medical Excellence',
            'Research Powerhouse',
            'Bloomberg School',
            'International Studies'
        ],
        minCgpa: 3.6,
        minGre: 318,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 102
    },
    {
        name: "Duke University",
        location: "Durham, NC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$63,450/year' : '$63,450/year',
        requirements: {
            cgpa: '3.6+',
            gre: '318+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '102+'}`
        },
        highlights: [
            'Basketball Excellence',
            'Medical Research',
            'Beautiful Campus',
            'Strong Academics'
        ],
        minCgpa: 3.6,
        minGre: 318,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 102
    },
    {
        name: "Northwestern University",
        location: "Evanston, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$61,810/year' : '$63,468/year',
        requirements: {
            cgpa: '3.5+',
            gre: '315+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '100+'}`
        },
        highlights: [
            'Journalism School',
            'Kellogg Business',
            'Chicago Access',
            'Quarter System'
        ],
        minCgpa: 3.5,
        minGre: 315,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 100
    },
    {
        name: "Washington University in St. Louis",
        location: "St. Louis, MO, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,420/year' : '$60,590/year',
        requirements: {
            cgpa: '3.5+',
            gre: '315+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '100+'}`
        },
        highlights: [
            'Medical Excellence',
            'Research Focus',
            'Small Class Sizes',
            'Beautiful Campus'
        ],
        minCgpa: 3.5,
        minGre: 315,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 100
    },
    {
        name: "Vanderbilt University",
        location: "Nashville, TN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$56,400/year' : '$58,130/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Music City Location',
            'Strong Academics',
            'Beautiful Campus',
            'Research Excellence'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },

    // State Universities - Tier 1
    {
        name: "University of Texas at Austin",
        location: "Austin, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$20,092/year' : '$41,070/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '92+'}`
        },
        highlights: [
            'Tech Hub Austin',
            'Strong Alumni Network',
            'Research Excellence',
            'Music Scene'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 92
    },
    {
        name: "University of Florida",
        location: "Gainesville, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$12,737/year' : '$28,658/year',
        requirements: {
            cgpa: '3.2+',
            gre: '308+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Affordable Excellence',
            'Strong Sports Program',
            'Research University',
            'Diverse Programs'
        ],
        minCgpa: 3.2,
        minGre: 308,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "Ohio State University",
        location: "Columbus, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,560/year' : '$34,430/year',
        requirements: {
            cgpa: '3.1+',
            gre: '305+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Large Research University',
            'Strong Alumni Network',
            'Big Ten Sports',
            'Diverse Programs'
        ],
        minCgpa: 3.1,
        minGre: 305,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "Pennsylvania State University",
        location: "University Park, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$24,198/year' : '$38,651/year',
        requirements: {
            cgpa: '3.1+',
            gre: '305+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Strong Alumni Network',
            'Big Ten Sports',
            'Engineering Excellence',
            'Research Focus'
        ],
        minCgpa: 3.1,
        minGre: 305,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "University of Wisconsin-Madison",
        location: "Madison, WI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,269/year' : '$39,427/year',
        requirements: {
            cgpa: '3.2+',
            gre: '308+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Research Excellence',
            'Beautiful Campus',
            'Strong Academics',
            'College Town Feel'
        ],
        minCgpa: 3.2,
        minGre: 308,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "University of Minnesota Twin Cities",
        location: "Minneapolis, MN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$19,116/year' : '$33,843/year',
        requirements: {
            cgpa: '3.1+',
            gre: '305+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Research University',
            'Urban Campus',
            'Strong Programs',
            'Affordable Tuition'
        ],
        minCgpa: 3.1,
        minGre: 305,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },

    // Liberal Arts Colleges and Universities
    {
        name: "Rice University",
        location: "Houston, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$52,070/year' : '$54,960/year',
        requirements: {
            cgpa: '3.5+',
            gre: '315+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '100+'}`
        },
        highlights: [
            'Small Class Sizes',
            'Engineering Excellence',
            'Beautiful Campus',
            'Strong Academics'
        ],
        minCgpa: 3.5,
        minGre: 315,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 100
    },
    {
        name: "Emory University",
        location: "Atlanta, GA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,920/year' : '$58,070/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Medical Excellence',
            'Business School',
            'Research Focus',
            'Beautiful Campus'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },
    {
        name: "University of Notre Dame",
        location: "Notre Dame, IN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,843/year' : '$60,301/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Catholic Tradition',
            'Strong Alumni Network',
            'Beautiful Campus',
            'Football Excellence'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },

    // West Coast Universities
    {
        name: "University of California, Davis",
        location: "Davis, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$44,066/year' : '$44,408/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '92+'}`
        },
        highlights: [
            'Agricultural Excellence',
            'Veterinary School',
            'Research Focus',
            'College Town'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 92
    },
    {
        name: "University of California, Irvine",
        location: "Irvine, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$44,066/year' : '$43,709/year',
        requirements: {
            cgpa: '3.2+',
            gre: '308+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Tech Industry Hub',
            'Young University',
            'Research Focus',
            'Safe Campus'
        ],
        minCgpa: 3.2,
        minGre: 308,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "University of California, Santa Barbara",
        location: "Santa Barbara, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$44,066/year' : '$44,196/year',
        requirements: {
            cgpa: '3.2+',
            gre: '308+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Beach Location',
            'Physics Excellence',
            'Research University',
            'Beautiful Setting'
        ],
        minCgpa: 3.2,
        minGre: 308,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "University of Southern California",
        location: "Los Angeles, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$64,726/year' : '$64,726/year',
        requirements: {
            cgpa: '3.4+',
            gre: '312+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : '98+'}`
        },
        highlights: [
            'Film School Excellence',
            'Strong Alumni Network',
            'Research University',
            'Urban Campus'
        ],
        minCgpa: 3.4,
        minGre: 312,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : 98
    },
    {
        name: "Oregon State University",
        location: "Corvallis, OR, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$27,930/year' : '$32,535/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Engineering Focus',
            'Affordable Tuition',
            'Research Opportunities',
            'Beautiful Oregon'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },

    // East Coast Universities
    {
        name: "Boston University",
        location: "Boston, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$62,360/year' : '$62,360/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '92+'}`
        },
        highlights: [
            'Urban Campus',
            'Strong Programs',
            'Research University',
            'Boston Location'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 92
    },
    {
        name: "Northeastern University",
        location: "Boston, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,100/year' : '$59,100/year',
        requirements: {
            cgpa: '3.2+',
            gre: '308+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Co-op Programs',
            'Industry Connections',
            'Urban Setting',
            'Practical Learning'
        ],
        minCgpa: 3.2,
        minGre: 308,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "New York University",
        location: "New York, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,168/year' : '$58,168/year',
        requirements: {
            cgpa: '3.3+',
            gre: '310+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '92+'}`
        },
        highlights: [
            'NYC Location',
            'Global Campuses',
            'Arts Excellence',
            'Urban Experience'
        ],
        minCgpa: 3.3,
        minGre: 310,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 92
    },
    {
        name: "Rutgers University",
        location: "New Brunswick, NJ, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$18,619/year' : '$33,005/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Research University',
            'Affordable Tuition',
            'Diverse Programs',
            'Strong Academics'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },

    // Midwest Universities
    {
        name: "University of Chicago",
        location: "Chicago, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$64,260/year' : '$64,260/year',
        requirements: {
            cgpa: '3.6+',
            gre: '318+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : '102+'}`
        },
        highlights: [
            'Economics Excellence',
            'Intellectual Rigor',
            'Beautiful Campus',
            'Nobel Laureates'
        ],
        minCgpa: 3.6,
        minGre: 318,
        minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : 102
    },
    {
        name: "University of Iowa",
        location: "Iowa City, IA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,167/year' : '$31,233/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Writers Workshop',
            'Medical Excellence',
            'Research Focus',
            'College Town'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    {
        name: "Michigan State University",
        location: "East Lansing, MI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$18,274/year' : '$41,958/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Large Research University',
            'Strong Alumni Network',
            'Sports Excellence',
            'Diverse Programs'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },

    // Southern Universities
    {
        name: "University of Georgia",
        location: "Athens, GA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$12,080/year' : '$30,220/year',
        requirements: {
            cgpa: '3.1+',
            gre: '305+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Strong Academics',
            'Beautiful Campus',
            'Research University',
            'College Town Feel'
        ],
        minCgpa: 3.1,
        minGre: 305,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "University of Alabama",
        location: "Tuscaloosa, AL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,580/year' : '$32,400/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Football Excellence',
            'Strong Traditions',
            'Beautiful Campus',
            'Affordable Tuition'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Tennessee",
        location: "Knoxville, TN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$13,264/year' : '$31,684/year',
        requirements: {
            cgpa: '2.9+',
            gre: '298+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'SEC Sports',
            'Research University',
            'Mountain Location',
            'Strong Programs'
        ],
        minCgpa: 2.9,
        minGre: 298,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    {
        name: "University of Vermont",
        location: "Burlington, VT, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$16,392/year' : '$45,890/year',
        requirements: {
            cgpa: '2.9+',
            gre: '298+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Beautiful Vermont',
            'Outdoor Recreation',
            'Strong Academics',
            'Small Town Feel'
        ],
        minCgpa: 2.9,
        minGre: 298,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    {
        name: "University of New Hampshire",
        location: "Durham, NH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$16,986/year' : '$37,718/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Research University',
            'Beautiful Campus',
            'Strong Programs',
            'New England Charm'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Maine",
        location: "Orono, ME, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$13,968/year' : '$33,240/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Affordable Tuition',
            'Natural Beauty',
            'Research Focus',
            'Small Class Sizes'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },

    // Additional Mid-Tier Universities
    {
        name: "Temple University",
        location: "Philadelphia, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$20,174/year' : '$32,196/year',
        requirements: {
            cgpa: '2.9+',
            gre: '298+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Urban Campus',
            'Diverse Programs',
            'Research University',
            'City Opportunities'
        ],
        minCgpa: 2.9,
        minGre: 298,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    {
        name: "Drexel University",
        location: "Philadelphia, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$56,595/year' : '$56,595/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Co-op Programs',
            'Tech Focus',
            'Urban Setting',
            'Industry Connections'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    {
        name: "Syracuse University",
        location: "Syracuse, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,440/year' : '$58,440/year',
        requirements: {
            cgpa: '3.1+',
            gre: '305+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '88+'}`
        },
        highlights: [
            'Strong Alumni Network',
            'Communications Excellence',
            'Sports Tradition',
            'Beautiful Campus'
        ],
        minCgpa: 3.1,
        minGre: 305,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 88
    },
    {
        name: "University of Pittsburgh",
        location: "Pittsburgh, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,586/year' : '$36,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Medical Excellence',
            'Research University',
            'Urban Campus',
            'Strong Academics'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },

    // California State Universities
    {
        name: "San Jose State University",
        location: "San Jose, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$8,634/year' : '$20,485/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Silicon Valley Location',
            'Tech Industry Hub',
            'Affordable Tuition',
            'Industry Connections'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "California State University, Long Beach",
        location: "Long Beach, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$8,634/year' : '$20,485/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Beach Location',
            'Diverse Programs',
            'Affordable Education',
            'Strong Academics'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "California Polytechnic State University",
        location: "San Luis Obispo, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$10,344/year' : '$22,195/year',
        requirements: {
            cgpa: '2.9+',
            gre: '298+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Learn by Doing',
            'Engineering Focus',
            'Beautiful Campus',
            'Strong Industry Ties'
        ],
        minCgpa: 2.9,
        minGre: 298,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },

    // Texas Universities
    {
        name: "Texas A&M University",
        location: "College Station, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$13,040/year' : '$38,602/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Aggie Tradition',
            'Engineering Excellence',
            'Research University',
            'Strong Alumni Network'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    {
        name: "University of Houston",
        location: "Houston, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$12,036/year' : '$26,756/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Energy Capital',
            'Diverse City',
            'Research University',
            'Affordable Tuition'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "Texas Tech University",
        location: "Lubbock, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$10,882/year' : '$25,892/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Red Raider Pride',
            'Engineering Focus',
            'Research University',
            'Strong Traditions'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },

    // Additional Public Universities
    {
        name: "University of Arkansas",
        location: "Fayetteville, AR, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,522/year' : '$27,196/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Razorback Sports',
            'Beautiful Campus',
            'Strong Academics',
            'Affordable Tuition'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Oklahoma",
        location: "Norman, OK, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$8,028/year' : '$25,588/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Sooner Tradition',
            'Football Excellence',
            'Research University',
            'Strong Programs'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "Kansas State University",
        location: "Manhattan, KS, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$10,520/year' : '$26,405/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Wildcat Pride',
            'Agricultural Excellence',
            'Strong Community',
            'Research Focus'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },

    // International Friendly Universities
    {
        name: "University of South Florida",
        location: "Tampa, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$17,324/year' : '$27,068/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Diverse Student Body',
            'Research University',
            'Florida Weather',
            'Growing Reputation'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "Florida International University",
        location: "Miami, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$18,954/year' : '$25,332/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'International Focus',
            'Miami Location',
            'Diverse Programs',
            'Growing University'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Central Florida",
        location: "Orlando, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$13,052/year' : '$22,467/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Large University',
            'Modern Facilities',
            'Orlando Location',
            'Growing Reputation'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },

    // Additional Options
    {
        name: "University of Nevada, Las Vegas",
        location: "Las Vegas, NV, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$8,926/year' : '$25,540/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Entertainment Capital',
            'Growing University',
            'Diverse Programs',
            'Unique Location'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Hawaii at Manoa",
        location: "Honolulu, HI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$18,336/year' : '$35,316/year',
        requirements: {
            cgpa: '2.8+',
            gre: '295+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Paradise Location',
            'Unique Culture',
            'Research Focus',
            'Pacific Studies'
        ],
        minCgpa: 2.8,
        minGre: 295,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "Portland State University",
        location: "Portland, OR, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$15,732/year' : '$29,664/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Urban Campus',
            'Sustainability Focus',
            'Diverse Programs',
            'Pacific Northwest'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },

    // Final additions to reach 100+
    {
        name: "Wayne State University",
        location: "Detroit, MI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$14,932/year' : '$30,783/year',
        requirements: {
            cgpa: '2.7+',
            gre: '290+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Urban Research',
            'Medical Excellence',
            'Diverse Student Body',
            'Affordable Programs'
        ],
        minCgpa: 2.7,
        minGre: 290,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Toledo",
        location: "Toledo, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,898/year' : '$20,972/year',
        requirements: {
            cgpa: '2.5+',
            gre: '285+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Affordable Education',
            'Engineering Focus',
            'Research Opportunities',
            'Small Class Sizes'
        ],
        minCgpa: 2.5,
        minGre: 285,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Akron",
        location: "Akron, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,660/year' : '$19,937/year',
        requirements: {
            cgpa: '2.5+',
            gre: '285+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Polymer Science',
            'Engineering Excellence',
            'Affordable Tuition',
            'Research Focus'
        ],
        minCgpa: 2.5,
        minGre: 285,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "Wright State University",
        location: "Dayton, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$9,476/year' : '$18,838/year',
        requirements: {
            cgpa: '2.5+',
            gre: '285+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Aerospace Programs',
            'Medical School',
            'Research University',
            'Affordable Options'
        ],
        minCgpa: 2.5,
        minGre: 285,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "Southern Illinois University",
        location: "Carbondale, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$11,697/year' : '$16,729/year',
        requirements: {
            cgpa: '2.5+',
            gre: '285+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Research University',
            'Diverse Programs',
            'Affordable Education',
            'Beautiful Campus'
        ],
        minCgpa: 2.5,
        minGre: 285,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of Wyoming",
        location: "Laramie, WY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$6,408/year' : '$20,688/year',
        requirements: {
            cgpa: '2.5+',
            gre: '285+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Very Affordable',
            'Beautiful Location',
            'Small Class Sizes',
            'Research Opportunities'
        ],
        minCgpa: 2.5,
        minGre: 285,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    {
        name: "University of North Dakota",
        location: "Grand Forks, ND, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$9,818/year' : '$22,539/year',
        requirements: {
            cgpa: '2.5+',
            gre: '285+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '79+'}`
        },
        highlights: [
            'Aviation Excellence',
            'Energy Programs',
            'Research Focus',
            'Affordable Tuition'
        ],
        minCgpa: 2.5,
        minGre: 285,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 79
    },
    
    {
        name: "University of Connecticut",
        location: "Storrs, CT, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$17,834/year' : '$41,890/year',
        requirements: {
            cgpa: '3.0+',
            gre: '300+',
            english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : '80+'}`
        },
        highlights: [
            'Research University',
            'Basketball Excellence',
            'Strong Academics',
            'Beautiful Campus'
        ],
        minCgpa: 3.0,
        minGre: 300,
        minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : 80
    },
    // Canadian Universities in exact format
{
    name: "University of Toronto",
    location: "Toronto, ON, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $58,160/year' : 'CAD $61,820/year',
    requirements: {
        cgpa: '3.7+',
        gre: '320+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '7.0+' : profileData.englishTest === 'TOEFL' ? '105+' : '120+'}`
    },
    highlights: [
        'Canada\'s Top University',
        'World-Class Research',
        'Diverse Programs',
        'Strong Industry Links'
    ],
    minCgpa: 3.7,
    minGre: 320,
    minEnglish: profileData.englishTest === 'IELTS' ? 7.0 : profileData.englishTest === 'TOEFL' ? 105 : 120
},
{
    name: "University of British Columbia",
    location: "Vancouver, BC, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $43,053/year' : 'CAD $47,760/year',
    requirements: {
        cgpa: '3.5+',
        gre: '315+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : profileData.englishTest === 'TOEFL' ? '100+' : '110+'}`
    },
    highlights: [
        'Beautiful Vancouver Campus',
        'Research Excellence',
        'Pacific Rim Focus',
        'Strong Co-op Programs'
    ],
    minCgpa: 3.5,
    minGre: 315,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : profileData.englishTest === 'TOEFL' ? 100 : 110
},
{
    name: "McGill University",
    location: "Montreal, QC, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $21,742/year' : 'CAD $50,847/year',
    requirements: {
        cgpa: '3.5+',
        gre: '315+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : profileData.englishTest === 'TOEFL' ? '100+' : '110+'}`
    },
    highlights: [
        'Harvard of Canada',
        'Bilingual Environment',
        'Historic Campus',
        'Strong Medical Programs'
    ],
    minCgpa: 3.5,
    minGre: 315,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : profileData.englishTest === 'TOEFL' ? 100 : 110
},
{
    name: "University of Waterloo",
    location: "Waterloo, ON, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $39,570/year' : 'CAD $62,890/year',
    requirements: {
        cgpa: '3.4+',
        gre: '312+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.5+' : profileData.englishTest === 'TOEFL' ? '100+' : '110+'}`
    },
    highlights: [
        'Top Engineering & CS',
        'Co-op Excellence',
        'Tech Industry Hub',
        'Innovation Focus'
    ],
    minCgpa: 3.4,
    minGre: 312,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.5 : profileData.englishTest === 'TOEFL' ? 100 : 110
},
{
    name: "University of Alberta",
    location: "Edmonton, AB, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $12,810/year' : 'CAD $32,244/year',
    requirements: {
        cgpa: '3.2+',
        gre: '308+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '92+' : '100+'}`
    },
    highlights: [
        'Research Intensive',
        'Affordable Tuition',
        'Strong STEM Programs',
        'AI Research Hub'
    ],
    minCgpa: 3.2,
    minGre: 308,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 92 : 100
},
{
    name: "McMaster University",
    location: "Hamilton, ON, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $29,140/year' : 'CAD $48,180/year',
    requirements: {
        cgpa: '3.3+',
        gre: '310+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '92+' : '100+'}`
    },
    highlights: [
        'Medical Excellence',
        'Research Innovation',
        'Beautiful Campus',
        'Strong Engineering'
    ],
    minCgpa: 3.3,
    minGre: 310,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 92 : 100
},
{
    name: "Queen's University",
    location: "Kingston, ON, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $25,832/year' : 'CAD $47,666/year',
    requirements: {
        cgpa: '3.2+',
        gre: '308+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '92+' : '100+'}`
    },
    highlights: [
        'Historic University',
        'Strong Alumni Network',
        'Beautiful Campus',
        'Business Excellence'
    ],
    minCgpa: 3.2,
    minGre: 308,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 92 : 100
},
{
    name: "University of Calgary",
    location: "Calgary, AB, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $11,538/year' : 'CAD $22,683/year',
    requirements: {
        cgpa: '3.1+',
        gre: '305+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '88+' : '100+'}`
    },
    highlights: [
        'Energy Research Hub',
        'Affordable Education',
        'Mountain Location',
        'Strong Industry Ties'
    ],
    minCgpa: 3.1,
    minGre: 305,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 88 : 100
},
{
    name: "Western University",
    location: "London, ON, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $24,474/year' : 'CAD $38,204/year',
    requirements: {
        cgpa: '3.1+',
        gre: '305+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '88+' : '100+'}`
    },
    highlights: [
        'Ivey Business School',
        'Research Excellence',
        'Beautiful Campus',
        'Strong Programs'
    ],
    minCgpa: 3.1,
    minGre: 305,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 88 : 100
},
{
    name: "Simon Fraser University",
    location: "Burnaby, BC, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $20,216/year' : 'CAD $35,550/year',
    requirements: {
        cgpa: '3.0+',
        gre: '300+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '88+' : '100+'}`
    },
    highlights: [
        'Modern Campus',
        'Tech Innovation',
        'Mountain Views',
        'Co-op Programs'
    ],
    minCgpa: 3.0,
    minGre: 300,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 88 : 100
},
{
    name: "University of Ottawa",
    location: "Ottawa, ON, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $19,453/year' : 'CAD $37,425/year',
    requirements: {
        cgpa: '3.0+',
        gre: '300+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '88+' : '100+'}`
    },
    highlights: [
        'Capital City Location',
        'Bilingual Programs',
        'Government Connections',
        'Research Focus'
    ],
    minCgpa: 3.0,
    minGre: 300,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 88 : 100
},
{
    name: "Dalhousie University",
    location: "Halifax, NS, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $18,750/year' : 'CAD $24,705/year',
    requirements: {
        cgpa: '2.9+',
        gre: '298+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '88+' : '100+'}`
    },
    highlights: [
        'Atlantic Canada Hub',
        'Marine Research',
        'Historic Campus',
        'Affordable Living'
    ],
    minCgpa: 2.9,
    minGre: 298,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 88 : 100
},
{
    name: "University of Saskatchewan",
    location: "Saskatoon, SK, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $7,749/year' : 'CAD $23,034/year',
    requirements: {
        cgpa: '2.9+',
        gre: '298+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '88+' : '100+'}`
    },
    highlights: [
        'Very Affordable',
        'Agricultural Excellence',
        'Research University',
        'Beautiful Campus'
    ],
    minCgpa: 2.9,
    minGre: 298,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 88 : 100
},
{
    name: "University of Manitoba",
    location: "Winnipeg, MB, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $11,104/year' : 'CAD $19,816/year',
    requirements: {
        cgpa: '2.8+',
        gre: '295+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '86+' : '95+'}`
    },
    highlights: [
        'Affordable Education',
        'Research Focus',
        'Diverse Programs',
        'Welcoming Community'
    ],
    minCgpa: 2.8,
    minGre: 295,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 86 : 95
},
{
    name: "Concordia University",
    location: "Montreal, QC, Canada",
    program: `${profileData.programLevel} in ${profileData.course}`,
    duration: profileData.programLevel === 'Masters' ? '2 years' : '4 years',
    tuition: profileData.programLevel === 'Masters' ? 'CAD $16,815/year' : 'CAD $27,822/year',
    requirements: {
        cgpa: '2.8+',
        gre: '295+',
        english: `${profileData.englishTest}: ${profileData.englishTest === 'IELTS' ? '6.0+' : profileData.englishTest === 'TOEFL' ? '86+' : '95+'}`
    },
    highlights: [
        'Montreal Location',
        'Creative Programs',
        'Modern Facilities',
        'Diverse Student Body'
    ],
    minCgpa: 2.8,
    minGre: 295,
    minEnglish: profileData.englishTest === 'IELTS' ? 6.0 : profileData.englishTest === 'TOEFL' ? 86 : 95
},

        ];

        // Filter universities based on user qualifications
        const qualifiedUniversities = universities.filter(uni => {
            const userCgpa = parseFloat(profileData.cgpa);
            const userGre = parseInt(profileData.greScore);
            const userEnglish = parseFloat(profileData.englishScore);

            return userCgpa >= uni.minCgpa && 
                   userGre >= uni.minGre && 
                   userEnglish >= uni.minEnglish;
        });

        // Calculate match scores and sort
        return qualifiedUniversities.map(uni => {
            const cgpaScore = Math.min(100, (parseFloat(profileData.cgpa) / uni.minCgpa) * 30);
            const greScore = Math.min(100, (parseInt(profileData.greScore) / uni.minGre) * 40);
            const englishScore = Math.min(100, (parseFloat(profileData.englishScore) / uni.minEnglish) * 30);
            
            const matchScore = Math.round(cgpaScore + greScore + englishScore);
            
            return {
                ...uni,
                matchScore: Math.min(99, Math.max(75, matchScore))
            };
        }).sort((a, b) => b.matchScore - a.matchScore);
    }

    // Show no results message
    function showNoResultsMessage(profileData) {
        const suggestions = [];
        
        if (parseFloat(profileData.cgpa) < 3.3) {
            suggestions.push('Consider improving your CGPA through additional coursework');
        }
        if (parseInt(profileData.greScore) < 310) {
            suggestions.push('Retake the GRE to improve your score');
        }
        if (profileData.englishTest === 'IELTS' && parseFloat(profileData.englishScore) < 6.0) {
            suggestions.push('Improve your IELTS score with additional practice');
        }
        if (profileData.englishTest === 'TOEFL' && parseFloat(profileData.englishScore) < 92) {
            suggestions.push('Improve your TOEFL score with additional practice');
        }

        const suggestionHtml = suggestions.length > 0 ? `
            <div style="margin-top: 2rem; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto;">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">
                    <i class="fas fa-lightbulb"></i> Suggestions to improve your profile:
                </h4>
                <ul style="color: var(--text-secondary);">
                    ${suggestions.map(suggestion => `<li style="margin: 0.5rem 0;">${suggestion}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        resultsSection.innerHTML = `
            <div class="error-message">
                <h3><i class="fas fa-search"></i> No Perfect Matches Found</h3>
                <p>Based on your current profile, we couldn't find universities that match your qualifications perfectly. Don't worry - this doesn't mean you can't get admitted!</p>
                ${suggestionHtml}
                <div style="margin-top: 2rem;">
                    <button class="action-button primary" onclick="contactAdvisor()" style="display: inline-flex; max-width: 300px;">
                        <i class="fas fa-phone"></i>
                        Contact Academic Advisor
                    </button>
                </div>
            </div>
        `;
        
        resultsSection.classList.add('show');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// ===== UTILITY FUNCTIONS =====
function applyToUniversity(universityName) {
    // Create and show custom modal for Apply Now
    showCustomModal({
        title: 'Apply to University',
        message: `Great choice! <strong>${universityName}</strong> is an excellent university. We'll help you with the complete application process.`,
        icon: 'fas fa-graduation-cap',
        confirmText: 'Get Application Help',
        cancelText: 'Maybe Later',
        confirmColor: '#10b981',
        onConfirm: () => {
            // Store the university name in localStorage
            localStorage.setItem('selectedUniversity', universityName);
            
            // Show success message and redirect
            showSuccessMessage('Redirecting to contact form...', () => {
                window.location.href = 'index.html#contact';
            });
        }
    });
}

function learnMore(universityName) {
    // Create and show custom modal for Learn More
    showCustomModal({
        title: 'Learn More About University',
        message: `Interested in <strong>${universityName}</strong>? Our education consultants will provide you with detailed information about programs, requirements, campus life, and admission process.`,
        icon: 'fas fa-info-circle',
        confirmText: 'Get More Information',
        cancelText: 'Not Now',
        confirmColor: '#6366f1',
        onConfirm: () => {
            // Store university name for inquiry
            localStorage.setItem('inquiryUniversity', universityName);
            
            // Show success message and redirect
            showSuccessMessage('Connecting you with our consultants...', () => {
                window.location.href = 'index.html#contact';
            });
        }
    });
}

function contactAdvisor() {
    // Create and show custom modal for Contact Advisor
    showCustomModal({
        title: 'Contact Academic Advisor',
        message: 'Connect with our experienced academic advisors who will guide you through the university selection and application process.',
        icon: 'fas fa-user-tie',
        confirmText: 'Contact Now',
        cancelText: 'Later',
        confirmColor: '#f59e0b',
        onConfirm: () => {
            // Show success message and redirect
            showSuccessMessage('Connecting with advisor...', () => {
                window.location.href = 'index.html#contact';
            });
        }
    });
}

// ===== CUSTOM MODAL FUNCTION =====
function showCustomModal(options) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
        padding: 1rem;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 1rem;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        max-width: 450px;
        width: 100%;
        padding: 0;
        position: relative;
        animation: slideInScale 0.3s ease-out;
        overflow: hidden;
    `;

    modalContent.innerHTML = `
        <div style="
            background: linear-gradient(135deg, ${options.confirmColor || '#6366f1'}, ${adjustColor(options.confirmColor || '#6366f1', -20)});
            padding: 2rem 2rem 1rem 2rem;
            text-align: center;
        ">
            <div style="
                width: 64px;
                height: 64px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem auto;
                backdrop-filter: blur(10px);
            ">
                <i class="${options.icon}" style="
                    font-size: 1.75rem;
                    color: white;
                "></i>
            </div>
            <h3 style="
                color: white;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">${options.title}</h3>
        </div>
        
        <div style="padding: 2rem;">
            <p style="
                color: #374151;
                font-size: 1.1rem;
                line-height: 1.6;
                margin: 0 0 2rem 0;
                text-align: center;
            ">${options.message}</p>
            
            <div style="
                display: flex;
                gap: 1rem;
                justify-content: center;
            ">
                <button class="modal-cancel-btn" style="
                    flex: 1;
                    padding: 0.875rem 1.5rem;
                    border: 2px solid #e5e7eb;
                    background: white;
                    color: #6b7280;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: inherit;
                ">
                    ${options.cancelText || 'Cancel'}
                </button>
                
                <button class="modal-confirm-btn" style="
                    flex: 2;
                    padding: 0.875rem 1.5rem;
                    border: none;
                    background: linear-gradient(135deg, ${options.confirmColor || '#6366f1'}, ${adjustColor(options.confirmColor || '#6366f1', -20)});
                    color: white;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
                    font-family: inherit;
                ">
                    <i class="fas fa-arrow-right" style="margin-right: 0.5rem;"></i>
                    ${options.confirmText || 'Confirm'}
                </button>
            </div>
        </div>
    `;

    // Add event listeners
    const cancelBtn = modalContent.querySelector('.modal-cancel-btn');
    const confirmBtn = modalContent.querySelector('.modal-confirm-btn');

    // Hover effects
    cancelBtn.addEventListener('mouseenter', () => {
        cancelBtn.style.borderColor = '#9ca3af';
        cancelBtn.style.color = '#374151';
        cancelBtn.style.transform = 'translateY(-1px)';
    });

    cancelBtn.addEventListener('mouseleave', () => {
        cancelBtn.style.borderColor = '#e5e7eb';
        cancelBtn.style.color = '#6b7280';
        cancelBtn.style.transform = 'translateY(0)';
    });

    confirmBtn.addEventListener('mouseenter', () => {
        confirmBtn.style.transform = 'translateY(-2px)';
        confirmBtn.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.6)';
    });

    confirmBtn.addEventListener('mouseleave', () => {
        confirmBtn.style.transform = 'translateY(0)';
        confirmBtn.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
    });

    // Click handlers
    cancelBtn.addEventListener('click', () => {
        closeModal(modalOverlay);
    });

    confirmBtn.addEventListener('click', () => {
        if (options.onConfirm) {
            options.onConfirm();
        }
        closeModal(modalOverlay);
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalOverlay);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Add to DOM
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Add required CSS animations
    if (!document.querySelector('#modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInScale {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideOutScale {
                from {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: scale(0.9) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== CLOSE MODAL FUNCTION =====
function closeModal(modalOverlay) {
    modalOverlay.style.animation = 'fadeOut 0.3s ease-out';
    const modalContent = modalOverlay.querySelector('div');
    if (modalContent) {
        modalContent.style.animation = 'slideOutScale 0.3s ease-out';
    }
    
    setTimeout(() => {
        if (modalOverlay.parentNode) {
            modalOverlay.parentNode.removeChild(modalOverlay);
        }
    }, 300);
}

// ===== SUCCESS MESSAGE FUNCTION =====
function showSuccessMessage(message, callback) {
    const successOverlay = document.createElement('div');
    successOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;

    const successContent = document.createElement('div');
    successContent.style.cssText = `
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        animation: slideInScale 0.3s ease-out;
        max-width: 300px;
    `;

    successContent.innerHTML = `
        <div style="
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem auto;
        ">
            <i class="fas fa-check" style="
                font-size: 1.5rem;
                color: white;
            "></i>
        </div>
        <h4 style="
            color: #10b981;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
        ">Success!</h4>
        <p style="
            color: #6b7280;
            margin: 0;
            font-size: 1rem;
        ">${message}</p>
        <div style="
            width: 32px;
            height: 3px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 2px;
            margin: 1rem auto 0 auto;
            animation: loading 2s ease-in-out;
        "></div>
    `;

    // Add loading animation
    if (!document.querySelector('#loading-animation')) {
        const style = document.createElement('style');
        style.id = 'loading-animation';
        style.textContent = `
            @keyframes loading {
                0% { width: 0px; }
                100% { width: 32px; }
            }
        `;
        document.head.appendChild(style);
    }

    successOverlay.appendChild(successContent);
    document.body.appendChild(successOverlay);

    // Auto close and execute callback
    setTimeout(() => {
        successOverlay.style.animation = 'fadeOut 0.3s ease-out';
        successContent.style.animation = 'slideOutScale 0.3s ease-out';
        
        setTimeout(() => {
            if (successOverlay.parentNode) {
                successOverlay.parentNode.removeChild(successOverlay);
            }
            if (callback) callback();
        }, 300);
    }, 2000);
}

// ===== COLOR UTILITY FUNCTION =====
function adjustColor(hexColor, percent) {
    const num = parseInt(hexColor.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== FORM INPUT ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-input, .form-select');
    
    formInputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Add input validation feedback
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        const value = input.value;
        const inputId = input.id;
        
        // Remove previous validation classes
        input.classList.remove('valid', 'invalid');
        
        // Validate based on input type and id
        let isValid = true;
        
        if (inputId === 'cgpa') {
            isValid = value >= 0 && value <= 4.0;
        } else if (inputId === 'greScore') {
            isValid = value >= 260 && value <= 340;
        } else if (inputId === 'englishScore') {
            const testType = document.getElementById('englishTest').value;
            if (testType === 'IELTS') {
                isValid = value >= 0 && value <= 9.0;
            } else if (testType === 'TOEFL') {
                isValid = value >= 0 && value <= 120;
            }
        } else if (input.tagName === 'SELECT') {
            isValid = value !== '';
        }
        
        // Add validation class
        if (value !== '') {
            input.classList.add(isValid ? 'valid' : 'invalid');
        }
    }
});