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
            // Top Tier Universities
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
                highlights: [
                    'Top 1 in Engineering',
                    'Excellent Research Facilities',
                    'Strong Industry Connections',
                    '95% Employment Rate'
                ],
                minCgpa: 3.8,
                minGre: profileData.greRequired === 'yes' ? 325 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'high'),
                category: 'top'
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
                highlights: [
                    'Silicon Valley Location',
                    'Top Innovation Hub',
                    'Excellent Alumni Network',
                    'World-Class Faculty'
                ],
                minCgpa: 3.8,
                minGre: profileData.greRequired === 'yes' ? 325 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'high'),
                category: 'top'
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
                highlights: [
                    'Ivy League Prestige',
                    'World-Renowned Faculty',
                    'Extensive Resources',
                    'Global Recognition'
                ],
                minCgpa: 3.9,
                minGre: profileData.greRequired === 'yes' ? 330 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'high'),
                category: 'top'
            },
            // Mid-Tier Universities
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
                highlights: [
                    'Public Ivy Status',
                    'Strong Research Programs',
                    'Diverse Student Body',
                    'California Location'
                ],
                minCgpa: 3.5,
                minGre: profileData.greRequired === 'yes' ? 315 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'),
                category: 'mid'
            },
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
                highlights: [
                    'Top Canadian University',
                    'Multicultural Environment',
                    'Strong Research Focus',
                    'Post-Study Work Options'
                ],
                minCgpa: 3.3,
                minGre: profileData.greRequired === 'yes' ? 310 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'medium'),
                category: 'mid'
            },
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
                highlights: [
                    'Innovation Focus',
                    'Online Programs Available',
                    'Diverse Programs',
                    'Affordable Tuition'
                ],
                minCgpa: 3.0,
                minGre: profileData.greRequired === 'yes' ? 300 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'low'),
                category: 'accessible'
            },
            // More universities for Accounting and other fields
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
                highlights: [
                    'Top Business School',
                    'Wall Street Connections',
                    'Ivy League Status',
                    'Excellent ROI'
                ],
                minCgpa: 3.7,
                minGre: profileData.greRequired === 'yes' ? 320 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'high'),
                category: 'top'
            },
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
                highlights: [
                    'Montreal Location',
                    'Creative Programs',
                    'Modern Facilities',
                    'Diverse Student Body'
                ],
                minCgpa: 2.8,
                minGre: profileData.greRequired === 'yes' ? 295 : 0,
                minEnglish: getMinEnglishScore(profileData.englishTest, 'low'),
                category: 'accessible'
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