.PHONY: all re clean dependencies build dev minify test

all: build minify

re: clean all

clean:
	./scripts/make.sh clean

dependencies:
	./scripts/make.sh dependencies

dev:
	./scripts/make.sh dev

build:
	./scripts/make.sh build

minify:
	./scripts/make.sh minify

test: build
	./scripts/make.sh test

