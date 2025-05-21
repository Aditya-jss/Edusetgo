document.addEventListener('DOMContentLoaded', function() {
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
    
    // Course Tabs Functionality
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseGrids = document.querySelectorAll('.courses-grid');
    
    if (courseTabs.length > 0 && courseGrids.length > 0) {
        courseTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                courseTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all course grids
                courseGrids.forEach(grid => grid.classList.remove('active'));
                
                // Show the selected course grid
                const country = this.getAttribute('data-country');
                const targetGrid = document.getElementById(`${country}-courses`);
                if (targetGrid) {
                    targetGrid.classList.add('active');
                }
            });
        });
    }
    
    // Clone UK courses to other countries if empty
    const ukCourses = document.getElementById('uk-courses');
    const usaCourses = document.getElementById('usa-courses');
    const canadaCourses = document.getElementById('canada-courses');
    const australiaCourses = document.getElementById('australia-courses');
    
    if (ukCourses) {
        if (usaCourses && usaCourses.children.length === 0) {
            usaCourses.innerHTML = ukCourses.innerHTML;
        }
        
        if (canadaCourses && canadaCourses.children.length === 0) {
            canadaCourses.innerHTML = ukCourses.innerHTML;
        }
        
        if (australiaCourses && australiaCourses.children.length === 0) {
            australiaCourses.innerHTML = ukCourses.innerHTML;
        }
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
    if (window.innerWidth >= 992) {  // Only equalize on desktop
        // Reset heights first
        packageCards.forEach(card => {
            card.style.height = 'auto';
            card.querySelector('.package-content').style.height = 'auto';
            card.querySelector('.package-features').style.height = 'auto';
        });
        
        // Get maximum heights
        let maxCardHeight = 0;
        let maxContentHeight = 0;
        let maxFeaturesHeight = 0;
        
        packageCards.forEach(card => {
            maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);
            maxContentHeight = Math.max(maxContentHeight, card.querySelector('.package-content').offsetHeight);
            maxFeaturesHeight = Math.max(maxFeaturesHeight, card.querySelector('.package-features').offsetHeight);
        });
        
        // Apply maximum heights
        packageCards.forEach(card => {
            card.style.height = maxCardHeight + 'px';
            card.querySelector('.package-content').style.height = maxContentHeight + 'px';
            card.querySelector('.package-features').style.height = maxFeaturesHeight + 'px';
        });
    } else {
        // Reset heights on mobile
        packageCards.forEach(card => {
            card.style.height = 'auto';
            card.querySelector('.package-content').style.height = 'auto';
            card.querySelector('.package-features').style.height = 'auto';
        });
    }
}

// Run on load and resize
if (packageCards.length > 0) {
    window.addEventListener('load', equalizePackageHeights);
    window.addEventListener('resize', equalizePackageHeights);
    
    // Add animation when scrolling to packages section
    const packagesSection = document.getElementById('packages');
    
    function checkScrollPosition() {
        if (packagesSection) {
            const rect = packagesSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                packageCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 200); // Staggered animation
                });
                
                window.removeEventListener('scroll', checkScrollPosition);
            }
        }
    }
    
    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Check on load
}
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // If using Formspree, allow the default form submission
            // If you want to handle form submission via AJAX, uncomment below
            
            /*
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // You would typically send this data to your server here
            console.log('Form data:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
            */
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
                    addMessage("Thank you for your question. One of our counselors will get back to you soon. Meanwhile, you can check our predefined questions or call us at +91 98765 43210 for immediate assistance.");
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
});