@echo off
echo Выполнение миграций базы данных...
docker-compose exec web python manage.py migrate
echo Миграции выполнены!
pause