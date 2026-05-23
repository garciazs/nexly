@echo off
chcp 65001 >nul
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"

echo.
echo ========================================
echo   NEXLY - Configurar Supabase (facil)
echo ========================================
echo.
echo ANTES: crie o projeto em https://supabase.com
echo        Settings ^> Database ^> Connection string ^> URI
echo.
echo Copie as duas URLs do Supabase e cole aqui.
echo.

set /p POOLER="URL porta 6543 (Transaction pooler): "
set /p DIRECT="URL porta 5432 (Session/Direct): "

if "%POOLER%"=="" goto erro
if "%DIRECT%"=="" goto erro

echo.
echo Salvando .env...

(
echo DATABASE_URL="%POOLER%"
echo DIRECT_URL="%DIRECT%"
echo AUTH_SECRET="nexly-secret-%RANDOM%%RANDOM%-troque-depois"
echo AUTH_URL="http://localhost:3000"
echo NEXT_PUBLIC_APP_URL="http://localhost:3000"
echo NEXT_PUBLIC_APP_NAME="Nexly"
) > .env

echo.
echo Criando tabelas no Supabase...
call npm.cmd run db:push
if %ERRORLEVEL% NEQ 0 goto erro

echo.
echo Criando conta demo...
call npm.cmd run db:seed
if %ERRORLEVEL% NEQ 0 goto erro

echo.
echo ========================================
echo   PRONTO! Banco configurado.
echo ========================================
echo.
echo Conta demo: demo@nexly.app / senha123
echo.
echo Proximo passo: rode iniciar.cmd e teste http://localhost:3000/demo
echo.
pause
exit /b 0

:erro
echo.
echo Algo deu errado. Confira se as URLs estao corretas e a senha sem espacos.
pause
exit /b 1
