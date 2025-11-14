# Создадим исправленную версию файла
echo @echo off
echo ╨Э╨░╤Б╤В╤А╨╛╨╣╨║╨░ ╨┐╨╡╤А╨▓╨╕╨╗╤М╨╜╤Л╤Е URL...
echo.

echo 1. ╨Я╨╛╨▓╨╡╤А╤П╨╡╨╝ ╤В╨╡╨║╤Г╤Й╨╕╨╡ URL...
src\\docker-compose exec web python src/manage.py shell -c "
from django.urls import get_resolver
urlconf = get_resolver()
print('Available URLs:')
for pattern in urlconf.url_patterns:
    print(f'  {pattern.pattern} -> {pattern.name}')
"

echo.
echo 2. ╨Я╨╛╨▓╨╡╤А╤П╨╡╨╝ user/urls.py...
src\\docker-compose exec web cat /app/src/user/urls.py

echo.
echo 3. ╨Я╨╛╨▓╨╡╤А╤П╨╡╨╝ config/urls.py...
src\\docker-compose exec web cat /app/src/config/urls.py

echo.
echo 4. ╨Ф╨╛╨▒╨░╨▓╨╗╤П╨╡╨╝ user URLs ╨╡╤Б╨╗╨╕ ╨╜╤Г╨╢╨╜╨╛...
src\\docker-compose exec web python -c "
import re

# ╨з╨╕╤В╨░╨╡╨╝ ╤В╨╡╨║╤Г╤Й╨╕╨╣ urls.py
with open('/app/src/config/urls.py', 'r') as f:
    content = f.read()

# ╨Я╨╛╨▓╨╡╤А╤П╨╡╨╝ ╨╡╤Б╤В╤М ╨╗╨╕ ╤Г╨╢╨╡ include user
if 'include(\\'user.urls\\')' not in content:
    # ╨Ф╨╛╨▒╨░╨▓╨╗╤П╨╡╨╝ ╨┐╨╛╤Б╨╗╨╡ ╨╕╨╝╨┐╨╛╤А╤В╨╛╨▓
    new_content = re.sub(r'(from django.urls import [^\\n]+)', r'\\1, include', content)

    # ╨Ф╨╛╨▒╨░╨▓╨╗╤П╨╡╨╝ ╨▓ urlpatterns
    if 'path(\\'user/\\'' not in new_content:
        # ╨Э╨░╤Е╨╛╨┤╨╕╨╝ ╨┐╨╛╤Б╨╗╨╡╨┤╨╜╨╕╨╣ path ╨▓ urlpatterns ╨╕ ╨┤╨╛╨▒╨░╨▓╨╗╤П╨╡╨╝ ╨┐╨╛╤Б╨╗╨╡ ╨╜╨╡╨│╨╛
        lines = new_content.split('\\n')
        for i, line in enumerate(lines):
            if 'urlpatterns = [' in line:
                # ╨Ш╤Й╨╡╨╝ ╨╖╨░╨║╤А╤Л╨▓╨░╤О╤Й╤Г╤О ╤Б╨║╨╛╨▒╨║╤Г
                for j in range(i, len(lines)):
                    if ']' in lines[j] and lines[j].strip().startswith(']'):
                        # ╨Т╤Б╤В╨░╨▓╨╗╤П╨╡╨╝ ╨┐╨╡╤А╨╡╨┤ ╨╖╨░╨║╤А╤Л╨▓╨░╤О╤Й╨╡╨╣ ╤Б╨║╨╛╨▒╨║╨╛╨╣
                        lines.insert(j, \"    path('user/', include('user.urls')),\")
                        break
                break
        new_content = '\\n'.join(lines)

    with open('/app/src/config/urls.py', 'w') as f:
        f.write(new_content)
    print('URLs ╨┤╨╗╤П user ╨┤╨╛╨▒╨░╨▓╨╗╨╡╨╜╤Л')
else:
    print('URLs ╨┤╨╗╤П user ╤Г╨╢╨╡ ╤Б╤Г╤Й╨╡╤Б╤В╨▓╤Г╤О╤В')
"

echo.
echo 5. ╨Я╨╡╤А╨╡╨╖╨░╨┐╤Г╤Б╨║╨░╨╡╨╝...
src\\docker-compose restart web

echo.
echo ╨Э╨░╤Б╤В╤А╨╛╨╣╨║╨░ ╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨░!
pause > scripts\setup-proper-urls-new.bat

# Заменить старый файл новым
move /Y scripts\setup-proper-urls-new.bat scripts\setup-proper-urls.bat