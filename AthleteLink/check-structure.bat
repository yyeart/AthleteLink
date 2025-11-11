@echo off
echo Проверка структуры проекта...
echo.

echo Файлы в корне:
docker-compose exec web ls -la /app/

echo.
echo Файлы в pages:
docker-compose exec web ls -la /app/pages/

echo.
echo Существующие шаблоны:
docker-compose exec web find /app -name "*.html" -type f 2>nul

echo.
echo Текущий views.py:
docker-compose exec web cat /app/pages/views.py

pause