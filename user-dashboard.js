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

// Add debug logging
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data);
    
    // Also show on page for easier debugging
    const debugDiv = document.getElementById('debugInfo') || createDebugDiv();
    const timestamp = new Date().toLocaleTimeString();
    debugDiv.innerHTML += `<div><strong>${timestamp}:</strong> ${message} ${data ? JSON.stringify(data) : ''}</div>`;
    debugDiv.scrollTop = debugDiv.scrollHeight;
}

function createDebugDiv() {
    const debugDiv = document.createElement('div');
    debugDiv.id = 'debugInfo';
    debugDiv.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 400px;
        height: 200px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        overflow-y: auto;
        z-index: 9999;
        border: 1px solid #333;
    `;
    document.body.appendChild(debugDiv);
    return debugDiv;
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Add cache control meta tags to prevent caching
    const metaCache = document.createElement('meta');
    metaCache.setAttribute('http-equiv', 'Cache-Control');
    metaCache.setAttribute('content', 'no-cache, no-store, must-revalidate');
    document.head.appendChild(metaCache);
    
    const metaPragma = document.createElement('meta');
    metaPragma.setAttribute('http-equiv', 'Pragma');
    metaPragma.setAttribute('content', 'no-cache');
    document.head.appendChild(metaPragma);
    
    const metaExpires = document.createElement('meta');
    metaExpires.setAttribute('http-equiv', 'Expires');
    metaExpires.setAttribute('content', '0');
    document.head.appendChild(metaExpires);
    
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
    
    debugLog('User dashboard initialized');
});

// Load user data
function loadUserData(user) {
    const userId = user.uid;
    
    debugLog("Loading user data for userId", userId);
    
    // Update UI with user info
    updateUserInfo(user);
    
    // Get user document
    db.collection('users').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                debugLog("User data loaded successfully", userData);
                
                // Update profile form
                updateProfileForm(userData);
                
                // Load applications and calculate progress together
                loadApplicationsAndProgress(userId);
                
            } else {
                debugLog("No user document found, creating one");
                return db.collection('users').doc(userId).set({
                    name: user.displayName || 'Student',
                    email: user.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    progressStage: 'preparation',
                    isAdmin: false
                }).then(() => {
                    loadApplicationsAndProgress(userId);
                });
            }
        })
        .catch((error) => {
            debugLog("Error getting user document", error);
            showToast("Error loading profile data", "error");
        });
}

// Combined function to load applications and calculate progress
function loadApplicationsAndProgress(userId) {
    debugLog("Loading applications and calculating progress for userId", userId);
    
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
            debugLog("Applications query returned", querySnapshot.size);
            
            userApplications = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                debugLog("Found application", { id: doc.id, data: data });
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
            debugLog("Error getting applications", error);
            
            // If permission denied, try alternative query methods
            if (error.code === 'permission-denied') {
                debugLog("Permission denied, trying alternative queries...");
                tryAlternativeQueries(userId);
            } else {
                showErrorState(error, recentApplicationsList, applicationsContainer, userId);
            }
        });
}

function tryAlternativeQueries(userId) {
    const user = auth.currentUser;
    const userEmail = user.email;
    
    debugLog("Trying to find applications by email", userEmail);
    
    // Try querying by email field
    db.collection('applications')
        .where('email', '==', userEmail)
        .get()
        .then((querySnapshot) => {
            debugLog("Applications by email query returned", querySnapshot.size);
            
            if (querySnapshot.size > 0) {
                userApplications = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    debugLog("Found application by email", { id: doc.id, data: data });
                    userApplications.push({
                        id: doc.id,
                        ...data
                    });
                });
                
                updateApplicationsUI();
                calculateAndUpdateProgress(userApplications, userId);
            } else {
                // Try userEmail field
                return db.collection('applications')
                    .where('userEmail', '==', userEmail)
                    .get();
            }
        })
        .then((querySnapshot) => {
            if (querySnapshot && querySnapshot.size > 0) {
                debugLog("Applications by userEmail query returned", querySnapshot.size);
                
                userApplications = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    debugLog("Found application by userEmail", { id: doc.id, data: data });
                    userApplications.push({
                        id: doc.id,
                        ...data
                    });
                });
                
                updateApplicationsUI();
                calculateAndUpdateProgress(userApplications, userId);
            } else {
                debugLog("No applications found with any query method");
                showEmptyApplicationsState();
            }
        })
        .catch((error) => {
            debugLog("Error with alternative queries", error);
            showEmptyApplicationsState();
        });
}

function updateApplicationsUI() {
    debugLog("Updating applications UI", { count: userApplications.length });
    
    // Update counters
    const totalCount = userApplications.length;
    const approvedCount = userApplications.filter(app => app.status === 'approved').length;
    const pendingCount = userApplications.filter(app => app.status === 'pending' || app.status === 'in progress').length;
    
    debugLog("Application counts", { total: totalCount, approved: approvedCount, pending: pendingCount });
    
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
    debugLog("Calculating progress", { applicationCount: applications.length });
    
    let progressPercentage = 0;
    let currentStage = 'preparation';
    
    if (applications.length > 0) {
        currentStage = 'applications';
        progressPercentage = 25;
        
        applications.forEach(app => {
            debugLog("Processing app for progress", { status: app.status, progress: app.progress });
            
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
    
    debugLog("Final progress calculation", { percentage: progressPercentage, stage: currentStage });
    updateProgressTimeline(progressPercentage, currentStage);
    
    // Update user document with progress stage
    db.collection('users').doc(userId).update({
        progressStage: currentStage,
        progressPercentage: progressPercentage
    }).catch(error => {
        debugLog("Error updating user progress stage", error);
    });
}

function updateUserInfo(user) {
    debugLog("Updating user info", { displayName: user.displayName, email: user.email });
    
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
    debugLog("Updating application counters", { total: totalCount, approved: approvedCount, pending: pendingCount });
    
    const applicationCountElement = document.getElementById('applicationCount');
    const approvedCountElement = document.getElementById('approvedCount');
    const pendingCountElement = document.getElementById('pendingCount');
    
    if (applicationCountElement) applicationCountElement.textContent = totalCount;
    if (approvedCountElement) approvedCountElement.textContent = approvedCount;
    if (pendingCountElement) pendingCountElement.textContent = pendingCount;
}

function updateProgressTimeline(percentage, currentStage) {
    debugLog("Updating progress timeline", { percentage, currentStage });
    
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const stages = ['preparation', 'applications', 'offers', 'visa', 'departure'];
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
        debugLog("Progress bar updated to", percentage + '%');
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = percentage + '% Complete';
        debugLog("Progress text updated to", percentage + '% Complete');
    }
    
    const currentStageIndex = stages.indexOf(currentStage);
    debugLog("Current stage index", currentStageIndex);
    
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
}

function renderApplications(applications, container, limitCount) {
    if (!container) return;
    
    container.innerHTML = '';
    const appsToRender = limitCount ? applications.slice(0, 3) : applications;
    
    debugLog("Rendering applications", { count: appsToRender.length, limitCount });
    
    appsToRender.forEach((app) => {
        debugLog("Rendering application", { id: app.id, universityName: app.universityName, programName: app.programName });
        
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
                debugLog("Error formatting date", e);
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
    debugLog("Updating profile form with data", userData);
    
    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const educationLevelSelect = document.getElementById('educationLevel');
    const studyDestinationSelect = document.getElementById('studyDestination');
    
    if (fullNameInput) {
        fullNameInput.value = userData.name || '';
        debugLog("Set fullName to", userData.name);
    }
    
    if (phoneNumberInput) {
        phoneNumberInput.value = userData.phone || '';
        debugLog("Set phone to", userData.phone);
    }
    
    if (educationLevelSelect && userData.educationLevel) {
        educationLevelSelect.value = userData.educationLevel;
        debugLog("Set educationLevel to", userData.educationLevel);
    }
    
    if (studyDestinationSelect && userData.studyDestination) {
        studyDestinationSelect.value = userData.studyDestination;
        debugLog("Set studyDestination to", userData.studyDestination);
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
    debugLog("Retrying load applications for", userId);
    loadApplicationsAndProgress(userId);
}

// Setup functions
function setupNavigation() {
    const navLinks = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            this.parentElement.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
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
}

function setupProfileUpdate() {
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    const profileForm = document.getElementById('profileForm');
    
    if (updateProfileBtn) {
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
    
    // Also handle form submission if there's a form element
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
    
    // Add real-time validation
    const fullNameInput = document.getElementById('fullName');
    if (fullNameInput) {
        fullNameInput.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
                showToast("Full name is required", "error");
            } else {
                this.classList.remove('error');
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
    e.preventDefault();
    
    firebase.auth().signOut()
        .then(() => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        })
        .catch((error) => {
            debugLog("Error signing out", error);
            showToast("Error signing out. Please try again.", "error");
        });
}

function showApplicationDetails(applicationId) {
    debugLog("Showing application details for", applicationId);
    // Implementation here
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
    }
}

function updateUserProfile(userId) {
    debugLog("Updating user profile for", userId);
    
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
    
    // Prepare update data
    const updateData = {
        name: fullName,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    if (phoneNumber) updateData.phone = phoneNumber;
    if (educationLevel) updateData.educationLevel = educationLevel;
    if (studyDestination) updateData.studyDestination = studyDestination;
    
    debugLog("Updating profile with data", updateData);
    
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
            debugLog("Profile updated successfully");
            showToast("Profile updated successfully!", "success");
            
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
            
            debugLog("Auth profile updated successfully");
        })
        .catch((error) => {
            debugLog("Error updating profile", error);
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
    debugLog("Showing toast", { message, type });
    
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
