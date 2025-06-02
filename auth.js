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
    storageBucket: "edusetgo-c895f.firebasestorage.app",
    messagingSenderId: "356614273448",
    appId: "1:356614273448:web:ab2de825d2c810cbc9459d",
    measurementId: "G-N5JFFCJ1L2"
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initialize Firebase
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();
        console.log("Firebase initialized successfully");
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Show error on page
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-message auth-error';
        errorDiv.textContent = 'Error connecting to authentication service. Please try again later.';
        document.querySelector('.auth-forms').prepend(errorDiv);
    }

    // DOM Elements
    const loginForm = document.getElementById('userLoginForm');
    const registerForm = document.getElementById('userRegisterForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    
    console.log("DOM Elements:", {
        loginForm: !!loginForm,
        registerForm: !!registerForm,
        showRegisterLink: !!showRegisterLink,
        showLoginLink: !!showLoginLink,
        forgotPasswordLink: !!forgotPasswordLink
    });

    // Toggle between login and register forms
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Show register clicked");
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Show login clicked");
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
    }

    // Toggle password visibility
    window.togglePasswordVisibility = function(inputId) {
        const passwordInput = document.getElementById(inputId);
        const icon = event.currentTarget.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    // Show message function - updated with error handling
    function showMessage(formId, message, type) {
        try {
            console.log(`Showing message: ${message} (${type}) in ${formId}`);
            const formContainer = document.getElementById(formId);
            
            if (!formContainer) {
                console.error(`Form container ${formId} not found`);
                return;
            }
            
            // Remove any existing message
            const existingMessage = formContainer.querySelector('.auth-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create new message
            const messageElement = document.createElement('div');
            messageElement.className = `auth-message ${type === 'error' ? 'auth-error' : 'auth-success'}`;
            messageElement.textContent = message;
            
            // Insert at the top of the form
            formContainer.insertBefore(messageElement, formContainer.firstChild);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        } catch (error) {
            console.error("Error showing message:", error);
        }
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Register form submitted");
            
            try {
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const phone = document.getElementById('registerPhone').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const termsAccepted = document.getElementById('terms').checked;
                
                console.log("Form data collected:", { name, email, phone });
                
                // Validation
                if (password !== confirmPassword) {
                    showMessage('registerForm', 'Passwords do not match', 'error');
                    return;
                }
                
                if (!termsAccepted) {
                    showMessage('registerForm', 'You must accept the Terms & Conditions', 'error');
                    return;
                }
                
                // Create user with email and password
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log("User created successfully:", userCredential.user.uid);
                        // Add user details to Firestore
                        return firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                            name: name,
                            email: email,
                            phone: phone,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    })
                    .then(() => {
                        console.log("User profile created in Firestore");
                        showMessage('registerForm', 'Registration successful! Redirecting to login...', 'success');
                        registerForm.reset();
                        
                        // Redirect to login after 2 seconds
                        setTimeout(() => {
                            document.getElementById('registerForm').style.display = 'none';
                            document.getElementById('loginForm').style.display = 'block';
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error("Registration error:", error);
                        showMessage('registerForm', error.message, 'error');
                    });
            } catch (error) {
                console.error("Form processing error:", error);
                showMessage('registerForm', "An error occurred. Please try again.", 'error');
            }
        });
    } else {
        console.error("Register form not found in the DOM");
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Login form submitted");
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Check if user is admin
                    return firebase.firestore().collection('users').doc(userCredential.user.uid).get()
                        .then((doc) => {
                            if (doc.exists && doc.data().isAdmin === true) {
                                // User is admin, redirect to admin dashboard
                                showMessage('loginForm', 'Admin login successful! Redirecting...', 'success');
                                sessionStorage.setItem('userLoggedIn', 'true');
                                sessionStorage.setItem('userEmail', email);
                                sessionStorage.setItem('isAdmin', 'true');
                                
                                setTimeout(() => {
                                    window.location.href = 'admin-dashboard.html';
                                }, 2000);
                            } else {
                                // Regular user login
                                showMessage('loginForm', 'Login successful! Redirecting...', 'success');
                                loginForm.reset();
                                
                                sessionStorage.setItem('userLoggedIn', 'true');
                                sessionStorage.setItem('userEmail', email);
                                
                                // Redirect to home page after 2 seconds
                                setTimeout(() => {
                                    window.location.href = 'index.html';
                                }, 2000);
                            }
                        });
                })
                .catch((error) => {
                    showMessage('loginForm', error.message, 'error');
                });
        });
    }

    // Forgot password
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Forgot password clicked");
            
            const email = document.getElementById('loginEmail').value;
            
            if (!email) {
                showMessage('loginForm', 'Please enter your email address', 'error');
                return;
            }
            
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    showMessage('loginForm', 'Password reset email sent. Check your inbox.', 'success');
                })
                .catch((error) => {
                    showMessage('loginForm', error.message, 'error');
                });
        });
    }

    // Check if user is already logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            console.log('User is signed in:', user.email);
        }
    });
    
});
