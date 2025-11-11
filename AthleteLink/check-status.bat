@echo off
echo Статус контейнеров:
docker-compose ps
echo.
echo Логи web контейнера:
docker-compose logs web
pause