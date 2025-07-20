# Node.js Learning with Rust Backend - Full-Stack Web App

This repository contains a full-stack web application demonstrating the integration of Node.js frontend with a high-performance Rust backend for data processing.

## What You'll Learn

- How to set up a Node.js development environment
- How to create a simple web server using Express.js
- How to serve HTML pages and handle basic routes
- How to integrate with a Rust backend for high-performance processing
- How to use Rust with Axum for web services
- How to handle cross-service communication
- How to run and test your full-stack application

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

### 2. Rust Installation

**Windows:**
1. Go to [rustup.rs](https://rustup.rs/)
2. Download and run the installer
3. Follow the setup wizard
4. Verify installation by opening PowerShell and running:
   ```powershell
   rustc --version
   cargo --version
   ```

**macOS/Linux:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
rustc --version
cargo --version
```

### 3. Code Editor (Optional but Recommended)

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
├── Cargo.toml
├── src/
│   └── main.rs
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

**Install Node.js dependencies:**
```bash
npm install
```

This will install:
- **Express.js**: A minimal and flexible Node.js web application framework
- **Axios**: HTTP client for making requests to the Rust backend
- **Other dependencies** defined in `package.json`

**Install Rust dependencies:**
```bash
cargo build
```

This will download and compile the Rust dependencies defined in `Cargo.toml`.

### Step 3: Understanding the Code

#### `app.js` - Node.js Frontend Server
This is your main Node.js server file that:
- Creates an Express application
- Sets up static file serving for CSS, JavaScript, and images
- Defines routes for different pages
- Integrates with the Rust backend via HTTP API calls
- Starts the server on port 3000

#### `src/main.rs` - Rust Backend Server
This is your high-performance Rust backend that:
- Uses Axum web framework for HTTP handling
- Provides data processing endpoints (sort, reverse, double, square, sum, parallel processing)
- Includes health check and statistics endpoints
- Runs on port 8080 by default

#### `public/index.html` - Main Web Page
This is the HTML file that users see when they visit your website, including the new Rust backend demo section.

#### `public/style.css` - Styling
This file contains CSS styles to make your website look good, including special styling for the Rust backend section.

#### `public/script.js` - Client-side JavaScript
This file contains JavaScript that runs in the user's browser, including the new Rust backend integration functionality.

### Step 4: Running the Application

**Option 1: Using the startup scripts (Recommended)**

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Option 2: Manual startup**

1. **Start the Rust backend server:**
   ```bash
   cargo run
   ```
   This will start the Rust backend on port 8080.

2. **Start the Node.js frontend server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node app.js
   ```
   This will start the Node.js server on port 3000.

3. **Open your web browser** and go to:
   ```
   http://localhost:3000
   ```

4. **You should see** a web page with:
   - A welcome message
   - Navigation links
   - A form that demonstrates basic interactivity
   - A new Rust backend processing section with data operations

### Step 5: Making Changes

1. **Edit the HTML**: Modify `public/index.html` to change the content
2. **Update styles**: Edit `public/style.css` to change the appearance
3. **Add functionality**: Modify `public/script.js` for client-side features
4. **Add new routes**: Edit `app.js` to create new pages
5. **Modify Rust backend**: Edit `src/main.rs` to add new processing operations

**Important**: After making changes to `app.js` or `src/main.rs`, you need to restart the respective server:
1. Stop the server: Press `Ctrl+C` in the terminal
2. Start it again: `npm start` for Node.js or `cargo run` for Rust

For changes to HTML, CSS, or client-side JavaScript, just refresh your browser!

## Available Scripts

**Node.js scripts:**
- `npm start`: Starts the Node.js development server
- `npm test`: Runs tests (if configured)
- `npm run dev`: Starts the server with auto-restart on file changes (if nodemon is installed)

**Rust scripts:**
- `cargo run`: Builds and runs the Rust backend server
- `cargo build`: Builds the Rust project
- `cargo check`: Checks the Rust code without building

## Next Steps

Once you're comfortable with this full-stack setup, you can explore:

1. **Adding a Database**: Learn about MongoDB, PostgreSQL, or SQLite
2. **User Authentication**: Implement login/signup functionality
3. **API Development**: Create RESTful APIs
4. **Template Engines**: Use EJS, Pug, or Handlebars for dynamic HTML
5. **Frontend Frameworks**: Integrate React, Vue, or Angular
6. **Advanced Rust Features**: Add more complex data processing, async operations, or system-level integrations
7. **Microservices**: Split the application into multiple services
8. **Deployment**: Deploy your app to platforms like Heroku, Vercel, or AWS

## Troubleshooting

### Common Issues:

1. **"Port 3000 is already in use"**
   - Change the port in `app.js` from 3000 to another number (e.g., 3001)
   - Or find and stop the process using port 3000

2. **"Port 8080 is already in use"**
   - Change the port in `src/main.rs` or set the `RUST_PORT` environment variable
   - Or find and stop the process using port 8080

3. **"Module not found" errors**
   - Run `npm install` to install missing dependencies
   - Check that `package.json` exists and has the correct dependencies

4. **Rust compilation errors**
   - Run `cargo check` to see detailed error messages
   - Make sure you have the latest Rust toolchain: `rustup update`

5. **Browser shows "Cannot connect"**
   - Make sure both servers are running (`npm start` and `cargo run`)
   - Check that you're using the correct URL (`http://localhost:3000`)
   - Verify no firewall is blocking the connection

6. **Rust backend not responding**
   - Check that the Rust server is running on port 8080
   - Verify the `RUST_BACKEND_URL` environment variable is set correctly
   - Check the Rust server logs for any errors

### Getting Help

- **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/docs/)
- **Express.js Documentation**: [expressjs.com](https://expressjs.com/)
- **Rust Documentation**: [doc.rust-lang.org](https://doc.rust-lang.org/)
- **Axum Documentation**: [docs.rs/axum](https://docs.rs/axum/)
- **MDN Web Docs**: [developer.mozilla.org](https://developer.mozilla.org/)

## Contributing

Feel free to experiment with this code! Try adding new features, changing the design, or implementing new functionality. This is a learning project, so don't be afraid to break things and learn from mistakes.

Happy coding! 🚀
