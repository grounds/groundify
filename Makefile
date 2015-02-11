.PHONY: all re clean dependencies build dev minify 

opts := index.js -o build/grounds-gist.js

all: build minify

re: clean dependencies all

clean:
	rm -rf node_modules

dependencies:
	./scripts/make.sh dependencies

dev:
	./scripts/make.sh dev

build:
	./scripts/make.sh build

minify:
	./scripts/make.sh minify
