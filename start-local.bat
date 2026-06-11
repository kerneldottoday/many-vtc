@echo off
cd /d "%~dp0"
set PORT=8000
echo.
echo  Site local — http://localhost:%PORT%
echo  Ctrl+C pour arreter
echo.
python dev-server.py
pause
