"""Test script for backend API"""
import httpx
import asyncio
import json
from typing import Optional


class APITester:
    """Simple API tester"""
    
    BASE_URL = "http://localhost:8000/api/v1"
    
    @staticmethod
    async def test_health():
        """Test health endpoint"""
        print("🔍 Testing: GET /health")
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{APITester.BASE_URL}/health")
                print(f"✅ Status: {response.status_code}")
                print(f"   Response: {response.json()}\n")
                return response.status_code == 200
        except Exception as e:
            print(f"❌ Error: {e}\n")
            return False
    
    @staticmethod
    async def test_root():
        """Test root endpoint"""
        print("🔍 Testing: GET /")
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{APITester.BASE_URL}/")
                print(f"✅ Status: {response.status_code}")
                print(f"   Response: {response.json()}\n")
                return response.status_code == 200
        except Exception as e:
            print(f"❌ Error: {e}\n")
            return False
    
    @staticmethod
    async def test_trending():
        """Test trending anime endpoint"""
        print("🔍 Testing: GET /anime/trending")
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                response = await client.get(f"{APITester.BASE_URL}/anime/trending")
                print(f"✅ Status: {response.status_code}")
                data = response.json()
                if "trending" in data:
                    print(f"   Found {len(data['trending'])} trending anime")
                    print(f"   Latest: {data['trending'][0]['title']}\n")
                else:
                    print(f"   Response: {data}\n")
                return response.status_code == 200
        except Exception as e:
            print(f"❌ Error: {e}\n")
            return False
    
    @staticmethod
    async def test_popular():
        """Test popular anime endpoint"""
        print("🔍 Testing: GET /anime/popular")
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                response = await client.get(f"{APITester.BASE_URL}/anime/popular")
                print(f"✅ Status: {response.status_code}")
                data = response.json()
                if isinstance(data, list):
                    print(f"   Found {len(data)} popular anime\n")
                else:
                    print(f"   Response: {data}\n")
                return response.status_code == 200
        except Exception as e:
            print(f"❌ Error: {e}\n")
            return False
    
    @staticmethod
    async def run_all_tests():
        """Run all tests"""
        print("=" * 50)
        print("🧪 Vilibrity Backend API Tests")
        print("=" * 50 + "\n")
        
        tests = [
            APITester.test_health(),
            APITester.test_root(),
            APITester.test_trending(),
            APITester.test_popular(),
        ]
        
        results = await asyncio.gather(*tests)
        
        print("=" * 50)
        print(f"📊 Results: {sum(results)}/{len(results)} tests passed")
        print("=" * 50)
        
        if all(results):
            print("\n✅ All tests passed! API is working correctly.\n")
        else:
            print("\n⚠️  Some tests failed. Check server logs.\n")


if __name__ == "__main__":
    asyncio.run(APITester.run_all_tests())
