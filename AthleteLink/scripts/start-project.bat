@echo off
echo Запуск Athletelink...
echo.
src\\docker-compose down
src\\docker-compose up -d
timeout /t 5 /nobreak >nul
echo.
echo Приложение запущено: http://localhost:8000
echo.
echo Для остановки используйте: docker-down.bat
pause
