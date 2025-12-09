.PHONY: help dev prod build push clean stop logs

# Default target
.DEFAULT_GOAL := help

# Load environment variables
include .env
export

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start development environment with live reload
	docker compose --profile dev up --build

prod: ## Start production environment with nginx
	docker compose --profile production up --build -d

build: ## Build production Docker image
	docker compose build web

build-dev: ## Build development Docker image
	docker compose build dev

push: build ## Build and push production image to Docker Hub
	docker compose push web

pull: ## Pull production image from Docker Hub
	docker compose pull web

stop: ## Stop all running containers
	docker compose --profile dev --profile production down

clean: stop ## Stop containers and remove volumes
	docker compose --profile dev --profile production down -v
	docker system prune -f

logs: ## Show logs from running containers
	docker compose logs -f

logs-prod: ## Show logs from production container
	docker compose --profile production logs -f web

logs-dev: ## Show logs from development container
	docker compose --profile dev logs -f dev

shell-prod: ## Open shell in production container
	docker compose --profile production exec web sh

shell-dev: ## Open shell in development container
	docker compose --profile dev exec dev sh

restart-dev: ## Restart development container
	docker compose --profile dev restart dev

restart-prod: ## Restart production container
	docker compose --profile production restart web

ps: ## Show running containers
	docker compose ps

# Test production build locally
test-prod: ## Test production build locally on port 8081
	docker build -t eleventy-portfolio:test .
	docker run -d -p 8081:80 --name portfolio-test eleventy-portfolio:test
	@echo "Production build running at http://localhost:8081"
	@echo "Run 'docker stop portfolio-test && docker rm portfolio-test' to stop"

# Setup for first time use
setup: ## Initial setup - copy .env file
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "Created .env file. Please edit it with your Docker Hub username."; \
	else \
		echo ".env file already exists."; \
	fi
