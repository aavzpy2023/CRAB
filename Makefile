.PHONY: up down restart build logs up-prod down-prod restart-prod build-prod logs-prod audit audit-frontend

up:
	docker compose up -d --build

down:
	docker compose down

restart:
	docker compose restart

build:
	docker compose build --no-cache

logs:
	docker compose logs -f


up-prod:
	docker compose -f docker-compose.prod.yml up -d --build

down-prod:
	docker compose -f docker-compose.prod.yml down

restart-prod:
	docker compose -f docker-compose.prod.yml restart

build-prod:
	docker compose -f docker-compose.prod.yml build --no-cache

logs-prod:
	docker compose -f docker-compose.prod.yml logs -f


audit:
	pytest


audit-frontend:
	npm --prefix frontend test
