# Inicia o site Nexly localmente
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\nodejs;" + $env:Path
Set-Location $PSScriptRoot

Write-Host "`n=== Nexly ===" -ForegroundColor Cyan
Write-Host "Iniciando servidor em http://localhost:3000`n" -ForegroundColor Gray

npm run dev
