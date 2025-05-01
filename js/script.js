// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      // Change the icon when the menu is opened/closed
      const icon = navToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  }

  // Close mobile menu when clicking on a nav link
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation classes when elements come into view
  const animateElements = document.querySelectorAll('.animate');
  
  if (animateElements.length > 0) {
    // Add animation classes right away
    animateOnScroll();
    
    // Then add animation classes as user scrolls
    window.addEventListener('scroll', animateOnScroll);
  }
  
  function animateOnScroll() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        if (element.classList.contains('fade-in-element')) {
          element.classList.add('fade-in');
        } else if (element.classList.contains('slide-in-left-element')) {
          element.classList.add('slide-in-left');
        } else if (element.classList.contains('slide-in-right-element')) {
          element.classList.add('slide-in-right');
        }
      }
    });
  }

  // Form validation
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (name === '' || email === '' || message === '') {
        showAlert('Please fill in all fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
      }
      
      // Here you would normally send the form data to a server
      // For demo purposes, we'll just show a success message
      showAlert('Message sent successfully!', 'success');
      contactForm.reset();
    });
  }

  // Validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show alert
  function showAlert(message, type) {
    // Remove any existing alert
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;
    alertDiv.textContent = message;
    
    const formContainer = document.querySelector('.contact-form');
    formContainer.insertBefore(alertDiv, contactForm);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }

  // Active nav link highlighting
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      
      // Handle both same-page links (#section) and links from other pages (index.html#section)
      if (href === `#${current}` || href.endsWith(`#${current}`)) {
        item.classList.add('active');
      }
    });
  });
});
