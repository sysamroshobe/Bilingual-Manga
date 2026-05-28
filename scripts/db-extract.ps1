$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
Set-Location ".."

$zipPath = Join-Path (Get-Location) "database-json.zip"
if (-not (Test-Path $zipPath)) {
  throw "database-json.zip not found at project root."
}

if (-not (Test-Path "json")) {
  New-Item -ItemType Directory -Path "json" | Out-Null
}

$tempExtract = Join-Path ([System.IO.Path]::GetTempPath()) ("bm-db-extract-" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempExtract | Out-Null

Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force

$targets = @(
  "BM_data.manga_data.json",
  "BM_data.manga_metadata.json",
  "dw.json"
)

foreach ($name in $targets) {
  $srcA = Join-Path $tempExtract $name
  $srcB = Join-Path (Join-Path $tempExtract "json") $name
  $src = if (Test-Path $srcA) { $srcA } elseif (Test-Path $srcB) { $srcB } else { $null }
  if (-not $src) {
    throw "Could not find $name inside database-json.zip"
  }
  Copy-Item -Path $src -Destination (Join-Path "json" $name) -Force
}

Remove-Item $tempExtract -Recurse -Force
Write-Host "Database extracted to json/."
