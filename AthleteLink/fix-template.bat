@echo off
echo Временное решение проблемы с шаблоном...
echo.

echo 1. Создаем директорию templates если нет...
docker-compose exec web mkdir -p /app/templates

echo 2. Создаем простой работающий шаблон...
docker-compose exec web sh -c "cat > /app/templates/simple_index.html" << "ENDOFFILE"
<!DOCTYPE html>
<html>
<head>
    <title>Athletelink</title>
</head>
<body>
    <h1>Athletelink работает!</h1>
    <p>Docker контейнер запущен успешно.</p>
    <p>Система готова к настройке URL.</p>
</body>
</html>
ENDOFFILE

echo 3. Временно меняем view для главной страницы...
docker-compose exec web sh -c "cat > /app/pages/views.py" << "ENDOFFILE"
from django.shortcuts import render
from django.http import HttpResponse

def index_page(request):
    return render(request, 'simple_index.html')
ENDOFFILE

echo 4. Перезапускаем контейнер...
docker-compose restart web

echo.
echo Готово! Проверьте: http://localhost:8000
echo Теперь должна отображаться простая страница вместо ошибки.
pause