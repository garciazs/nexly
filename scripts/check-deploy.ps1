# Verificação rápida antes de publicar
Write-Host "`n=== Nexly — Check de deploy ===`n" -ForegroundColor Cyan

$errors = @()

if (Get-Process node -ErrorAction SilentlyContinue) {
    Write-Host "[AVISO] Processo Node rodando — pare 'npm run dev' antes do build (evita EPERM no Prisma)" -ForegroundColor Yellow
}

$schema = Get-Content "prisma\schema.prisma" -Raw
if ($schema -match 'provider = "sqlite"') {
    Write-Host "[AVISO] Prisma usa SQLite — na Vercel/Railway use PostgreSQL (Neon). Veja DEPLOY.md" -ForegroundColor Yellow
}

if (-not (Test-Path ".env")) {
    $errors += "Arquivo .env não encontrado. Copie de .env.example"
} else {
    $envContent = Get-Content ".env" -Raw
    if ($envContent -notmatch "AUTH_SECRET=") { $errors += "AUTH_SECRET ausente no .env" }
    if ($envContent -notmatch "DATABASE_URL=") { $errors += "DATABASE_URL ausente no .env" }
}

Write-Host "Rodando build de teste..." -ForegroundColor Gray
$env:Path = "C:\Program Files\nodejs;" + $env:Path
Push-Location $PSScriptRoot\..
npm run build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    $errors += "npm run build falhou — pare o dev server e tente de novo"
} else {
    Write-Host "[OK] Build passou!" -ForegroundColor Green
}
Pop-Location

if ($errors.Count -gt 0) {
    Write-Host "`nProblemas encontrados:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "`n[OK] Pronto para deploy. Siga DEPLOY.md para publicar na Vercel.`n" -ForegroundColor Green
