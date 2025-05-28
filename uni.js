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
    // Form elements
    const greRequiredSelect = document.getElementById('greRequired');
    const greScoreGroup = document.getElementById('greScoreGroup');
    const greScoreInput = document.getElementById('greScore');
    
    const englishRequiredSelect = document.getElementById('englishRequired');
    const englishTestGroup = document.getElementById('englishTestGroup');
    const englishScoreGroup = document.getElementById('englishScoreGroup');
    const englishTestSelect = document.getElementById('englishTest');
    const englishScoreInput = document.getElementById('englishScore');
    const englishHelp = document.getElementById('englishHelp');
    
    const standardizedTestRequiredSelect = document.getElementById('standardizedTestRequired');
    const standardizedTestGroup = document.getElementById('standardizedTestGroup');
    const standardizedScoreGroup = document.getElementById('standardizedScoreGroup');
    const standardizedTestSelect = document.getElementById('standardizedTest');
    const standardizedScoreInput = document.getElementById('standardizedScore');
    const standardizedHelp = document.getElementById('standardizedHelp');
    
    const profileForm = document.getElementById('profileForm');
    const searchBtn = document.getElementById('searchBtn');
    const resultsSection = document.getElementById('resultsSection');

    // GRE requirement handling
    if (greRequiredSelect && greScoreGroup) {
        greRequiredSelect.addEventListener('change', function() {
            if (this.value === 'yes') {
                greScoreGroup.style.display = 'flex';
                greScoreInput.required = true;
            } else {
                greScoreGroup.style.display = 'none';
                greScoreInput.required = false;
                greScoreInput.value = '';
            }
        });
    }

    // English test requirement handling
    if (englishRequiredSelect && englishTestGroup && englishScoreGroup) {
        englishRequiredSelect.addEventListener('change', function() {
            if (this.value === 'yes') {
                englishTestGroup.style.display = 'flex';
                englishScoreGroup.style.display = 'flex';
                englishTestSelect.required = true;
                englishScoreInput.required = true;
            } else {
                englishTestGroup.style.display = 'none';
                englishScoreGroup.style.display = 'none';
                englishTestSelect.required = false;
                englishScoreInput.required = false;
                englishTestSelect.value = '';
                englishScoreInput.value = '';
            }
        });
    }

    // Standardized test requirement handling
    if (standardizedTestRequiredSelect && standardizedTestGroup && standardizedScoreGroup) {
        standardizedTestRequiredSelect.addEventListener('change', function() {
            if (this.value === 'yes') {
                standardizedTestGroup.style.display = 'flex';
                standardizedScoreGroup.style.display = 'flex';
                standardizedTestSelect.required = true;
                standardizedScoreInput.required = true;
            } else {
                standardizedTestGroup.style.display = 'none';
                standardizedScoreGroup.style.display = 'none';
                standardizedTestSelect.required = false;
                standardizedScoreInput.required = false;
                standardizedTestSelect.value = '';
                standardizedScoreInput.value = '';
            }
        });
    }

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
            } else if (selectedTest === 'Duolingo') {
                englishHelp.textContent = 'Duolingo: 10 - 160 (Overall score)';
                englishScoreInput.placeholder = 'Enter Duolingo score (e.g., 120)';
                englishScoreInput.setAttribute('max', '160');
                englishScoreInput.setAttribute('min', '10');
                englishScoreInput.setAttribute('step', '5');
            } else if (selectedTest === 'PTE') {
                englishHelp.textContent = 'PTE Academic: 10 - 90 (Overall score)';
                englishScoreInput.placeholder = 'Enter PTE score (e.g., 65)';
                englishScoreInput.setAttribute('max', '90');
                englishScoreInput.setAttribute('min', '10');
                englishScoreInput.setAttribute('step', '1');
            } else if (selectedTest === 'Cambridge') {
                englishHelp.textContent = 'Cambridge: 100 - 230 (Scale score)';
                englishScoreInput.placeholder = 'Enter Cambridge score (e.g., 180)';
                englishScoreInput.setAttribute('max', '230');
                englishScoreInput.setAttribute('min', '100');
                englishScoreInput.setAttribute('step', '1');
            } else if (selectedTest === 'CELPIP') {
                englishHelp.textContent = 'CELPIP: 1 - 12 (CLB levels)';
                englishScoreInput.placeholder = 'Enter CELPIP score (e.g., 9)';
                englishScoreInput.setAttribute('max', '12');
                englishScoreInput.setAttribute('min', '1');
                englishScoreInput.setAttribute('step', '1');
            } else {
                englishHelp.textContent = 'Select test type to see score range';
                englishScoreInput.placeholder = 'Enter your score';
                englishScoreInput.removeAttribute('max');
                englishScoreInput.removeAttribute('min');
            }
            
            // Clear the current value when test type changes
            englishScoreInput.value = '';
        });
    }

    // Dynamic help text for standardized test scores
    if (standardizedTestSelect && standardizedScoreInput && standardizedHelp) {
        standardizedTestSelect.addEventListener('change', function() {
            const selectedTest = this.value;
            
            if (selectedTest === 'SAT') {
                standardizedHelp.textContent = 'SAT: 400 - 1600 (Total score)';
                standardizedScoreInput.placeholder = 'Enter SAT score (e.g., 1450)';
                standardizedScoreInput.setAttribute('max', '1600');
                standardizedScoreInput.setAttribute('min', '400');
                standardizedScoreInput.setAttribute('step', '10');
            } else if (selectedTest === 'ACT') {
                standardizedHelp.textContent = 'ACT: 1 - 36 (Composite score)';
                standardizedScoreInput.placeholder = 'Enter ACT score (e.g., 32)';
                standardizedScoreInput.setAttribute('max', '36');
                standardizedScoreInput.setAttribute('min', '1');
                standardizedScoreInput.setAttribute('step', '1');
            } else if (selectedTest === 'GMAT') {
                standardizedHelp.textContent = 'GMAT: 200 - 800 (Total score)';
                standardizedScoreInput.placeholder = 'Enter GMAT score (e.g., 650)';
                standardizedScoreInput.setAttribute('max', '800');
                standardizedScoreInput.setAttribute('min', '200');
                standardizedScoreInput.setAttribute('step', '10');
            } else if (selectedTest === 'LSAT') {
                standardizedHelp.textContent = 'LSAT: 120 - 180 (Scaled score)';
                standardizedScoreInput.placeholder = 'Enter LSAT score (e.g., 165)';
                standardizedScoreInput.setAttribute('max', '180');
                standardizedScoreInput.setAttribute('min', '120');
                standardizedScoreInput.setAttribute('step', '1');
            } else if (selectedTest === 'MCAT') {
                standardizedHelp.textContent = 'MCAT: 472 - 528 (Total score)';
                standardizedScoreInput.placeholder = 'Enter MCAT score (e.g., 510)';
                standardizedScoreInput.setAttribute('max', '528');
                standardizedScoreInput.setAttribute('min', '472');
                standardizedScoreInput.setAttribute('step', '1');
            } else {
                standardizedHelp.textContent = 'Select test type to see score range';
                standardizedScoreInput.placeholder = 'Enter your score';
                standardizedScoreInput.removeAttribute('max');
                standardizedScoreInput.removeAttribute('min');
            }
            
            // Clear the current value when test type changes
            standardizedScoreInput.value = '';
        });
    }

    // Form validation and submission
    if (profileForm && searchBtn && resultsSection) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const profileData = {
                cgpa: document.getElementById('cgpa').value,
                greRequired: document.getElementById('greRequired').value,
                greScore: document.getElementById('greScore').value || null,
                englishRequired: document.getElementById('englishRequired').value,
                englishTest: document.getElementById('englishTest').value || null,
                englishScore: document.getElementById('englishScore').value || null,
                standardizedTestRequired: document.getElementById('standardizedTestRequired').value || 'no',
                standardizedTest: document.getElementById('standardizedTest').value || null,
                standardizedScore: document.getElementById('standardizedScore').value || null,
                programLevel: document.getElementById('programLevel').value,
                course: document.getElementById('course').value,
                workExperience: document.getElementById('workExperience').value || '0',
                budget: document.getElementById('budget').value || '',
                scholarshipRequired: document.getElementById('scholarshipRequired').checked,
                onlineProgram: document.getElementById('onlineProgram').checked,
                fastTrack: document.getElementById('fastTrack').checked
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
        if (data.greRequired === 'yes') {
            if (!data.greScore || data.greScore < 260 || data.greScore > 340) {
                errors.push('Please enter a valid GRE score between 260 and 340');
                isValid = false;
            }
        }

        // English test validation
        if (data.englishRequired === 'yes') {
            if (!data.englishTest) {
                errors.push('Please select an English test type');
                isValid = false;
            }
            
            if (!data.englishScore) {
                errors.push('Please enter your English test score');
                isValid = false;
            } else {
                const score = parseFloat(data.englishScore);
                if (data.englishTest === 'IELTS' && (score < 0 || score > 9)) {
                    errors.push('IELTS score must be between 0.0 and 9.0');
                    isValid = false;
                } else if (data.englishTest === 'TOEFL' && (score < 0 || score > 120)) {
                    errors.push('TOEFL score must be between 0 and 120');
                    isValid = false;
                } else if (data.englishTest === 'Duolingo' && (score < 10 || score > 160)) {
                    errors.push('Duolingo score must be between 10 and 160');
                    isValid = false;
                } else if (data.englishTest === 'PTE' && (score < 10 || score > 90)) {
                    errors.push('PTE score must be between 10 and 90');
                    isValid = false;
                }
            }
        }

        // Standardized test validation
        if (data.standardizedTestRequired === 'yes') {
            if (!data.standardizedTest) {
                errors.push('Please select a standardized test type');
                isValid = false;
            }
            
            if (!data.standardizedScore) {
                errors.push('Please enter your standardized test score');
                isValid = false;
            }
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
                    <div class="match-score">
                        <i class="fas fa-percentage"></i>
                        ${university.matchScore}% Match
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
                            ${university.requirements.gre ? `<li><i class="fas fa-check"></i> Min GRE: ${university.requirements.gre}</li>` : ''}
                            ${university.requirements.english ? `<li><i class="fas fa-check"></i> ${university.requirements.english}</li>` : ''}
                            ${university.requirements.standardized ? `<li><i class="fas fa-check"></i> ${university.requirements.standardized}</li>` : ''}
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
    // TOP TIER UNIVERSITIES

    // United States - Top Tier
    {
        name: "Massachusetts Institute of Technology (MIT)",
        location: "Cambridge, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,750/year' : profileData.programLevel === 'PhD' ? '$57,400/year' : '$57,400/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Top 1 in Engineering', 'Excellent Research Facilities', 'Strong Industry Connections', '95% Employment Rate'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Stanford University",
        location: "Stanford, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,416/year' : profileData.programLevel === 'PhD' ? '$56,169/year' : '$58,416/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Silicon Valley Location', 'Top Innovation Hub', 'Excellent Alumni Network', 'World-Class Faculty'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Harvard University",
        location: "Cambridge, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$54,768/year' : profileData.programLevel === 'PhD' ? '$52,659/year' : '$54,768/year',
        requirements: {
            cgpa: '3.9+',
            gre: profileData.greRequired === 'yes' ? '330+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Ivy League Prestige', 'World-Renowned Faculty', 'Extensive Resources', 'Global Recognition'],
        minCgpa: 3.9, minGre: profileData.greRequired === 'yes' ? 330 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "California Institute of Technology (Caltech)",
        location: "Pasadena, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$56,364/year' : profileData.programLevel === 'PhD' ? '$56,364/year' : '$56,364/year',
        requirements: {
            cgpa: '3.9+',
            gre: profileData.greRequired === 'yes' ? '330+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['STEM Excellence', 'Small Class Sizes', 'NASA Partnerships', 'Nobel Prize Winners'],
        minCgpa: 3.9, minGre: profileData.greRequired === 'yes' ? 330 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "University of Pennsylvania (Wharton)",
        location: "Philadelphia, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$81,378/year' : profileData.programLevel === 'PhD' ? '$70,200/year' : '$63,452/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Top Business School', 'Wall Street Connections', 'Ivy League Status', 'Excellent ROI'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Yale University",
        location: "New Haven, CT, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$62,200/year' : profileData.programLevel === 'PhD' ? '$48,300/year' : '$62,200/year',
        requirements: {
            cgpa: '3.9+',
            gre: profileData.greRequired === 'yes' ? '330+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Ivy League Heritage', 'Liberal Arts Excellence', 'Historic Campus', 'Distinguished Alumni'],
        minCgpa: 3.9, minGre: profileData.greRequired === 'yes' ? 330 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Princeton University",
        location: "Princeton, NJ, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,710/year' : profileData.programLevel === 'PhD' ? '$59,710/year' : '$59,710/year',
        requirements: {
            cgpa: '3.9+',
            gre: profileData.greRequired === 'yes' ? '330+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Academic Excellence', 'Beautiful Campus', 'Strong Research', 'Elite Alumni Network'],
        minCgpa: 3.9, minGre: profileData.greRequired === 'yes' ? 330 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Columbia University",
        location: "New York, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$64,380/year' : profileData.programLevel === 'PhD' ? '$52,394/year' : '$64,380/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['NYC Location', 'Journalism Excellence', 'Ivy League Status', 'Cultural Opportunities'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "University of Chicago",
        location: "Chicago, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$62,940/year' : profileData.programLevel === 'PhD' ? '$62,940/year' : '$62,940/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Economics Excellence', 'Rigorous Academics', 'Nobel Laureates', 'Research Intensive'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Cornell University",
        location: "Ithaca, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$62,456/year' : profileData.programLevel === 'PhD' ? '$29,500/year' : '$62,456/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Engineering Excellence', 'Beautiful Campus', 'Ivy League', 'Research Opportunities'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },

    // United Kingdom - Top Tier
    {
        name: "University of Oxford",
        location: "Oxford, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£28,670/year' : profileData.programLevel === 'PhD' ? '£26,940/year' : '£37,510/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['World\'s Oldest University', 'Tutorial System', 'Historic Architecture', 'Global Recognition'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "University of Cambridge",
        location: "Cambridge, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£33,972/year' : profileData.programLevel === 'PhD' ? '£26,568/year' : '£37,293/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Ancient University', 'Scientific Excellence', 'College System', 'Distinguished Alumni'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Imperial College London",
        location: "London, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£36,200/year' : profileData.programLevel === 'PhD' ? '£25,100/year' : '£36,200/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['STEM Focused', 'London Location', 'Industry Connections', 'Research Excellence'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "London School of Economics (LSE)",
        location: "London, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£32,208/year' : profileData.programLevel === 'PhD' ? '£22,608/year' : '£25,608/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Social Sciences Excellence', 'Central London', 'Political Connections', 'Global Network'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "University College London (UCL)",
        location: "London, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£29,400/year' : profileData.programLevel === 'PhD' ? '£24,000/year' : '£31,200/year',
        requirements: {
            cgpa: '3.6+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['First University in England', 'Multidisciplinary', 'London Location', 'Research Intensive'],
        minCgpa: 3.6, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },

    // Switzerland - Top Tier
    {
        name: "ETH Zurich",
        location: "Zurich, Switzerland",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'CHF 1,298/year' : profileData.programLevel === 'PhD' ? 'CHF 1,298/year' : 'CHF 1,298/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Top European Tech University', 'Low Tuition', 'Research Excellence', 'Industry Partnerships'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "École Polytechnique Fédérale de Lausanne (EPFL)",
        location: "Lausanne, Switzerland",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'CHF 1,266/year' : profileData.programLevel === 'PhD' ? 'CHF 1,266/year' : 'CHF 1,266/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Technology Focus', 'Innovation Hub', 'Affordable Education', 'Multilingual Environment'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },

    // China - Top Tier
    {
        name: "Tsinghua University",
        location: "Beijing, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥40,000/year' : profileData.programLevel === 'PhD' ? '¥40,000/year' : '¥40,000/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Top Chinese University', 'Engineering Excellence', 'Government Connections', 'Growing Global Reputation'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Peking University",
        location: "Beijing, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥35,000/year' : profileData.programLevel === 'PhD' ? '¥35,000/year' : '¥35,000/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Liberal Arts Excellence', 'Historic Campus', 'Political Science Strength', 'Cultural Heritage'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },

    // MID-TIER UNIVERSITIES

    // United States - Mid Tier
    {
        name: "University of California, Berkeley",
        location: "Berkeley, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,272/year' : profileData.programLevel === 'PhD' ? '$14,226/year' : '$46,326/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Public Ivy Status', 'Strong Research Programs', 'Diverse Student Body', 'California Location'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of California, Los Angeles (UCLA)",
        location: "Los Angeles, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$28,566/year' : profileData.programLevel === 'PhD' ? '$13,280/year' : '$44,830/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Entertainment Industry Connections', 'Strong Athletics', 'Diverse Programs', 'LA Location'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Michigan - Ann Arbor",
        location: "Ann Arbor, MI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$52,266/year' : profileData.programLevel === 'PhD' ? '$52,266/year' : '$52,266/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Strong Engineering', 'Research Excellence', 'College Town', 'Alumni Network'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Carnegie Mellon University",
        location: "Pittsburgh, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$61,344/year' : profileData.programLevel === 'PhD' ? '$61,344/year' : '$61,344/year',
        requirements: {
            cgpa: '3.6+',
            gre: profileData.greRequired === 'yes' ? '318+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Computer Science Excellence', 'Robotics Leadership', 'Drama School', 'Innovation Focus'],
        minCgpa: 3.6, minGre: profileData.greRequired === 'yes' ? 318 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Northwestern University",
        location: "Evanston, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$58,701/year' : profileData.programLevel === 'PhD' ? '$58,701/year' : '$58,701/year',
        requirements: {
            cgpa: '3.6+',
            gre: profileData.greRequired === 'yes' ? '318+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Journalism Excellence', 'Business School', 'Chicago Proximity', 'Strong Athletics'],
        minCgpa: 3.6, minGre: profileData.greRequired === 'yes' ? 318 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Duke University",
        location: "Durham, NC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$60,435/year' : profileData.programLevel === 'PhD' ? '$60,435/year' : '$60,435/year',
        requirements: {
            cgpa: '3.6+',
            gre: profileData.greRequired === 'yes' ? '318+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Medical School Excellence', 'Beautiful Campus', 'Strong Athletics', 'Research Triangle'],
        minCgpa: 3.6, minGre: profileData.greRequired === 'yes' ? 318 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Vanderbilt University",
        location: "Nashville, TN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$54,840/year' : profileData.programLevel === 'PhD' ? '$54,840/year' : '$54,840/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Music City Location', 'Strong Medicine', 'Beautiful Campus', 'Southern Charm'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Rice University",
        location: "Houston, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$51,107/year' : profileData.programLevel === 'PhD' ? '$51,107/year' : '$51,107/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Small Class Sizes', 'Strong Engineering', 'Houston Location', 'Research Focus'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Texas at Austin",
        location: "Austin, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$38,326/year' : profileData.programLevel === 'PhD' ? '$18,030/year' : '$40,032/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Large Research University', 'Strong Business School', 'Austin Culture', 'Tech Hub'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Washington",
        location: "Seattle, WA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$36,588/year' : profileData.programLevel === 'PhD' ? '$17,424/year' : '$38,166/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Seattle Tech Hub', 'Strong Medical School', 'Beautiful Campus', 'Research Excellence'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // Canada - Mid Tier
    {
        name: "University of Toronto",
        location: "Toronto, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $25,000/year' : profileData.programLevel === 'PhD' ? 'CAD $6,100/year' : 'CAD $61,720/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Top Canadian University', 'Multicultural Environment', 'Strong Research Focus', 'Post-Study Work Options'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of British Columbia",
        location: "Vancouver, BC, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $22,500/year' : profileData.programLevel === 'PhD' ? 'CAD $7,500/year' : 'CAD $52,326/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Beautiful Vancouver Location', 'Strong Research', 'Sustainable Campus', 'International Focus'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "McGill University",
        location: "Montreal, QC, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $18,000/year' : profileData.programLevel === 'PhD' ? 'CAD $4,500/year' : 'CAD $50,000/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Historic University', 'Montreal Culture', 'Medical Excellence', 'Bilingual Environment'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Alberta",
        location: "Edmonton, AB, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $15,000/year' : profileData.programLevel === 'PhD' ? 'CAD $5,000/year' : 'CAD $35,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Oldest Swiss University', 'Medical Excellence', 'Research Focus', 'Historic City'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // FINAL BATCH TO REACH 300+ UNIVERSITIES

    // Additional Top US Universities
    {
        name: "University of California, San Diego",
        location: "La Jolla, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$28,000/year' : profileData.programLevel === 'PhD' ? '$14,000/year' : '$46,000/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Beach Location', 'Research Excellence', 'Biotech Hub', 'Strong Sciences'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of California, Irvine",
        location: "Irvine, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$27,000/year' : profileData.programLevel === 'PhD' ? '$13,500/year' : '$45,000/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Modern Campus', 'Technology Focus', 'Orange County', 'Research University'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of California, Davis",
        location: "Davis, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,500/year' : profileData.programLevel === 'PhD' ? '$13,250/year' : '$44,500/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '308+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Agricultural Excellence', 'Veterinary School', 'Sustainable Campus', 'College Town'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 308 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of California, Santa Barbara",
        location: "Santa Barbara, CA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,000/year' : profileData.programLevel === 'PhD' ? '$13,000/year' : '$44,000/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '308+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Beach Campus', 'Party School Reputation', 'Strong Sciences', 'Beautiful Location'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 308 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Purdue University",
        location: "West Lafayette, IN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,132/year' : profileData.programLevel === 'PhD' ? '$29,132/year' : '$29,132/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Aviation Programs', 'Research Focus', 'Big Ten Conference'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Ohio State University",
        location: "Columbus, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$32,061/year' : profileData.programLevel === 'PhD' ? '$32,061/year' : '$32,061/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Large Research University', 'Medical School', 'Strong Athletics', 'Columbus Location'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Pennsylvania State University",
        location: "University Park, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$40,874/year' : profileData.programLevel === 'PhD' ? '$40,874/year' : '$40,874/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Large Alumni Network', 'Research University', 'College Town', 'Strong Athletics'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Wisconsin-Madison",
        location: "Madison, WI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,523/year' : profileData.programLevel === 'PhD' ? '$12,762/year' : '$39,427/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '308+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Public Ivy', 'Research Excellence', 'Beautiful Campus', 'Strong Sciences'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 308 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Minnesota Twin Cities",
        location: "Minneapolis, MN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,603/year' : profileData.programLevel === 'PhD' ? '$13,302/year' : '$33,843/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Research University', 'Medical School', 'Urban Campus', 'Big Ten Conference'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Illinois at Urbana-Champaign",
        location: "Urbana, IL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$34,330/year' : profileData.programLevel === 'PhD' ? '$17,165/year' : '$36,068/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Computer Science Hub', 'Research Focus', 'Big Ten Conference'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // Additional Accessible US Universities
    {
        name: "University of Tennessee",
        location: "Knoxville, TN, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$30,484/year' : profileData.programLevel === 'PhD' ? '$15,242/year' : '$32,188/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['SEC Athletics', 'Research University', 'Beautiful Campus', 'Southern Culture'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Kentucky",
        location: "Lexington, KY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$30,224/year' : profileData.programLevel === 'PhD' ? '$15,112/year' : '$31,398/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Medical School', 'Pharmacy Excellence', 'Basketball Tradition', 'Research Focus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Alabama",
        location: "Tuscaloosa, AL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$30,250/year' : profileData.programLevel === 'PhD' ? '$15,125/year' : '$32,400/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Football Tradition', 'Business School', 'Beautiful Campus', 'Southern Hospitality'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Louisiana State University",
        location: "Baton Rouge, LA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$28,627/year' : profileData.programLevel === 'PhD' ? '$14,314/year' : '$30,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['SEC Athletics', 'Petroleum Engineering', 'Louisiana Culture', 'Research University'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Georgia",
        location: "Athens, GA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$27,658/year' : profileData.programLevel === 'PhD' ? '$13,829/year' : '$30,220/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['SEC Athletics', 'Journalism School', 'College Town', 'Beautiful Campus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of South Carolina",
        location: "Columbia, SC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$33,928/year' : profileData.programLevel === 'PhD' ? '$16,964/year' : '$35,404/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Business School', 'Medical School', 'SEC Athletics', 'Southern Charm'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of North Carolina at Charlotte",
        location: "Charlotte, NC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,812/year' : profileData.programLevel === 'PhD' ? '$13,406/year' : '$23,946/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Growing University', 'Urban Campus', 'Business Programs', 'Research Focus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Cincinnati",
        location: "Cincinnati, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,334/year' : profileData.programLevel === 'PhD' ? '$13,167/year' : '$27,334/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Co-op Programs', 'Medical School', 'Engineering Focus', 'Urban Campus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Iowa",
        location: "Iowa City, IA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,990/year' : profileData.programLevel === 'PhD' ? '$14,995/year' : '$31,233/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Writers Workshop', 'Medical School', 'Big Ten Conference', 'College Town'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Iowa State University",
        location: "Ames, IA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$24,508/year' : profileData.programLevel === 'PhD' ? '$12,254/year' : '$25,014/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Engineering Focus', 'Agriculture Excellence', 'Veterinary School', 'Research University'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional International Universities
    // More UK Universities
    {
        name: "Loughborough University",
        location: "Loughborough, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£23,100/year' : profileData.programLevel === 'PhD' ? '£20,500/year' : '£24,650/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Sports Excellence', 'Engineering Focus', 'Modern Campus', 'Industry Links'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Bath",
        location: "Bath, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£24,500/year' : profileData.programLevel === 'PhD' ? '£21,600/year' : '£25,200/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Beautiful Campus', 'Engineering Excellence', 'Historic City', 'High Employment Rates'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Exeter",
        location: "Exeter, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£22,500/year' : profileData.programLevel === 'PhD' ? '£19,500/year' : '£23,700/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Russell Group', 'Beautiful Campus', 'Business Excellence', 'Devon Location'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Lancaster University",
        location: "Lancaster, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£21,500/year' : profileData.programLevel === 'PhD' ? '£18,500/year' : '£22,650/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Campus University', 'Business School', 'Research Excellence', 'Lake District Proximity'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // More Canadian Universities
    {
        name: "Dalhousie University",
        location: "Halifax, NS, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $15,000/year' : profileData.programLevel === 'PhD' ? 'CAD $5,000/year' : 'CAD $25,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Maritime Location', 'Medical School', 'Ocean Research', 'Historic Campus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Ottawa",
        location: "Ottawa, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $22,000/year' : profileData.programLevel === 'PhD' ? 'CAD $7,000/year' : 'CAD $38,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Bilingual University', 'Capital City', 'Government Connections', 'Research Focus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Queen\'s University",
        location: "Kingston, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $25,000/year' : profileData.programLevel === 'PhD' ? 'CAD $8,000/year' : 'CAD $52,000/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '308+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Historic University', 'Business Excellence', 'Medical School', 'Beautiful Campus'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 308 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "McMaster University",
        location: "Hamilton, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $24,000/year' : profileData.programLevel === 'PhD' ? 'CAD $7,500/year' : 'CAD $48,000/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '308+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Medical School Innovation', 'Research Excellence', 'Engineering Focus', 'Hamilton Location'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 308 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // More Australian Universities
    {
        name: "Deakin University",
        location: "Melbourne, VIC, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $33,000/year' : profileData.programLevel === 'PhD' ? 'AUD $33,000/year' : 'AUD $33,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Modern University', 'Online Excellence', 'Industry Focus', 'Multiple Campuses'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "RMIT University",
        location: "Melbourne, VIC, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $36,000/year' : profileData.programLevel === 'PhD' ? 'AUD $36,000/year' : 'AUD $36,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Technology Focus', 'Design Excellence', 'City Campus', 'Industry Connections'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "La Trobe University",
        location: "Melbourne, VIC, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $32,000/year' : profileData.programLevel === 'PhD' ? 'AUD $32,000/year' : 'AUD $32,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Large Campus', 'Health Sciences', 'Research Focus', 'Diverse Programs'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // More German Universities
    {
        name: "Free University of Berlin",
        location: "Berlin, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€315/semester' : profileData.programLevel === 'PhD' ? '€315/semester' : '€315/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Liberal Arts Focus', 'Historic University', 'Berlin Location', 'International Programs'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Düsseldorf",
        location: "Düsseldorf, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€311/semester' : profileData.programLevel === 'PhD' ? '€311/semester' : '€311/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Medical Excellence', 'Business Hub', 'Japanese Connection', 'Research Focus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Mannheim",
        location: "Mannheim, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€344/semester' : profileData.programLevel === 'PhD' ? '€344/semester' : '€344/semester',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Business Excellence', 'Economics Focus', 'Research University', 'Industry Connections'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // More French Universities
    {
        name: "University of Strasbourg",
        location: "Strasbourg, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€243/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€170/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['European Capital', 'International Focus', 'Historic University', 'Research Excellence'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Bordeaux",
        location: "Bordeaux, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€243/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€170/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Wine Capital', 'Beautiful City', 'Research Focus', 'Cultural Heritage'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional Chinese Universities
    {
        name: "Sun Yat-sen University",
        location: "Guangzhou, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥30,000/year' : profileData.programLevel === 'PhD' ? '¥30,000/year' : '¥30,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Medical Excellence', 'Southern China', 'Research Focus', 'International Programs'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Beihang University",
        location: "Beijing, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥32,000/year' : profileData.programLevel === 'PhD' ? '¥32,000/year' : '¥32,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Aerospace Excellence', 'Engineering Focus', 'Beijing Location', 'Technology Innovation'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Calgary",
        location: "Calgary, AB, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $14,500/year' : profileData.programLevel === 'PhD' ? 'CAD $4,800/year' : 'CAD $32,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Energy Research', 'Business Connections', 'Mountain Proximity', 'Growing Reputation'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // United Kingdom - Mid Tier
    {
        name: "University of Edinburgh",
        location: "Edinburgh, Scotland, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '£25,300/year' : profileData.programLevel === 'PhD' ? '£23,100/year' : '£26,500/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Historic City', 'Strong Medicine', 'Festival Culture', 'Research Excellence'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "King's College London",
        location: "London, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£26,400/year' : profileData.programLevel === 'PhD' ? '£22,200/year' : '£28,050/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Central London', 'Medical Excellence', 'Historic Institution', 'Research Focus'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Manchester",
        location: "Manchester, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£24,500/year' : profileData.programLevel === 'PhD' ? '£21,000/year' : '£25,500/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Large Research University', 'Industrial Heritage', 'Diverse Programs', 'Strong Engineering'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Birmingham",
        location: "Birmingham, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£23,400/year' : profileData.programLevel === 'PhD' ? '£20,700/year' : '£24,300/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Red Brick University', 'Strong Research', 'Central England', 'Diverse Student Body'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Warwick",
        location: "Coventry, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£25,800/year' : profileData.programLevel === 'PhD' ? '£22,500/year' : '£26,750/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Modern Campus', 'Business Excellence', 'Research Focus', 'International Students'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // Australia - Mid Tier
    {
        name: "University of Melbourne",
        location: "Melbourne, VIC, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $45,824/year' : profileData.programLevel === 'PhD' ? 'AUD $45,824/year' : 'AUD $45,824/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Top Australian University', 'Melbourne Culture', 'Strong Research', 'International Recognition'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Australian National University",
        location: "Canberra, ACT, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $47,940/year' : profileData.programLevel === 'PhD' ? 'AUD $47,940/year' : 'AUD $47,940/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Capital City Location', 'Research Excellence', 'Government Connections', 'Small Class Sizes'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Sydney",
        location: "Sydney, NSW, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $49,000/year' : profileData.programLevel === 'PhD' ? 'AUD $49,000/year' : 'AUD $49,000/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Sydney Harbor Location', 'Historic Campus', 'Strong Alumni Network', 'Medical Excellence'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of New South Wales (UNSW)",
        location: "Sydney, NSW, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $47,760/year' : profileData.programLevel === 'PhD' ? 'AUD $47,760/year' : 'AUD $47,760/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Innovation Focus', 'Industry Connections', 'Modern Facilities'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Monash University",
        location: "Melbourne, VIC, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $45,000/year' : profileData.programLevel === 'PhD' ? 'AUD $45,000/year' : 'AUD $45,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Large Research University', 'International Campuses', 'Medical School', 'Diverse Programs'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // Germany - Mid Tier
    {
        name: "Technical University of Munich (TUM)",
        location: "Munich, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€150/semester' : profileData.programLevel === 'PhD' ? '€150/semester' : '€150/semester',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Top German Tech University', 'Very Low Tuition', 'Strong Industry Links', 'Munich Location'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Heidelberg University",
        location: "Heidelberg, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€171/semester' : profileData.programLevel === 'PhD' ? '€171/semester' : '€171/semester',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Oldest German University', 'Historic City', 'Research Excellence', 'Medical School'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Humboldt University of Berlin",
        location: "Berlin, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€315/semester' : profileData.programLevel === 'PhD' ? '€315/semester' : '€315/semester',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Berlin Location', 'Historic University', 'Strong Humanities', 'Research Focus'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "RWTH Aachen University",
        location: "Aachen, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€331/semester' : profileData.programLevel === 'PhD' ? '€331/semester' : '€331/semester',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Industry Partnerships', 'Research Focus', 'International Programs'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // France - Mid Tier
    {
        name: "Sorbonne University",
        location: "Paris, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€243/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€170/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Historic Paris University', 'Very Low Tuition', 'Strong Humanities', 'Cultural Heritage'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "École Polytechnique",
        location: "Palaiseau, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€12,000/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€380/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Elite Engineering School', 'Paris Proximity', 'Government Connections', 'Research Excellence'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // Netherlands - Mid Tier
    {
        name: "Delft University of Technology",
        location: "Delft, Netherlands",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€18,750/year' : profileData.programLevel === 'PhD' ? '€2,314/year' : '€12,500/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Top Engineering University', 'Innovation Focus', 'English Programs', 'European Access'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Amsterdam",
        location: "Amsterdam, Netherlands",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1-2 years' : profileData.programLevel === 'PhD' ? '4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€16,000/year' : profileData.programLevel === 'PhD' ? '€2,314/year' : '€10,500/year',
        requirements: {
            cgpa: '3.3+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Amsterdam Location', 'Liberal Arts Focus', 'International Environment', 'Research University'],
        minCgpa: 3.3, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // ACCESSIBLE UNIVERSITIES

    // United States - Accessible
    {
        name: "Arizona State University",
        location: "Tempe, AZ, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$31,200/year' : profileData.programLevel === 'PhD' ? '$12,376/year' : '$31,200/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Innovation Focus', 'Online Programs Available', 'Diverse Programs', 'Affordable Tuition'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of South Florida",
        location: "Tampa, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,813/year' : profileData.programLevel === 'PhD' ? '$10,428/year' : '$17,324/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Growing Research University', 'Tampa Location', 'Medical Programs', 'Diverse Student Body'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Central Florida",
        location: "Orlando, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$22,467/year' : profileData.programLevel === 'PhD' ? '$9,168/year' : '$22,467/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Large Student Body', 'Orlando Location', 'Technology Focus', 'Affordable Education'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Florida International University",
        location: "Miami, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$24,726/year' : profileData.programLevel === 'PhD' ? '$9,984/year' : '$18,956/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Miami Location', 'International Focus', 'Growing Research', 'Diverse Programs'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Houston",
        location: "Houston, TX, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,000/year' : profileData.programLevel === 'PhD' ? '$10,000/year' : '$26,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Energy Capital Location', 'Research Growth', 'Business Programs', 'Diverse Student Body'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Wayne State University",
        location: "Detroit, MI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$27,648/year' : profileData.programLevel === 'PhD' ? '$13,824/year' : '$27,648/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Downtown Toronto', 'Applied Learning', 'Industry Connections', 'Innovation Focus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Manitoba",
        location: "Winnipeg, MB, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $14,000/year' : profileData.programLevel === 'PhD' ? 'CAD $4,500/year' : 'CAD $19,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Research Intensive', 'Agricultural Programs', 'Medical School', 'Affordable Tuition'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Saskatchewan",
        location: "Saskatoon, SK, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $12,000/year' : profileData.programLevel === 'PhD' ? 'CAD $4,000/year' : 'CAD $22,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Agricultural Excellence', 'Veterinary School', 'Research Focus', 'Prairie Location'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // United Kingdom - Accessible
    {
        name: "University of Leeds",
        location: "Leeds, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£22,500/year' : profileData.programLevel === 'PhD' ? '£19,500/year' : '£24,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Strong Business School', 'Research University', 'Student City', 'Industry Links'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Sheffield",
        location: "Sheffield, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£21,400/year' : profileData.programLevel === 'PhD' ? '£18,900/year' : '£22,680/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Engineering Excellence', 'Green Campus', 'Student Experience', 'Research Focus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Glasgow",
        location: "Glasgow, Scotland, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '£22,140/year' : profileData.programLevel === 'PhD' ? '£19,350/year' : '£23,520/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Historic University', 'Scotland Location', 'Strong Medicine', 'Cultural Heritage'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Liverpool",
        location: "Liverpool, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£21,600/year' : profileData.programLevel === 'PhD' ? '£18,800/year' : '£22,350/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Maritime Heritage', 'Medical School', 'Beatles Connection', 'Research Focus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Nottingham",
        location: "Nottingham, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£20,500/year' : profileData.programLevel === 'PhD' ? '£18,000/year' : '£21,500/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Beautiful Campus', 'International Campuses', 'Strong Business School', 'Research Excellence'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Australia - Accessible
    {
        name: "University of Queensland",
        location: "Brisbane, QLD, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $42,000/year' : profileData.programLevel === 'PhD' ? 'AUD $42,000/year' : 'AUD $42,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Group of Eight Member', 'Brisbane Location', 'Strong Research', 'Medical Programs'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Western Australia",
        location: "Perth, WA, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $41,000/year' : profileData.programLevel === 'PhD' ? 'AUD $41,000/year' : 'AUD $41,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Beautiful Campus', 'Mining Engineering', 'Research Focus', 'Perth Location'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Adelaide",
        location: "Adelaide, SA, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $40,500/year' : profileData.programLevel === 'PhD' ? 'AUD $40,500/year' : 'AUD $40,500/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Wine Research', 'Medical School', 'Historic Campus', 'Research Excellence'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Macquarie University",
        location: "Sydney, NSW, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $38,000/year' : profileData.programLevel === 'PhD' ? 'AUD $38,000/year' : 'AUD $38,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Innovation Focus', 'Modern Campus', 'Business Programs', 'Sydney Location'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Queensland University of Technology",
        location: "Brisbane, QLD, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $36,000/year' : profileData.programLevel === 'PhD' ? 'AUD $36,000/year' : 'AUD $36,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Technology Focus', 'Industry Connections', 'Modern Facilities', 'Applied Learning'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Germany - Accessible
    {
        name: "University of Stuttgart",
        location: "Stuttgart, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€334/semester' : profileData.programLevel === 'PhD' ? '€334/semester' : '€334/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Engineering Focus', 'Automotive Industry', 'Low Tuition', 'Research Excellence'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Hamburg",
        location: "Hamburg, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€350/semester' : profileData.programLevel === 'PhD' ? '€350/semester' : '€350/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Port City', 'Large University', 'Diverse Programs', 'Maritime Focus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Cologne",
        location: "Cologne, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€287/semester' : profileData.programLevel === 'PhD' ? '€287/semester' : '€287/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Historic City', 'Business Programs', 'Cultural Heritage', 'Central Location'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Technical University of Berlin",
        location: "Berlin, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€315/semester' : profileData.programLevel === 'PhD' ? '€315/semester' : '€315/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Capital City', 'Technology Focus', 'Innovation Hub', 'International Environment'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Frankfurt",
        location: "Frankfurt, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€370/semester' : profileData.programLevel === 'PhD' ? '€370/semester' : '€370/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Financial Hub', 'Business Focus', 'International City', 'Banking Connections'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // ADDITIONAL TOP TIER UNIVERSITIES

    // United States - Additional Top Tier
    {
        name: "Johns Hopkins University",
        location: "Baltimore, MD, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$60,480/year' : profileData.programLevel === 'PhD' ? '$60,480/year' : '$60,480/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Medical Excellence', 'Research Powerhouse', 'Baltimore Location', 'International Studies'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Brown University",
        location: "Providence, RI, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$62,680/year' : profileData.programLevel === 'PhD' ? '$62,680/year' : '$62,680/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Open Curriculum', 'Ivy League', 'Liberal Arts Excellence', 'Innovation Focus'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Dartmouth College",
        location: "Hanover, NH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$61,605/year' : profileData.programLevel === 'PhD' ? '$61,605/year' : '$61,605/year',
        requirements: {
            cgpa: '3.8+',
            gre: profileData.greRequired === 'yes' ? '325+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Outdoor Recreation', 'Strong Alumni Network', 'Liberal Arts Focus', 'Quarter System'],
        minCgpa: 3.8, minGre: profileData.greRequired === 'yes' ? 325 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Washington University in St. Louis",
        location: "St. Louis, MO, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$60,590/year' : profileData.programLevel === 'PhD' ? '$60,590/year' : '$60,590/year',
        requirements: {
            cgpa: '3.7+',
            gre: profileData.greRequired === 'yes' ? '320+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Medical School Excellence', 'Research Focus', 'Beautiful Campus', 'Strong Endowment'],
        minCgpa: 3.7, minGre: profileData.greRequired === 'yes' ? 320 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "Emory University",
        location: "Atlanta, GA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$57,948/year' : profileData.programLevel === 'PhD' ? '$57,948/year' : '$57,948/year',
        requirements: {
            cgpa: '3.6+',
            gre: profileData.greRequired === 'yes' ? '318+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Medical Excellence', 'Atlanta Location', 'Liberal Arts Focus', 'CDC Connections'],
        minCgpa: 3.6, minGre: profileData.greRequired === 'yes' ? 318 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },

    // ADDITIONAL MID-TIER UNIVERSITIES

    // United States - Additional Mid Tier
    {
        name: "Boston University",
        location: "Boston, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,816/year' : profileData.programLevel === 'PhD' ? '$59,816/year' : '$59,816/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Boston Location', 'Communications Excellence', 'Urban Campus', 'Research University'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Northeastern University",
        location: "Boston, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,100/year' : profileData.programLevel === 'PhD' ? '$59,100/year' : '$59,100/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Co-op Program', 'Industry Connections', 'Urban Campus', 'Technology Focus'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Case Western Reserve University",
        location: "Cleveland, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$54,020/year' : profileData.programLevel === 'PhD' ? '$54,020/year' : '$54,020/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Medical School', 'Engineering Excellence', 'Research Focus', 'Small Class Sizes'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Rochester",
        location: "Rochester, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$59,344/year' : profileData.programLevel === 'PhD' ? '$59,344/year' : '$59,344/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Medical School', 'Optics Excellence', 'Music School', 'Research Focus'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Tufts University",
        location: "Medford, MA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$63,804/year' : profileData.programLevel === 'PhD' ? '$63,804/year' : '$63,804/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['International Relations', 'Medical School', 'Liberal Arts Focus', 'Boston Proximity'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Wake Forest University",
        location: "Winston-Salem, NC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$60,834/year' : profileData.programLevel === 'PhD' ? '$60,834/year' : '$60,834/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Small Class Sizes', 'Liberal Arts Focus', 'Medical School', 'Beautiful Campus'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Miami",
        location: "Coral Gables, FL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$56,334/year' : profileData.programLevel === 'PhD' ? '$56,334/year' : '$56,334/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Miami Location', 'Medical School', 'Business Programs', 'Marine Science'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "New York University",
        location: "New York, NY, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$60,438/year' : profileData.programLevel === 'PhD' ? '$60,438/year' : '$60,438/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['NYC Location', 'Arts Excellence', 'Business School', 'Global Campuses'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Georgia Institute of Technology",
        location: "Atlanta, GA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,140/year' : profileData.programLevel === 'PhD' ? '$14,570/year' : '$33,964/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Technology Focus', 'Atlanta Location', 'Co-op Program'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of North Carolina at Chapel Hill",
        location: "Chapel Hill, NC, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$26,394/year' : profileData.programLevel === 'PhD' ? '$12,197/year' : '$36,159/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Public Ivy', 'Medical School', 'Journalism Excellence', 'College Town'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // MORE ACCESSIBLE UNIVERSITIES

    // United States - More Accessible
    {
        name: "University of Kansas",
        location: "Lawrence, KS, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$27,158/year' : profileData.programLevel === 'PhD' ? '$12,000/year' : '$27,158/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Research University', 'Medical School', 'College Town', 'Strong Athletics'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Missouri",
        location: "Columbia, MO, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$24,814/year' : profileData.programLevel === 'PhD' ? '$11,000/year' : '$24,814/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Journalism School', 'Research Focus', 'Medical School', 'College Town'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Oklahoma",
        location: "Norman, OK, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,538/year' : profileData.programLevel === 'PhD' ? '$11,500/year' : '$25,538/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Strong Athletics', 'Energy Research', 'Weather Center', 'Affordable Education'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Arkansas",
        location: "Fayetteville, AR, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$22,504/year' : profileData.programLevel === 'PhD' ? '$10,000/year' : '$22,504/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Business School', 'Agriculture Focus', 'Beautiful Campus', 'Low Cost of Living'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Mississippi",
        location: "Oxford, MS, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,100/year' : profileData.programLevel === 'PhD' ? '$11,000/year' : '$25,100/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Southern Charm', 'Liberal Arts Focus', 'Historic Campus', 'Literary Heritage'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // CHINA - Additional Universities
    {
        name: "Fudan University",
        location: "Shanghai, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥33,000/year' : profileData.programLevel === 'PhD' ? '¥33,000/year' : '¥33,000/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Shanghai Location', 'Business Excellence', 'International Programs', 'Research Focus'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Shanghai Jiao Tong University",
        location: "Shanghai, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥35,000/year' : profileData.programLevel === 'PhD' ? '¥35,000/year' : '¥35,000/year',
        requirements: {
            cgpa: '3.5+',
            gre: profileData.greRequired === 'yes' ? '315+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Shanghai Location', 'International Recognition', 'Research Focus'],
        minCgpa: 3.5, minGre: profileData.greRequired === 'yes' ? 315 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Zhejiang University",
        location: "Hangzhou, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥30,000/year' : profileData.programLevel === 'PhD' ? '¥30,000/year' : '¥30,000/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Comprehensive University', 'Beautiful Campus', 'Research Excellence', 'Growing Reputation'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Science and Technology of China",
        location: "Hefei, China",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2-3 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '¥30,000/year' : profileData.programLevel === 'PhD' ? '¥30,000/year' : '¥30,000/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Science & Technology Focus', 'Research Excellence', 'Elite Institution', 'Graduate Focus'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // FRANCE - Additional Universities
    {
        name: "Sciences Po",
        location: "Paris, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€13,900/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€380/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Political Science Excellence', 'Elite Institution', 'International Focus', 'Government Connections'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "École Normale Supérieure",
        location: "Paris, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€243/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€170/year',
        requirements: {
            cgpa: '3.6+',
            gre: profileData.greRequired === 'yes' ? '318+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'high') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'high') : null
        },
        highlights: ['Elite Institution', 'Academic Excellence', 'Research Focus', 'Intellectual Heritage'],
        minCgpa: 3.6, minGre: profileData.greRequired === 'yes' ? 318 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'high'), category: 'top'
    },
    {
        name: "University of Lyon",
        location: "Lyon, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€243/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€170/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Lyon Location', 'Medical Programs', 'Research Focus', 'Cultural Heritage'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Toulouse",
        location: "Toulouse, France",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€243/year' : profileData.programLevel === 'PhD' ? '€380/year' : '€170/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Aerospace Industry', 'Engineering Focus', 'Research Excellence', 'Southern France'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // NETHERLANDS - Additional Universities
    {
        name: "Erasmus University Rotterdam",
        location: "Rotterdam, Netherlands",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1-2 years' : profileData.programLevel === 'PhD' ? '4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€16,500/year' : profileData.programLevel === 'PhD' ? '€2,314/year' : '€11,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Business Excellence', 'Rotterdam Location', 'International Focus', 'Research University'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Utrecht University",
        location: "Utrecht, Netherlands",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1-2 years' : profileData.programLevel === 'PhD' ? '4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€15,500/year' : profileData.programLevel === 'PhD' ? '€2,314/year' : '€10,500/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Research Excellence', 'Central Location', 'Multidisciplinary', 'International Environment'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Leiden University",
        location: "Leiden, Netherlands",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1-2 years' : profileData.programLevel === 'PhD' ? '4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€15,000/year' : profileData.programLevel === 'PhD' ? '€2,314/year' : '€10,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Oldest Dutch University', 'Historic City', 'Law Excellence', 'Research Focus'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "Wageningen University",
        location: "Wageningen, Netherlands",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€16,000/year' : profileData.programLevel === 'PhD' ? '€2,314/year' : '€11,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Agricultural Excellence', 'Environmental Focus', 'Research University', 'Sustainability Focus'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },

    // ADDITIONAL UNIVERSITIES TO REACH 300+
    // Additional US Universities
    {
        name: "University of Connecticut",
        location: "Storrs, CT, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$37,698/year' : profileData.programLevel === 'PhD' ? '$18,849/year' : '$39,858/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Research University', 'Strong Athletics', 'Medical School', 'Engineering Programs'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Delaware",
        location: "Newark, DE, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$34,310/year' : profileData.programLevel === 'PhD' ? '$17,155/year' : '$36,880/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Chemical Engineering', 'Research Focus', 'Small State Charm', 'Historic Campus'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Virginia Tech",
        location: "Blacksburg, VA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$31,014/year' : profileData.programLevel === 'PhD' ? '$15,507/year' : '$33,654/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Engineering Excellence', 'Beautiful Campus', 'Strong Athletics', 'Research Focus'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Vermont",
        location: "Burlington, VT, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$41,280/year' : profileData.programLevel === 'PhD' ? '$20,640/year' : '$43,890/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Medical School', 'Environmental Focus', 'Beautiful Setting', 'Small Class Sizes'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Temple University",
        location: "Philadelphia, PA, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$29,066/year' : profileData.programLevel === 'PhD' ? '$14,533/year' : '$31,506/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Urban Campus', 'Diverse Programs', 'Medical School', 'Philadelphia Location'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional UK Universities
    {
        name: "University of Bristol",
        location: "Bristol, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£24,700/year' : profileData.programLevel === 'PhD' ? '£21,400/year' : '£25,200/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Red Brick University', 'Research Excellence', 'Historic City', 'Strong Engineering'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of York",
        location: "York, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£21,900/year' : profileData.programLevel === 'PhD' ? '£19,300/year' : '£22,650/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Historic City', 'Campus University', 'Research Focus', 'Computer Science Excellence'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Southampton",
        location: "Southampton, England, UK",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '1 year' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '£22,760/year' : profileData.programLevel === 'PhD' ? '£19,850/year' : '£23,400/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Maritime Heritage', 'Engineering Excellence', 'Research Focus', 'South Coast Location'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional Canadian Universities
    {
        name: "Simon Fraser University",
        location: "Burnaby, BC, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $18,000/year' : profileData.programLevel === 'PhD' ? 'CAD $6,000/year' : 'CAD $30,000/year',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Mountain Campus', 'Co-op Programs', 'Innovation Focus', 'Vancouver Proximity'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Carleton University",
        location: "Ottawa, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $17,000/year' : profileData.programLevel === 'PhD' ? 'CAD $5,500/year' : 'CAD $28,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Capital City', 'Engineering Focus', 'Public Affairs', 'Government Connections'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "York University",
        location: "Toronto, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $19,000/year' : profileData.programLevel === 'PhD' ? 'CAD $6,200/year' : 'CAD $32,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Large University', 'Diverse Programs', 'Business School', 'Arts Focus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional Australian Universities
    {
        name: "University of Technology Sydney",
        location: "Sydney, NSW, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $37,000/year' : profileData.programLevel === 'PhD' ? 'AUD $37,000/year' : 'AUD $37,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Technology Focus', 'Industry Connections', 'Modern Campus', 'Innovation Hub'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Curtin University",
        location: "Perth, WA, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $35,000/year' : profileData.programLevel === 'PhD' ? 'AUD $35,000/year' : 'AUD $35,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Mining Excellence', 'Business Programs', 'International Focus', 'Applied Learning'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Griffith University",
        location: "Brisbane, QLD, Australia",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-4 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'AUD $34,000/year' : profileData.programLevel === 'PhD' ? 'AUD $34,000/year' : 'AUD $34,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Gold Coast Campus', 'Environmental Focus', 'Music Programs', 'Modern Facilities'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional German Universities
    {
        name: "University of Göttingen",
        location: "Göttingen, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€367/semester' : profileData.programLevel === 'PhD' ? '€367/semester' : '€367/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Historic University', 'Research Excellence', 'Nobel Prize Winners', 'Academic Heritage'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Bonn",
        location: "Bonn, Germany",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? '€334/semester' : profileData.programLevel === 'PhD' ? '€334/semester' : '€334/semester',
        requirements: {
            cgpa: '3.0+',
            gre: profileData.greRequired === 'yes' ? '300+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Former Capital', 'Research University', 'Strong Sciences', 'Political Heritage'],
        minCgpa: 3.0, minGre: profileData.greRequired === 'yes' ? 300 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Additional Swiss Universities
    {
        name: "University of Zurich",
        location: "Zurich, Switzerland",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'CHF 1,298/year' : profileData.programLevel === 'PhD' ? 'CHF 1,298/year' : 'CHF 1,298/year',
        requirements: {
            cgpa: '3.4+',
            gre: profileData.greRequired === 'yes' ? '310+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['Largest Swiss University', 'Research Excellence', 'Medical School', 'International Environment'],
        minCgpa: 3.4, minGre: profileData.greRequired === 'yes' ? 310 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Geneva",
        location: "Geneva, Switzerland",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'CHF 1,000/year' : profileData.programLevel === 'PhD' ? 'CHF 1,000/year' : 'CHF 1,000/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'medium') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'medium') : null
        },
        highlights: ['International City', 'UN Connections', 'Multilingual Environment', 'Liberal Arts Focus'],
        minCgpa: 3.2, minGre: profileData.greRequired === 'yes' ? 305 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'), category: 'mid'
    },
    {
        name: "University of Basel",
        location: "Basel, Switzerland",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '3-5 years' : '3 years',
        tuition: profileData.programLevel === 'Masters' ? 'CHF 1,700/year' : profileData.programLevel === 'PhD' ? 'CHF 1,700/year' : 'CHF 1,700/year',
        requirements: {
            cgpa: '3.2+',
            gre: profileData.greRequired === 'yes' ? '305+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Urban University', 'Medical School', 'Research Focus', 'Affordable Education'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "New Mexico State University",
        location: "Las Cruces, NM, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$23,818/year' : profileData.programLevel === 'PhD' ? '$8,976/year' : '$23,818/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Agricultural Focus', 'Research University', 'Hispanic-Serving Institution', 'Affordable Tuition'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Nevada, Las Vegas",
        location: "Las Vegas, NV, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$24,431/year' : profileData.programLevel === 'PhD' ? '$11,000/year' : '$24,431/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Las Vegas Location', 'Hospitality Programs', 'Growing Research', 'Entertainment Industry Links'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Alabama at Birmingham",
        location: "Birmingham, AL, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$25,068/year' : profileData.programLevel === 'PhD' ? '$10,780/year' : '$25,068/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Medical Center', 'Research Focus', 'Healthcare Programs', 'Urban Campus'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Kent State University",
        location: "Kent, OH, USA",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? '$20,424/year' : profileData.programLevel === 'PhD' ? '$10,212/year' : '$20,424/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Historic Campus', 'Fashion School', 'Journalism Programs', 'Affordable Education'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },

    // Canada - Accessible
    {
        name: "Concordia University",
        location: "Montreal, QC, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $16,815/year' : profileData.programLevel === 'PhD' ? 'CAD $4,000/year' : 'CAD $27,822/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Montreal Location', 'Creative Programs', 'Modern Facilities', 'Diverse Student Body'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of Windsor",
        location: "Windsor, ON, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $12,500/year' : profileData.programLevel === 'PhD' ? 'CAD $5,000/year' : 'CAD $25,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Border City Location', 'Engineering Focus', 'Affordable Education', 'Small Class Sizes'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "Memorial University of Newfoundland",
        location: "St. John's, NL, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $11,460/year' : profileData.programLevel === 'PhD' ? 'CAD $4,000/year' : 'CAD $11,460/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Very Low Tuition', 'Ocean Research', 'Small Community', 'Natural Beauty'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    },
    {
        name: "University of New Brunswick",
        location: "Fredericton, NB, Canada",
        program: `${profileData.programLevel} in ${profileData.course}`,
        duration: profileData.programLevel === 'Masters' ? '2 years' : profileData.programLevel === 'PhD' ? '4-6 years' : '4 years',
        tuition: profileData.programLevel === 'Masters' ? 'CAD $13,500/year' : profileData.programLevel === 'PhD' ? 'CAD $4,500/year' : 'CAD $16,000/year',
        requirements: {
            cgpa: '2.8+',
            gre: profileData.greRequired === 'yes' ? '295+' : null,
            english: profileData.englishRequired === 'yes' ? getEnglishRequirement(profileData.englishTest, 'low') : null,
            standardized: profileData.standardizedTestRequired === 'yes' ? getStandardizedRequirement(profileData.standardizedTest, 'low') : null
        },
        highlights: ['Historic University', 'Engineering Programs', 'Small City Feel', 'Affordable Living'],
        minCgpa: 2.8, minGre: profileData.greRequired === 'yes' ? 295 : 0, minEnglish: getMinEnglishScore(profileData.englishTest, 'low'), category: 'accessible'
    }
        ];

        // Filter universities based on user qualifications
        const qualifiedUniversities = universities.filter(uni => {
            const userCgpa = parseFloat(profileData.cgpa);
            const userGre = profileData.greScore ? parseInt(profileData.greScore) : 400; // Default high score if no GRE
            const userEnglish = profileData.englishScore ? parseFloat(profileData.englishScore) : getMaxEnglishScore(profileData.englishTest);

            return userCgpa >= uni.minCgpa && 
                   userGre >= uni.minGre && 
                   userEnglish >= uni.minEnglish;
        });

        // Calculate match scores and sort
        return qualifiedUniversities.map(uni => {
            const cgpaScore = Math.min(100, (parseFloat(profileData.cgpa) / uni.minCgpa) * 30);
            const greScore = profileData.greRequired === 'yes' ? 
                Math.min(100, (parseInt(profileData.greScore) / uni.minGre) * 40) : 40;
            const englishScore = profileData.englishRequired === 'yes' ? 
                Math.min(100, (parseFloat(profileData.englishScore) / uni.minEnglish) * 30) : 30;
            
            const matchScore = Math.round(cgpaScore + greScore + englishScore);
            
            return {
                ...uni,
                matchScore: Math.min(99, Math.max(75, matchScore))
            };
        }).sort((a, b) => b.matchScore - a.matchScore);
    }

    // Helper functions for test requirements
    function getEnglishRequirement(testType, level) {
        if (!testType) return null;
        
        const requirements = {
            'IELTS': { high: '7.5+', medium: '6.5+', low: '6.0+' },
            'TOEFL': { high: '110+', medium: '90+', low: '80+' },
            'Duolingo': { high: '130+', medium: '115+', low: '105+' },
            'PTE': { high: '73+', medium: '65+', low: '58+' },
            'Cambridge': { high: '191+', medium: '176+', low: '169+' },
            'CELPIP': { high: '9+', medium: '7+', low: '6+' }
        };
        
        return `${testType}: ${requirements[testType][level]}`;
    }

    function getMinEnglishScore(testType, level) {
        if (!testType) return 0;
        
        const scores = {
            'IELTS': { high: 7.5, medium: 6.5, low: 6.0 },
            'TOEFL': { high: 110, medium: 90, low: 80 },
            'Duolingo': { high: 130, medium: 115, low: 105 },
            'PTE': { high: 73, medium: 65, low: 58 },
            'Cambridge': { high: 191, medium: 176, low: 169 },
            'CELPIP': { high: 9, medium: 7, low: 6 }
        };
        
        return scores[testType][level] || 0;
    }

    function getMaxEnglishScore(testType) {
        if (!testType) return 0;
        
        const maxScores = {
            'IELTS': 9.0,
            'TOEFL': 120,
            'Duolingo': 160,
            'PTE': 90,
            'Cambridge': 230,
            'CELPIP': 12
        };
        
        return maxScores[testType] || 0;
    }

    function getStandardizedRequirement(testType, level) {
        if (!testType) return null;
        
        const requirements = {
            'SAT': { high: '1500+', medium: '1350+', low: '1200+' },
            'ACT': { high: '33+', medium: '28+', low: '24+' },
            'GMAT': { high: '700+', medium: '650+', low: '600+' },
            'LSAT': { high: '170+', medium: '160+', low: '155+' },
            'MCAT': { high: '515+', medium: '505+', low: '500+' }
        };
        
        return `${testType}: ${requirements[testType][level]}`;
    }

    // Show no results message
    function showNoResultsMessage(profileData) {
        const suggestions = [];
        
        if (parseFloat(profileData.cgpa) < 3.0) {
            suggestions.push('Consider improving your CGPA through additional coursework or retaking courses');
        }
        if (profileData.greRequired === 'yes' && parseInt(profileData.greScore) < 300) {
            suggestions.push('Retake the GRE to improve your score (aim for 300+ for better options)');
        }
        if (profileData.englishRequired === 'yes' && profileData.englishScore) {
            const score = parseFloat(profileData.englishScore);
            if (profileData.englishTest === 'IELTS' && score < 6.0) {
                suggestions.push('Improve your IELTS score to at least 6.0 for more university options');
            } else if (profileData.englishTest === 'TOEFL' && score < 80) {
                suggestions.push('Improve your TOEFL score to at least 80 for more university options');
            } else if (profileData.englishTest === 'Duolingo' && score < 105) {
                suggestions.push('Improve your Duolingo score to at least 105 for more university options');
            }
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
            // Store the university name in session storage for this session
            sessionStorage.setItem('selectedUniversity', universityName);
            
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
            sessionStorage.setItem('inquiryUniversity', universityName);
            
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
            } else if (testType === 'Duolingo') {
                isValid = value >= 10 && value <= 160;
            } else if (testType === 'PTE') {
                isValid = value >= 10 && value <= 90;
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