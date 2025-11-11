@echo off
echo Финальная проверка...
echo.
echo 1. Статус приложения:
curl -s http://localhost:8000 | findstr "Athletelink" >nul && echo "✅ Приложение работает" || echo "❌ Проблемы с приложением"

echo.
echo 2. Контейнеры:
src\\docker-compose ps

echo.
echo 3. Логи (последние 2 строки):
src\\docker-compose logs web --tail=2

echo.
echo ✅ ВСЁ ГОТОВО! Откройте: http://localhost:8000
pause
