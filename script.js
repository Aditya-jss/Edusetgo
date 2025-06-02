document.addEventListener('DOMContentLoaded', function() {
    const authLink = document.getElementById('authLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    // Show/hide dashboard link based on login status
    if (dashboardLink) {
        if (isLoggedIn) {
            dashboardLink.style.display = 'block';
        } else {
            dashboardLink.style.display = 'none';
        }
    }
    
    if (isLoggedIn && authLink) {
        // Create dropdown for logged-in user
        authLink.innerHTML = `<span class="user-menu-toggle"><i class="fas fa-user-circle"></i> ${userEmail.split('@')[0]} <i class="fas fa-caret-down"></i></span>`;
        authLink.href = '#';
        
        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'user-dropdown';
        
        // Add admin dashboard link if user is admin
        if (isAdmin) {
            dropdown.innerHTML = `
                <a href="admin-dashboard.html"><i class="fas fa-tachometer-alt"></i> Admin Dashboard</a>
                <a href="profile.html"><i class="fas fa-id-card"></i> My Profile</a>
                <a href="applications.html"><i class="fas fa-file-alt"></i> My Applications</a>
                <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            `;
        } else {
            dropdown.innerHTML = `
                <a href="profile.html"><i class="fas fa-id-card"></i> My Profile</a>
                <a href="applications.html"><i class="fas fa-file-alt"></i> My Applications</a>
                <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
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
            sessionStorage.removeItem('userLoggedIn');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('isAdmin');
            window.location.reload();
        });
    }
});
