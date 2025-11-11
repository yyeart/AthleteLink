@echo off
echo Запуск Athletelink...
echo.
docker-compose down
docker-compose up -d
timeout /t 5 /nobreak >nul
echo.
echo Приложение запущено: http://localhost:8000
echo.
echo Для остановки используйте: docker-down.bat
pause