@echo off
echo Простое исправление через отдельные файлы...
echo.

echo Создаем локальные файлы...
mkdir temp_fix 2>nul

echo Создаем simple_index.html...
echo ^<!DOCTYPE html^> > temp_fix\simple_index.html
echo ^<html^> >> temp_fix\simple_index.html
echo ^<head^> >> temp_fix\simple_index.html
echo     ^<title^>Athletelink^</title^> >> temp_fix\simple_index.html
echo ^</head^> >> temp_fix\simple_index.html
echo ^<body^> >> temp_fix\simple_index.html
echo     ^<h1^>Athletelink работает!^</h1^> >> temp_fix\simple_index.html
echo     ^<p^>Docker контейнер запущен успешно.^</p^> >> temp_fix\simple_index.html
echo     ^<p^>Система готова к настройке URL.^</p^> >> temp_fix\simple_index.html
echo ^</body^> >> temp_fix\simple_index.html
echo ^</html^> >> temp_fix\simple_index.html

echo Копируем в контейнер...
docker-compose exec web mkdir -p /app/templates
docker cp temp_fix\simple_index.html athletelink-web-1:/app/templates/simple_index.html

echo Создаем views.py...
echo from django.shortcuts import render > temp_fix\views.py
echo. >> temp_fix\views.py
echo def index_page(request): >> temp_fix\views.py
echo     return render(request, 'simple_index.html') >> temp_fix\views.py

docker cp temp_fix\views.py athletelink-web-1:/app/pages/views.py

echo Перезапускаем...
docker-compose restart web

echo.
echo Готово! Проверьте: http://localhost:8000
pause