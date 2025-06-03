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

// Remove debug logging function and its usage
function debugLog(message, data = null) {
    // Function body removed - no longer needed
}

function createDebugDiv() {
    // Function body removed - no longer needed
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
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
                
                // Load notes
                loadNotes(userId);
                
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
                    loadNotes(userId);
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
    
    // Update progress circle
    updateProgressCircle(progressPercentage, currentStage);
    
    // Update user document with progress stage
    db.collection('users').doc(userId).update({
        progressStage: currentStage,
        progressPercentage: progressPercentage
    }).catch(error => {
        console.error("Error updating user progress stage:", error);
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

function loadNotes(userId) {
    debugLog("Loading notes for user", userId);
    
    const recentNotesList = document.getElementById('recentNotesList');
    const notesContainer = document.getElementById('notesContainer');
    
    if (recentNotesList) {
        recentNotesList.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading notes...</div>';
    }
    
    if (notesContainer) {
        notesContainer.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading notes...</div>';
    }
    
    db.collection('notes')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            debugLog("Notes query returned", querySnapshot.size);
            
            if (querySnapshot.empty) {
                const emptyState = `
                    <div class="empty-state">
                        <i class="fas fa-sticky-note"></i>
                        <p>No notes found</p>
                        <p class="text-muted">Notes from your consultants will appear here.</p>
                    </div>
                `;
                
                if (recentNotesList) recentNotesList.innerHTML = emptyState;
                if (notesContainer) notesContainer.innerHTML = emptyState;
                return;
            }
            
            const notes = [];
            querySnapshot.forEach((doc) => {
                const noteData = doc.data();
                notes.push({
                    id: doc.id,
                    ...noteData
                });
            });
            
            renderNotes(notes, recentNotesList, true);
            renderNotes(notes, notesContainer, false);
        })
        .catch((error) => {
            debugLog("Error getting notes", error);
            const errorMessage = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No notes available</p>
                    <p class="text-muted">Consultant notes will appear here when available.</p>
                </div>
            `;
            
            if (recentNotesList) recentNotesList.innerHTML = errorMessage;
            if (notesContainer) notesContainer.innerHTML = errorMessage;
        });
}

function renderNotes(notes, container, limitCount) {
    if (!container) return;
    
    container.innerHTML = '';
    
    const notesToRender = limitCount ? notes.slice(0, 3) : notes;
    
    notesToRender.forEach((note) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card fade-in';
        
        let noteDate = 'N/A';
        const dateField = note.timestamp || note.createdAt;
        if (dateField) {
            try {
                const date = dateField.toDate ? dateField.toDate() : new Date(dateField);
                noteDate = date.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            } catch (e) {
                debugLog("Error formatting note date", e);
            }
        }
        
        noteCard.innerHTML = `
            <div class="note-header">
                <div class="note-author">${note.authorName || 'Consultant'}</div>
                <div class="note-date">${noteDate}</div>
            </div>
            <div class="note-content">${note.content || 'No content'}</div>
        `;
        
        container.appendChild(noteCard);
    });
}

function updateProfileForm(userData) {
    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const educationLevelSelect = document.getElementById('educationLevel');
    const studyDestinationSelect = document.getElementById('studyDestination');
    
    if (fullNameInput) fullNameInput.value = userData.name || '';
    if (phoneNumberInput) phoneNumberInput.value = userData.phone || '';
    if (educationLevelSelect && userData.educationLevel) educationLevelSelect.value = userData.educationLevel;
    if (studyDestinationSelect && userData.studyDestination) studyDestinationSelect.value = userData.studyDestination;
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
    
    if (updateProfileBtn) {
        updateProfileBtn.addEventListener('click', function() {
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
    // Implementation here
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

// Add this function to update the progress circle
function updateProgressCircle(percentage, currentStage) {
    const progressCircle = document.getElementById('progressCircle');
    const progressCirclePercentage = document.getElementById('progressCirclePercentage');
    const currentStageLabel = document.getElementById('currentStageLabel');
    const nextStepLabel = document.getElementById('nextStepLabel');
    
    if (progressCirclePercentage) {
        progressCirclePercentage.textContent = percentage + '%';
    }
    
    if (progressCircle) {
        // Update circle visual (if you're using a CSS-based circle)
        progressCircle.style.background = `conic-gradient(#4e54c8 ${percentage}%, #f1f1f1 0%)`;
    }
    
    if (currentStageLabel) {
        // Capitalize first letter of stage
        const formattedStage = currentStage.charAt(0).toUpperCase() + currentStage.slice(1);
        currentStageLabel.textContent = formattedStage;
    }
    
    if (nextStepLabel) {
        // Set next step based on current stage
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
    
    // Update journey steps
    updateJourneySteps(currentStage);
}

// Add this function to update journey steps
function updateJourneySteps(currentStage) {
    const stages = ['preparation', 'applications', 'offers', 'visa', 'departure'];
    const currentStageIndex = stages.indexOf(currentStage);
    
    for (let i = 1; i <= 5; i++) {
        const journeyStep = document.getElementById(`journeyStep${i}`);
        if (journeyStep) {
            journeyStep.classList.remove('active', 'completed');
            
            const statusIndicator = journeyStep.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.textContent = 'Pending';
                statusIndicator.classList.remove('active', 'completed');
            }
            
            if (i - 1 < currentStageIndex) {
                journeyStep.classList.add('completed');
                if (statusIndicator) {
                    statusIndicator.textContent = 'Completed';
                    statusIndicator.classList.add('completed');
                }
            } else if (i - 1 === currentStageIndex) {
                journeyStep.classList.add('active');
                if (statusIndicator) {
                    statusIndicator.textContent = 'In Progress';
                    statusIndicator.classList.add('active');
                }
            }
        }
    }
}
