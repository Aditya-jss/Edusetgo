// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLAHgSs8caqBdjbuNqUFs21vb24NO28_U",
    authDomain: "edusetgo-c895f.firebaseapp.com",
    projectId: "edusetgo-c895f",
    storageBucket: "edusetgo-c895f.appspot.com",
    messagingSenderId: "356614273448",
    appId: "1:356614273448:web:ab2de825d2c810cbc9459d",
    measurementId: "G-N5JFFCJ1L2"
};

// Initialize Firebase
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Display current domain for debugging
    const currentDomain = window.location.hostname;
    console.log("Current domain:", currentDomain);
    
    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();
        console.log("Firebase initialized successfully");
        
        // Tab switching functionality
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const forgotPasswordLink = document.getElementById('forgotPassword');
        const backToLoginLink = document.getElementById('backToLogin');
        
        // Switch to login tab
        loginTab.addEventListener('click', function() {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            forgotPasswordForm.style.display = 'none';
        });
        
        // Switch to register tab
        registerTab.addEventListener('click', function() {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
            forgotPasswordForm.style.display = 'none';
        });
        
        // Show forgot password form
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            forgotPasswordForm.style.display = 'block';
        });
        
        // Back to login from forgot password
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
        
        // Login form submission
        const userLoginForm = document.getElementById('userLoginForm');
        userLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const loginErrorMessage = document.getElementById('loginErrorMessage');
            
            // Clear previous error messages
            loginErrorMessage.innerHTML = '';
            
            // Show loading state
            const submitBtn = userLoginForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            
            // Sign in with email and password
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("User signed in:", user.uid);
                    
                    // Check if user is admin
                    db.collection('users').doc(user.uid).get()
                        .then((doc) => {
                            // Set session storage
                            sessionStorage.setItem('userLoggedIn', 'true');
                            sessionStorage.setItem('userEmail', user.email);
                            
                            if (doc.exists && doc.data().isAdmin === true) {
                                sessionStorage.setItem('isAdmin', 'true');
                                window.location.href = 'admin-dashboard.html';
                            } else {
                                window.location.href = 'index.html';
                            }
                        })
                        .catch((error) => {
                            console.error("Error checking user role:", error);
                            window.location.href = 'index.html';
                        });
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Login error:", error);
                    
                    // Show error message
                    loginErrorMessage.innerHTML = `
                        <div class="auth-message auth-error">
                            ${getErrorMessage(error.code)}
                        </div>
                    `;
                    
                    // Reset button
                    submitBtn.textContent = 'Login';
                    submitBtn.disabled = false;
                });
        });
        
        // Registration form submission
        const userRegisterForm = document.getElementById('userRegisterForm');
        userRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const registerErrorMessage = document.getElementById('registerErrorMessage');
            
            // Clear previous error messages
            registerErrorMessage.innerHTML = '';
            
            // Validate passwords match
            if (password !== confirmPassword) {
                registerErrorMessage.innerHTML = `
                    <div class="auth-message auth-error">
                        Passwords do not match. Please try again.
                    </div>
                `;
                return;
            }
            
            // Show loading state
            const submitBtn = userRegisterForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
            
            // Create user with email and password
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log("User created:", user.uid);
                    
                    // Update display name
                    return user.updateProfile({
                        displayName: name
                    }).then(() => {
                        // Add user data to Firestore
                        return db.collection('users').doc(user.uid).set({
                            name: name,
                            email: email,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            progressStage: 'preparation',
                            isAdmin: false
                        });
                    });
                })
                .then(() => {
                    // Set session storage
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                    sessionStorage.setItem('needsProfileCompletion', 'true');
                    
                    // Show success message
                    registerErrorMessage.innerHTML = `
                        <div class="auth-message auth-success">
                            Account created successfully! Redirecting to profile setup...
                        </div>
                    `;
                    
                    // Redirect to profile page immediately
                    window.location.href = 'user-dashboard.html#profile';
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Registration error:", error);
                    
                    // Show error message
                    registerErrorMessage.innerHTML = `
                        <div class="auth-message auth-error">
                            ${getErrorMessage(error.code)}
                        </div>
                    `;
                    
                    // Reset button
                    submitBtn.textContent = 'Create Account';
                    submitBtn.disabled = false;
                });
        });
        
        // Password reset form submission
        const passwordResetForm = document.getElementById('passwordResetForm');
        passwordResetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value;
            const resetErrorMessage = document.getElementById('resetErrorMessage');
            
            // Clear previous error messages
            resetErrorMessage.innerHTML = '';
            
            // Show loading state
            const submitBtn = passwordResetForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send password reset email
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    // Show success message
                    resetErrorMessage.innerHTML = `
                        <div class="auth-message auth-success">
                            Password reset email sent! Check your inbox for further instructions.
                        </div>
                    `;
                    
                    // Reset form
                    passwordResetForm.reset();
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Password reset error:", error);
                    
                    // Show error message
                    resetErrorMessage.innerHTML = `
                        <div class="auth-message auth-error">
                            ${getErrorMessage(error.code)}
                        </div>
                    `;
                })
                .finally(() => {
                    // Reset button
                    submitBtn.textContent = 'Send Reset Link';
                    submitBtn.disabled = false;
                });
        });
        
        // Google Sign In
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        const googleSignupBtn = document.getElementById('googleSignupBtn');

        const handleGoogleSignIn = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            
            auth.signInWithPopup(provider)
                .then((result) => {
                    // Google Sign In successful
                    const user = result.user;
                    console.log("Google sign-in successful:", user.uid);
                    
                    // Check if user exists in Firestore
                    return db.collection('users').doc(user.uid).get()
                        .then((doc) => {
                            const isNewUser = !doc.exists;
                            
                            if (isNewUser) {
                                // Create new user document if first time login
                                return db.collection('users').doc(user.uid).set({
                                    name: user.displayName || '',
                                    email: user.email,
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                    progressStage: 'preparation',
                                    isAdmin: false
                                }).then(() => {
                                    return { isNewUser: true };
                                });
                            }
                            
                            // Check if profile is incomplete
                            const userData = doc.data();
                            const isProfileIncomplete = !userData.phone || !userData.educationLevel || !userData.studyDestination;
                            
                            return { 
                                isNewUser: isNewUser,
                                isProfileIncomplete: isProfileIncomplete,
                                isAdmin: userData.isAdmin === true
                            };
                        });
                })
                .then((result) => {
                    // Set session storage
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', auth.currentUser.email);
                    
                    if (result.isAdmin) {
                        sessionStorage.setItem('isAdmin', 'true');
                        window.location.href = 'admin-dashboard.html';
                    } else if (result.isNewUser || result.isProfileIncomplete) {
                        // Mark that profile needs completion
                        sessionStorage.setItem('needsProfileCompletion', 'true');
                        window.location.href = 'user-dashboard.html#profile';
                    } else {
                        window.location.href = 'user-dashboard.html';
                    }
                })
                .catch((error) => {
                    console.error("Google sign-in error:", error);
                    
                    // Show error message
                    const errorMessage = error.code === 'auth/unauthorized-domain' 
                        ? `<div class="auth-message auth-error">Authentication error: This domain is not authorized. Please access the site from an authorized domain.</div>`
                        : `<div class="auth-message auth-error">${getErrorMessage(error.code)}</div>`;
                    
                    document.getElementById('loginErrorMessage').innerHTML = errorMessage;
                });
        };
        
        // Add event listeners to Google buttons
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', handleGoogleSignIn);
        }
        
        if (googleSignupBtn) {
            googleSignupBtn.addEventListener('click', handleGoogleSignIn);
        }
        
        // Check if user is already logged in
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                console.log("User is already signed in:", user.uid);
                
                // If on auth page, redirect to appropriate page
                if (window.location.pathname.includes('auth.html')) {
                    // Check if admin
                    db.collection('users').doc(user.uid).get()
                        .then((doc) => {
                            sessionStorage.setItem('userLoggedIn', 'true');
                            sessionStorage.setItem('userEmail', user.email);
                            
                            if (doc.exists && doc.data().isAdmin === true) {
                                sessionStorage.setItem('isAdmin', 'true');
                                window.location.href = 'admin-dashboard.html';
                            } else {
                                window.location.href = 'index.html';
                            }
                        })
                        .catch((error) => {
                            console.error("Error checking user role:", error);
                        });
                }
            }
        });
        
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Show error on page
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-message auth-error';
        errorDiv.textContent = 'Error connecting to authentication service. Please try again later.';
        document.querySelector('.auth-forms').prepend(errorDiv);
    }
});

// Helper function to toggle password visibility
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = passwordInput.nextElementSibling.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Helper function to get user-friendly error messages
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please use a different email or try logging in.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use at least 6 characters.';
        case 'auth/user-not-found':
            return 'No account found with this email. Please check your email or register.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again or reset your password.';
        case 'auth/too-many-requests':
            return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
        case 'auth/unauthorized-domain':
            return 'This domain is not authorized for authentication. Please access from an authorized domain.';
        default:
            return 'An error occurred. Please try again later.';
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                mobileToggle.innerHTML = '✕';
            } else {
                mobileToggle.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            }
        });
    }
});
