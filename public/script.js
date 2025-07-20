// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const messageForm = document.getElementById('messageForm');
    const responseArea = document.getElementById('response');
    const responseContent = document.getElementById('responseContent');
    
    // Add form submission handler
    if (messageForm) {
        messageForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add some interactive features
    addInteractiveFeatures();
});

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const responseArea = document.getElementById('response');
    const responseContent = document.getElementById('responseContent');
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const message = formData.get('message');
    
    // Validate form data
    if (!name.trim() || !message.trim()) {
        showResponse('Please fill in all fields.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    form.classList.add('loading');
    
    try {
        // Send data to server
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showResponse(JSON.stringify(data, null, 2), 'success');
            // Clear form on success
            form.reset();
        } else {
            showResponse(`Error: ${data.error}`, 'error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showResponse('Network error. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        form.classList.remove('loading');
    }
}

// Show response to user
function showResponse(content, type = 'info') {
    const responseArea = document.getElementById('response');
    const responseContent = document.getElementById('responseContent');
    
    if (responseArea && responseContent) {
        responseContent.textContent = content;
        responseArea.style.display = 'block';
        
        // Remove existing classes
        responseArea.classList.remove('success', 'error');
        
        // Add appropriate class
        if (type === 'success') {
            responseArea.classList.add('success');
        } else if (type === 'error') {
            responseArea.classList.add('error');
        }
        
        // Scroll to response area
        responseArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add interactive features
function addInteractiveFeatures() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add console welcome message
console.log(`
🚀 Welcome to Node.js Learning!

This is a simple web application built with:
- Node.js and Express.js (Backend)
- HTML, CSS, and JavaScript (Frontend)

Try sending a message using the form to see the API in action!

Happy coding! 🎉
`); 