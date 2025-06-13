// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBLAHgSs8caqBdjbuNqUFs21vb24NO28_U",
    authDomain: "edusetgo-c895f.firebaseapp.com",
    projectId: "edusetgo-c895f",
    storageBucket: "edusetgo-c895f.firebasestorage.app",
    messagingSenderId: "356614273448",
    appId: "1:356614273448:web:ab2de825d2c810cbc9459d",
    measurementId: "G-N5JFFCJ1L2"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

// Global variable to store applications for both progress and UI
let userApplications = [];

// Process payment
function processPayment(method) {
    // Show loading state
    const button = document.querySelector(`#${method}CardForm .btn-pay`);
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate payment processing
    setTimeout(() => {
        // Hide all forms
        document.querySelectorAll('.payment-form').forEach(form => {
            form.classList.remove('active');
        });
        
        // Show success message
        document.getElementById('paymentSuccess').style.display = 'block';
        
        // Update user payment status in Firestore
        const user = firebase.auth().currentUser;
        if (user) {
            firebase.firestore().collection('users').doc(user.uid).update({
                paymentStatus: 'paid',
                paymentMethod: method,
                paymentDate: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(error => {
                console.error("Error updating payment status:", error);
            });
        }
    }, 2000);
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Setup navigation
    setupNavigation();
    
    // Add direct event listener for payment link
    const paymentLink = document.querySelector('.side-nav a[href="#payment"]');
    if (paymentLink) {
        paymentLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections
            document.querySelectorAll('main.content > section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show payment section
            document.getElementById('payment').classList.add('active');
            
            // Update URL hash
            window.location.hash = '#payment';
            
            // Update active nav link
            document.querySelectorAll('.side-nav li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    }
    
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Add page visibility change detection
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // Re-check authentication when page becomes visible (like when returning with back button)
            const isStillLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
            
            if (!isStillLoggedIn) {
                window.location.href = 'auth.html';
            }
        }
    });
    
    // Check authentication with Firebase
    auth.onAuthStateChanged(function(user) {
        if (user) {
            loadUserData(user);
        } else {
            // Clear session storage and redirect
            sessionStorage.clear();
            window.location.href = 'auth.html';
        }
    });
    
    // Setup navigation
    setupNavigation();
    
    // Setup logout
    setupLogout();
    
    // Setup profile update
    setupProfileUpdate();
    
    // Setup modal close functionality
    setupModalClose();
    
    // Handle browser back button
    window.addEventListener('popstate', function(event) {
        // Check if user is still logged in
        const isStillLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
        if (!isStillLoggedIn) {
            window.location.href = 'auth.html';
        }
    });
    
    // Add our fix
    fixNavigationHoverIssue();
});

// Load user data
function loadUserData(user) {
    const userId = user.uid;
    
    // Update UI with user info
    updateUserInfo(user);
    
    // Get user document
    db.collection('users').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                
                // Update profile form
                updateProfileForm(userData);
                
                // Check if profile is incomplete
                const isProfileIncomplete = !userData.phone || !userData.educationLevel || !userData.studyDestination;
                
                if (isProfileIncomplete) {
                    // Show profile completion notification
                    showProfileCompletionNotification();
                    
                    // Force navigate to profile section
                    window.location.hash = '#profile';
                    
                    // Hide other sections until profile is complete
                    document.querySelectorAll('main.content > section:not(#profile)').forEach(section => {
                        section.classList.remove('active');
                    });
                    document.getElementById('profile').classList.add('active');
                    
                    // Disable navigation to other sections
                    disableNavigationUntilProfileComplete();
                } else if (window.location.hash === '' || window.location.hash === '#profile') {
                    // If profile is complete and no specific hash or on profile, go to dashboard
                    window.location.hash = '#dashboard';
                }
                
                // Load applications and calculate progress together
                loadApplicationsAndProgress(userId);
                
            } else {
                // Create new user document if it doesn't exist
                return db.collection('users').doc(userId).set({
                    name: user.displayName || 'Student',
                    email: user.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    progressStage: 'preparation',
                    isAdmin: false
                }).then(() => {
                    // Show profile completion notification
                    showProfileCompletionNotification();
                    
                    // Force navigate to profile section
                    window.location.hash = '#profile';
                    
                    // Hide other sections until profile is complete
                    document.querySelectorAll('main.content > section:not(#profile)').forEach(section => {
                        section.classList.remove('active');
                    });
                    document.getElementById('profile').classList.add('active');
                    
                    // Disable navigation to other sections
                    disableNavigationUntilProfileComplete();
                    
                    loadApplicationsAndProgress(userId);
                });
            }
        })
        .catch((error) => {
            showToast("Error loading profile data", "error");
            console.error("Error loading profile data:", error);
        });
}

// Combined function to load applications and calculate progress
function loadApplicationsAndProgress(userId) {
    const recentApplicationsList = document.getElementById('recentApplicationsList');
    const applicationsContainer = document.getElementById('applicationsContainer');
    
    // Show loading indicators
    if (recentApplicationsList) {
        recentApplicationsList.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading applications...</div>';
    }
    
    if (applicationsContainer) {
        applicationsContainer.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading applications...</div>';
    }
    
    // Query applications where userId matches
    db.collection('applications')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
            userApplications = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                userApplications.push({
                    id: doc.id,
                    ...data
                });
            });
            
            // Update UI with applications
            updateApplicationsUI();
            
            // Calculate and update progress
            calculateAndUpdateProgress(userApplications, userId);
            
        })
        .catch((error) => {
            if (error.code === 'permission-denied') {
                tryAlternativeQueries(userId);
            } else {
                showErrorState(error, recentApplicationsList, applicationsContainer, userId);
            }
        });
}

function tryAlternativeQueries(userId) {
    const user = auth.currentUser;
    const userEmail = user.email;
    
    db.collection('applications')
        .where('email', '==', userEmail)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                userApplications = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    userApplications.push({
                        id: doc.id,
                        ...data
                    });
                });
                
                updateApplicationsUI();
                calculateAndUpdateProgress(userApplications, userId);
            } else {
                return db.collection('applications')
                    .where('userEmail', '==', userEmail)
                    .get();
            }
        })
        .then((querySnapshot) => {
            if (querySnapshot && querySnapshot.size > 0) {
                userApplications = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    userApplications.push({
                        id: doc.id,
                        ...data
                    });
                });
                
                updateApplicationsUI();
                calculateAndUpdateProgress(userApplications, userId);
            } else {
                showEmptyApplicationsState();
            }
        })
        .catch((error) => {
            showEmptyApplicationsState();
        });
}

function updateApplicationsUI() {
    // Update counters
    const totalCount = userApplications.length;
    const approvedCount = userApplications.filter(app => app.status === 'approved').length;
    const pendingCount = userApplications.filter(app => app.status === 'pending' || app.status === 'in progress').length;
    
    updateApplicationCounters(totalCount, approvedCount, pendingCount);
    
    // Render applications
    const recentApplicationsList = document.getElementById('recentApplicationsList');
    const applicationsContainer = document.getElementById('applicationsContainer');
    
    if (userApplications.length > 0) {
        renderApplications(userApplications, recentApplicationsList, true);
        renderApplications(userApplications, applicationsContainer, false);
    } else {
        showEmptyApplicationsState();
    }
}

function showEmptyApplicationsState() {
    const emptyState = `
        <div class="empty-state">
            <i class="fas fa-file-alt"></i>
            <p>No applications found</p>
            <p class="text-muted">Your university applications will appear here once added by your consultant.</p>
        </div>
    `;
    
    const recentApplicationsList = document.getElementById('recentApplicationsList');
    const applicationsContainer = document.getElementById('applicationsContainer');
    
    if (recentApplicationsList) recentApplicationsList.innerHTML = emptyState;
    if (applicationsContainer) applicationsContainer.innerHTML = emptyState;
    
    updateApplicationCounters(0, 0, 0);
}

function calculateAndUpdateProgress(applications, userId) {
    let progressPercentage = 0;
    let currentStage = 'preparation';
    
    if (applications.length > 0) {
        currentStage = 'applications';
        progressPercentage = 25;
        
        applications.forEach(app => {
            if (app.status === 'approved' || app.status === 'waitlisted') {
                currentStage = 'offers';
                progressPercentage = Math.max(progressPercentage, 50);
            }
            
            if (app.progress === 'visa' || app.progress === 'visa processing') {
                currentStage = 'visa';
                progressPercentage = Math.max(progressPercentage, 75);
            }
            
            if (app.progress === 'completed' || app.status === 'enrolled') {
                currentStage = 'departure';
                progressPercentage = 100;
            }
        });
    }
    
    updateProgressTimeline(progressPercentage, currentStage);
    
    // Update user document with progress stage
    db.collection('users').doc(userId).update({
        progressStage: currentStage,
        progressPercentage: progressPercentage
    }).catch(error => {
        // Silent error handling
    });
}

function updateUserInfo(user) {
    const userNameElements = document.querySelectorAll('#userName, #profileName');
    const userEmailElements = document.querySelectorAll('#userEmail, #profileEmail');
    
    userNameElements.forEach(element => {
        if (element) element.textContent = user.displayName || 'Student';
    });
    
    userEmailElements.forEach(element => {
        if (element) element.textContent = user.email;
    });
}

function updateApplicationCounters(totalCount, approvedCount, pendingCount) {
    const applicationCountElement = document.getElementById('applicationCount');
    const approvedCountElement = document.getElementById('approvedCount');
    const pendingCountElement = document.getElementById('pendingCount');
    
    if (applicationCountElement) applicationCountElement.textContent = totalCount;
    if (approvedCountElement) approvedCountElement.textContent = approvedCount;
    if (pendingCountElement) pendingCountElement.textContent = pendingCount;
}

function updateProgressTimeline(percentage, currentStage) {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const stages = ['preparation', 'applications', 'offers', 'visa', 'departure'];
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = percentage + '% Complete';
    }
    
    const currentStageIndex = stages.indexOf(currentStage);
    
    steps.forEach((stepId, index) => {
        const stepElement = document.getElementById(stepId);
        if (stepElement) {
            stepElement.classList.remove('active', 'completed');
            
            if (index < currentStageIndex) {
                stepElement.classList.add('completed');
            } else if (index === currentStageIndex) {
                stepElement.classList.add('active');
            }
        }
    });
    
    // Update progress tracker section
    updateProgressTrackerSection(percentage, currentStage);
}

function updateProgressTrackerSection(percentage, currentStage) {
    // Update progress circle
    const progressCirclePercentage = document.getElementById('progressCirclePercentage');
    if (progressCirclePercentage) {
        progressCirclePercentage.textContent = percentage + '%';
    }
    
    // Update progress circle visual
    const progressCircle = document.getElementById('progressCircle');
    if (progressCircle) {
        progressCircle.style.background = `conic-gradient(#667eea ${percentage}%, #e1e5e9 0%)`;
    }
    
    // Update current stage label
    const currentStageLabel = document.getElementById('currentStageLabel');
    if (currentStageLabel) {
        // Capitalize first letter
        const formattedStage = currentStage.charAt(0).toUpperCase() + currentStage.slice(1);
        currentStageLabel.textContent = formattedStage;
    }
    
    // Update next step label based on current stage
    const nextStepLabel = document.getElementById('nextStepLabel');
    if (nextStepLabel) {
        let nextStep = '';
        switch(currentStage) {
            case 'preparation':
                nextStep = 'Complete your profile';
                break;
            case 'applications':
                nextStep = 'Wait for university decisions';
                break;
            case 'offers':
                nextStep = 'Apply for visa';
                break;
            case 'visa':
                nextStep = 'Prepare for departure';
                break;
            case 'departure':
                nextStep = 'All steps completed';
                break;
        }
        nextStepLabel.textContent = nextStep;
    }
    
    // Update journey steps in the progress tracker
    updateJourneySteps(currentStage);
}

function updateJourneySteps(currentStage) {
    const stages = ['preparation', 'applications', 'offers', 'visa', 'departure'];
    const currentStageIndex = stages.indexOf(currentStage);
    
    // Update journey steps
    for (let i = 1; i <= 5; i++) {
        const journeyStep = document.getElementById('journeyStep' + i);
        if (journeyStep) {
            // Remove all status classes
            journeyStep.classList.remove('active', 'completed');
            
            // Update status indicator
            const statusIndicator = journeyStep.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.classList.remove('active', 'completed', 'pending');
                statusIndicator.classList.add('pending');
                statusIndicator.textContent = 'Pending';
            }
            
            // Set appropriate class based on current stage
            if (i - 1 < currentStageIndex) {
                journeyStep.classList.add('completed');
                if (statusIndicator) {
                    statusIndicator.classList.remove('pending');
                    statusIndicator.classList.add('completed');
                    statusIndicator.textContent = 'Completed';
                }
            } else if (i - 1 === currentStageIndex) {
                journeyStep.classList.add('active');
                if (statusIndicator) {
                    statusIndicator.classList.remove('pending');
                    statusIndicator.classList.add('active');
                    statusIndicator.textContent = 'In Progress';
                }
            }
        }
    }
}

function renderApplications(applications, container, limitCount) {
    if (!container) return;
    
    container.innerHTML = '';
    const appsToRender = limitCount ? applications.slice(0, 3) : applications;
    
    appsToRender.forEach((app) => {
        const appCard = document.createElement('div');
        appCard.className = 'application-card fade-in';
        appCard.setAttribute('data-id', app.id);
        
        let statusClass = 'pending';
        if (app.status === 'approved') statusClass = 'approved';
        if (app.status === 'rejected') statusClass = 'rejected';
        if (app.status === 'waitlisted') statusClass = 'waitlisted';
        if (app.status === 'in progress') statusClass = 'pending';
        
        let statusText = app.status || 'Pending';
        statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);
        if (statusText === 'In progress') statusText = 'In Progress';
        
        let applicationDate = 'N/A';
        if (app.createdAt) {
            try {
                const date = app.createdAt.toDate ? app.createdAt.toDate() : new Date(app.createdAt);
                applicationDate = date.toLocaleDateString('en-US', {
                    day: 'numeric', month: 'short', year: 'numeric'
                });
            } catch (e) {
                // Silent error handling
            }
        }
        
        appCard.innerHTML = `
            <div class="app-header">
                <h3>${app.universityName || 'University'} - ${app.programName || 'Program'}</h3>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="app-details">
                <p><i class="fas fa-calendar-alt"></i> Applied: ${applicationDate}</p>
                <p><i class="fas fa-graduation-cap"></i> Intake: ${app.intake || 'N/A'}</p>
                ${app.applicationFee ? `<p><i class="fas fa-dollar-sign"></i> Fee: $${app.applicationFee}</p>` : ''}
            </div>
            <div class="app-progress">
                <div class="progress-steps">
                    ${createProgressStepsHTML(app.progress || 'documents')}
                </div>
            </div>
            <button class="view-details-btn" onclick="showApplicationDetails('${app.id}')">View Details</button>
        `;
        
        appCard.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-details-btn')) {
                showApplicationDetails(app.id);
            }
        });
        
        container.appendChild(appCard);
    });
}

function createProgressStepsHTML(currentProgress) {
    const steps = [
        { id: 'documents', label: 'Documents', icon: 'file-alt' },
        { id: 'sop/lor', label: 'SOP/LOR', icon: 'file-signature' },
        { id: 'sop', label: 'SOP/LOR', icon: 'file-signature' },
        { id: 'university review', label: 'Review', icon: 'university' },
        { id: 'decision', label: 'Decision', icon: 'check-circle' },
        { id: 'visa', label: 'Visa', icon: 'passport' }
    ];
    
    let html = '';
    let foundCurrent = false;
    
    steps.forEach((step, index) => {
        let className = 'step';
        let iconClass = 'fas fa-clock';
        
        if (step.id === currentProgress || step.label.toLowerCase() === currentProgress) {
            className += ' active';
            iconClass = `fas fa-${step.icon}`;
            foundCurrent = true;
        } else if (!foundCurrent) {
            className += ' completed';
            iconClass = `fas fa-${step.icon}`;
        } else {
            iconClass = `fas fa-${step.icon}`;
        }
        
        html += `
            <div class="${className}">
                <div class="step-icon"><i class="${iconClass}"></i></div>
                <div class="step-label">${step.label}</div>
            </div>
        `;
    });
    
    return html;
}

function updateProfileForm(userData) {
    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const educationLevelSelect = document.getElementById('educationLevel');
    const studyDestinationSelect = document.getElementById('studyDestination');
    
    if (fullNameInput) {
        fullNameInput.value = userData.name || '';
    }
    
    if (phoneNumberInput) {
        phoneNumberInput.value = userData.phone || '';
    }
    
    if (educationLevelSelect && userData.educationLevel) {
        educationLevelSelect.value = userData.educationLevel;
    }
    
    if (studyDestinationSelect && userData.studyDestination) {
        studyDestinationSelect.value = userData.studyDestination;
    }
    
    // Add joined date to profile if available
    const profileJoined = document.getElementById('profileJoined');
    if (profileJoined && userData.createdAt) {
        const joinDate = userData.createdAt.toDate();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        profileJoined.textContent = `Member since: ${joinDate.toLocaleDateString('en-US', options)}`;
    }
}

function showErrorState(error, recentApplicationsList, applicationsContainer, userId) {
    const errorMessage = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error loading applications</p>
            <p class="text-muted">${error.message}</p>
            <button class="retry-btn" onclick="retryLoadApplications('${userId}')">Retry</button>
        </div>
    `;
    
    if (recentApplicationsList) recentApplicationsList.innerHTML = errorMessage;
    if (applicationsContainer) applicationsContainer.innerHTML = errorMessage;
}

// Retry functions
function retryLoadApplications(userId) {
    loadApplicationsAndProgress(userId);
}

// Setup functions
function setupNavigation() {
    const navLinks = document.querySelectorAll('.side-nav a:not([href="#payment"])');
    const sections = document.querySelectorAll('main.content > section');
    const paymentLink = document.querySelector('.side-nav a[href="#payment"]');
    
    // Reset all hover states when mouse leaves navigation area
    const sideNav = document.querySelector('.side-nav');
    if (sideNav) {
        sideNav.addEventListener('mouseleave', function() {
            // Remove any stuck hover effects
            document.querySelectorAll('.side-nav a').forEach(link => {
                link.style.transform = '';
                link.style.boxShadow = '';
                link.style.borderColor = '';
            });
        });
    }
    
    // Add mouseout event to each nav link
    document.querySelectorAll('.side-nav a').forEach(link => {
        link.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
    
    // Handle hash change
    function handleHashChange() {
        const hash = window.location.hash || '#dashboard';
        const targetId = hash.substring(1);
        
        // Skip if it's the payment section (handled separately)
        if (targetId === 'payment') return;
        
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
            
            // Update active nav link
            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.parentElement.classList.add('active');
                } else {
                    link.parentElement.classList.remove('active');
                }
            });
        }
    }
    
    // Add click event to navigation links (except payment)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!link.classList.contains('disabled-nav')) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    window.location.hash = href;
                }
            }
        });
    });
    
    // Handle initial hash and hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', handleLogout);
    }
    
    // Add event listeners to all navigation links that go outside the dashboard
    // MODIFY THIS PART: Exclude the Home link from logout behavior
    document.querySelectorAll('a[href^="index.html"]:not([href="index.html"]), a[href^="auth.html"], a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetHref = this.getAttribute('href');
            
            // Logout and then navigate
            handleLogoutWithRedirect(targetHref);
        });
    });
    
    // Add a direct navigation for the Home link
    const homeLink = document.querySelector('header nav a[href="index.html"]');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
}

function setupProfileUpdate() {
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const user = firebase.auth().currentUser;
            if (user) {
                updateUserProfile(user.uid);
            } else {
                showToast("You must be logged in to update your profile", "error");
            }
        });
    }
    
    // Also handle button click if there's a button outside the form
    if (updateProfileBtn && !profileForm) {
        updateProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const user = firebase.auth().currentUser;
            if (user) {
                updateUserProfile(user.uid);
            } else {
                showToast("You must be logged in to update your profile", "error");
            }
        });
    }
}

function setupModalClose() {
    const modal = document.getElementById('applicationDetailModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }
    }
}

function handleLogout(e) {
    if (e) e.preventDefault();
    
    firebase.auth().signOut()
        .then(() => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        })
        .catch((error) => {
            showToast("Error signing out. Please try again.", "error");
        });
}

function handleLogoutWithRedirect(redirectUrl) {
    firebase.auth().signOut()
        .then(() => {
            sessionStorage.clear();
            window.location.href = redirectUrl;
        })
        .catch((error) => {
            showToast("Error signing out. Please try again.", "error");
            // Redirect anyway after error
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        });
}

function showApplicationDetails(applicationId) {
    // Implementation here
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
    }
}

function updateUserProfile(userId) {
    // Get form values
    const fullName = document.getElementById('fullName')?.value?.trim();
    const phoneNumber = document.getElementById('phoneNumber')?.value?.trim();
    const educationLevel = document.getElementById('educationLevel')?.value;
    const studyDestination = document.getElementById('studyDestination')?.value;
    
    // Validate required fields
    if (!fullName) {
        showToast("Please enter your full name", "error");
        return;
    }
    
    if (!phoneNumber) {
        showToast("Please enter your phone number", "error");
        return;
    }
    
    if (!educationLevel) {
        showToast("Please select your education level", "error");
        return;
    }
    
    if (!studyDestination) {
        showToast("Please select your preferred study destination", "error");
        return;
    }
    
    // Prepare update data
    const updateData = {
        name: fullName,
        phone: phoneNumber,
        educationLevel: educationLevel,
        studyDestination: studyDestination,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Show loading state
    const updateBtn = document.getElementById('updateProfileBtn');
    const originalText = updateBtn?.textContent;
    if (updateBtn) {
        updateBtn.disabled = true;
        updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    }
    
    // Update Firestore document
    db.collection('users').doc(userId).update(updateData)
        .then(() => {
            showToast("Profile updated successfully!", "success");
            
            // Remove profile completion notification if exists
            const notification = document.querySelector('.profile-completion-notification');
            if (notification) {
                notification.remove();
            }
            
            // Update display name in Firebase Auth if it changed
            const user = firebase.auth().currentUser;
            if (user && user.displayName !== fullName) {
                return user.updateProfile({
                    displayName: fullName
                });
            }
        })
        .then(() => {
            // Update UI elements with new name
            const userNameElements = document.querySelectorAll('#userName, #profileName');
            userNameElements.forEach(element => {
                if (element) element.textContent = fullName;
            });
            
            // Re-enable navigation
            enableNavigation();
            
            // Redirect to dashboard section after profile completion
            window.location.hash = '#dashboard';
        })
        .catch((error) => {
            showToast("Error updating profile: " + error.message, "error");
        })
        .finally(() => {
            // Reset button state
            if (updateBtn) {
                updateBtn.disabled = false;
                updateBtn.textContent = originalText || 'Update Profile';
            }
        });
}

function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Show profile completion notification
function showProfileCompletionNotification() {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.profile-completion-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'profile-completion-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-user-edit"></i>
            <div class="notification-text">
                <h3>Complete Your Profile</h3>
                <p>Please complete your profile to help us provide better assistance for your study abroad journey.</p>
            </div>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.remove();
    });
}

// Disable navigation until profile is complete
function disableNavigationUntilProfileComplete() {
    // Add a profile-incomplete class to body
    document.body.classList.add('profile-incomplete');
    
    // Get all navigation links except profile
    const navLinks = document.querySelectorAll('.side-nav a:not([href="#profile"])');
    
    // Add warning message to sidebar
    const warningMsg = document.createElement('div');
    warningMsg.className = 'profile-warning';
    warningMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please complete your profile first';
    
    // Add warning if not already present
    if (!document.querySelector('.profile-warning')) {
        document.querySelector('.side-nav').appendChild(warningMsg);
    }
    
    // Add click event to navigation links
    navLinks.forEach(link => {
        // Remove existing event listeners by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Store original href
        newLink.setAttribute('data-original-href', newLink.getAttribute('href'));
        
        // Replace with profile link
        newLink.setAttribute('href', '#profile');
        
        // Add warning class
        newLink.classList.add('disabled-nav');
        
        // Add click handler
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            showToast("Please complete your profile first", "warning");
            window.location.hash = '#profile';
        });
    });
}

// Re-enable navigation after profile completion
function enableNavigation() {
    // Remove profile-incomplete class from body
    document.body.classList.remove('profile-incomplete');
    
    // Get all disabled navigation links
    const navLinks = document.querySelectorAll('.side-nav a.disabled-nav');
    
    // Remove warning message
    const warningMsg = document.querySelector('.profile-warning');
    if (warningMsg) {
        warningMsg.remove();
    }
    
    // Restore original hrefs and remove event listeners
    navLinks.forEach(link => {
        const originalHref = link.getAttribute('data-original-href');
        if (originalHref) {
            link.setAttribute('href', originalHref);
        }
        link.classList.remove('disabled-nav');
        
        // Clone and replace to remove event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
    
    // Specifically check and fix payment navigation
    const paymentLink = document.querySelector('.side-nav a[href="#payment"]');
    if (paymentLink && paymentLink.classList.contains('disabled-nav')) {
        const originalHref = paymentLink.getAttribute('data-original-href') || '#payment';
        paymentLink.setAttribute('href', originalHref);
        paymentLink.classList.remove('disabled-nav');
        
        // Clone and replace to remove event listeners
        const newPaymentLink = paymentLink.cloneNode(true);
        paymentLink.parentNode.replaceChild(newPaymentLink, paymentLink);
    }
    
    // Re-setup navigation event listeners
    setupNavigation();
}

// Complete replacement for the fixNavigationHoverIssue function
function fixNavigationHoverIssue() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.side-nav a');
    
    // Remove all existing event listeners by cloning and replacing each link
    navLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Clear any inline styles that might be causing issues
        newLink.removeAttribute('style');
    });
    
    // Disable CSS hover effects completely by adding a class to body
    document.body.classList.add('no-hover-effects');
    
    // Add a style element to override all hover effects
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .side-nav a:hover {
            transform: none !important;
            box-shadow: none !important;
            background-color: rgba(67, 97, 238, 0.05) !important;
            color: #4361ee !important;
            border-color: transparent !important;
        }
        
        .side-nav li.active a {
            background-color: rgba(67, 97, 238, 0.1) !important;
            color: #4361ee !important;
            border-left: 3px solid #4361ee !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Re-setup navigation event listeners
    setupNavigation();
}
