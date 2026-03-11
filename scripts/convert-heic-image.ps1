#!/usr/bin/env pwsh

param(
    [string]$InputPath = "C:\Users\execu\Downloads\CUBA WEBSITE\20260310_112956[1].heic",
    [string]$OutputDir = "$(Split-Path -Parent $PSScriptRoot)\public"
)

function Convert-HeicToJpg {
    param(
        [string]$HeicPath,
        [string]$OutputPath,
        [int]$Width = 1920,
        [int]$Height = 1080,
        [int]$Quality = 85
    )

    try {
        Add-Type -AssemblyName System.Drawing
        
        Write-Host "Converting HEIC to JPG..." -ForegroundColor Cyan
        Write-Host "   Input:  $HeicPath" 
        Write-Host "   Output: $OutputPath"
        Write-Host "   Size:   ${Width}x${Height}" 
        Write-Host ""

        $image = [System.Drawing.Image]::FromFile($HeicPath)
        $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        
        $srcRatio = $image.Width / $image.Height
        $dstRatio = $Width / $Height
        
        if ($srcRatio -gt $dstRatio) {
            $newHeight = [int]($Width / $srcRatio)
            $offsetY = [int](($Height - $newHeight) / 2)
            $graphics.DrawImage($image, 0, $offsetY, $Width, $newHeight)
        } else {
            $newWidth = [int]($Height * $srcRatio)
            $offsetX = [int](($Width - $newWidth) / 2)
            $graphics.DrawImage($image, $offsetX, 0, $newWidth, $Height)
        }
        
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {$_.MimeType -eq 'image/jpeg'}
        $qualityParam = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, $Quality)
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = $qualityParam
        
        $bitmap.Save($OutputPath, $codec, $encoderParams)
        
        $graphics.Dispose()
        $bitmap.Dispose()
        $image.Dispose()
        
        Write-Host "Conversion successful!" -ForegroundColor Green
        $fileSizeKB = [math]::Round((Get-Item $OutputPath).Length / 1KB, 0)
        Write-Host "   File size: $fileSizeKB KB" 
        Write-Host ""
        
        return $true
    }
    catch {
        Write-Host "Conversion failed: $_" -ForegroundColor Red
        return $false
    }
}

Write-Host ""
Write-Host "HEIC to JPG Image Converter" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path -LiteralPath $InputPath)) {
    Write-Host "Input file not found: $InputPath" -ForegroundColor Red
    Write-Host "Checking for HEIC files in Downloads..." -ForegroundColor Yellow
    $files = @(Get-ChildItem "C:\Users\execu\Downloads\CUBA WEBSITE" -Filter "*.heic" -ErrorAction SilentlyContinue)
    if ($files.Count -gt 0) {
        Write-Host "Found: $($files[0].FullName)"
        $InputPath = $files[0].FullName
    } else {
        exit 1
    }
}

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$desktopOutput = Join-Path $OutputDir "cuba-hero.jpg"
$mobileOutput = Join-Path $OutputDir "cuba-hero-mobile.jpg"

if (Convert-HeicToJpg -HeicPath $InputPath -OutputPath $desktopOutput -Width 1920 -Height 1080 -Quality 85) {
    Write-Host ""
    Convert-HeicToJpg -HeicPath $InputPath -OutputPath $mobileOutput -Width 1080 -Height 1440 -Quality 80
    
    Write-Host "Files created:" -ForegroundColor Green
    Write-Host "   - $desktopOutput"
    Write-Host "   - $mobileOutput"
    Write-Host ""
    Write-Host "Your hero component is ready!" -ForegroundColor Green
    Write-Host ""
}


Write-Host ""
