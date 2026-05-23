# Rode isto no terminal se "git" não for reconhecido:
#   . .\ativar.ps1

$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\nodejs;" + $env:Path
Write-Host "Git: $(git --version)" -ForegroundColor Green
Write-Host "Node: $(node --version)" -ForegroundColor Green
Write-Host "Pronto! Agora pode usar git, npm, node." -ForegroundColor Cyan
