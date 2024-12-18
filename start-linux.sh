#!/bin/bash
echo "Starting the client..."
gnome-terminal -- bash -c "cd client && npm start; exec bash"

echo "Starting the server..."
gnome-terminal -- bash -c "cd server && python app.py; exec bash"
