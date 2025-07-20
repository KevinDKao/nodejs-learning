# Node.js Learning - Simple Web App Guide

This repository contains a simple Node.js web application to help you learn the basics of web development with Node.js.

## What You'll Learn

- How to set up a Node.js development environment
- How to create a simple web server using Express.js
- How to serve HTML pages and handle basic routes
- How to run and test your web application

## Prerequisites

Before you start, make sure you have the following installed:

### 1. Node.js Installation

**Windows:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening PowerShell and running:
   ```powershell
   node --version
   npm --version
   ```

**macOS:**
1. Install using Homebrew (recommended):
   ```bash
   brew install node
   ```
2. Or download from [nodejs.org](https://nodejs.org/)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

### 2. Code Editor (Optional but Recommended)

- **Visual Studio Code**: Download from [code.visualstudio.com](https://code.visualstudio.com/)
- **WebStorm**: Professional IDE for JavaScript/Node.js
- **Sublime Text**: Lightweight text editor

## Project Structure

```
nodejs-learning/
├── README.md
├── package.json
├── package-lock.json
├── app.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── .gitignore
```

## Getting Started

### Step 1: Initialize the Project

1. Open your terminal/command prompt
2. Navigate to this project directory:
   ```bash
   cd nodejs-learning
   ```

### Step 2: Install Dependencies

Run the following command to install the required packages:
```bash
npm install
```

This will install:
- **Express.js**: A minimal and flexible Node.js web application framework
- **Other dependencies** defined in `package.json`

### Step 3: Understanding the Code

#### `app.js` - Main Server File
This is your main server file that:
- Creates an Express application
- Sets up static file serving for CSS, JavaScript, and images
- Defines routes for different pages
- Starts the server on port 3000

#### `public/index.html` - Main Web Page
This is the HTML file that users see when they visit your website.

#### `public/style.css` - Styling
This file contains CSS styles to make your website look good.

#### `public/script.js` - Client-side JavaScript
This file contains JavaScript that runs in the user's browser.

### Step 4: Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node app.js
   ```

2. **Open your web browser** and go to:
   ```
   http://localhost:3000
   ```

3. **You should see** a simple web page with:
   - A welcome message
   - Navigation links
   - A form that demonstrates basic interactivity

### Step 5: Making Changes

1. **Edit the HTML**: Modify `public/index.html` to change the content
2. **Update styles**: Edit `public/style.css` to change the appearance
3. **Add functionality**: Modify `public/script.js` for client-side features
4. **Add new routes**: Edit `app.js` to create new pages

**Important**: After making changes to `app.js`, you need to restart the server:
1. Stop the server: Press `Ctrl+C` in the terminal
2. Start it again: `npm start`

For changes to HTML, CSS, or client-side JavaScript, just refresh your browser!

## Available Scripts

- `npm start`: Starts the development server
- `npm test`: Runs tests (if configured)
- `npm run dev`: Starts the server with auto-restart on file changes (if nodemon is installed)

## Next Steps

Once you're comfortable with this basic setup, you can explore:

1. **Adding a Database**: Learn about MongoDB, PostgreSQL, or SQLite
2. **User Authentication**: Implement login/signup functionality
3. **API Development**: Create RESTful APIs
4. **Template Engines**: Use EJS, Pug, or Handlebars for dynamic HTML
5. **Frontend Frameworks**: Integrate React, Vue, or Angular
6. **Deployment**: Deploy your app to platforms like Heroku, Vercel, or AWS

## Troubleshooting

### Common Issues:

1. **"Port 3000 is already in use"**
   - Change the port in `app.js` from 3000 to another number (e.g., 3001)
   - Or find and stop the process using port 3000

2. **"Module not found" errors**
   - Run `npm install` to install missing dependencies
   - Check that `package.json` exists and has the correct dependencies

3. **Browser shows "Cannot connect"**
   - Make sure the server is running (`npm start`)
   - Check that you're using the correct URL (`http://localhost:3000`)
   - Verify no firewall is blocking the connection

### Getting Help

- **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/docs/)
- **Express.js Documentation**: [expressjs.com](https://expressjs.com/)
- **MDN Web Docs**: [developer.mozilla.org](https://developer.mozilla.org/)

## Contributing

Feel free to experiment with this code! Try adding new features, changing the design, or implementing new functionality. This is a learning project, so don't be afraid to break things and learn from mistakes.

Happy coding! 🚀
