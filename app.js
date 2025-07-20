const express = require('express');
const path = require('path');
const axios = require('axios');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Rust backend configuration
const RUST_BACKEND_URL = process.env.RUST_BACKEND_URL || 'http://localhost:8080';

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// About page
app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>About - Node.js Learning</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a href="/">Home</a>
                <a href="/about" class="active">About</a>
                <a href="/contact">Contact</a>
            </nav>
            <main>
                <h1>About This Project</h1>
                <p>This is a simple Node.js web application created for learning purposes.</p>
                <p>It demonstrates:</p>
                <ul>
                    <li>Basic Express.js server setup</li>
                    <li>Static file serving</li>
                    <li>Route handling</li>
                    <li>HTML, CSS, and JavaScript integration</li>
                </ul>
                <a href="/" class="btn">Back to Home</a>
            </main>
        </body>
        </html>
    `);
});

// Contact page
app.get('/contact', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact - Node.js Learning</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact" class="active">Contact</a>
            </nav>
            <main>
                <h1>Contact Us</h1>
                <p>This is where you would add a contact form or contact information.</p>
                <p>For now, this is just a demonstration of multiple routes in Express.js.</p>
                <a href="/" class="btn">Back to Home</a>
            </main>
        </body>
        </html>
    `);
});

// API endpoint example
app.post('/api/message', (req, res) => {
    const { name, message } = req.body;
    
    if (!name || !message) {
        return res.status(400).json({ 
            error: 'Name and message are required' 
        });
    }
    
    // In a real application, you might save this to a database
    console.log(`New message from ${name}: ${message}`);
    
    res.json({ 
        success: true, 
        message: 'Message received!',
        data: { name, message }
    });
});

// Rust backend integration endpoints
app.post('/api/process', async (req, res) => {
    try {
        const { data, operation } = req.body;
        
        if (!data || !operation) {
            return res.status(400).json({
                error: 'Data and operation are required'
            });
        }

        console.log(`Processing request: ${operation} on ${data.length} items`);

        // Forward request to Rust backend
        const response = await axios.post(`${RUST_BACKEND_URL}/process`, {
            data,
            operation
        });

        res.json({
            success: true,
            ...response.data
        });
    } catch (error) {
        console.error('Error processing with Rust backend:', error.message);
        res.status(500).json({
            error: 'Failed to process data',
            details: error.message
        });
    }
});

app.get('/api/rust-health', async (req, res) => {
    try {
        const response = await axios.get(`${RUST_BACKEND_URL}/health`);
        res.json({
            success: true,
            rust_backend: response.data
        });
    } catch (error) {
        console.error('Error checking Rust backend health:', error.message);
        res.status(503).json({
            error: 'Rust backend is not available',
            details: error.message
        });
    }
});

app.get('/api/rust-stats', async (req, res) => {
    try {
        const response = await axios.get(`${RUST_BACKEND_URL}/stats`);
        res.json({
            success: true,
            stats: response.data
        });
    } catch (error) {
        console.error('Error getting Rust backend stats:', error.message);
        res.status(500).json({
            error: 'Failed to get Rust backend stats',
            details: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Not Found</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </nav>
            <main>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" class="btn">Go Home</a>
            </main>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
    console.log(`⏹️  Press Ctrl+C to stop the server`);
}); 