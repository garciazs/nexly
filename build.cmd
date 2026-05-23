@echo off
echo Parando processos Node que bloqueiam o Prisma...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

set "PATH=C:\Program Files\Git\cmd;C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"

echo.
echo === Build de producao ===
call npm.cmd run build
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Build falhou. Feche o Cursor/terminal com "npm run dev" e tente de novo.
  pause
  exit /b 1
)
echo.
echo Build OK!
pause
