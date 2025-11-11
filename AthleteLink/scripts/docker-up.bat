@echo off
echo ========================================
echo    Starting AthleteLink in Docker
echo ========================================
echo.
echo Building and starting containers...
cd src
docker-compose up --build
cd ..
pause