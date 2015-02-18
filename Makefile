.PHONY: all re clean dependencies build dev minify test test-unit test-acceptance


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

test: build test-unit test-acceptance

test-unit:
	./scripts/make.sh test_unit

test-acceptance:
	./scripts/make.sh test_acceptance
