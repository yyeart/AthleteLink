@echo off
echo Исправление оригинального шаблона...
echo.

echo 1. Создаем исправленную версию шаблона...
docker-compose exec web python -c "
with open('/app/pages/templates/pages/index_fixed.html', 'w') as f:
    f.write('''<!DOCTYPE html>
<html>
<head>
    <title>Athletelink</title>
    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\">
</head>
<body>
    <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">
        <div class=\"container\">
            <a class=\"navbar-brand font-weight-bold\" href=\"/\">Athletelink</a>
            <div class=\"collapse navbar-collapse\" id=\"navbarNav\">
                <ul class=\"navbar-nav ml-auto\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Home</a></li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">About</a></li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class=\"container mt-4\">
        <h1>Welcome to Athletelink</h1>
        <p>Docker container is running successfully!</p>
        <div class=\"alert alert-success\">
            <strong>Success!</strong> The application is now working.
        </div>
    </div>
</body>
</html>''')
print('Шаблон создан')
"

echo 2. Обновляем view...
docker-compose exec web python -c "
with open('/app/pages/views.py', 'w') as f:
    f.write('''from django.shortcuts import render

def index_page(request):
    return render(request, 'pages/index_fixed.html')
''')
print('View обновлен')
"

echo 3. Перезапускаем...
docker-compose restart web

echo.
echo Готово! Проверьте: http://localhost:8000
pause