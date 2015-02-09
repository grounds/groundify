.PHONY: all re build lib minify clean vendor

all: vendor build

re: clean all

build: lib minify

lib:
	./scripts/build.sh lib
	
minify:
	./scripts/build.sh minify
	
clean:
	rm -rf vendor/*
	rm -rf build/*
	
vendor:
	./scripts/vendor.sh