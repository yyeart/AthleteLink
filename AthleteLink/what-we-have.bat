@echo off
echo Что у нас сейчас...
echo.

echo 1. Текущий views.py:
docker-compose exec web cat /app/pages/views.py

echo.
echo 2. Существующие шаблоны:
docker-compose exec web find /app -name "*.html" | head -10

echo.
echo 3. HTTP статус:
curl -s -o nul -w "%%{http_code}" http://localhost:8000 && echo " - Status"

echo.
echo 4. Если статус 200 - всё работает!
pause