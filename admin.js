document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and is admin
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
    if (!isLoggedIn || !isAdmin) {
        // Redirect non-admin users to login page
        window.location.href = 'auth.html';
        return;
    }
    
    // Display admin email in the sidebar
    const adminEmail = sessionStorage.getItem('userEmail');
    const adminNameElements = document.querySelectorAll('.admin-profile h3');
    const adminEmailElements = document.querySelectorAll('.admin-profile p');
    
    adminNameElements.forEach(element => {
        element.textContent = adminEmail ? adminEmail.split('@')[0] : 'Admin User';
    });
    
    adminEmailElements.forEach(element => {
        element.textContent = adminEmail || 'admin@edusetgo.com';
    });
    
    // Initialize Firebase and load data
    initializeFirebase();
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');

    function handleLogout(e) {
        e.preventDefault();
        
        // Try to sign out with Firebase if available
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().signOut().catch(error => console.error("Firebase sign out error:", error));
        }
        
        // Clear session storage
        sessionStorage.removeItem('userLoggedIn');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('isAdmin');
        
        // Redirect to login page
        window.location.href = 'index.html';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', handleLogout);
    }
    
    // Navigation functionality
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
    
    // Setup modal functionality
    setupModals();
});

// Initialize Firebase and load data
function initializeFirebase() {
    try {
        // Firebase configuration
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
        
        // Load users for the table
        loadUsers(db);
        
        // Load dashboard stats
        updateDashboardStats(db);
        
        // Load recent activity
        loadRecentActivity(db);
        
        console.log("Firebase data loaded successfully");
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}

// Load users from Firestore
function loadUsers(db) {
    console.log("Loading users from Firestore...");
    const userTableBody = document.querySelector('#users .data-table tbody');
    if (!userTableBody) {
        console.error("User table body not found in the DOM");
        return;
    }
    
    // Clear existing rows
    userTableBody.innerHTML = '';
    
    db.collection('users')
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
            console.log("User query returned:", querySnapshot.size, "users");
            
            if (querySnapshot.empty) {
                userTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No users found</td></tr>';
                return;
            }
            
            let userCount = 0;
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                console.log("User data:", userData);
                userCount++;
                
                // Format date
                let registrationDate = 'N/A';
                if (userData.createdAt) {
                    const date = userData.createdAt.toDate();
                    registrationDate = date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                }
                
                // Create row
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${userData.name || userData.email.split('@')[0]}</td>
                    <td>${userData.email || 'N/A'}</td>
                    <td>${registrationDate}</td>
                    <td>${userData.applications?.length || 0}</td>
                    <td class="actions-cell">
                        <button class="action-btn view-btn" data-userid="${doc.id}"><i class="fas fa-eye"></i></button>
                    </td>
                `;
                
                userTableBody.appendChild(row);
            });
            
            // Update total users count in dashboard
            const totalUsersElement = document.querySelector('.stats-cards .card:first-child p');
            if (totalUsersElement) {
                totalUsersElement.textContent = userCount;
            }
            
            // Add event listeners to view buttons
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-userid');
                    openUserDetailModal(userId, db);
                });
            });
        })
        .catch((error) => {
            console.error("Error getting users:", error);
            userTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Error loading users: ' + error.message + '</td></tr>';
        });
}

// Update dashboard stats
function updateDashboardStats(db) {
    // Update universities count
    db.collection('universities').get()
        .then(snapshot => {
            const universitiesElement = document.querySelector('.stats-cards .card:nth-child(2) p');
            if (universitiesElement) {
                universitiesElement.textContent = snapshot.size;
            }
        })
        .catch(error => console.error("Error getting universities:", error));
    
    // Update applications count
    db.collection('applications').get()
        .then(snapshot => {
            const applicationsElement = document.querySelector('.stats-cards .card:nth-child(3) p');
            if (applicationsElement) {
                applicationsElement.textContent = snapshot.size;
            }
        })
        .catch(error => console.error("Error getting applications:", error));
}

// Load recent activity
function loadRecentActivity(db) {
    const activityList = document.querySelector('.recent-activity ul');
    if (!activityList) return;
    
    // Clear existing activities
    activityList.innerHTML = '';
    
    db.collection('activities')
        .orderBy('timestamp', 'desc')
        .limit(5)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                activityList.innerHTML = '<li><span class="activity-text">No recent activity</span></li>';
                return;
            }
            
            querySnapshot.forEach((doc) => {
                const activity = doc.data();
                
                // Format time
                let timeAgo = 'N/A';
                if (activity.timestamp) {
                    const now = new Date();
                    const activityTime = activity.timestamp.toDate();
                    const diffMs = now - activityTime;
                    const diffMins = Math.round(diffMs / 60000);
                    
                    if (diffMins < 60) {
                        timeAgo = `${diffMins} mins ago`;
                    } else if (diffMins < 1440) {
                        timeAgo = `${Math.round(diffMins / 60)} hours ago`;
                    } else {
                        timeAgo = `${Math.round(diffMins / 1440)} days ago`;
                    }
                }
                
                // Create activity item
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="activity-time">${timeAgo}</span>
                    <span class="activity-text">${activity.text}</span>
                `;
                
                activityList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error("Error getting activities:", error);
            activityList.innerHTML = '<li><span class="activity-text">Error loading activities</span></li>';
        });
}

// Open user detail modal
function openUserDetailModal(userId, db) {
    const modal = document.getElementById('userDetailModal');
    if (!modal) return;
    
    // Store user ID in data attribute
    modal.setAttribute('data-userid', userId);
    
    // Get user data
    db.collection('users').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                
                // Update modal with user data
                document.getElementById('userDetailName').textContent = userData.name || userData.email.split('@')[0];
                document.getElementById('userDetailEmail').textContent = userData.email || 'N/A';
                
                // Format joined date
                let joinedDate = 'N/A';
                if (userData.createdAt) {
                    const date = userData.createdAt.toDate();
                    joinedDate = date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                }
                document.getElementById('userDetailJoined').textContent = `Joined: ${joinedDate}`;
                
                // Load user applications
                loadUserApplications(userId, db);
                
                // Load user notes
                loadUserNotes(userId, db);
                
                // Show modal
                modal.classList.add('active');
                
                // Setup close modal functionality
                const closeButtons = modal.querySelectorAll('.close-modal');
                closeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        modal.classList.remove('active');
                    });
                });
            } else {
                console.error("User not found");
            }
        })
        .catch((error) => {
            console.error("Error getting user:", error);
        });
}

// Load user applications
function loadUserApplications(userId, db) {
    const applicationList = document.querySelector('#userApplications .application-list');
    if (!applicationList) return;
    
    // Clear existing applications
    applicationList.innerHTML = '';
    
    db.collection('applications')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                applicationList.innerHTML = '<p>No applications found</p>';
                return;
            }
            
            querySnapshot.forEach((doc) => {
                const application = doc.data();
                
                // Create application item
                const applicationItem = document.createElement('div');
                applicationItem.className = 'application-item';
                applicationItem.innerHTML = `
                    <div class="application-header">
                        <h4>${application.universityName || 'Unknown University'} - ${application.programName || 'Unknown Program'}</h4>
                        <span class="application-status ${application.status || 'pending'}">${getStatusText(application.status)}</span>
                    </div>
                    <div class="application-progress">
                        <div class="progress-steps">
                            ${createProgressSteps(application.progress || 'documents')}
                        </div>
                    </div>
                    <div class="application-actions">
                        <button class="btn btn-primary btn-sm update-progress-btn" data-appid="${doc.id}">Update Progress</button>
                    </div>
                `;
                
                applicationList.appendChild(applicationItem);
            });
            
            // Add event listeners to update progress buttons
            document.querySelectorAll('.update-progress-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const appId = this.getAttribute('data-appid');
                    openUpdateProgressModal(appId, db);
                });
            });
        })
        .catch((error) => {
            console.error("Error getting applications:", error);
            applicationList.innerHTML = '<p>Error loading applications</p>';
        });
}

// Load user notes
function loadUserNotes(userId, db) {
    const notesContainer = document.querySelector('#userNotes .notes-container');
    if (!notesContainer) return;
    
    // Clear existing notes
    notesContainer.innerHTML = '';
    
    db.collection('notes')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                notesContainer.innerHTML = '<p>No notes found</p>';
                return;
            }
            
            querySnapshot.forEach((doc) => {
                const note = doc.data();
                
                // Format date
                let noteDate = 'N/A';
                if (note.timestamp) {
                    const date = note.timestamp.toDate();
                    noteDate = date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                }
                
                // Create note item
                const noteItem = document.createElement('div');
                noteItem.className = 'note-item';
                noteItem.innerHTML = `
                    <div class="note-header">
                        <span class="note-date">${noteDate}</span>
                        <span class="note-author">by ${note.authorName || 'Admin'}</span>
                    </div>
                    <div class="note-content">
                        <p>${note.content}</p>
                    </div>
                `;
                
                notesContainer.appendChild(noteItem);
            });
        })
        .catch((error) => {
            console.error("Error getting notes:", error);
            notesContainer.innerHTML = '<p>Error loading notes</p>';
        });
}

// Helper functions
function getStatusText(status) {
    switch (status) {
        case 'pending': return 'In Progress';
        case 'approved': return 'Approved';
        case 'rejected': return 'Rejected';
        case 'waitlisted': return 'Waitlisted';
        default: return 'In Progress';
    }
}

function createProgressSteps(currentProgress) {
    const steps = [
        { id: 'documents', label: 'Documents' },
        { id: 'sop', label: 'SOP/LOR' },
        { id: 'review', label: 'University Review' },
        { id: 'decision', label: 'Decision' },
        { id: 'visa', label: 'Visa' }
    ];
    
    let html = '';
    let foundCurrent = false;
    
    steps.forEach(step => {
        let className = 'step';
        let icon = '<i class="fas fa-clock"></i>';
        
        if (step.id === currentProgress) {
            className += ' active';
            icon = '<i class="fas fa-spinner"></i>';
            foundCurrent = true;
        } else if (!foundCurrent) {
            className += ' completed';
            icon = '<i class="fas fa-check"></i>';
        }
        
        html += `
            <div class="${className}">
                <div class="step-icon">${icon}</div>
                <div class="step-label">${step.label}</div>
            </div>
        `;
    });
    
    return html;
}

// Add note to user
function addNoteToUser(userId, db) {
    const noteContent = document.querySelector('#userNotes textarea').value.trim();
    if (!noteContent) {
        alert('Please enter a note before saving');
        return;
    }
    
    const adminEmail = sessionStorage.getItem('userEmail') || 'admin@edusetgo.com';
    const adminName = adminEmail.split('@')[0];
    
    const noteData = {
        userId: userId,
        content: noteContent,
        authorName: adminName,
        authorEmail: adminEmail,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('notes').add(noteData)
        .then(() => {
            // Clear textarea
            document.querySelector('#userNotes textarea').value = '';
            
            // Reload notes
            loadUserNotes(userId, db);
            
            // Add to activity log
            addActivity(`Admin added a note for user`, db);
            
            // Show success message
            showToast('Note added successfully');
        })
        .catch(error => {
            console.error('Error adding note:', error);
            alert('Error adding note: ' + error.message);
        });
}

// Save university to user's applications
function saveUniversityToUser(userId, db) {
    const universityName = document.getElementById('universityName').value.trim();
    const programName = document.getElementById('programName').value.trim();
    const progressStatus = document.getElementById('progressStatus').value;
    const applicationStatus = document.getElementById('applicationStatus').value;
    
    if (!universityName || !programName) {
        alert('Please enter university and program name');
        return;
    }
    
    const applicationData = {
        userId: userId,
        universityName: universityName,
        programName: programName,
        progress: progressStatus,
        status: applicationStatus,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('applications').add(applicationData)
        .then((docRef) => {
            // Close modal
            document.getElementById('addUniversityModal').classList.remove('active');
            
            // Reload applications
            loadUserApplications(userId, db);
            
            // Update user's application count
            updateUserApplicationCount(userId, db);
            
            // Update user's progress timeline
            updateUserProgressTimeline(userId, db);
            
            // Add to activity log
            addActivity(`Admin added ${universityName} application for user`, db);
            
            // Show success message
            showToast('University added successfully');
        })
        .catch(error => {
            console.error('Error adding university:', error);
            alert('Error adding university: ' + error.message);
        });
}

// Update user's application count
function updateUserApplicationCount(userId, db) {
    db.collection('applications')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
            const count = querySnapshot.size;
            
            // Update user document with application count
            db.collection('users').doc(userId).update({
                applications: count
            })
            .catch(error => {
                console.error('Error updating user application count:', error);
            });
        })
        .catch(error => {
            console.error('Error counting applications:', error);
        });
}

// Update user's progress timeline
function updateUserProgressTimeline(userId, db) {
    db.collection('applications')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
            // Calculate progress percentage based on application stages
            let progressPercentage = 0;
            let currentStage = 'preparation';
            
            if (querySnapshot.size > 0) {
                // User has applications, so they're at least at stage 2
                currentStage = 'applications';
                progressPercentage = 35;
                
                // Check if any applications are in later stages
                querySnapshot.forEach(doc => {
                    const app = doc.data();
                    
                    if (app.progress === 'decision' && (app.status === 'approved' || app.status === 'waitlisted')) {
                        currentStage = 'offers';
                        progressPercentage = 60;
                    }
                    
                    if (app.progress === 'visa') {
                        currentStage = 'visa';
                        progressPercentage = 80;
                    }
                    
                    if (app.progress === 'completed') {
                        currentStage = 'departure';
                        progressPercentage = 100;
                    }
                });
            }
            
            // Update user document with progress information
            db.collection('users').doc(userId).update({
                progressStage: currentStage,
                progressPercentage: progressPercentage,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log('User progress updated successfully');
            })
            .catch(error => {
                console.error('Error updating user progress:', error);
            });
        })
        .catch(error => {
            console.error('Error calculating progress:', error);
        });
}

// Add activity to activity log
function addActivity(text, db) {
    const activityData = {
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('activities').add(activityData)
        .catch(error => {
            console.error('Error adding activity:', error);
        });
}

// Show toast notification
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Update application progress
function openUpdateProgressModal(appId, db) {
    const modal = document.getElementById('updateProgressModal');
    if (!modal) return;
    
    // Store application ID in data attribute
    modal.setAttribute('data-appid', appId);
    
    // Show modal
    modal.classList.add('active');
    
    // Setup save button
    const saveBtn = document.getElementById('saveProgressBtn');
    if (saveBtn) {
        // Remove existing event listeners
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        
        // Add new event listener
        newSaveBtn.addEventListener('click', function() {
            updateApplicationProgress(db);
        });
    }
}

// Update application progress
function updateApplicationProgress(db) {
    const modal = document.getElementById('updateProgressModal');
    const appId = modal.getAttribute('data-appid');
    
    const newProgress = document.getElementById('newProgressStatus').value;
    const newStatus = document.getElementById('newApplicationStatus').value;
    const progressNote = document.getElementById('progressNote').value.trim();
    
    // Update application
    db.collection('applications').doc(appId).get()
        .then((doc) => {
            if (doc.exists) {
                const appData = doc.data();
                const userId = appData.userId;
                
                // Update application document
                db.collection('applications').doc(appId).update({
                    progress: newProgress,
                    status: newStatus,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    // Close modal
                    modal.classList.remove('active');
                    
                    // Add note if provided
                    if (progressNote) {
                        const adminEmail = sessionStorage.getItem('userEmail') || 'admin@edusetgo.com';
                        const adminName = adminEmail.split('@')[0];
                        
                        const noteData = {
                            userId: userId,
                            content: `[Progress Update] ${progressNote}`,
                            authorName: adminName,
                            authorEmail: adminEmail,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        };
                        
                        db.collection('notes').add(noteData);
                    }
                    
                    // Update user's progress timeline
                    updateUserProgressTimeline(userId, db);
                    
                    // Add to activity log
                    addActivity(`Application progress updated to ${newProgress}`, db);
                    
                    // Reload applications
                    loadUserApplications(userId, db);
                    
                    // Show success message
                    showToast('Progress updated successfully');
                })
                .catch(error => {
                    console.error('Error updating application:', error);
                    alert('Error updating application: ' + error.message);
                });
            }
        })
        .catch(error => {
            console.error('Error getting application:', error);
            alert('Error getting application: ' + error.message);
        });
}

// Setup modals
function setupModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Tab functionality in user detail modal
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Add University button
    const addUniversityBtn = document.getElementById('addUniversityBtn');
    if (addUniversityBtn) {
        addUniversityBtn.addEventListener('click', function() {
            const modal = document.getElementById('addUniversityModal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    }
    
    // Save University button
    const saveUniversityBtn = document.getElementById('saveUniversityBtn');
    if (saveUniversityBtn) {
        saveUniversityBtn.addEventListener('click', function() {
            const userId = document.getElementById('userDetailModal').getAttribute('data-userid');
            const db = firebase.firestore();
            saveUniversityToUser(userId, db);
        });
    }
    
    // Add Note button
    const addNoteBtn = document.querySelector('#userNotes .btn-primary');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function() {
            const userId = document.getElementById('userDetailModal').getAttribute('data-userid');
            const db = firebase.firestore();
            addNoteToUser(userId, db);
        });
    }
}
