#!/bin/bash
# Quick Docker setup script for first-time users

echo "🚀 Eleventy Portfolio Docker Setup"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    echo "   Download: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose V2 is not available. Please update Docker Desktop."
    exit 1
fi

echo "✅ Docker is installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  Please edit .env and set your Docker Hub username:"
    echo "   DOCKER_USERNAME=your-dockerhub-username"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

echo "📋 Available commands:"
echo ""
echo "Development (with live reload):"
echo "  make dev              # Start dev environment"
echo "  npm run docker:dev    # Alternative using npm"
echo ""
echo "Production (with nginx):"
echo "  make prod             # Start production environment"
echo "  npm run docker:prod   # Alternative using npm"
echo ""
echo "Other commands:"
echo "  make build            # Build production image"
echo "  make push             # Push to Docker Hub"
echo "  make test-prod        # Test production on port 8081"
echo "  make stop             # Stop all containers"
echo "  make clean            # Clean up everything"
echo "  make logs             # View logs"
echo "  make help             # Show all commands"
echo ""
echo "📖 For detailed documentation, see:"
echo "   - DOCKER_QUICK_START.md (Quick reference)"
echo "   - DOCKER.md (Comprehensive guide)"
echo ""
echo "🎯 Quick start:"
echo "   1. Edit .env with your Docker Hub username"
echo "   2. Run: make dev"
echo "   3. Open: http://localhost:8080"
echo ""
