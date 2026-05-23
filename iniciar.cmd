@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo.
echo === Iniciando Nexly em http://localhost:3000 ===
echo.
call npm.cmd run dev
