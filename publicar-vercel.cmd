@echo off
chcp 65001 >nul
title Nexly — Publicar na Vercel
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════╗
echo  ║  NEXLY — Falta só 1 passo: publicar na Vercel       ║
echo  ╚══════════════════════════════════════════════════════╝
echo.
echo  GitHub: OK  (github.com/garciazs/nexly)
echo  Supabase: OK  (banco + conta demo)
echo  Build: OK
echo.
echo  Abrindo a Vercel no navegador...
echo  Abrindo arquivo com as variaveis para copiar...
echo.

start "" "https://vercel.com/new/import?s=https://github.com/garciazs/nexly"
timeout /t 2 /nobreak >nul
start notepad "COPIAR-NA-VERCEL.txt"

echo  ────────────────────────────────────────────────────────
echo  NO NAVEGADOR:
echo    1. Faca login com GitHub (se pedir)
echo    2. Confirme o projeto "nexly"
echo    3. Clique "Environment Variables"
echo    4. Copie do Notepad (7 variaveis)
echo    5. Clique DEPLOY
echo  ────────────────────────────────────────────────────────
echo.
echo  Quando terminar, cole aqui a URL que a Vercel der.
echo.
pause
