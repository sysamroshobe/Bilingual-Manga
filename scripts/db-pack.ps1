$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
Set-Location ".."

$required = @(
  "json/BM_data.manga_data.json",
  "json/BM_data.manga_metadata.json",
  "json/dw.json"
)

foreach ($f in $required) {
  if (-not (Test-Path $f)) {
    throw "Missing required file: $f"
  }
}

if (Test-Path "database-json.zip") {
  Remove-Item "database-json.zip" -Force
}

Compress-Archive -Path $required -DestinationPath "database-json.zip" -CompressionLevel Optimal
Write-Host "database-json.zip rebuilt."
