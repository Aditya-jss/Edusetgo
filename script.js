document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    try {
        emailjs.init('O4pACqPEjvSxMAu8W');
        console.log('✅ EmailJS initialized successfully');
    } catch (error) {
        console.error('❌ EmailJS initialization failed:', error);
    }

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

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init('bdGFY_BzZZsQHro_6'); // Replace with your actual public key

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            const statusMessage = document.getElementById('statusMessage');
            
            // Change button text
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
            
            // Get form data
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            // Send email
            emailjs.send('service_gpbqgd6', 'template_e3xds87', formData)
                .then(function(response) {
                    // Success
                    if (statusMessage) {
                        statusMessage.textContent = 'Your message has been sent successfully. A member of our team will contact you shortly.';
                    }
                    if (formStatus) {
                        formStatus.className = 'success';
                        formStatus.style.display = 'block';
                    }
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Error
                    if (statusMessage) {
                        statusMessage.textContent = 'Failed to send message. Please try again.';
                    }
                    if (formStatus) {
                        formStatus.className = 'error';
                        formStatus.style.display = 'block';
                    }
                })
                .finally(function() {
                    // Reset button
                    if (submitBtn) {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }
                });
        });
    }

    // Mobile dropdown functionality
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    // Handle mobile dropdown click
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            // Only prevent default and toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
    
    // Close dropdown when clicking outside
    if (dropdown) {
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && dropdown) {
            dropdown.classList.remove('active');
        }
    });

    // ==================== ENHANCED CHATBOT FUNCTIONALITY ====================
    
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeChat = document.querySelector('.close-chat');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotCategories = document.getElementById('chatbotCategories');
    const chatbotPrompts = document.getElementById('chatbotPrompts');
    const promptsContent = document.getElementById('promptsContent');
    const backToCategories = document.getElementById('backToCategories');
    const collapsePrompts = document.getElementById('collapsePrompts');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageButton = document.getElementById('sendMessage');

    // Comprehensive Q&A Database
    const chatbotDatabase = {
        visa: {
            title: "Visa & Immigration",
            icon: "fas fa-passport",
            questions: {
                "What documents do I need for a US student visa?": "For a US F-1 student visa, you need: Valid passport (6+ months), Form DS-160, SEVIS fee receipt, Form I-20 from university, financial proof ($40,000+), academic transcripts, English test scores (TOEFL/IELTS), and visa photos. Interview appointment is mandatory.",
                
                "How long does visa processing take?": "US visa processing: Interview wait time 2-8 weeks, processing after interview 3-5 business days. UK visa: 3 weeks standard, 5 days priority. Canada: 4-12 weeks online. Australia: 29 days for 75% applications. Germany: 6-12 weeks standard.",
                
                "What are the visa fees for different countries?": "Visa fees: USA F-1: $185 + $350 SEVIS = $535. UK Tier 4: £363 + £624 healthcare. Canada: CAD $150 + $85 biometrics. Australia: AUD $710. Germany: €75. Ireland: €60-100. New Zealand: NZ$375.",
                
                "Can I work on a student visa?": "Work permissions: USA F-1: On-campus 20 hours per week, off-campus with authorization. UK: 20 hours/week during term. Canada: 20 hours/week during studies, full-time during breaks. Australia: 48 hours/fortnight. Germany: 120 full days or 240 half-days annually.",
                
                "What if my visa is rejected?": "If rejected: Review rejection reason, address issues, gather additional documents, wait appropriate time, reapply with stronger application. Consider visa consultation services. Some countries allow appeals. Don't hide previous rejections - be transparent in future applications.",
                
                "How to prepare for visa interview?": "Interview preparation: Practice common questions (study plans, career goals, ties to home country), organize documents, dress professionally, arrive early, be honest and confident, bring original documents, know your university and program details, prepare financial explanation."
            }
        },
        
        study: {
            title: "Study Programs",
            icon: "fas fa-graduation-cap",
            questions: {
                "Which countries are best for Computer Science?": "Top countries for CS: USA (MIT, Stanford, CMU), Canada (University of Toronto, UBC), UK (Cambridge, Oxford, Imperial), Germany (TUM, RWTH Aachen), Australia (ANU, Melbourne). Consider factors: program ranking, research opportunities, job market, visa policies.",
                
                "What are the admission requirements?": "General requirements: Bachelor's for Master's (3.0+ GPA), Master's for PhD, English proficiency (IELTS 6.5+/TOEFL 80+), standardized tests (GRE/GMAT), LORs, SOP, resume, financial proof. Requirements vary by program and university.",
                
                "When should I start my application process?": "Timeline: Start 12-18 months before intake. Research universities (12-15 months), prepare tests (10-12 months), draft documents (8-10 months), submit applications (6-8 months), apply for scholarships (6-12 months), visa process (3-4 months).",
                
                "What's the difference between MS and MEng degrees?": "MS (Master of Science): Research-focused, thesis required, 2 years, prepares for PhD. MEng (Master of Engineering): Coursework-focused, project-based, 1-1.5 years, industry-oriented. Choose based on career goals: academia vs industry.",
                
                "How do I choose the right university?": "Selection criteria: Program ranking, research areas, faculty expertise, location, cost, scholarships, job placement rates, alumni network, campus facilities, diversity. Use rankings (QS, Times, US News) but consider personal fit and career goals.",
                
                "What are the popular study destinations?": "Top destinations: USA (research excellence, diverse programs), Canada (affordable, immigration-friendly), UK (shorter programs, prestige), Australia (work opportunities, lifestyle), Germany (low cost, engineering focus), Ireland (tech hub, EU access)."
            }
        },
        
        documents: {
            title: "Documents (LOR/SOP)",
            icon: "fas fa-file-alt",
            questions: {
                "How to write a strong Statement of Purpose?": "SOP structure: Engaging introduction, academic background, research/work experience, career goals, why this program/university, how you'll contribute, future plans. Keep it personal, specific, and authentic. Avoid generic statements. Length: 1-2 pages, 500-1000 words.",
                
                "Who should I ask for Letters of Recommendation?": "Choose recommenders who know you well: Academic supervisors, research advisors, professors with whom you've excelled, direct managers from relevant work experience. Provide them your resume, SOP draft, and specific achievements. Give 2-3 months notice.",
                
                "What should be included in a LOR?": "LOR should include: Your relationship with recommender, specific examples of your abilities, academic/professional achievements, research contributions, leadership qualities, character assessment, comparison with peers, strong endorsement for the program.",
                
                "How to make my resume stand out?": "Academic resume tips: Highlight research projects, publications, relevant coursework, technical skills, academic achievements, work experience, leadership roles, extracurriculars. Use action verbs, quantify achievements, keep it concise (2 pages max), tailor for each application.",
                
                "What documents need to be notarized?": "Typically notarized: Academic transcripts, degree certificates, financial documents, affidavits of support, birth certificates. Requirements vary by country and university. Check specific requirements and get certified translations for non-English documents.",
                
                "How to get transcripts from Indian universities?": "Transcript process: Contact university registrar, submit application with fees, provide ID proof, specify delivery method (sealed envelope), allow 2-4 weeks processing. For WES evaluation, transcripts must be sent directly from university. Keep multiple sealed copies."
            }
        },
        
        interview: {
            title: "Mock Interview",
            icon: "fas fa-microphone",
            questions: {
                "What questions are asked in visa interviews?": "Common questions: Why this university/course? How will you fund your studies? What are your career plans? Why not study in your home country? Do you have relatives in destination country? When will you return? Ties to home country? Be honest and confident.",
                
                "How to prepare for university admission interviews?": "Preparation tips: Research the program thoroughly, practice common questions, prepare specific examples, know your application inside-out, prepare thoughtful questions about the program, practice with mock interviews, work on communication skills, dress professionally.",
                
                "What should I wear for visa interview?": "Dress code: Business formal or business casual, well-groomed appearance, avoid flashy jewelry/colors, carry documents in organized folder, be punctual, maintain confident body language, smile and make eye contact, speak clearly.",
                
                "How long do visa interviews typically last?": "Interview duration: US F-1: 2-5 minutes typically, can extend to 10-15 minutes. UK Tier 4: Usually document verification only. Canada: 15-30 minutes if selected. Schengen: 10-15 minutes. Be prepared for both quick and detailed interviews.",
                
                "What documents to carry for visa interview?": "Required documents: Passport, DS-160/application confirmation, photo, I-20/CAS, financial documents, academic transcripts, test scores, visa fee receipt. Organize in order of likely request. Carry originals and copies.",
                
                "How to answer 'Why this university' question?": "Structure your answer: Specific program features, faculty research areas, university ranking/reputation, career opportunities, campus resources, location advantages. Avoid generic answers. Show you've researched thoroughly and it aligns with your goals."
            }
        },
        
        financial: {
            title: "Financial Aid & Scholarships",
            icon: "fas fa-dollar-sign",
            questions: {
                "What scholarships are available for international students?": "Scholarship types: Merit-based (academic excellence), need-based (financial requirement), country-specific, university-specific, external scholarships (Fulbright, Chevening, DAAD), research assistantships, teaching assistantships. Start searching 12-18 months early.",
                
                "How much does it cost to study abroad?": "Approximate costs: USA: $30,000-70,000/year total. Canada: $25,000-45,000/year. UK: $25,000-50,000/year. Australia: $30,000-55,000/year. Germany: $10,000-20,000/year. Includes tuition, living, health insurance, books, travel.",
                
                "Can I get financial aid as an international student?": "Limited federal aid for internationals. Options: University scholarships, private scholarships, assistantships (RA/TA), work-study programs, external funding, home country scholarships, education loans. Each university has different policies for international aid.",
                
                "How to apply for education loans?": "Loan process: Research lenders (banks, NBFCs), compare interest rates, check eligibility, gather documents (admission letter, cost estimate, co-signer), submit application, await approval. Consider: interest rates, repayment terms, processing fees, collateral requirements.",
                
                "What is the loan amount I can get?": "Loan limits: India: Up to ₹1.5 crores for abroad studies. USA: International students need co-signer for private loans. Amount depends on: course cost, university, co-signer credit, collateral. Covers tuition, living expenses, travel, equipment.",
                
                "When should I apply for scholarships?": "Timeline: Start 18-24 months before admission, many deadlines are 6-12 months before program start. Some scholarships have early deadlines (October-December for following year). Apply for multiple scholarships to increase chances. Create scholarship search calendar."
            }
        },
        
        contact: {
            title: "Contact & Support",
            icon: "fas fa-phone",
            questions: {
                "How can I contact EduSetGo?": "Contact options: Phone: +91 80192 96878, Email: hello@edusetgo.com, WhatsApp: Available on website, Office visits: By appointment, Online consultation: Video calls available, Social media: Follow us for updates and tips.",
                
                "What services does EduSetGo offer?": "Our services: University selection, Application assistance, Document preparation, Visa guidance, Scholarship search, Mock interviews, Test preparation guidance, Post-arrival support, Career counseling, Financial planning assistance.",
                
                "What are your consultation fees?": "Consultation options: Free initial consultation (30 mins), Basic package: ₹15,000, Premium package: ₹35,000, Comprehensive package: ₹55,000. Packages include different levels of support. Custom packages available based on needs.",
                
                "Do you help with post-arrival support?": "Post-arrival services: Airport pickup coordination, Accommodation assistance, Bank account opening, SIM card setup, University enrollment support, Local orientation, Emergency support, Alumni network connection, Job search assistance.",
                
                "What is your success rate?": "Success statistics: 95% visa approval rate, 90% students placed in top 100 universities, 85% scholarship recipients, 98% customer satisfaction, 1000+ successful cases, 15+ years experience, Partnerships with 500+ universities globally.",
                
                "Can I get a refund if visa is rejected?": "Refund policy: Partial refunds available based on service stage, Visa rejection refunds depend on package terms, Consultation fees are non-refundable, Processing fees may be retained, Full terms available in service agreement, Discuss refund policy during consultation."
            }
        }
    };

    // Function to add message to chat
    function addMessage(message, isUser = false) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Collapse prompts after bot response to show answer clearly
        if (!isUser && chatbotPrompts && chatbotPrompts.style.display !== 'none') {
            setTimeout(() => {
                if (chatbotPrompts && collapsePrompts) {
                    chatbotPrompts.classList.add('collapsed');
                    collapsePrompts.innerHTML = '<i class="fas fa-chevron-down"></i> Show Questions';
                }
            }, 1000);
        }
    }

    // Function to show category questions
    function showCategoryQuestions(category) {
        const categoryData = chatbotDatabase[category];
        if (!categoryData) return;

        // Hide categories, show prompts
        if (chatbotCategories) chatbotCategories.style.display = 'none';
        if (chatbotPrompts) {
            chatbotPrompts.style.display = 'block';
            chatbotPrompts.classList.remove('collapsed');
        }
        
        // Update collapse button
        if (collapsePrompts) {
            collapsePrompts.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Questions';
        }
        
        // Clear and populate questions
        if (promptsContent) {
            promptsContent.innerHTML = '';
            
            Object.entries(categoryData.questions).forEach(([question, answer]) => {
                const questionBtn = document.createElement('button');
                questionBtn.classList.add('prompt-btn');
                questionBtn.textContent = question;
                questionBtn.addEventListener('click', function() {
                    addMessage(question, true);
                    setTimeout(() => {
                        addMessage(answer);
                    }, 500);
                });
                promptsContent.appendChild(questionBtn);
            });
        }
        
        // Add greeting message for category
        addMessage(`Great! Here are the most common questions about ${categoryData.title}. Click on any question below:`);
    }

    // Setup enhanced chatbot if elements exist
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

        // Category button handlers
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                showCategoryQuestions(category);
            });
        });

        // Back to categories
        if (backToCategories) {
            backToCategories.addEventListener('click', function() {
                if (chatbotPrompts) chatbotPrompts.style.display = 'none';
                if (chatbotCategories) chatbotCategories.style.display = 'grid';
                addMessage("Choose a category to explore specific questions:");
            });
        }

        // Collapse/expand prompts
        if (collapsePrompts) {
            collapsePrompts.addEventListener('click', function() {
                if (chatbotPrompts) {
                    chatbotPrompts.classList.toggle('collapsed');
                    if (chatbotPrompts.classList.contains('collapsed')) {
                        collapsePrompts.innerHTML = '<i class="fas fa-chevron-down"></i> Show Questions';
                    } else {
                        collapsePrompts.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Questions';
                    }
                }
            });
        }

        // Handle custom user messages
        function handleUserMessage() {
            if (!userMessageInput) return;
            
            const userMessage = userMessageInput.value.trim();
            if (userMessage) {
                // Add the user's message to the chat
                addMessage(userMessage, true);
                
                // Try to find relevant answer in database
                let foundAnswer = false;
                const lowerMessage = userMessage.toLowerCase();
                
                // Search through all categories for relevant answers
                for (const category in chatbotDatabase) {
                    const questions = chatbotDatabase[category].questions;
                    
                    for (const [question, answer] of Object.entries(questions)) {
                        // Simple keyword matching
                        const questionWords = question.toLowerCase().split(' ');
                        const messageWords = lowerMessage.split(' ');
                        
                        const matchCount = messageWords.filter(word => 
                            questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))
                        ).length;
                        
                        if (matchCount >= 2 || question.toLowerCase().includes(lowerMessage)) {
                            setTimeout(() => {
                                addMessage(answer);
                                addMessage("Need more help? Choose a category or ask another question!");
                            }, 500);
                            foundAnswer = true;
                            break;
                        }
                    }
                    if (foundAnswer) break;
                }
                
                // Generic response if no match found
                if (!foundAnswer) {
                    setTimeout(() => {
                        addMessage("Thank you for your question! While I search our database for the best answer, here are some immediate options:");
                        addMessage("📞 Call us: +91 80192 96878\n📧 Email: hello@edusetgo.com\n💬 Choose a category above for instant answers\n🎯 Our counselors are available for personalized guidance!");
                    }, 500);
                }
                
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

        // Initialize with welcome message
        setTimeout(() => {
            addMessage("Welcome to EduSetGo! 🎓 I'm here to help you with all your study abroad queries. Choose a category below to get started:");
        }, 500);
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

    // Add CSS for enhanced chatbot (if not already included)
    const chatbotStyles = document.createElement('style');
    chatbotStyles.textContent = `
        .typing-indicator {
            padding: 12px 16px !important;
        }
        
        .typing-dots {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #667eea;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .chatbot-prompts.collapsed .prompts-content {
            display: none;
        }
    `;
    
    document.head.appendChild(chatbotStyles);
    
    console.log('🎉 All scripts loaded successfully including Enhanced Chatbot');
});