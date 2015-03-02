.PHONY: all re clean dependencies build minify test test-unit test-integration


all: build minify

re: clean all

clean:
	./scripts/make.sh clean

dependencies:
	./scripts/make.sh dependencies

build:
	./scripts/make.sh build

minify:
	./scripts/make.sh minify

test: test-unit test-integration

test-unit:
	./scripts/make.sh test_unit

test-integration: build
	./scripts/make.sh test_integration
