@echo off
echo Stopping Athletelink...
docker-compose -f src/docker-compose.yml down
echo.
echo Project stopped.
pause
