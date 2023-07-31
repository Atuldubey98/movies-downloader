run-dev:
	docker-compose -f ./docker-compose.dev.yml up
run-prod:
	docker-compose -f ./docker-compose.prod.yml up
build-prod:
	docker build -t api-server-prod -f Dockerfile.prod .