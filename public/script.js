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
    
    // Add Rust backend functionality
    addRustBackendHandlers();
    
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

// Add Rust backend functionality
function addRustBackendHandlers() {
    const processBtn = document.getElementById('processBtn');
    const healthBtn = document.getElementById('healthBtn');
    const statsBtn = document.getElementById('statsBtn');
    
    if (processBtn) {
        processBtn.addEventListener('click', handleRustProcessing);
    }
    
    if (healthBtn) {
        healthBtn.addEventListener('click', checkRustHealth);
    }
    
    if (statsBtn) {
        statsBtn.addEventListener('click', getRustStats);
    }
}

// Handle Rust data processing
async function handleRustProcessing() {
    const processBtn = document.getElementById('processBtn');
    const dataInput = document.getElementById('dataInput');
    const operationSelect = document.getElementById('operationSelect');
    const rustResponse = document.getElementById('rustResponse');
    const rustResponseContent = document.getElementById('rustResponseContent');
    
    // Get input values
    const dataString = dataInput.value.trim();
    const operation = operationSelect.value;
    
    if (!dataString) {
        showRustResponse('Please enter some data to process.', 'error');
        return;
    }
    
    // Parse data
    let data;
    try {
        data = dataString.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
        if (data.length === 0) {
            throw new Error('No valid numbers found');
        }
    } catch (error) {
        showRustResponse('Please enter valid comma-separated numbers.', 'error');
        return;
    }
    
    // Show loading state
    processBtn.textContent = 'Processing...';
    processBtn.disabled = true;
    
    try {
        const response = await fetch('/api/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, operation })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showRustResponse(JSON.stringify(result, null, 2), 'success');
        } else {
            showRustResponse(`Error: ${result.error}`, 'error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showRustResponse('Network error. Please try again.', 'error');
    } finally {
        processBtn.textContent = 'Process with Rust';
        processBtn.disabled = false;
    }
}

// Check Rust backend health
async function checkRustHealth() {
    const healthBtn = document.getElementById('healthBtn');
    const statsDisplay = document.getElementById('statsDisplay');
    
    healthBtn.textContent = 'Checking...';
    healthBtn.disabled = true;
    
    try {
        const response = await fetch('/api/rust-health');
        const result = await response.json();
        
        if (response.ok) {
            statsDisplay.innerHTML = `
                <div class="stat-item">
                    <strong>Status:</strong> ${result.rust_backend.status}
                </div>
                <div class="stat-item">
                    <strong>Uptime:</strong> ${result.rust_backend.uptime} seconds
                </div>
                <div class="stat-item">
                    <strong>Version:</strong> ${result.rust_backend.version}
                </div>
            `;
        } else {
            statsDisplay.innerHTML = `<div class="stat-item error">Error: ${result.error}</div>`;
        }
        
    } catch (error) {
        console.error('Error:', error);
        statsDisplay.innerHTML = '<div class="stat-item error">Network error</div>';
    } finally {
        healthBtn.textContent = 'Check Health';
        healthBtn.disabled = false;
    }
}

// Get Rust backend statistics
async function getRustStats() {
    const statsBtn = document.getElementById('statsBtn');
    const statsDisplay = document.getElementById('statsDisplay');
    
    statsBtn.textContent = 'Loading...';
    statsBtn.disabled = true;
    
    try {
        const response = await fetch('/api/rust-stats');
        const result = await response.json();
        
        if (response.ok) {
            const stats = result.stats;
            statsDisplay.innerHTML = `
                <div class="stat-item">
                    <strong>Requests Processed:</strong> ${stats.requests_processed}
                </div>
                <div class="stat-item">
                    <strong>Uptime:</strong> ${stats.uptime_seconds} seconds
                </div>
                <div class="stat-item">
                    <strong>Requests/Second:</strong> ${stats.requests_per_second.toFixed(2)}
                </div>
                <div class="stat-item">
                    <strong>CPU Cores:</strong> ${stats.cpu_cores}
                </div>
                <div class="stat-item">
                    <strong>Memory Usage:</strong> ${stats.memory_usage_mb} bytes
                </div>
            `;
        } else {
            statsDisplay.innerHTML = `<div class="stat-item error">Error: ${result.error}</div>`;
        }
        
    } catch (error) {
        console.error('Error:', error);
        statsDisplay.innerHTML = '<div class="stat-item error">Network error</div>';
    } finally {
        statsBtn.textContent = 'Get Stats';
        statsBtn.disabled = false;
    }
}

// Show Rust response
function showRustResponse(content, type = 'info') {
    const rustResponse = document.getElementById('rustResponse');
    const rustResponseContent = document.getElementById('rustResponseContent');
    
    if (rustResponse && rustResponseContent) {
        rustResponseContent.textContent = content;
        rustResponse.style.display = 'block';
        
        // Remove existing classes
        rustResponse.classList.remove('success', 'error');
        
        // Add appropriate class
        if (type === 'success') {
            rustResponse.classList.add('success');
        } else if (type === 'error') {
            rustResponse.classList.add('error');
        }
        
        // Scroll to response area
        rustResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Add console welcome message
console.log(`
🚀 Welcome to Node.js Learning with Rust Backend!

This is a web application built with:
- Node.js and Express.js (Frontend Server)
- Rust with Axum (High-performance Backend)
- HTML, CSS, and JavaScript (Frontend)

Try the Rust backend processing to see high-performance data operations!

Happy coding! 🎉
`); 