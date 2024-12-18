@echo off
echo Starting the client...
start cmd /k "cd client && npm start"

echo Starting the server...
start cmd /k "cd server && python app.py"

exit
