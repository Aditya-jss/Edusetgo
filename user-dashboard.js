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
            // Clear all storage
            sessionStorage.clear();
            
            // Clear Firebase auth persistence data
            localStorage.removeItem('firebase:authUser');
            localStorage.removeItem('firebase:session');
            
            // Clear any auth cookies
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            
            // Force reload the page to clear any cached auth state
            window.location.replace('index.html');
        })
        .catch((error) => {
            console.error("Error signing out:", error);
            showToast("Error signing out. Please try again.", "error");
            
            // Still clear session and redirect
            sessionStorage.clear();
            window.location.replace('index.html');
        });
}

function handleLogoutWithRedirect(redirectUrl) {
    firebase.auth().signOut()
        .then(() => {
            // Clear all storage
            sessionStorage.clear();
            
            // Clear Firebase auth persistence data
            localStorage.removeItem('firebase:authUser');
            localStorage.removeItem('firebase:session');
            
            // Clear any auth cookies
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            
            // Force reload to the redirect URL
            window.location.replace(redirectUrl);
        })
        .catch((error) => {
            console.error("Error signing out:", error);
            showToast("Error signing out. Please try again.", "error");
            
            // Still clear session and redirect
            sessionStorage.clear();
            setTimeout(() => {
                window.location.replace(redirectUrl);
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

function showToast(message, type = 'info') {
    // Check if toast container exists, if not create it
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.minWidth = '250px';
    toast.style.margin = '10px 0';
    toast.style.padding = '15px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    // Set background color based on type
    switch(type) {
        case 'success':
            toast.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            toast.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            toast.style.backgroundColor = '#ff9800';
            break;
        default:
            toast.style.backgroundColor = '#2196f3';
    }
    
    toast.style.color = 'white';
    toast.textContent = message;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 500);
    }, 5000);
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

// Function to verify user document exists
function verifyUserDocument(userId) {
    return db.collection('users').doc(userId).get()
        .then(doc => {
            if (!doc.exists) {
                console.error('❌ User document does not exist for UID:', userId);
                throw new Error('User profile not found. Please complete your profile first.');
            }
            console.log('✅ User document verified for UID:', userId);
            return doc.data();
        });
}

// Initialize Razorpay payment
function initializeRazorpay(packageType = null, customAmount = null) {
    console.log('🚀 Initializing Razorpay payment...');
    console.log('📦 Package type:', packageType);
    console.log('💰 Custom amount:', customAmount);

    const user = firebase.auth().currentUser;
    if (!user) {
        console.error('❌ Payment Error: No authenticated user found');
        showToast('Please log in to make a payment', 'error');
        return;
    }

    console.log('✅ User authenticated:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
    });

    // Verify user document exists before proceeding
    verifyUserDocument(user.uid)
        .then(userData => {
            console.log('📋 User data verified:', userData);
            proceedWithPayment(user, packageType, customAmount);
        })
        .catch(error => {
            console.error('❌ User verification failed:', error);
            showToast(error.message, 'error');
        });
}

// Proceed with payment after user verification
function proceedWithPayment(user, packageType = null, customAmount = null) {
    console.log('💳 Proceeding with payment for user:', user.uid);

    // Determine amount and package name based on selection
    let amount, packageName;
    
    if (packageType) {
        switch(packageType) {
            case 'basic':
                amount = 1790;
                packageName = 'Basic Package';
                break;
            case 'standard':
                amount = 3499;
                packageName = 'Standard Package';
                break;
            case 'premium':
                amount = 4799;
                packageName = 'Premium Package';
                break;
            default:
                amount = 1000;
                packageName = 'Custom Package';
        }
    } else if (customAmount) {
        amount = parseInt(customAmount);
        packageName = 'Custom Package';
        
        if (isNaN(amount) || amount <= 0) {
            showToast('Please enter a valid amount', 'error');
            return;
        }
    } else {
        showToast('Please select a package or enter a custom amount', 'error');
        return;
    }
    
    try {
        // Razorpay options
        const options = {
            key: 'rzp_test_RCzDLGsVumZRqx', // Your test Razorpay key
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            name: 'EduSetGo',
            description: packageName,
            image: 'images/logo.png',
            handler: function(response) {
                console.log('Payment success response:', response);
                handleSuccessfulPayment(response, amount, packageType, packageName);
            },
            prefill: {
                name: user.displayName || '',
                email: user.email || '',
                contact: user.phoneNumber || ''
            },
            notes: {
                userId: user.uid,
                packageType: packageType || 'custom',
                packageName: packageName
            },
            theme: {
                color: '#4f46e5'
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment modal dismissed');
                    showToast('Payment cancelled', 'warning');
                }
            }
        };
        
        // Create Razorpay instance
        const rzp = new Razorpay(options);
        
        // Handle payment failure
        rzp.on('payment.failed', function(response) {
            console.error('Payment failed response:', response);
            showToast(`Payment failed: ${response.error.description}`, 'error');
        });
        
        // Open payment modal
        rzp.open();
        console.log('Razorpay modal opened');
        
    } catch (error) {
        console.error('Razorpay initialization error:', error);
        showToast('Failed to initialize payment gateway. Please try again.', 'error');
    }
}

// Function to load and display payment history
function loadAndDisplayPaymentHistory(userId, container, currentPaymentId = null) {
    console.log('Loading payment history for user:', userId);
    
    db.collection('users').doc(userId).get()
        .then(doc => {
            if (!doc.exists) {
                console.error('User document not found');
                displayPaymentSuccess(container, currentPaymentId);
                return;
            }
            
            const userData = doc.data();
            console.log('User data retrieved:', userData);
            
            // Check if we have payment data but no payment history
            let paymentHistory = userData.paymentHistory || [];
            
            // If we have payment data but no payment history, create a synthetic entry
            if (paymentHistory.length === 0 && userData.paymentAmount && userData.paymentId) {
                console.log('No payment history found, but payment data exists. Creating synthetic entry.');
                
                const syntheticPayment = {
                    paymentId: userData.paymentId,
                    amount: userData.paymentAmount,
                    packageType: userData.packageType || 'custom',
                    packageName: userData.packageName || 'Custom Package',
                    date: userData.paymentDate || new Date(), // Use regular Date instead of serverTimestamp for arrays
                    status: 'paid'
                };
                
                paymentHistory = [syntheticPayment];
                
                // Store this synthetic history back to the user document
                db.collection('users').doc(userId).update({
                    paymentHistory: paymentHistory
                }).then(() => {
                    console.log('Synthetic payment history saved to user document');
                }).catch(error => {
                    console.error('Error saving synthetic payment history:', error);
                });
            }
            
            console.log('Payment history to display:', paymentHistory);
            
            // Sort payment history by date (newest first)
            paymentHistory.sort((a, b) => {
                const dateA = a.date ? (a.date.toDate ? a.date.toDate() : new Date(a.date)) : new Date(0);
                const dateB = b.date ? (b.date.toDate ? b.date.toDate() : new Date(b.date)) : new Date(0);
                return dateB - dateA;
            });
            
            // Find current payment if ID is provided
            const currentPayment = currentPaymentId ? 
                paymentHistory.find(payment => payment.paymentId === currentPaymentId) : null;
            
            // Display success message with payment history
            let historyHTML = '';
            
            if (paymentHistory.length > 0) {
                historyHTML = `
                    <div class="payment-history">
                        <h3>Your Payment History</h3>
                        <div class="payment-history-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Package</th>
                                        <th>Amount</th>
                                        <th>Transaction ID</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;
                
                paymentHistory.forEach(payment => {
                    // Handle different date formats
                    let paymentDate;
                    if (payment.date) {
                        if (payment.date.toDate) {
                            paymentDate = payment.date.toDate();
                        } else if (payment.date.seconds) {
                            paymentDate = new Date(payment.date.seconds * 1000);
                        } else {
                            paymentDate = new Date(payment.date);
                        }
                    } else {
                        paymentDate = new Date();
                    }
                    
                    const formattedDate = paymentDate.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                    
                    const isCurrentPayment = currentPaymentId && payment.paymentId === currentPaymentId;
                    
                    historyHTML += `
                        <tr class="${isCurrentPayment ? 'current-payment' : ''}">
                            <td>${formattedDate}</td>
                            <td>${payment.packageName || 'Unknown Package'}</td>
                            <td>₹${payment.amount || 0}</td>
                            <td>${payment.paymentId || 'N/A'}</td>
                            <td><span class="status-badge status-success">Paid</span></td>
                        </tr>
                    `;
                });
                
                historyHTML += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
            
            // Display success message with current payment details if available
            if (currentPayment) {
                const amount = currentPayment.amount || 0;
                const packageName = currentPayment.packageName || 'Custom Package';
                
                container.innerHTML = `
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h2>Payment Successful!</h2>
                    <p>Thank you for upgrading to ${packageName}.</p>
                    <p>Your payment of ₹${amount} has been processed successfully.</p>
                    <p>Transaction ID: ${currentPaymentId}</p>
                    ${historyHTML}
                    <button class="btn-primary" onclick="window.location.hash='#dashboard'">Return to Dashboard</button>
                `;
            } else {
                // If no current payment ID, just show the payment history
                const totalPayments = paymentHistory.length;
                const totalSpent = calculateTotalSpent(paymentHistory);
                
                container.innerHTML = `
                    <div class="payment-summary">
                        <div class="summary-card">
                            <div class="summary-icon"><i class="fas fa-credit-card"></i></div>
                            <div class="summary-details">
                                <h3>${totalPayments}</h3>
                                <p>Total Payments</p>
                            </div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-icon"><i class="fas fa-money-bill-wave"></i></div>
                            <div class="summary-details">
                                <h3>₹${totalSpent}</h3>
                                <p>Total Spent</p>
                            </div>
                        </div>
                    </div>
                    ${historyHTML}
                    <button class="btn-primary" onclick="showPaymentOptions()">Make a New Payment</button>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading payment history:', error);
            if (currentPaymentId) {
                displayPaymentSuccess(container, currentPaymentId);
            } else {
                container.innerHTML = `
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Error loading payment history</p>
                        <p class="text-muted">${error.message}</p>
                        <button class="retry-btn" onclick="loadPaymentHistorySection(true)">Retry</button>
                    </div>
                `;
            }
        });
}

// Fallback function to display basic success message
function displayPaymentSuccess(container, paymentId) {
    container.innerHTML = `
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <h2>Payment Successful!</h2>
        <p>Your payment has been processed successfully.</p>
        <p>Transaction ID: ${paymentId}</p>
        <button class="btn-primary" onclick="window.location.hash='#dashboard'">Return to Dashboard</button>
    `;
}

// Function to load and display only payment history in the payment section
function loadPaymentHistorySection(forceRefresh = false) {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const paymentSection = document.getElementById('payment');
    if (!paymentSection) return;
    
    // Clear existing content
    paymentSection.innerHTML = `
        <div class="section-header">
            <h2>Payment History</h2>
            <p>View all your past transactions</p>
        </div>
        <div id="paymentHistoryContainer" class="payment-history-container">
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i> Loading payment history...
            </div>
        </div>
    `;
    
    // Get the container
    const historyContainer = document.getElementById('paymentHistoryContainer');
    
    // Use a cache-busting approach if forceRefresh is true
    let docRef = db.collection('users').doc(user.uid);
    if (forceRefresh) {
        // This forces Firestore to get the latest data from the server
        docRef = docRef.withConverter({
            fromFirestore: function(snapshot, options) {
                return snapshot.data(options);
            },
            toFirestore: function(data) {
                return data;
            }
        });
    }
    
    // Load payment history
    docRef.get({ source: forceRefresh ? 'server' : 'default' })
        .then(doc => {
            if (!doc.exists) {
                historyContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-receipt"></i>
                        <p>No payment history found</p>
                        <p class="text-muted">You haven't made any payments yet.</p>
                        <button class="btn-primary" onclick="showPaymentOptions()">Make a Payment</button>
                    </div>
                `;
                return;
            }
            
            // Load and display payment history
            loadAndDisplayPaymentHistory(user.uid, historyContainer);
        })
        .catch(error => {
            console.error('Error loading payment history:', error);
            historyContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error loading payment history</p>
                    <p class="text-muted">${error.message}</p>
                    <button class="retry-btn" onclick="loadPaymentHistorySection(true)">Retry</button>
                </div>
            `;
        });
}

// Helper function to calculate total spent
function calculateTotalSpent(paymentHistory) {
    return paymentHistory.reduce((total, payment) => {
        return total + (payment.amount || 0);
    }, 0);
}

// Helper function to get last payment date
function getLastPaymentDate(paymentHistory) {
    if (paymentHistory.length === 0) return new Date();
    
    const sortedPayments = [...paymentHistory].sort((a, b) => {
        const dateA = a.date ? a.date.toDate() : new Date(0);
        const dateB = b.date ? b.date.toDate() : new Date(0);
        return dateB - dateA;
    });
    
    return sortedPayments[0].date ? sortedPayments[0].date.toDate() : new Date();
}

// Helper function to format date
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Function to show payment options
function showPaymentOptions() {
    const paymentSection = document.getElementById('payment');
    if (!paymentSection) return;
    
    // Clear existing content
    paymentSection.innerHTML = `
        <div class="section-header">
            <h2>Payment</h2>
            <p>Choose a package or enter a custom amount</p>
        </div>
    `;
    
    // Create payment options UI
    createPaymentOptionsUI(paymentSection);
    
    // Add a link to go back to payment history
    const backLink = document.createElement('div');
    backLink.className = 'back-to-history';
    backLink.innerHTML = `
        <button class="text-link" onclick="loadPaymentHistorySection()">
            <i class="fas fa-arrow-left"></i> Back to Payment History
        </button>
    `;
    
    paymentSection.insertBefore(backLink, paymentSection.firstChild.nextSibling);
}

// Add event listener for payment nav link with improved script loading
document.addEventListener('DOMContentLoaded', function() {
    const paymentNavLink = document.querySelector('.side-nav a[href="#payment"]');
    if (paymentNavLink) {
        paymentNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections
            document.querySelectorAll('main.content > section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show payment section
            const paymentSection = document.getElementById('payment');
            if (paymentSection) {
                paymentSection.classList.add('active');
                
                // Load payment history
                loadPaymentHistorySection();
            }
            
            // Update URL hash
            window.location.hash = '#payment';
            
            // Update active nav link
            document.querySelectorAll('.side-nav li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    } else {
        console.warn('Payment nav link not found in the DOM');
    }
});

// Also initialize payment history when the page loads with #payment hash
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#payment') {
        setTimeout(() => {
            loadPaymentHistorySection();
        }, 500);
    }
});

// Create payment options UI
function createPaymentOptionsUI(container) {
    // Create payment options container
    const paymentOptions = document.createElement('div');
    paymentOptions.id = 'paymentOptions';
    paymentOptions.className = 'payment-options-container';
    
    // Add payment options HTML
    paymentOptions.innerHTML = `
        <h2>Choose a Package</h2>
        <p>Select one of our packages or enter a custom amount</p>
        
        <div class="package-cards">
            <div class="package-option" data-package="basic">
                <div class="package-header">
                    <h3>Basic Package</h3>
                    <div class="package-price">₹1,790</div>
                </div>
                <div class="package-content">
                    <ul>
                        <li>Information on top universities</li>
                        <li>Application process overview</li>
                        <li>SOP drafting support</li>
                        <li>3 university applications</li>
                        <li>Student community access</li>
                    </ul>
                    <button class="select-package-btn">Select</button>
                </div>
            </div>
            
            <div class="package-option" data-package="standard">
                <div class="package-header">
                    <h3>Standard Package</h3>
                    <div class="package-price">₹3,499</div>
                </div>
                <div class="package-content">
                    <ul>
                        <li>All Basic features</li>
                        <li>One-on-one consultations</li>
                        <li>Personal statement support</li>
                        <li>Basic interview preparation</li>
                        <li>Application timeline guidance</li>
                    </ul>
                    <button class="select-package-btn">Select</button>
                </div>
            </div>
            
            <div class="package-option" data-package="premium">
                <div class="package-header">
                    <h3>Premium Package</h3>
                    <div class="package-price">₹4,799</div>
                </div>
                <div class="package-content">
                    <ul>
                        <li>All Standard features</li>
                        <li>Exclusive counseling sessions</li>
                        <li>3 free visa mock interviews</li>
                        <li>Visa application support</li>
                        <li>Networking sessions access</li>
                    </ul>
                    <button class="select-package-btn">Select</button>
                </div>
            </div>
        </div>
        
        <div class="custom-amount-container">
            <h3>Or Enter Custom Amount</h3>
            <div class="custom-amount-input">
                <span class="currency-symbol">₹</span>
                <input type="number" id="customAmount" min="1" placeholder="Enter amount">
                <button id="customAmountBtn">Pay Custom Amount</button>
            </div>
        </div>
        
        <div class="test-card-info">
            <h3>Test Card Information</h3>
            <p>Use these details for testing:</p>
            <ul>
                <li><strong>Card Number:</strong> 4111 1111 1111 1111</li>
                <li><strong>Expiry:</strong> Any future date (e.g., 12/25)</li>
                <li><strong>CVV:</strong> Any 3 digits (e.g., 123)</li>
                <li><strong>Name:</strong> Any name</li>
                <li><strong>3D Secure Password:</strong> 1234</li>
            </ul>
        </div>
    `;
    
    // Add success message container (hidden initially)
    const successSection = document.createElement('div');
    successSection.id = 'paymentSuccess';
    successSection.className = 'payment-success';
    successSection.style.display = 'none';
    
    // Add both to container
    container.appendChild(paymentOptions);
    container.appendChild(successSection);
    
    // Add event listeners to package buttons
    const packageButtons = paymentOptions.querySelectorAll('.select-package-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.closest('.package-option').getAttribute('data-package');
            
            // Load Razorpay if needed and initialize payment
            if (typeof Razorpay !== 'undefined') {
                initializeRazorpay(packageType);
            } else {
                loadRazorpayAndPay(packageType);
            }
        });
    });
    
    // Add event listener to custom amount button
    const customAmountBtn = document.getElementById('customAmountBtn');
    if (customAmountBtn) {
        customAmountBtn.addEventListener('click', function() {
            const customAmount = document.getElementById('customAmount').value;
            
            // Load Razorpay if needed and initialize payment
            if (typeof Razorpay !== 'undefined') {
                initializeRazorpay(null, customAmount);
            } else {
                loadRazorpayAndPay(null, customAmount);
            }
        });
    }
}

// Load Razorpay script and initialize payment
function loadRazorpayAndPay(packageType = null, customAmount = null) {
    console.log('Loading Razorpay script...');
    showToast('Preparing payment gateway...', 'info');
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = function() {
        console.log('Razorpay script loaded successfully');
        initializeRazorpay(packageType, customAmount);
    };
    
    script.onerror = function(error) {
        console.error('Failed to load Razorpay script:', error);
        showToast('Failed to load payment gateway. Please check your internet connection and try again.', 'error');
    };
    
    document.body.appendChild(script);
}

// Function to handle successful payment and update Firebase
function handleSuccessfulPayment(response, amount, packageType, packageName) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error('❌ Payment Error: No authenticated user found');
        showToast('Authentication error. Please log in and try again.', 'error');
        return;
    }

    console.log('✅ Handling successful payment for user:', user.uid);
    console.log('📄 Payment response:', response);
    console.log('💰 Payment details:', { amount, packageType, packageName });

    // Ensure amount is a number
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
        console.error('❌ Payment Error: Invalid amount:', amount);
        showToast('Invalid payment amount. Please try again.', 'error');
        return;
    }

    // Create payment data object
    const paymentData = {
        paymentId: response.razorpay_payment_id,
        amount: amount,
        packageType: packageType || 'custom',
        packageName: packageName,
        date: new Date(), // Use regular Date instead of serverTimestamp for arrays
        status: 'paid',
        userId: user.uid,
        userEmail: user.email
    };

    console.log('💾 Payment data to store:', paymentData);
    
    // Update user document with payment data
    console.log('🔍 Fetching user document for UID:', user.uid);
    db.collection('users').doc(user.uid).get()
        .then(doc => {
            console.log('📋 User document status:', doc.exists ? 'EXISTS' : 'DOES NOT EXIST');

            if (!doc.exists) {
                console.error('❌ Critical Error: User document does not exist for UID:', user.uid);
                throw new Error('User document not found. Please contact support.');
            }

            let updateData = {};

            // Initialize payment history array if it doesn't exist
            let paymentHistory = [];
            const userData = doc.data() || {};
            console.log('📊 Current user data:', userData);

            if (userData.paymentHistory && Array.isArray(userData.paymentHistory)) {
                paymentHistory = [...userData.paymentHistory];
                console.log('📜 Existing payment history found:', paymentHistory.length, 'payments');
            } else {
                console.log('🆕 No existing payment history found, creating new array');
            }

            // Add new payment to history
            paymentHistory.push(paymentData);
            console.log('📝 Updated payment history:', paymentHistory.length, 'total payments');
            
            // Update user document
            updateData = {
                paymentStatus: 'paid',
                paymentMethod: 'razorpay',
                paymentId: response.razorpay_payment_id,
                paymentAmount: amount,
                packageType: packageType || 'custom',
                packageName: packageName,
                paymentDate: firebase.firestore.FieldValue.serverTimestamp(),
                paymentHistory: paymentHistory,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            };

            console.log('💾 Updating user document with data:', updateData);
            console.log('🔄 Attempting to save to Firestore for user:', user.uid);

            // Use set with merge option to ensure it works for both new and existing documents
            return db.collection('users').doc(user.uid).set(updateData, { merge: true });
        })
        .then(() => {
            console.log('✅ SUCCESS: Payment data successfully stored in Firebase');
            console.log('🎉 Payment completed for user:', user.uid, 'Amount:', amount);

            // Show success alert with payment details
            alert('✅ SUCCESS: Payment saved to database successfully!\n\nPayment ID: ' + response.razorpay_payment_id + '\nAmount: ₹' + amount);
            showToast(`Payment successful! Your account has been upgraded to ${packageName}.`, 'success');
            
            // Hide payment section and show success message with payment history
            const paymentSection = document.getElementById('paymentOptions');
            const successSection = document.getElementById('paymentSuccess');
            
            if (paymentSection) paymentSection.style.display = 'none';
            if (successSection) {
                successSection.style.display = 'block';
                loadAndDisplayPaymentHistory(user.uid, successSection, response.razorpay_payment_id);
            }
            
            // Force reload payment history section after a short delay
            setTimeout(() => {
                loadPaymentHistorySection(true);
            }, 3000);
        })
        .catch(error => {
            console.error("❌ CRITICAL ERROR: Failed to update payment status:", error);
            console.error("🔍 Error details:", {
                code: error.code,
                message: error.message,
                userId: user.uid,
                userEmail: user.email,
                paymentId: response.razorpay_payment_id,
                amount: amount,
                timestamp: new Date().toISOString()
            });

            // Try to log the error to a separate collection for monitoring
            try {
                db.collection('payment_errors').add({
                    userId: user.uid,
                    userEmail: user.email,
                    paymentId: response.razorpay_payment_id,
                    amount: amount,
                    packageType: packageType,
                    packageName: packageName,
                    error: {
                        code: error.code,
                        message: error.message
                    },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    console.log('📝 Error logged to payment_errors collection');
                }).catch(logError => {
                    console.error('❌ Failed to log error:', logError);
                });
            } catch (logError) {
                console.error('❌ Failed to create error log:', logError);
            }

            showToast('Payment was successful but there was an error updating your account. Please contact support with payment ID: ' + response.razorpay_payment_id, 'error');
        });
}
