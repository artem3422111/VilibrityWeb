# @echo off
REM Test script for Backend API - Windows batch version

setlocal enabledelayedexpansion

echo 🧪 Vilibrity Backend API Tests
echo ==============================
echo.

set API_URL=http://localhost:8000/api/v1

REM Test health endpoint
echo 🔍 Testing: GET /health
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%API_URL%/health' | ConvertTo-Json"
echo.

REM Test root endpoint
echo 🔍 Testing: GET /
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%API_URL%/' | ConvertTo-Json"
echo.

REM Test trending anime
echo 🔍 Testing: GET /anime/trending
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%API_URL%/anime/trending' | ConvertTo-Json | Select-Object -First 50"
echo.

REM Test popular anime
echo 🔍 Testing: GET /anime/popular  
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%API_URL%/anime/popular' | ConvertTo-Json | Select-Object -First 50"
echo.

echo ✅ Tests completed!
