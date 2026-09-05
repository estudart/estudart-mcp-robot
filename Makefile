build:
	docker compose build

run:
	docker compose up

run-backend:
	docker compose up robot-agent-be

run-frontend:
	docker compose up robot-agent-fe

run-d:
	docker compose up -d

build-up:
	docker compose up --build

build-up-backend:
	docker compose up robot-agent-be --build

build-up-frontend:
	docker compose up robot-agent-fe --build

build-up-d:
	docker compose up -d --build

down:
	docker compose down
