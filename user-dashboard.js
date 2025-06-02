// Render applications (continued)
function renderApplications(applications, container, limitCount) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Limit the number of applications if needed
    const appsToRender = limitCount ? applications.slice(0, 3) : applications;
    
    // Render each application
    appsToRender.forEach((app) => {
        const appCard = document.createElement('div');
        appCard.className = 'application-card fade-in';
        
        // Format date
        let applicationDate = 'N/A';
        if (app.createdAt) {
            const date = app.createdAt.toDate();
            applicationDate = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
        
        // Get status class
        let statusClass = 'pending';
        if (app.status === 'approved') statusClass = 'approved';
        if (app.status === 'rejected') statusClass = 'rejected';
        if (app.status === 'waitlisted') statusClass = 'waitlisted';
        
        // Calculate progress percentage based on stage
        let progressPercentage = 0;
        switch (app.progress) {
            case 'preparation':
                progressPercentage = 20;
                break;
            case 'submitted':
                progressPercentage = 40;
                break;
            case 'decision':
                progressPercentage = 60;
                break;
            case 'visa':
                progressPercentage = 80;
                break;
            case 'completed':
                progressPercentage = 100;
                break;
        }
        
        // Create application card HTML
        appCard.innerHTML = `
            <div class="application-header">
                <h4>${app.universityName}</h4>
                <span class="application-status ${statusClass}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
            </div>
            <div class="application-body">
                <div class="application-progress">
                    <div class="application-progress-steps">
                        <div class="application-progress-bar" style="width: ${progressPercentage}%"></div>
                        <div class="application-progress-step ${progressPercentage >= 20 ? 'completed' : ''}"></div>
                        <div class="application-progress-step ${progressPercentage >= 40 ? 'completed' : ''}"></div>
                        <div class="application-progress-step ${progressPercentage >= 60 ? 'completed' : ''}"></div>
                        <div class="application-progress-step ${progressPercentage >= 80 ? 'completed' : ''}"></div>
                        <div class="application-progress-step ${progressPercentage >= 100 ? 'completed' : ''}"></div>
                    </div>
                </div>
                <div class="application-details">
                    <div class="application-detail-item">
                        <div class="application-detail-label">Program:</div>
                        <div class="application-detail-value">${app.programName || 'N/A'}</div>
                    </div>
                    <div class="application-detail-item">
                        <div class="application-detail-label">Applied:</div>
                        <div class="application-detail-value">${applicationDate}</div>
                    </div>
                </div>
                <div class="application-actions">
                    <button class="btn btn-primary view-application" data-id="${app.id}">View Details</button>
                </div>
            </div>
        `;
        
        container.appendChild(appCard);
        
        // Add click event to view details button
        const viewBtn = appCard.querySelector('.view-application');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                openApplicationModal(app);
            });
        }
    });
    
    // If no applications to render in the limited view, show view all link
    if (limitCount && applications.length > 0 && appsToRender.length === 0) {
        const viewAllLink = document.createElement('div');
        viewAllLink.className = 'view-all-link';
        viewAllLink.innerHTML = `<a href="#applications" class="view-all">View All Applications</a>`;
        container.appendChild(viewAllLink);
    }
}

// Open application modal
function openApplicationModal(application) {
    const modal = document.getElementById('applicationDetailModal');
    const modalTitle = document.getElementById('applicationTitle');
    const modalContent = document.getElementById('applicationDetailContent');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    // Set modal title
    modalTitle.textContent = `${application.universityName} - ${application.programName || 'Application'}`;
    
    // Format dates
    let applicationDate = 'N/A';
    let decisionDate = 'N/A';
    
    if (application.createdAt) {
        const date = application.createdAt.toDate();
        applicationDate = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    if (application.decisionDate) {
        const date = application.decisionDate.toDate();
        decisionDate = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    // Get status class
    let statusClass = 'pending';
    if (application.status === 'approved') statusClass = 'approved';
    if (application.status === 'rejected') statusClass = 'rejected';
    if (application.status === 'waitlisted') statusClass = 'waitlisted';
    
    // Create progress steps
    const progressSteps = [
        { id: 'preparation', label: 'Preparation' },
        { id: 'submitted', label: 'Submitted' },
        { id: 'decision', label: 'Decision' },
        { id: 'visa', label: 'Visa' },
        { id: 'completed', label: 'Completed' }
    ];
    
    let progressStepsHTML = '';
    let foundCurrent = false;
    
    progressSteps.forEach(step => {
        let className = 'step';
        let icon = '<i class="fas fa-clock"></i>';
        
        if (step.id === application.progress) {
            className += ' active';
            icon = '<i class="fas fa-spinner"></i>';
            foundCurrent = true;
        } else if (!foundCurrent) {
            className += ' completed';
            icon = '<i class="fas fa-check"></i>';
        }
        
        progressStepsHTML += `
            <div class="${className}">
                <div class="step-icon">${icon}</div>
                <div class="step-label">${step.label}</div>
            </div>
        `;
    });
    
    // Set modal content
    modalContent.innerHTML = `
        <div class="application-status-container">
            <h4>Application Status</h4>
            <span class="application-status ${statusClass}">${application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
        </div>
        
        <div class="progress-timeline-container">
            <h4>Progress Timeline</h4>
            <div class="progress-steps">
                ${progressStepsHTML}
            </div>
        </div>
        
        <div class="application-details-container">
            <h4>Application Details</h4>
            <div class="application-detail-item">
                <div class="application-detail-label">University:</div>
                <div class="application-detail-value">${application.universityName}</div>
            </div>
            <div class="application-detail-item">
                <div class="application-detail-label">Program:</div>
                <div class="application-detail-value">${application.programName || 'N/A'}</div>
            </div>
            <div class="application-detail-item">
                <div class="application-detail-label">Applied On:</div>
                <div class="application-detail-value">${applicationDate}</div>
            </div>
            <div class="application-detail-item">
                <div class="application-detail-label">Decision Date:</div>
                <div class="application-detail-value">${decisionDate}</div>
            </div>
            <div class="application-detail-item">
                <div class="application-detail-label">Intake:</div>
                <div class="application-detail-value">${application.intake || 'N/A'}</div>
            </div>
            <div class="application-detail-item">
                <div class="application-detail-label">Application Fee:</div>
                <div class="application-detail-value">${application.applicationFee ? '$' + application.applicationFee : 'N/A'}</div>
            </div>
        </div>
        
        ${application.notes ? `
        <div class="application-notes-container">
            <h4>Notes</h4>
            <div class="application-notes">
                ${application.notes}
            </div>
        </div>
        ` : ''}
        
        ${application.nextSteps ? `
        <div class="next-steps-container">
            <h4>Next Steps</h4>
            <div class="next-steps">
                ${application.nextSteps}
            </div>
        </div>
        ` : ''}
    `;
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('data-appid', application.id);
    
    // Add close event to modal close button
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Close modal
function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
}

// Load notes
function loadNotes(userId, db) {
    const recentNotesList = document.getElementById('recentNotesList');
    const notesContainer = document.getElementById('notesContainer');
    
    // Clear loading indicators
    if (recentNotesList) {
        recentNotesList.innerHTML = '';
    }
    
    if (notesContainer) {
        notesContainer.innerHTML = '';
    }
    
    // Get notes from Firestore
    db.collection('notes')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // No notes found
                const emptyState = `
                    <div class="empty-state">
                        <i class="fas fa-sticky-note"></i>
                        <p>No notes found</p>
                        <p class="text-muted">Notes from your consultants will appear here.</p>
                    </div>
                `;
                
                if (recentNotesList) {
                    recentNotesList.innerHTML = emptyState;
                }
                
                if (notesContainer) {
                    notesContainer.innerHTML = emptyState;
                }
                
                return;
            }
            
            // Process notes
            const notes = [];
            querySnapshot.forEach((doc) => {
                const noteData = doc.data();
                notes.push({
                    id: doc.id,
                    ...noteData
                });
            });
            
            // Render notes
            renderNotes(notes, recentNotesList, true);
            renderNotes(notes, notesContainer, false);
        })
        .catch((error) => {
            console.error("Error getting notes:", error);
            showToast("Error loading notes. Please refresh the page.", "error");
            
            const errorMessage = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error loading notes</p>
                    <p class="text-muted">${error.message}</p>
                </div>
            `;
            
            if (recentNotesList) {
                recentNotesList.innerHTML = errorMessage;
            }
            
            if (notesContainer) {
                notesContainer.innerHTML = errorMessage;
            }
        });
}

// Render notes
function renderNotes(notes, container, limitCount) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Limit the number of notes if needed
    const notesToRender = limitCount ? notes.slice(0, 3) : notes;
    
    // Render each note
    notesToRender.forEach((note) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card fade-in';
        
        // Format date
        let noteDate = 'N/A';
        if (note.createdAt) {
            const date = note.createdAt.toDate();
            noteDate = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
        
        // Create note card HTML
        noteCard.innerHTML = `
            <div class="note-header">
                <div class="note-author">${note.authorName || 'Consultant'}</div>
                <div class="note-date">${noteDate}</div>
            </div>
            <div class="note-content">${note.content}</div>
        `;
        
        container.appendChild(noteCard);
    });
    
    // If no notes to render in the limited view, show view all link
    if (limitCount && notes.length > 0 && notesToRender.length === 0) {
        const viewAllLink = document.createElement('div');
        viewAllLink.className = 'view-all-link';
        viewAllLink.innerHTML = `<a href="#notes" class="view-all">View All Notes</a>`;
        container.appendChild(viewAllLink);
    }
}

// Update user profile
function updateUserProfile(userId) {
    const db = firebase.firestore();
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const educationLevel = document.getElementById('educationLevel').value;
    const studyDestination = document.getElementById('studyDestination').value;
    
    // Validate inputs
    if (!fullName.trim()) {
        showToast("Please enter your full name", "error");
        return;
    }
    
    // Update user document
    db.collection('users').doc(userId).update({
        name: fullName,
        phone: phoneNumber,
        educationLevel: educationLevel,
        studyDestination: studyDestination,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        showToast("Profile updated successfully", "success");
        
        // Update display name in Firebase Auth
        const user = firebase.auth().currentUser;
        if (user) {
            user.updateProfile({
                displayName: fullName
            }).then(() => {
                // Update displayed name in UI
                const userName = document.getElementById('userName');
                const profileName = document.getElementById('profileName');
                
                if (userName) userName.textContent = fullName;
                if (profileName) profileName.textContent = fullName;
            });
        }
    })
    .catch((error) => {
        console.error("Error updating profile:", error);
        showToast("Error updating profile. Please try again.", "error");
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add toast to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all nav items and sections
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding section
            this.parentElement.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            firebase.auth().signOut()
                .then(() => {
                    // Redirect to login page
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error("Error signing out:", error);
                    showToast("Error signing out. Please try again.", "error");
                });
        });
    }
}

// Setup profile update
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

// Initialize Firebase
function initializeFirebase() {
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
    
    return firebase.firestore();
}

// Check if user is authenticated
function checkAuth() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            loadUserData(user);
        } else {
            // No user is signed in, redirect to login
            window.location.href = 'auth.html';
        }
    });
}

// Load user data
function loadUserData(user) {
    const db = firebase.firestore();
    const userId = user.uid;
    
    // Update user info in UI
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    
    if (userName) userName.textContent = user.displayName || 'Student';
    if (userEmail) userEmail.textContent = user.email;
    if (profileName) profileName.textContent = user.displayName || 'Student';
    if (profileEmail) profileEmail.textContent = user.email;
    
    // Get user document from Firestore
    db.collection('users').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                
                // Update profile fields
                const fullNameInput = document.getElementById('fullName');
                const phoneNumberInput = document.getElementById('phoneNumber');
                const educationLevelSelect = document.getElementById('educationLevel');
                const studyDestinationSelect = document.getElementById('studyDestination');
                const profileJoined = document.getElementById('profileJoined');
                
                if (fullNameInput) fullNameInput.value = userData.name || '';
                if (phoneNumberInput) phoneNumberInput.value = userData.phone || '';
                if (educationLevelSelect) educationLevelSelect.value = userData.educationLevel || '';
                if (studyDestinationSelect) studyDestinationSelect.value = userData.studyDestination || '';
                
                // Format joined date
                if (profileJoined && userData.createdAt) {
                    const joinedDate = userData.createdAt.toDate();
                    profileJoined.textContent = 'Joined: ' + joinedDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                }
                
                // Update progress timeline
                updateProgressTimeline(userData.progressPercentage || 0, userData.progressStage || 'preparation');
            }
            
            // Load applications and notes
            loadApplications(userId, db);
            loadNotes(userId, db);
        })
        .catch((error) => {
            console.error("Error getting user data:", error);
            showToast("Error loading user data. Please refresh the page.", "error");
        });
}

// Update progress timeline
function updateProgressTimeline(percentage, currentStage) {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const stages = ['preparation', 'applications', 'offers', 'visa', 'departure'];
    
    // Update progress bar
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    // Update percentage text
    if (progressPercentage) {
        progressPercentage.textContent = percentage + '% Complete';
    }
    
    // Update steps
    const currentStageIndex = stages.indexOf(currentStage);
    
    steps.forEach((stepId, index) => {
        const stepElement = document.getElementById(stepId);
        if (stepElement) {
            // Remove all classes first
            stepElement.classList.remove('active', 'completed');
            
            // Add appropriate class
            if (index < currentStageIndex) {
                stepElement.classList.add('completed');
            } else if (index === currentStageIndex) {
                stepElement.classList.add('active');
            }
        }
    });
}

// Load applications
function loadApplications(userId, db) {
    const recentApplicationsList = document.getElementById('recentApplicationsList');
    const applicationsContainer = document.getElementById('applicationsContainer');
    
    // Clear loading indicators
    if (recentApplicationsList) {
        recentApplicationsList.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading applications...</div>';
    }
    
    if (applicationsContainer) {
        applicationsContainer.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading applications...</div>';
    }
    
    // Get applications from Firestore
    db.collection('applications')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // No applications found
                const emptyState = `
                    <div class="empty-state">
                        <i class="fas fa-file-alt"></i>
                        <p>No applications found</p>
                        <p class="text-muted">Your applications will appear here once they are created.</p>
                    </div>
                `;
                
                if (recentApplicationsList) {
                    recentApplicationsList.innerHTML = emptyState;
                }
                
                if (applicationsContainer) {
                    applicationsContainer.innerHTML = emptyState;
                }
                
                return;
            }
            
            // Process applications
            const applications = [];
            querySnapshot.forEach((doc) => {
                const appData = doc.data();
                applications.push({
                    id: doc.id,
                    ...appData
                });
            });
            
            // Render applications
            renderApplications(applications, recentApplicationsList, true);
            renderApplications(applications, applicationsContainer, false);
        })
        .catch((error) => {
            console.error("Error getting applications:", error);
            showToast("Error loading applications. Please refresh the page.", "error");
            
            const errorMessage = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error loading applications</p>
                    <p class="text-muted">${error.message}</p>
                </div>
            `;
            
            if (recentApplicationsList) {
                recentApplicationsList.innerHTML = errorMessage;
            }
            
            if (applicationsContainer) {
                applicationsContainer.innerHTML = errorMessage;
            }
        });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    initializeFirebase();
    
    // Check authentication
    checkAuth();
    
    // Setup navigation
    setupNavigation();
    
    // Setup logout
    setupLogout();
    
    // Setup profile update
    setupProfileUpdate();
    
    console.log('User dashboard initialized');
});
