// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const magicIndicator = document.getElementById('magic-indicator');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            setActiveLink(link);
        }
    });
});

// Service Tab Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Form Validation
const validateForm = () => {
    let isValid = true;
    
    // Clear previous error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(message => {
        message.textContent = '';
    });
    
    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        name.parentElement.classList.add('error');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        name.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        email.parentElement.classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        email.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Subject validation
    const subject = document.getElementById('subject');
    const subjectError = document.getElementById('subject-error');
    if (!subject.value.trim()) {
        subjectError.textContent = 'Subject is required';
        subject.parentElement.classList.add('error');
        isValid = false;
    } else if (subject.value.trim().length < 5) {
        subjectError.textContent = 'Subject must be at least 5 characters';
        subject.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        message.parentElement.classList.add('error');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        message.parentElement.classList.add('error');
        isValid = false;
    }
    
    return isValid;
};

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted successfully');
    } else {
        showNotification('Please fix the errors above and try again.', 'error');
    }
});

// Real-time validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        // Clear error state when user starts typing
        if (input.parentElement.classList.contains('error')) {
            input.parentElement.classList.remove('error');
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    });
});

// Individual field validation
const validateField = (field) => {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = field.parentElement.querySelector('.error-message');
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError(field, errorElement, 'Name is required');
            } else if (value.length < 2) {
                showFieldError(field, errorElement, 'Name must be at least 2 characters');
            } else {
                clearFieldError(field, errorElement);
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showFieldError(field, errorElement, 'Email is required');
            } else if (!emailRegex.test(value)) {
                showFieldError(field, errorElement, 'Please enter a valid email address');
            } else {
                clearFieldError(field, errorElement);
            }
            break;
            
        case 'subject':
            if (!value) {
                showFieldError(field, errorElement, 'Subject is required');
            } else if (value.length < 5) {
                showFieldError(field, errorElement, 'Subject must be at least 5 characters');
            } else {
                clearFieldError(field, errorElement);
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(field, errorElement, 'Message is required');
            } else if (value.length < 10) {
                showFieldError(field, errorElement, 'Message must be at least 10 characters');
            } else {
                clearFieldError(field, errorElement);
            }
            break;
    }
};

// Helper functions for field validation
const showFieldError = (field, errorElement, message) => {
    field.parentElement.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
};

const clearFieldError = (field, errorElement) => {
    field.parentElement.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
};

// Notification system
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize magic indicator position on load
    setTimeout(() => {
        const active = document.querySelector('.nav-link');
        if (active) moveIndicator(active);
    }, 50);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('S3 Info System website loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Hide preloader after all assets are loaded
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 400ms ease';
            setTimeout(() => preloader.remove(), 420);
        }
    });
});

// Magic indicator helpers
const moveIndicator = (element) => {
    if (!magicIndicator) return;
    const rect = element.getBoundingClientRect();
    const containerRect = element.parentElement.getBoundingClientRect();
    magicIndicator.style.width = rect.width + 'px';
    magicIndicator.style.left = (rect.left - containerRect.left) + 'px';
};

const setActiveLink = (link) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveIndicator(link);
};

// Update indicator on scroll to reflect current section
const sections = ['#home', '#services', '#about', '#contact'].map(id => document.querySelector(id));
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 80; // offset for navbar
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        if (scrollPos >= section.offsetTop) {
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (link) setActiveLink(link);
            break;
        }
    }
});

// Reposition indicator on resize
window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-link.active') || document.querySelector('.nav-link');
    if (active) moveIndicator(active);
});
