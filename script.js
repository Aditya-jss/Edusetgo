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
// Complete Discount Coupon & Referral JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    const discountCoupon = document.querySelector('.discount-coupon');
    
    if (discountCoupon) {
        // Add click functionality to the coupon
        discountCoupon.addEventListener('click', function() {
            // Create and show modal or alert with referral details
            showReferralModal();
            
            // Add special click animation
            this.style.animation = 'couponPulse 0.6s ease-in-out, couponFloat 3s ease-in-out infinite';
        });
        
        // Add entrance animation when coupon comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('coupon-visible');
                    // Add a slight delay before starting animations
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        }, { threshold: 0.1 });
        
        // Initially hide the coupon
        discountCoupon.style.opacity = '0';
        discountCoupon.style.transform = 'scale(0.5)';
        discountCoupon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(discountCoupon);
        
        // Add hover sound effect (optional)
        discountCoupon.addEventListener('mouseenter', function() {
            // You can add a subtle sound effect here if needed
            console.log('Coupon hovered!');
        });
        
        // Add periodic attention-grabbing animation
        setInterval(() => {
            if (discountCoupon.matches(':hover')) return; // Don't interrupt if user is hovering
            
            discountCoupon.style.animation = 'couponFloat 3s ease-in-out infinite, attentionBounce 0.8s ease-in-out';
            
            setTimeout(() => {
                discountCoupon.style.animation = 'couponFloat 3s ease-in-out infinite';
            }, 800);
        }, 10000); // Every 10 seconds
    }
    
    // Function to show referral modal (FIRST MODAL - Benefits)
    function showReferralModal() {
        // Check if modal already exists
        let existingModal = document.querySelector('.referral-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modalHTML = `
            <div class="referral-modal" id="referralModal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h3>🎉 Special Referral Offer!</h3>
                    </div>
                    <div class="modal-body">
                        <div class="offer-details">
                            <div class="offer-icon">👥</div>
                            <h4>Refer 3 Members & Get Amazing Benefits:</h4>
                            <ul class="benefits-list">
                                <li>✅ <strong>30% OFF</strong> on your selected package</li>
                                <li>✅ <strong>FREE UPGRADE</strong> to the next package tier</li>
                                <li>✅ <strong>Priority Support</strong> for all your queries</li>
                                <li>✅ <strong>Exclusive Access</strong> to premium resources</li>
                            </ul>
                            <div class="how-it-works">
                                <h5>How it works:</h5>
                                <p>1. Share your referral link with friends<br>
                                2. When 3 friends sign up using your link<br>
                                3. You automatically get the discount & upgrade!</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" onclick="startReferral()">Start Referring Now!</button>
                        <button class="btn-secondary" onclick="closeReferralModal()">Maybe Later</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles
        addModalStyles();
        
        // Show modal with animation
        const modal = document.getElementById('referralModal');
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Add event listeners
        const modalClose = modal.querySelector('.modal-close');
        const modalOverlay = modal.querySelector('.modal-overlay');
        
        modalClose.addEventListener('click', closeReferralModal);
        modalOverlay.addEventListener('click', closeReferralModal);
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeReferralModal();
            }
        });
    }
    
    // Add modal styles dynamically (FIRST MODAL STYLES)
    function addModalStyles() {
        if (document.querySelector('#referralModalStyles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'referralModalStyles';
        styles.textContent = `
            .referral-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .referral-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: white;
                border-radius: 20px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
            }
            
            .referral-modal.show .modal-content {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                z-index: 1;
            }
            
            .modal-header {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                padding: 25px 30px;
                border-radius: 20px 20px 0 0;
                text-align: center;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 24px;
                font-weight: 700;
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .offer-icon {
                font-size: 48px;
                text-align: center;
                margin-bottom: 20px;
            }
            
            .offer-details h4 {
                text-align: center;
                color: #333;
                font-size: 20px;
                margin-bottom: 20px;
            }
            
            .benefits-list {
                list-style: none;
                padding: 0;
                margin: 20px 0;
            }
            
            .benefits-list li {
                padding: 10px 0;
                font-size: 16px;
                color: #555;
                border-bottom: 1px solid #eee;
            }
            
            .benefits-list li:last-child {
                border-bottom: none;
            }
            
            .how-it-works {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin-top: 20px;
            }
            
            .how-it-works h5 {
                color: #333;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .how-it-works p {
                color: #666;
                line-height: 1.6;
                margin: 0;
            }
            
            .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid #eee;
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .btn-primary, .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                flex: 1;
                max-width: 180px;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
            }
            
            .btn-secondary {
                background: #f8f9fa;
                color: #666;
                border: 1px solid #ddd;
            }
            
            .btn-secondary:hover {
                background: #e9ecef;
            }
            
            /* Attention bounce animation */
            @keyframes attentionBounce {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.1); }
                50% { transform: scale(1.05); }
                75% { transform: scale(1.1); }
            }
        `;
        
        document.head.appendChild(styles);
    }
});

// ========== GLOBAL FUNCTIONS ==========

// Close first referral modal
function closeReferralModal() {
    const modal = document.getElementById('referralModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// UPDATED START REFERRAL FUNCTION - Closes first modal and opens second
function startReferral() {
    // First close the current referral modal
    closeReferralModal();
    
    // Wait a bit for the first modal to close, then show referral options
    setTimeout(() => {
        showReferralOptionsModal();
    }, 400);
}

// SECOND MODAL - Show referral options
function showReferralOptionsModal() {
    // Check if modal already exists
    let existingModal = document.querySelector('.referral-options-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create referral options modal HTML
    const modalHTML = `
        <div class="referral-options-modal" id="referralOptionsModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closeReferralOptionsModal()">&times;</button>
                <div class="modal-header">
                    <h3>🚀 Get Your Referral Link</h3>
                    <p>Choose your preferred way to get started</p>
                </div>
                <div class="modal-body">
                    <div class="referral-options">
                        <div class="option-card" onclick="startWhatsAppReferral()">
                            <div class="option-icon">📱</div>
                            <h4>WhatsApp</h4>
                            <p>Quick & Easy - Get instant response</p>
                            <span class="recommended">Recommended</span>
                        </div>
                        
                        <div class="option-card" onclick="startEmailReferral()">
                            <div class="option-icon">📧</div>
                            <h4>Email</h4>
                            <p>Send us an email to get your link</p>
                        </div>
                        
                        <div class="option-card" onclick="startPhoneReferral()">
                            <div class="option-icon">📞</div>
                            <h4>Call Us</h4>
                            <p>Speak directly with our team</p>
                        </div>
                        
                        <div class="option-card" onclick="showContactForm()">
                            <div class="option-icon">📝</div>
                            <h4>Contact Form</h4>
                            <p>Fill a quick form and we'll reach out</p>
                        </div>
                    </div>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <strong>📞 Phone:</strong> +91 80192 96878
                        </div>
                        <div class="contact-item">
                            <strong>📧 Email:</strong> hello@edusetgo.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addReferralOptionsStyles();
    
    // Show modal with animation
    const modal = document.getElementById('referralOptionsModal');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Add event listeners
    const modalOverlay = modal.querySelector('.modal-overlay');
    modalOverlay.addEventListener('click', closeReferralOptionsModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeReferralOptionsModal();
        }
    });
}

// REFERRAL OPTION FUNCTIONS
function startWhatsAppReferral() {
    const message = encodeURIComponent("Hi! I'm interested in your referral program. Can you please help me get my referral link? 🎉");
    window.open(`https://wa.me/918019296878?text=${message}`, '_blank');
    closeReferralOptionsModal();
}

function startEmailReferral() {
    const subject = encodeURIComponent("Referral Program - Please Send My Link");
    const body = encodeURIComponent(`Hi EduSetGo Team!

I'm excited to join your referral program and start referring friends to earn the amazing benefits:
- 30% OFF on my selected package
- FREE UPGRADE to the next package tier
- Priority Support
- Exclusive Access to premium resources

Please send me my personalized referral link and any additional details I need to get started.

Thank you!`);
    window.open(`mailto:hello@edusetgo.com?subject=${subject}&body=${body}`);
    closeReferralOptionsModal();
}

function startPhoneReferral() {
    // Show phone number prominently
    alert(`📞 Call us now at: +91 80192 96878\n\nOur team is ready to help you get your referral link and start earning rewards!`);
    closeReferralOptionsModal();
}

function showContactForm() {
    // Replace the current modal content with a contact form
    const modal = document.getElementById('referralOptionsModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeReferralOptionsModal()">&times;</button>
        <div class="modal-header">
            <h3>📝 Referral Program Request</h3>
            <p>Fill out this form and we'll send you your referral link within 24 hours</p>
        </div>
        <div class="modal-body">
            <form id="referralForm" onsubmit="submitReferralForm(event)">
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="Enter your phone number">
                </div>
                <div class="form-group">
                    <label>How did you hear about us?</label>
                    <select name="source">
                        <option value="">Select an option</option>
                        <option value="friend">Friend/Referral</option>
                        <option value="social">Social Media</option>
                        <option value="search">Google Search</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Additional Message</label>
                    <textarea name="message" placeholder="Any specific questions or requirements?"></textarea>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-primary">Submit Request</button>
                    <button type="button" onclick="showReferralOptionsModal()" class="btn-secondary">Back to Options</button>
                </div>
            </form>
        </div>
    `;
}

function submitReferralForm(event) {
    event.preventDefault();
    
    // Show success message
    const modalContent = event.target.closest('.modal-content');
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeReferralOptionsModal()">&times;</button>
        <div class="modal-header">
            <h3>✅ Request Submitted Successfully!</h3>
        </div>
        <div class="modal-body">
            <div class="success-message">
                <div class="success-icon">🎉</div>
                <h4>Thank you for your interest!</h4>
                <p>We've received your referral program request. Our team will contact you within 24 hours with:</p>
                <ul>
                    <li>✅ Your personalized referral link</li>
                    <li>✅ Detailed program guidelines</li>
                    <li>✅ Tips to maximize your earnings</li>
                </ul>
                <div class="next-steps">
                    <h5>What's Next?</h5>
                    <p>Keep an eye on your email and phone for our response. In the meantime, you can explore our courses and start planning which friends to refer!</p>
                </div>
            </div>
            <div class="form-buttons">
                <button onclick="closeReferralOptionsModal()" class="btn-primary">Great! Close</button>
            </div>
        </div>
    `;
}

// Close referral options modal
function closeReferralOptionsModal() {
    const modal = document.getElementById('referralOptionsModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add styles for referral options modal (SECOND MODAL STYLES)
function addReferralOptionsStyles() {
    if (document.querySelector('#referralOptionsStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'referralOptionsStyles';
    styles.textContent = `
        .referral-options-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10001;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .referral-options-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .referral-options-modal .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 600px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }
        
        .referral-options-modal.show .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }
        
        .referral-options-modal .modal-header {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 25px 30px;
            border-radius: 20px 20px 0 0;
            text-align: center;
        }
        
        .referral-options-modal .modal-header h3 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 700;
        }
        
        .referral-options-modal .modal-header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
        }
        
        .referral-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 30px;
        }
        
        .option-card {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 25px 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .option-card:hover {
            border-color: #3498db;
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(52, 152, 219, 0.15);
        }
        
        .option-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .option-card h4 {
            margin: 0 0 10px 0;
            color: #2c3e50;
            font-size: 18px;
            font-weight: 600;
        }
        
        .option-card p {
            margin: 0;
            color: #7f8c8d;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .recommended {
            position: absolute;
            top: 10px;
            right: -30px;
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 5px 35px;
            font-size: 12px;
            font-weight: 600;
            transform: rotate(45deg);
            text-transform: uppercase;
        }
        
        .contact-info {
            background: #f8f9fa;
            margin: 0 30px 30px 30px;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #3498db;
        }
        
        .contact-item {
            margin-bottom: 10px;
            color: #2c3e50;
            font-size: 14px;
        }
        
        .contact-item:last-child {
            margin-bottom: 0;
        }
        
        /* Form Styles */
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 14px;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s ease;
            box-sizing: border-box;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #3498db;
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        .form-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }
        
        .success-message {
            text-align: center;
            padding: 20px;
        }
        
        .success-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        
        .success-message h4 {
            color: #27ae60;
            margin-bottom: 15px;
            font-size: 24px;
        }
        
        .success-message ul {
            text-align: left;
            max-width: 300px;
            margin: 20px auto;
        }
        
        .success-message li {
            margin: 8px 0;
            color: #2c3e50;
        }
        
        .next-steps {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .next-steps h5 {
            color: #27ae60;
            margin-bottom: 10px;
        }
        
        .next-steps p {
            color: #2c3e50;
            line-height: 1.6;
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .referral-options {
                grid-template-columns: 1fr;
                padding: 20px;
            }
            
            .contact-info {
                margin: 0 20px 20px 20px;
            }
        }
    `;
    
    document.head.appendChild(styles);
}