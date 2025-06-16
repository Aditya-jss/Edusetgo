// Common navigation bar authentication handler
function handleAuthNavigation() {
    const authLink = document.getElementById('authLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const userEmail = sessionStorage.getItem('userEmail');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
    // Show/hide dashboard link based on login status AND user role
    if (dashboardLink) {
        dashboardLink.style.display = (isLoggedIn && !isAdmin) ? 'block' : 'none';
    }
    
    if (authLink) {
        // Clear any existing dropdown from previous renders
        const existingDropdown = authLink.parentNode.querySelector('.user-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }
        
        if (isLoggedIn) {
            // Create dropdown for logged-in user
            authLink.innerHTML = `<span class="user-menu-toggle"><i class="fas fa-user-circle"></i> ${userEmail ? userEmail.split('@')[0] : 'User'} <i class="fas fa-caret-down"></i></span>`;
            authLink.href = '#';
            
            // Create dropdown menu
            const dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            
            // Add appropriate links based on user type
            if (isAdmin) {
                dropdown.innerHTML = `
                    <a href="admin-dashboard.html"><i class="fas fa-tachometer-alt"></i> Admin Dashboard</a>
                    <a href="admin-meetings.html"><i class="fas fa-calendar-check"></i> My Meetings</a>
                `;
            } else {
                dropdown.innerHTML = `
                    <a href="user-dashboard.html"><i class="fas fa-tachometer-alt"></i> My Dashboard</a>
                    <a href="user-meetings.html"><i class="fas fa-calendar-check"></i> My Meetings</a>
                `;
            }
            
            // Append dropdown to auth link
            authLink.parentNode.style.position = 'relative';
            authLink.parentNode.appendChild(dropdown);
            
            // Toggle dropdown on click
            authLink.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('show-dropdown');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                // Check if dropdown exists and is shown
                if (dropdown && dropdown.classList.contains('show-dropdown')) {
                    // If click is outside the auth link and dropdown
                    if (!authLink.contains(e.target) && !dropdown.contains(e.target)) {
                        dropdown.classList.remove('show-dropdown');
                    }
                }
            });
            
            // Handle logout
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Try to sign out with Firebase if available
                if (typeof firebase !== 'undefined' && firebase.auth) {
                    firebase.auth().signOut().then(() => {
                        // Clear session storage
                        sessionStorage.clear();
                        // Clear local storage auth data
                        localStorage.removeItem('firebase:authUser');
                        localStorage.removeItem('firebase:session');
                        
                        // Clear any auth cookies
                        document.cookie.split(";").forEach(function(c) {
                            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                        });
                        
                        // Force reload to clear any cached auth state
                        window.location.href = 'index.html';
                    }).catch(error => {
                        console.error("Firebase sign out error:", error);
                        // Still clear session and redirect even if Firebase logout fails
                        sessionStorage.clear();
                        window.location.href = 'index.html';
                    });
                } else {
                    // Clear session storage
                    sessionStorage.clear();
                    // Redirect to home page
                    window.location.href = 'index.html';
                }
            });
        } else {
            // Not logged in - show login/sign up link
            authLink.innerHTML = 'Login or Sign up';
            authLink.href = 'auth.html';
        }
    }
}

// Run on DOM content loaded
document.addEventListener('DOMContentLoaded', handleAuthNavigation);

// Also add event listener for storage changes to handle logout in other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'userLoggedIn' || e.key === null) {
        handleAuthNavigation();
    }
});

// Add history state change detection for back button
window.addEventListener('popstate', function(event) {
    // If we're on a protected page and not logged in, redirect to auth
    const isProtectedPage = window.location.pathname.includes('dashboard.html');
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    if (isProtectedPage && !isLoggedIn) {
        window.location.href = 'auth.html';
    }
});
