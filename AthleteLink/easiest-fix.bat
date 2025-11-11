@echo off
echo Самый простой способ...
echo.

echo 1. Удаляем старый views.py и создаем новый...
docker-compose exec web rm -f /app/pages/views.py
docker-compose exec web python -c "with open('/app/pages/views.py', 'w') as f: f.write('''from django.shortcuts import render\n\ndef index_page(request):\n    return render(request, \\\"simple_index.html\\\")''')"

echo 2. Убедимся что simple_index.html существует...
docker-compose exec web python -c "with open('/app/templates/simple_index.html', 'r') as f: print('Template exists:', len(f.read()), 'characters')"

echo 3. Перезапускаем...
docker-compose restart web

echo.
echo Готово! Страница должна работать: http://localhost:8000
pause