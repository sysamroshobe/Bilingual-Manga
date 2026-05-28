$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
Set-Location ".."

npm install
powershell -ExecutionPolicy Bypass -File "./scripts/db-extract.ps1"

Write-Host "Local setup complete."
