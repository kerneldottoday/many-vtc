$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here

$port = 8000
Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
  Select-Object OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

Write-Host "BOIS DESIGN — http://localhost:$port" -ForegroundColor Green
python dev-server.py
