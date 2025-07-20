@echo off
echo Starting Node.js Learning with Rust Backend...
echo.

echo Starting Rust backend server...
start "Rust Backend" cmd /k "cargo run"

echo Waiting for Rust backend to start...
timeout /t 3 /nobreak > nul

echo Starting Node.js frontend server...
start "Node.js Frontend" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Rust Backend: http://localhost:8080
echo Node.js Frontend: http://localhost:3000
echo.
echo Press any key to exit this launcher...
pause > nul 