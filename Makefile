build:
	docker compose build

run:
	docker compose up

run-d:
	docker compose up -d

build-run:
	docker compose up --build

build-run-d:
	docker compose up -d --build

down:
	docker compose down

