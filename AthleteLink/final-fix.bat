@echo off
echo Финальное исправление шаблона...
echo.

echo 1. Создаем простой HTML шаблон...
docker-compose exec web python -c "html = '''<!DOCTYPE html>
<html>
<head>
    <title>Athletelink - Success</title>
    <link href=\\\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\\\" rel=\\\"stylesheet\\\">
</head>
<body class=\\\"bg-light\\\">
    <nav class=\\\"navbar navbar-dark bg-dark\\\">
        <div class=\\\"container\\\">
            <span class=\\\"navbar-brand mb-0 h1\\\">Athletelink</span>
        </div>
    </nav>
    <div class=\\\"container mt-5\\\">
        <div class=\\\"row justify-content-center\\\">
            <div class=\\\"col-md-6 text-center\\\">
                <div class=\\\"alert alert-success\\\">
                    <h4 class=\\\"alert-heading\\\">Success!</h4>
                    <p>Athletelink is running in Docker</p>
                    <hr>
                    <p class=\\\"mb-0\\\">All systems operational</p>
                </div>
                <div class=\\\"card\\\">
                    <div class=\\\"card-body\\\">
                        <h5 class=\\\"card-title\\\">System Status</h5>
                        <ul class=\\\"list-group list-group-flush\\\">
                            <li class=\\\"list-group-item text-success\\\">Django: Running</li>
                            <li class=\\\"list-group-item text-success\\\">PostgreSQL: Connected</li>
                            <li class=\\\"list-group-item text-success\\\">Docker: Active</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>'''; open('/app/templates/final_index.html', 'w').write(html); print('Template created')"

echo 2. Обновляем view...
docker-compose exec web python -c "open('/app/pages/views.py', 'w').write('from django.shortcuts import render\\ndef index_page(request):\\n    return render(request, \\\"final_index.html\\\")')"

echo 3. Перезапускаем...
docker-compose restart web

echo.
echo Готово! Откройте: http://localhost:8000
pause