@echo off
echo Дебаг web контейнера:
echo.
echo Логи:
docker-compose logs web
echo.
echo Проверка запущенных процессов в web:
docker-compose exec web ps aux
pause