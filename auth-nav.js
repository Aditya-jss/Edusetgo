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
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                `;
            } else {
                dropdown.innerHTML = `
                    <a href="user-dashboard.html"><i class="fas fa-tachometer-alt"></i> My Dashboard</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
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
            
            // Handle logout
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                // Try to sign out with Firebase if available
                if (typeof firebase !== 'undefined' && firebase.auth) {
                    firebase.auth().signOut().catch(error => console.error("Firebase sign out error:", error));
                }
                // Clear session storage
                sessionStorage.removeItem('userLoggedIn');
                sessionStorage.removeItem('userEmail');
                sessionStorage.removeItem('isAdmin');
                // Redirect to home page
                window.location.href = 'index.html';
            });
        } else {
            // Not logged in - show login/register link
            authLink.innerHTML = 'Login / Register';
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
