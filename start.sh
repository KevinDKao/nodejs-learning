#!/bin/bash

echo "Starting Node.js Learning with Rust Backend..."
echo

echo "Starting Rust backend server..."
cargo run &
RUST_PID=$!

echo "Waiting for Rust backend to start..."
sleep 3

echo "Starting Node.js frontend server..."
npm start &
NODE_PID=$!

echo
echo "Both servers are starting..."
echo "Rust Backend: http://localhost:8080"
echo "Node.js Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers..."

# Wait for user to stop the servers
trap "echo 'Stopping servers...'; kill $RUST_PID $NODE_PID; exit" INT
wait 