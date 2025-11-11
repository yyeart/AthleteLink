@echo off
echo Starting Athletelink...
src\\docker-compose up -d
timeout /t 3 /nobreak >nul
echo.
echo 🌐 Open: http://localhost:8000
echo.
pause
