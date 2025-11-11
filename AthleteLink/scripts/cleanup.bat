@echo off
echo Cleaning up temporary files...
echo.

del check-django-logs.bat
del check-django-settings.bat
del check-status.bat  
del check-structure.bat
del debug-web.bat
del fix-original-template.bat
del fix-template.bat
del improve-template.bat
del minimal-improve.bat
del restart-fix.bat
del simple-fix.bat
del test-app.bat
del what-we-have.bat
del final-fix.bat
del step-by-step.bat
del easiest-fix.bat
del make-it-pretty.bat
del docker-manage.bat
del wait-for-db.bat
del test.py

rmdir /s /q temp_fix 2>nul
rmdir /s /q improved_template 2>nul

echo.
echo Cleanup completed! Project structure is now clean.
echo Essential files kept: docker-up.bat, docker-down.bat, docker-compose.yml, etc.
pause