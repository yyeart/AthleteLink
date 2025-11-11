@echo off
echo Starting Athletelink...
docker-compose up -d
timeout /t 3 /nobreak >nul
echo.
echo 🌐 Open: http://localhost:8000
echo.
pause