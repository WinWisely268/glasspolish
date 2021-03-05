.PHONY: deps clean build

BUILDARGS := GOOS=linux GOARCH=amd64 go build -a -tags netgo -ldflags '-s -w -extldflags -static'

clean:
	rm -rf bin/{disable,delete,update}-acc/*
	rm -rf bin/pretoken/*
	rm -rf bin/postauth/*

build:
	mkdir -p bin/{disable,delete}-acc
	mkdir -p bin/{pretoken,postauth}
	${BUILDARGS} -o bin/disable-acc/disable-acc ./cmd/disable-acc
	${BUILDARGS} -o bin/delete-acc/delete-acc ./cmd/delete-acc
	${BUILDARGS} -o bin/update-acc/update-acc ./cmd/update-acc
	${BUILDARGS} -o bin/pretoken/pretoken ./cmd/pretoken
	${BUILDARGS} -o bin/postauth/postauth ./cmd/postauth
	#sam build

deploy:
	sam deploy


