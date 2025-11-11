@echo off
echo Улучшение шаблона...
echo.

echo Создаем улучшенный шаблон...
docker-compose exec web python -c "import os; os.makedirs('/app/templates', exist_ok=True); f = open('/app/templates/improved_index.html', 'w'); f.write('''<!DOCTYPE html>
<html>
<head>
    <title>Athletelink - Success</title>
    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\">
    <style>
        .hero-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; }
        .feature-box { padding: 30px; border-radius: 10px; margin: 20px 0; }
    </style>
</head>
<body>
    <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">
        <div class=\"container\">
            <a class=\"navbar-brand fw-bold\" href=\"/\">Athletelink</a>
            <ul class=\"navbar-nav ms-auto\">
                <li class=\"nav-item\"><a class=\"nav-link\" href=\"/\">Home</a></li>
                <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Features</a></li>
            </ul>
        </div>
    </nav>

    <section class=\"hero-section text-center\">
        <div class=\"container\">
            <h1 class=\"display-4 fw-bold\">Athletelink is Running!</h1>
            <p class=\"lead\">Docker container successfully deployed</p>
            <div class=\"mt-4\">
                <span class=\"badge bg-success fs-6 p-3\">Status: ONLINE</span>
            </div>
        </div>
    </section>

    <section class=\"container my-5\">
        <div class=\"row\">
            <div class=\"col-md-4\">
                <div class=\"feature-box bg-light\">
                    <h3>Docker Ready</h3>
                    <p>Containerized application running in Docker</p>
                </div>
            </div>
            <div class=\"col-md-4\">
                <div class=\"feature-box bg-light\">
                    <h3>Django Powered</h3>
                    <p>Built with Django framework</p>
                </div>
            </div>
            <div class=\"col-md-4\">
                <div class=\"feature-box bg-light\">
                    <h3>PostgreSQL</h3>
                    <p>Database is ready and connected</p>
                </div>
            </div>
        </div>
    </section>

    <footer class=\"bg-dark text-white text-center py-4 mt-5\">
        <div class=\"container\">
            <p>2025 Athletelink. All systems operational.</p>
        </div>
    </footer>
</body>
</html>'''); f.close(); print('Template created')"

echo Обновляем view...
docker-compose exec web python -c "f = open('/app/pages/views.py', 'w'); f.write('from django.shortcuts import render\ndef index_page(request):\n    return render(request, \\\"improved_index.html\\\")\n'); f.close(); print('View updated')"

echo Перезапускаем контейнер...
docker-compose restart web

echo.
echo Готово! Обновите страницу: http://localhost:8000
pause