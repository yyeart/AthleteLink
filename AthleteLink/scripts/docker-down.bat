echo @echo off
echo Stopping Docker containers...
cd src
docker-compose down
cd ..
echo Containers stopped.
pause > scripts\docker-down-new.bat
move /Y scripts\docker-down-new.bat scripts\docker-down.bat