@echo off
echo ===================================================
echo Исправление запуска контейнеров
echo ===================================================

echo 1. Останавливаем все контейнеры...
docker-compose down

echo 2. Запускаем в фоновом режиме...
docker-compose up -d

echo 3. Ждем запуска...
timeout /t 10 /nobreak >nul

echo 4. Проверяем статус...
docker-compose ps

echo 5. Выполняем миграции...
docker-compose exec web python manage.py migrate

echo.
echo Готово! Проверьте: http://localhost:8000
pause