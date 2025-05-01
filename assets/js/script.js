/**
 * Portfolio Website JavaScript
 * Author: Your Name
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Initialize filter buttons for projects page
    if (document.querySelector('.filter-buttons')) {
        initProjectFilters();
    }
    
    // Initialize project image gallery
    if (document.querySelector('.thumbnail-images')) {
        initProjectGallery();
    }
    
    // Initialize contact form validation
    if (document.getElementById('contactForm')) {
        initContactForm();
    }

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize header scroll behavior
    initHeaderScroll();

    // Initialize skill bars animation
    initSkillBars();
});

// Header Scroll Behavior
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Navigation Toggle
function initMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Toggle Burger Animation
            burger.classList.toggle('toggle');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (nav.classList.contains('nav-active') && 
                !nav.contains(event.target) && 
                !burger.contains(event.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            });
        });
    }
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Gallery
function initProjectGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            const imgSrc = thumbnail.querySelector('img').getAttribute('src');
            const imgAlt = thumbnail.querySelector('img').getAttribute('alt');
            
            // Apply fade out animation
            mainImage.style.opacity = '0';
            
            // Update main image after a short delay
            setTimeout(() => {
                mainImage.setAttribute('src', imgSrc);
                mainImage.setAttribute('alt', imgAlt);
                mainImage.style.opacity = '1';
            }, 300);
        });
    });
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Reset errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());
        
        // Validate Name
        if (name === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        // Validate Email
        if (email === '') {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Subject
        if (subject === '') {
            showError('subject', 'Please enter a subject');
            isValid = false;
        }
        
        // Validate Message
        if (message === '') {
            showError('message', 'Please enter your message');
            isValid = false;
        }
        
        // If valid, simulate form submission
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For this example, we'll just show a success message
            
            // Disable form fields and button while "submitting"
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            // Create and show a success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your message. I'll get back to you as soon as possible.</p>
            `;
            formContainer.appendChild(successMessage);
            
            // Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                }
                successMessage.classList.add('fade-out');
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 3000);
        }
    });
    
    // Helper function to show error messages
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentElement.appendChild(errorMessage);
        input.classList.add('error');
        
        // Remove error state when the user starts typing
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const error = this.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Add animation class to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Target elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-item, .soft-skill, .timeline-item, .interest-item, .certification'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Separate observers for left and right animations
    const observerLeft = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-left');
            }
        });
    }, { threshold: 0.1 });

    const observerRight = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-right');
            }
        });
    }, { threshold: 0.1 });

    // Target elements with left animation
    const leftElements = document.querySelectorAll('.about-text, .contact-info');
    leftElements.forEach(element => {
        observerLeft.observe(element);
    });

    // Target elements with right animation
    const rightElements = document.querySelectorAll('.skills-preview, .contact-form');
    rightElements.forEach(element => {
        observerRight.observe(element);
    });
}

// Skill Bars Animation
function initSkillBars() {
    // Only animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const percentage = skillLevel.style.width;
                
                skillLevel.style.width = '0%';
                
                setTimeout(() => {
                    skillLevel.style.width = percentage;
                }, 100);
            }
        });
    }, { threshold: 0.1 });

    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skillLevel => {
        observer.observe(skillLevel);
    });
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
