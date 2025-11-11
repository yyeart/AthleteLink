@echo off
echo Настройка правильных URL...
echo.

echo 1. Проверяем текущие URL...
docker-compose exec web python manage.py shell -c "
from django.urls import get_resolver
urlconf = get_resolver()
print('Available URLs:')
for pattern in urlconf.url_patterns:
    print(f'  {pattern.pattern} -> {pattern.name}')
"

echo.
echo 2. Проверяем user/urls.py...
docker-compose exec web cat /app/user/urls.py

echo.
echo 3. Проверяем config/urls.py...
docker-compose exec web cat /app/config/urls.py

echo.
echo 4. Добавляем user URLs если нужно...
docker-compose exec web python -c "
import re

# Читаем текущий urls.py
with open('/app/config/urls.py', 'r') as f:
    content = f.read()

# Проверяем есть ли уже include user
if 'include(\\'user.urls\\')' not in content:
    # Добавляем после импортов
    new_content = re.sub(r'(from django.urls import [^\\n]+)', r'\\1, include', content)
    
    # Добавляем в urlpatterns
    if 'path(\\'user/\\'' not in new_content:
        # Находим последний path в urlpatterns и добавляем после него
        lines = new_content.split('\\n')
        for i, line in enumerate(lines):
            if 'urlpatterns = [' in line:
                # Ищем закрывающую скобку
                for j in range(i, len(lines)):
                    if ']' in lines[j] and lines[j].strip().startswith(']'):
                        # Вставляем перед закрывающей скобкой
                        lines.insert(j, \"    path('user/', include('user.urls')),\")
                        break
                break
        new_content = '\\n'.join(lines)
    
    with open('/app/config/urls.py', 'w') as f:
        f.write(new_content)
    print('URLs для user добавлены')
else:
    print('URLs для user уже существуют')
"

echo.
echo 5. Перезапускаем...
docker-compose restart web

echo.
echo Настройка завершена!
pause