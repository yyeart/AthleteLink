# Создаем правильный migrate.bat
echo @echo off
echo Executing database migrations...
cd src
docker-compose exec web python manage.py migrate
cd ..
echo Migrations completed!
pause > scripts\migrate.bat