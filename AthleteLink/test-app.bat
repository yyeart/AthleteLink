@echo off
echo Проверка доступности приложения...
echo.
echo Тестируем подключение к localhost:8000...
curl -I http://localhost:8000 --connect-timeout 10
if errorlevel 1 (
    echo Не удалось подключиться к приложению
    echo Проверим логи...
    docker-compose logs web --tail=20
)
pause