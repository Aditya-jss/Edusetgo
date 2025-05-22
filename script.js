document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init('O4pACqPEjvSxMAu8W');
    
    console.log('EmailJS initialized successfully');

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.mobile-toggle') && !event.target.closest('.nav-menu')) {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSelector = this.getAttribute('href');
            const targetElement = document.querySelector(targetSelector);
            
            if (!targetElement) return;
            
            // Close mobile menu if open
            if (navMenu && mobileToggle) {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
            
            // Scroll to section
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                if (!section.id) return;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.id;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Package Cards Animation and Equal Height
    const packageCards = document.querySelectorAll('.package-card');
    
    // Set equal heights for all package elements
    function equalizePackageHeights() {
        if (window.innerWidth >= 992) {
            packageCards.forEach(card => {
                card.style.height = 'auto';
                const content = card.querySelector('.package-content');
                const features = card.querySelector('.package-features');
                if (content) content.style.height = 'auto';
                if (features) features.style.height = 'auto';
            });
            
            let maxCardHeight = 0;
            let maxContentHeight = 0;
            let maxFeaturesHeight = 0;
            
            packageCards.forEach(card => {
                maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);
                const content = card.querySelector('.package-content');
                const features = card.querySelector('.package-features');
                if (content) maxContentHeight = Math.max(maxContentHeight, content.offsetHeight);
                if (features) maxFeaturesHeight = Math.max(maxFeaturesHeight, features.offsetHeight);
            });
            
            packageCards.forEach(card => {
                card.style.height = maxCardHeight + 'px';
                const content = card.querySelector('.package-content');
                const features = card.querySelector('.package-features');
                if (content) content.style.height = maxContentHeight + 'px';
                if (features) features.style.height = maxFeaturesHeight + 'px';
            });
        } else {
            packageCards.forEach(card => {
                card.style.height = 'auto';
                const content = card.querySelector('.package-content');
                const features = card.querySelector('.package-features');
                if (content) content.style.height = 'auto';
                if (features) features.style.height = 'auto';
            });
        }
    }

    // Run package height equalization
    if (packageCards.length > 0) {
        window.addEventListener('load', equalizePackageHeights);
        window.addEventListener('resize', equalizePackageHeights);
        
        const packagesSection = document.getElementById('packages');
        function checkScrollPosition() {
            if (packagesSection) {
                const rect = packagesSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                
                if (isVisible) {
                    packageCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 200);
                    });
                    window.removeEventListener('scroll', checkScrollPosition);
                }
            }
        }
        
        window.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition();
    }

    // ENHANCED EmailJS Contact Form Handler with Debugging
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const statusMessage = document.getElementById('statusMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('Form submission started');
        
        const submitBtn = document.getElementById('submitBtn');
        
        // Update button state
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
        
        // Hide previous status messages
        if (formStatus) {
            formStatus.style.display = 'none';
            formStatus.className = '';
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        console.log('Form data being sent:', formData);
        console.log('EmailJS Service ID:', "service_gpbqgd6");
        console.log('EmailJS Template ID:', "template_957rrxi");
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            console.log('Validation failed: Missing required fields');
            showStatus('Please fill in all required fields.', 'error');
            resetButton();
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            console.log('Validation failed: Invalid email format');
            showStatus('Please enter a valid email address.', 'error');
            resetButton();
            return;
        }
        
        console.log('Validation passed, sending email...');
        
        // Send email via EmailJS
        emailjs.send("service_gpbqgd6", "template_957rrxi", formData)
            .then(function(response) {
                console.log('=== EMAILJS SUCCESS ===');
                console.log('Response:', response);
                console.log('Status:', response.status);
                console.log('Text:', response.text);
                showStatus('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('=== EMAILJS ERROR ===');
                console.error('Full error object:', error);
                console.error('Error status:', error.status);
                console.error('Error text:', error.text);
                console.error('Error message:', error.message);
                
                // More specific error messages
                let errorMessage = 'Failed to send message. ';
                if (error.status === 400) {
                    errorMessage += 'Please check your template configuration.';
                } else if (error.status === 401) {
                    errorMessage += 'Authentication failed. Please check your EmailJS keys.';
                } else if (error.status === 404) {
                    errorMessage += 'Service or template not found.';
                } else {
                    errorMessage += 'Please try again or call us directly at +91 80192 96878.';
                }
                
                showStatus(errorMessage, 'error');
            })
            .finally(function() {
                console.log('EmailJS request completed');
                resetButton();
            });
        
        function resetButton() {
            if (submitBtn) {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        }
        
        function showStatus(message, type) {
            console.log('Showing status:', type, message);
            if (formStatus && statusMessage) {
                statusMessage.textContent = message;
                formStatus.className = type;
                formStatus.style.display = 'block';
                
                // Auto hide success messages after 5 seconds
                if (type === 'success') {
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            }
        }
    });
}

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeChat = document.querySelector('.close-chat');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const promptButtons = document.querySelectorAll('.prompt-btn');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageButton = document.getElementById('sendMessage');

    // Predefined responses for the chatbot
    const chatbotResponses = {
        "Tell me about study options in USA": "The USA offers various study options including Bachelor's, Master's, and Doctoral programs. Top fields include Computer Science, Business, Engineering, and Medical Sciences. Most programs require standardized tests like SAT/ACT for undergraduate and GRE/GMAT for graduate programs. The academic year typically starts in August/September with some universities offering January intake.",
        
        "What documents do I need for a student visa?": "For a US student visa (F-1), you'll need: a valid passport, Form DS-160, SEVIS fee payment receipt, Form I-20 from your university, financial proof showing sufficient funds for education and living expenses, academic transcripts, standardized test scores, and photos meeting visa requirements. For Canada, you'll need similar documents plus a study permit application.",
        
        "How much does it cost to study abroad?": "Costs vary by country and university. In the USA, tuition ranges from $20,000-$50,000 annually for international students. Canada is often more affordable at $15,000-$35,000. Living expenses add $10,000-$20,000 per year. Many universities offer scholarships specifically for international students that can significantly reduce costs.",
        
        "Which universities do you recommend?": "Our recommendations depend on your academic profile, budget, and field of interest. For engineering, institutions like MIT, Stanford, and Georgia Tech are excellent. For business, consider Wharton, Harvard, and NYU. For liberal arts, universities like Williams College and Amherst College are top choices. We provide personalized university suggestions during our consultations.",
        
        "How do I apply for scholarships?": "Start researching scholarships 12-18 months before your program begins. Look for university-specific scholarships, government funding, private foundations, and country-specific opportunities. Most merit scholarships require strong academic records, test scores, and compelling personal statements. Our Premium package includes comprehensive scholarship application assistance to maximize your funding options."
    };

    // Function to add a message to the chat window
    function addMessage(message, isUser = false) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the messages
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Setup chatbot if elements exist
    if (chatbotToggle && chatbotBox && closeChat) {
        // Toggle chatbot visibility
        chatbotToggle.addEventListener('click', function() {
            chatbotBox.classList.add('active');
        });
        
        closeChat.addEventListener('click', function() {
            chatbotBox.classList.remove('active');
        });
        
        // Close chatbot when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.chatbot-container')) {
                chatbotBox.classList.remove('active');
            }
        });

        // Handle prompt button clicks
        if (promptButtons && promptButtons.length > 0) {
            promptButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const promptText = this.textContent;
                    
                    // Add the user's prompt to the chat
                    addMessage(promptText, true);
                    
                    // Add the bot's response
                    setTimeout(() => {
                        addMessage(chatbotResponses[promptText]);
                    }, 500);
                });
            });
        }

        // Handle custom user messages
        function handleUserMessage() {
            if (!userMessageInput) return;
            
            const userMessage = userMessageInput.value.trim();
            if (userMessage) {
                // Add the user's message to the chat
                addMessage(userMessage, true);
                
                // Generate a response - for custom messages, provide a generic response
                setTimeout(() => {
                    addMessage("Thank you for your question. One of our counselors will get back to you soon. Meanwhile, you can check our predefined questions or call us at +91 80192 96878 for immediate assistance.");
                }, 500);
                
                // Clear the input field
                userMessageInput.value = '';
            }
        }

        // Send message on button click
        if (sendMessageButton) {
            sendMessageButton.addEventListener('click', handleUserMessage);
        }

        // Send message on Enter key press
        if (userMessageInput) {
            userMessageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleUserMessage();
                }
            });
        }
    }

    // Add some visual enhancements
    function addScrollAnimations() {
        const animatedElements = document.querySelectorAll('.testimonial-card, .about-text, .about-image');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations
    addScrollAnimations();
    
    console.log('All scripts loaded successfully');
});