.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

docker-image: ## Build the docker image
	docker image build --tag breizhcamp .

docker-dev: ## Run the development server inside a container
    # increasing ulimit is a worakround for "too many open files" error on MacOs
	ulimit -n 10000 
	docker container run \
		--rm \
		--name breizhcamp-dev\
		--publish 5173:5173 \
		--volume $(PWD)/src:/app/src \
		--volume $(PWD)/static:/app/static \
		--ulimit nofile=10000:10000 \
		breizhcamp

docker-build: ## Generate the static website to be deployed using a container, then make it available on http://localhost:4173
	mkdir build || true
	rm -fr build/*
	docker container rm --force breizhcamp-preview || true
	docker container run \
		--rm \
		--name breizhcamp-preview \
		--publish 4173:4173 \
		--volume $(PWD)/src:/app/src \
		--volume $(PWD)/static:/app/static \
		--volume $(PWD)/build:/app/out \
		breizhcamp \
		/app/build-in-docker.sh
