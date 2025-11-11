@echo off
echo Последние логи Django:
docker-compose logs web --tail=30
echo.
echo Проверка работающих процессов в web контейнере:
docker-compose exec web python -c "import psutil; print([p.name() for p in psutil.process_iter()])" 2>nul || echo "psutil не установлен"
docker-compose exec web netstat -tulpn 2>nul || echo "netstat не доступен"
pause