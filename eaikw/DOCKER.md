# Docker Setup Guide

This project supports both development and production environments using Docker
with profiles.

## Prerequisites

- Docker Desktop or Docker Engine installed
- Docker Compose V2+
- Make (optional, for convenience commands)

## Quick Start

### 1. Initial Setup

```bash
# Copy environment file
make setup
# or manually
cp .env.example .env

# Edit .env and add your Docker Hub username
DOCKER_USERNAME=your-dockerhub-username
```

### 2. Development Environment

Start the development server with live reload:

```bash
# Using make
make dev

# Or using docker compose directly
docker compose --profile dev up --build
```

**Development features:**

- Live reload on file changes
- Accessible at `http://localhost:8080`
- Hot module reloading
- Source files mounted as volumes
- Node modules cached in named volume

**File watching:**

- Changes to files in `src/` directory are automatically detected
- Browser auto-refreshes on changes
- Fast incremental builds

### 3. Production Environment

Start the production server with nginx:

```bash
# Using make
make prod

# Or using docker compose directly
docker compose --profile production up -d
```

**Production features:**

- Optimized nginx configuration
- Gzip compression enabled
- Static asset caching
- Security headers
- Health check endpoint at `/health`
- Accessible at `http://localhost:80`

### 4. Test Production Build Locally

Test the production build on a different port without conflicts:

```bash
make test-prod
# Access at http://localhost:8081
```

## Docker Commands Reference

### Using Make (Recommended)

```bash
make help              # Show all available commands
make dev              # Start development environment
make prod             # Start production environment
make build            # Build production image
make push             # Build and push to Docker Hub
make stop             # Stop all containers
make clean            # Stop and remove all containers and volumes
make logs             # Show all logs
make logs-dev         # Show development logs
make logs-prod        # Show production logs
make shell-dev        # Open shell in dev container
make shell-prod       # Open shell in prod container
make restart-dev      # Restart dev container
make restart-prod     # Restart prod container
make ps               # Show running containers
```

### Using Docker Compose Directly

```bash
# Development
docker compose --profile dev up --build          # Start dev
docker compose --profile dev down                # Stop dev
docker compose --profile dev logs -f             # View dev logs

# Production
docker compose --profile production up -d        # Start prod (detached)
docker compose --profile production down         # Stop prod
docker compose --profile production logs -f      # View prod logs

# Build images
docker compose build web                         # Build production image
docker compose build dev                         # Build dev image

# Other commands
docker compose ps                                # List running services
docker compose exec dev sh                       # Shell into dev container
docker compose exec web sh                       # Shell into prod container
```

## Publishing to Docker Hub

### 1. Login to Docker Hub

```bash
docker login
```

### 2. Build and Push

```bash
# Set your Docker Hub username in .env
DOCKER_USERNAME=your-username

# Build and push
make push

# Or manually
docker compose build web
docker compose push web
```

### 3. Tag Specific Version

```bash
# Build with version tag
VERSION=1.0.0 make push

# Or manually
docker tag eleventy-portfolio:latest your-username/eleventy-portfolio:1.0.0
docker push your-username/eleventy-portfolio:1.0.0
```

## Pulling and Running Published Image

```bash
# Pull from Docker Hub
docker pull your-username/eleventy-portfolio:latest

# Run directly
docker run -d -p 80:80 your-username/eleventy-portfolio:latest

# Or use docker-compose
make pull
make prod
```

## Environment Variables

Edit `.env` file to configure:

```bash
# Docker Hub username
DOCKER_USERNAME=your-dockerhub-username

# Image version tag
VERSION=latest

# Node environment
NODE_ENV=production
```

## File Structure

```
.
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development with live reload
├── docker-compose.yml      # Compose configuration with profiles
├── nginx.conf             # Nginx configuration for production
├── .dockerignore          # Files to exclude from Docker build
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Example environment configuration
├── Makefile              # Convenience commands
└── DOCKER.md             # This documentation
```

## Nginx Configuration

The production nginx server includes:

- **Gzip compression** for all text-based assets
- **Cache headers** for optimal performance
- **Security headers** (X-Frame-Options, CSP, etc.)
- **Health check endpoint** at `/health`
- **Custom error pages**
- **Static asset optimization**

## Troubleshooting

### Port Already in Use

If you get a port conflict error:

```bash
# For development (port 8080)
lsof -ti:8080 | xargs kill -9

# For production (port 80)
sudo lsof -ti:80 | xargs kill -9

# Or use different ports in docker-compose.yml
ports:
  - "8081:8080"  # Development
  - "8080:80"    # Production
```

### Live Reload Not Working

1. Ensure volumes are mounted correctly
2. Try enabling polling:
   ```bash
   CHOKIDAR_USEPOLLING=true make dev
   ```

### Build Issues

```bash
# Clean everything and rebuild
make clean
make build

# Clear Docker cache
docker builder prune -a
```

### View Container Logs

```bash
# All logs
make logs

# Specific service
docker compose --profile dev logs -f dev
docker compose --profile production logs -f web
```

### Access Container Shell

```bash
# Development
make shell-dev

# Production
make shell-prod
```

## Best Practices

1. **Development:**
   - Use `make dev` for local development
   - Keep source files in `src/` directory
   - Don't commit `node_modules` or `_site`

2. **Production:**
   - Always test with `make test-prod` before pushing
   - Use semantic versioning for tags
   - Set appropriate `VERSION` in `.env`

3. **Docker Hub:**
   - Keep credentials secure
   - Use `.dockerignore` to exclude sensitive files
   - Tag images with version numbers

## CI/CD Integration

The project includes GitHub Actions that can be extended to:

1. Build Docker images on push
2. Push to Docker Hub automatically
3. Deploy to cloud platforms

Example GitHub Actions addition:

```yaml
- name: Build and push Docker image
  run: |
    echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
    docker build -t ${{ secrets.DOCKER_USERNAME }}/eleventy-portfolio:${{ github.sha }} .
    docker push ${{ secrets.DOCKER_USERNAME }}/eleventy-portfolio:${{ github.sha }}
```

## Support

For issues or questions:

1. Check the logs: `make logs`
2. Review nginx configuration in `nginx.conf`
3. Verify environment variables in `.env`
4. Check Docker and Docker Compose versions
