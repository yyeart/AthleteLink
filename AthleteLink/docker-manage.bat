@echo off
echo Executing Django command in container...
docker-compose exec web python manage.py %*
pause