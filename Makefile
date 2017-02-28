SERVICE_NAME=geosearchapp
VERSION=$(shell git rev-parse --short HEAD)

.PHONY: seed

all: clean build up

clean:
	rm -rf ./elasticsearch

build:
	docker build -t geosearchapp:latest .
	-docker ps -qaf status=exited | xargs docker rm
	-docker images -qaf dangling=true | xargs docker rmi

up:
	-docker-compose down
	docker-compose up -d
	docker-compose logs -ft

down:
	docker-compose down

dev:
	-docker-compose stop app
	docker-compose up -d elasticsearch
	ELASTICSEARCH_URL=http://localhost:9200 npm run dev

seed: build
	docker-compose run -T app npm run seed
