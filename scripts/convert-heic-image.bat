@echo off
REM Convert HEIC image to optimized JPG for web use
REM This script provides a convenient way to convert your Cuba hero image

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════
echo  Cuba Hero Image Conversion Script
echo ════════════════════════════════════════════════
echo.

REM Define paths
set INPUT_FILE=C:\Users\execu\Downloads\CUBA WEBSITE\20260310_112956[1].heic
set OUTPUT_DIR=%~dp0public
set OUTPUT_FILE=%OUTPUT_DIR%\cuba-hero.jpg
set OUTPUT_MOBILE=%OUTPUT_DIR%\cuba-hero-mobile.jpg

if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo 📁 Input:  %INPUT_FILE%
echo 📤 Output: %OUTPUT_FILE%
echo.

REM Check for available converters
echo Checking for image conversion tools...
echo.

REM Try ffmpeg if available
where ffmpeg >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ ffmpeg found - Using for conversion
    echo Converting to desktop size (1920x1080)...
    ffmpeg -i "%INPUT_FILE%" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -q:v 2 "%OUTPUT_FILE%"
    
    echo Converting to mobile size (1080x1440)...
    ffmpeg -i "%INPUT_FILE%" -vf "scale=1080:1440:force_original_aspect_ratio=decrease,pad=1080:1440:(ow-iw)/2:(oh-ih)/2" -q:v 2 "%OUTPUT_MOBILE%"
    
    echo.
    echo ✅ Conversion complete!
    goto :end
)

REM Try ImageMagick if available
where magick >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ ImageMagick found - Using for conversion
    echo Converting to desktop size (1920x1080)...
    magick "%INPUT_FILE%" -resize 1920x1080^> -background white -gravity center -extent 1920x1080 "%OUTPUT_FILE%"
    
    echo Converting to mobile size (1080x1440)...
    magick "%INPUT_FILE%" -resize 1080x1440^> -background white -gravity center -extent 1080x1440 "%OUTPUT_MOBILE%"
    
    echo.
    echo ✅ Conversion complete!
    goto :end
)

REM If no tools available, provide manual instructions
echo ⚠️  No image conversion tools found on your system.
echo.
echo To convert your HEIC image, you have these options:
echo.
echo Option 1: Online Converter (Recommended for quick conversion)
echo   1. Visit: https://www.freeconvert.com/heic-to-jpg
echo   2. Upload: 20260310_112956[1].heic
echo   3. Download the JPG
echo   4. Save as: %OUTPUT_FILE%
echo.
echo Option 2: Install ffmpeg
echo   Install via Chocolatey: choco install ffmpeg
echo   Then run this script again
echo.
echo Option 3: Windows Photos App (Built-in)
echo   1. Right-click the HEIC file
echo   2. Choose "Open with" > "Photos"
echo   3. Click "Export" and choose JPG format
echo.
echo Option 4: macOS / Linux (if available)
echo   On macOS: sips -s format jpg "%INPUT_FILE%" -o "%OUTPUT_FILE%"
echo   On Linux: convert "%INPUT_FILE%" -resize 1920x1080 "%OUTPUT_FILE%"
echo.

:end
echo.
echo 📝 Next steps:
echo   1. Place the JPG file at: %OUTPUT_FILE%
echo   2. Run: npm run dev
echo   3. Hero should display your Cuba image!
echo.
pause
