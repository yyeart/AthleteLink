@echo off
echo Проверка настроек Django...
docker-compose exec web python manage.py check
echo.
echo Проверка базы данных...
docker-compose exec web python manage.py dbshell -- -c "\conninfo" 2>nul || echo "Не удалось подключиться к БД"
pause