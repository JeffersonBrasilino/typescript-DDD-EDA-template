CONTAINER_NAME=backend

up:
	docker-compose up -d
	docker image prune --filter label=stage=builder -f

down:
	docker-compose down
	docker-compose rm -f

.PHONY:test
test:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test

.PHONY:coverage
coverage:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test:cov

logs:
	docker-compose logs --follow

bash:
	make up
	docker exec -it $(CONTAINER_NAME) sh

lint:
	make up
	docker exec -it $(CONTAINER_NAME) npm run lint

build:
	docker-compose build
	docker image prune --filter label=stage=builder -f
