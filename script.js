document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileToggle.textContent = '☰';
            
            // Scroll to section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
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
    
    // Toggle chatbot visibility
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotBox.classList.add('active');
        });
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatbotBox.classList.remove('active');
        });
    }
    
    // Function to add a message to the chat window
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the messages
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Handle prompt button clicks
    if (promptButtons) {
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
});