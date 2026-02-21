#!/bin/bash
# Test script for Backend API - Linux/macOS version

echo "🧪 Vilibrity Backend API Tests"
echo "=============================="
echo ""

API_URL="http://localhost:8000/api/v1"

# Test health endpoint
echo "🔍 Testing: GET /health"
curl -s "$API_URL/health" | python3 -m json.tool
echo ""

# Test root endpoint
echo "🔍 Testing: GET /"
curl -s "$API_URL/" | python3 -m json.tool
echo ""

# Test trending anime
echo "🔍 Testing: GET /anime/trending"
curl -s "$API_URL/anime/trending" | python3 -m json.tool | head -20
echo ""

# Test popular anime
echo "🔍 Testing: GET /anime/popular"
curl -s "$API_URL/anime/popular" | python3 -m json.tool | head -20
echo ""

echo "✅ Tests completed!"
