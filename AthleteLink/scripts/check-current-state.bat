@echo off
echo Текущее состояние приложения...
echo.

echo 1. HTTP статус:
curl -s -o nul -w "%%{http_code}" http://localhost:8000 && echo " - Status Code"

echo.
echo 2. Последние логи:
src\\docker-compose logs web --tail=3

echo.
echo 3. Проверка шаблонов:
src\\docker-compose exec web ls -la /app/pages/templates/pages/

echo.
echo 4. Текущий views.py:
src\\docker-compose exec web cat /app/pages/views.py

pause
