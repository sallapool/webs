// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.init();
    }

    init() {
        this.updateLanguage();
        this.bindEvents();
    }

    bindEvents() {
        const langToggle = document.getElementById('lang-toggle');
        const langDropdown = document.getElementById('lang-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        if (langToggle && langDropdown) {
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                langDropdown.classList.remove('show');
            });

            langOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const lang = option.getAttribute('data-lang');
                    this.setLanguage(lang);
                    langDropdown.classList.remove('show');
                });
            });
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateLanguage();
    }

    updateLanguage() {
        const html = document.documentElement;
        const langText = document.getElementById('lang-text');
        
        // Update HTML attributes
        html.setAttribute('lang', this.currentLang);
        html.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        
        // Update language toggle button
        if (langText) {
            langText.textContent = this.currentLang === 'ar' ? 'EN' : 'العربية';
        }
        
        // Update all translatable elements
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update form labels
        this.updateFormLabels();
        
        // Add smooth transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateFormLabels() {
        const labels = document.querySelectorAll('label[data-ar][data-en]');
        labels.forEach(label => {
            const text = label.getAttribute(`data-${this.currentLang}`);
            if (text) {
                label.textContent = text;
            }
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addScrollAnimations();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.feature-card, .service-card, .timeline-item, .contact-item, .about-text, .about-image, .goals-image, .goals-list, .goal-item'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.animation = 'fadeInUp 0.6s ease forwards';
            el.style.animationPlayState = 'paused';
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    addScrollAnimations() {
        // Add staggered animation delays
        const cards = document.querySelectorAll('.feature-card, .service-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link, .footer-section a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                if (navMenu) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Scroll to top on logo click
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    handleScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header background on scroll
            if (scrollTop > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }

            // Update active navigation based on scroll position
            this.updateActiveNavigation();
            
            lastScrollTop = scrollTop;
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Modal Manager
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Login modal
        const loginBtns = document.querySelectorAll('#login-btn, #mobile-login-btn');
        const loginModal = document.getElementById('login-modal');
        const consultationModal = document.getElementById('consultation-modal');
        const consultationBtn = document.getElementById('consultation-btn');
        const closeBtns = document.querySelectorAll('.close-btn');
        
        loginBtns.forEach(btn => {
            if (btn && loginModal) {
                btn.addEventListener('click', () => {
                    this.showModal(loginModal);
                });
            }
        });

        if (consultationBtn && consultationModal) {
            consultationBtn.addEventListener('click', () => {
                this.showModal(consultationModal);
            });
        }

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    this.hideModal(modal);
                }
            });
        });

        // Close modal on outside click
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        });

        // Auth form switching
        const switchLink = document.getElementById('switch-link');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const modalTitle = document.getElementById('modal-title');
        const switchText = document.getElementById('switch-text');

        if (switchLink) {
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthForm();
            });
        }

        // Password toggle
        const togglePasswords = document.querySelectorAll('.toggle-password');
        togglePasswords.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const passwordInput = toggle.previousElementSibling;
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                const icon = toggle.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        });
    }

    showModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    hideModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    switchAuthForm() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const modalTitle = document.getElementById('modal-title');
        const switchText = document.getElementById('switch-text');
        const switchLink = document.getElementById('switch-link');
        const languageManager = window.languageManager;

        if (loginForm.classList.contains('active')) {
            // Switch to register
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
            
            if (languageManager.currentLang === 'ar') {
                modalTitle.textContent = 'إنشاء حساب جديد';
                switchText.textContent = 'لديك حساب بالفعل؟';
                switchLink.textContent = 'تسجيل الدخول';
            } else {
                modalTitle.textContent = 'Create New Account';
                switchText.textContent = 'Already have an account?';
                switchLink.textContent = 'Login';
            }
        } else {
            // Switch to login
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
            
            if (languageManager.currentLang === 'ar') {
                modalTitle.textContent = 'تسجيل الدخول';
                switchText.textContent = 'ليس لديك حساب؟';
                switchLink.textContent = 'إنشاء حساب جديد';
            } else {
                modalTitle.textContent = 'Login';
                switchText.textContent = "Don't have an account?";
                switchLink.textContent = 'Create New Account';
            }
        }
    }
}

// Form Manager
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFormValidation();
    }

    bindEvents() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(e);
            });
        }

        // Consultation form
        const consultationForm = document.getElementById('consultation-form');
        if (consultationForm) {
            consultationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleConsultation(e);
            });
        }

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContact(e);
            });
        }

        // Input animations
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            inputs.forEach(input => {
                input.addEventListener('invalid', (e) => {
                    e.preventDefault();
                    this.showValidationError(input);
                });

                input.addEventListener('input', () => {
                    this.clearValidationError(input);
                });
            });
        });
    }

    showValidationError(input) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Add shake animation
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }

    clearValidationError(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }

    async handleLogin(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const email = form.querySelector('#login-email').value;
        const password = form.querySelector('#login-password').value;
        
        // Check for admin credentials
        if (email === 'MO' && password === '9090') {
            window.location.href = 'admin.html';
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم بنجاح!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                this.showSuccessMessage('تم تسجيل الدخول بنجاح!');
                document.getElementById('login-modal').classList.remove('show');
                document.body.style.overflow = '';
                
                // Store user data
                const userData = {
                    email: email,
                    loginTime: new Date().toISOString(),
                    name: 'مستخدم جديد'
                };
                
                let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const existingUserIndex = users.findIndex(user => user.email === email);
                
                if (existingUserIndex !== -1) {
                    users[existingUserIndex].lastLogin = userData.loginTime;
                } else {
                    users.push(userData);
                }
                
                localStorage.setItem('registeredUsers', JSON.stringify(users));
            }, 1000);
            
        } catch (error) {
            this.showErrorMessage('خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }
    }

    async handleRegister(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const name = form.querySelector('#register-name').value;
        const email = form.querySelector('#register-email').value;
        const phone = form.querySelector('#register-phone').value;
        const password = form.querySelector('#register-password').value;
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إنشاء الحساب...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم إنشاء الحساب!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                this.showSuccessMessage('تم إنشاء حسابك بنجاح!');
                
                // Store user data
                const userData = {
                    name: name,
                    email: email,
                    phone: phone,
                    registrationTime: new Date().toISOString()
                };
                
                let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                users.push(userData);
                localStorage.setItem('registeredUsers', JSON.stringify(users));
                
                // Switch to login form
                document.getElementById('switch-link').click();
                form.reset();
            }, 1000);
            
        } catch (error) {
            this.showErrorMessage('خطأ في إنشاء الحساب. يرجى المحاولة مرة أخرى.');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }
    }

    async handleConsultation(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const name = form.querySelector('#consultation-name').value;
        const email = form.querySelector('#consultation-email').value;
        const phone = form.querySelector('#consultation-phone').value;
        const service = form.querySelector('#consultation-service').value;
        const message = form.querySelector('#consultation-message').value;
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                this.showSuccessMessage('تم إرسال طلب الاستشارة بنجاح! سنتواصل معك قريباً.');
                
                // Store consultation data
                const consultationData = {
                    name: name,
                    email: email,
                    phone: phone,
                    service: service,
                    message: message,
                    submissionTime: new Date().toISOString()
                };
                
                let consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
                consultations.push(consultationData);
                localStorage.setItem('consultations', JSON.stringify(consultations));
                
                document.getElementById('consultation-modal').classList.remove('show');
                document.body.style.overflow = '';
                form.reset();
            }, 1000);
            
        } catch (error) {
            this.showErrorMessage('خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }
    }

    async handleContact(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                this.showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                form.reset();
            }, 1000);
            
        } catch (error) {
            this.showErrorMessage('خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Loading Manager
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        // Hide loading screen after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 1500); // Show loading for at least 1.5 seconds
        });
    }
}

// Floating Contact Manager
class FloatingContactManager {
    constructor() {
        this.init();
    }

    init() {
        const floatingContact = document.getElementById('floating-contact');
        const floatingBtn = floatingContact?.querySelector('.floating-btn');

        if (floatingBtn) {
            floatingBtn.addEventListener('click', () => {
                floatingContact.classList.toggle('active');
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!floatingContact.contains(e.target)) {
                    floatingContact.classList.remove('active');
                }
            });
        }
    }
}

// Service Navigation Manager
class ServiceNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const service = card.getAttribute('data-service');
                if (service) {
                    // Scroll to services section
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                        const offsetTop = servicesSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Utility Functions
class Utils {
    static addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .input-group.focused label {
                top: -10px !important;
                left: 10px !important;
                font-size: 12px !important;
                color: var(--primary-color) !important;
            }
        `;
        document.head.appendChild(style);
    }

    static initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-background img');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    static addHoverEffects() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button, .cta-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (this.contains(ripple)) {
                        this.removeChild(ripple);
                    }
                }, 600);
            });
        });

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Global function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add custom styles
    Utils.addCustomStyles();
    
    // Initialize managers
    new LoadingManager();
    window.languageManager = new LanguageManager();
    new NavigationManager();
    new ModalManager();
    new FormManager();
    new AnimationManager();
    new FloatingContactManager();
    new ServiceNavigationManager();
    
    // Add utility features
    Utils.initParallax();
    Utils.addHoverEffects();
    
    // Add smooth reveal animation for hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
});

// Add CSS for hero content initial state
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 1s ease';
    }
});