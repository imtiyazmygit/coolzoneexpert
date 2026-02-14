// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (basic format)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email');
    if (!phone) missingFields.push('Phone');
    if (!service) missingFields.push('Service');
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return;
    }
    
    // Validate email format
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate phone format
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Sanitize inputs for display
    const sanitize = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };
    
    const sanitizedName = sanitize(name);
    const sanitizedService = sanitize(service);
    const sanitizedEmail = sanitize(email);
    const sanitizedPhone = sanitize(phone);
    
    // In a real application, this would send data to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${sanitizedName}! We've received your request for ${sanitizedService} service. We'll contact you at ${sanitizedEmail} or ${sanitizedPhone} soon.`);
    
    // Reset form
    this.reset();
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and features
document.querySelectorAll('.service-card, .feature').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});
