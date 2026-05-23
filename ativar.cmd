@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo.
echo === Nexly - Git + Node ativos ===
git --version
node --version
echo.
echo Use: npm run dev   ou   npm run build
echo.
