.PHONY: deps clean build

BUILDARGS := GOOS=linux GOARCH=amd64 go build -a -tags netgo -ldflags '-s -w -extldflags -static'

clean:
	rm -rf bin/{disable,delete,update}-acc/*
	rm -rf bin/pretoken/*
	rm -rf bin/postauth/*
	rm -rf bin/{download,upload}-url/*
	rm -rf bin/resize-img/*

build:
	mkdir -p bin/{disable,delete}-acc
	mkdir -p bin/{pretoken,postauth}
	mkdir -p bin/{download,upload}-url
	mkdir -p bin/resize-img
	${BUILDARGS} -o bin/disable-acc/disable-acc ./cmd/disable-acc
	${BUILDARGS} -o bin/delete-acc/delete-acc ./cmd/delete-acc
	${BUILDARGS} -o bin/update-acc/update-acc ./cmd/update-acc
	${BUILDARGS} -o bin/pretoken/pretoken ./cmd/pretoken
	${BUILDARGS} -o bin/postauth/postauth ./cmd/postauth
	${BUILDARGS} -o bin/download-url/download-url ./cmd/download-url
	${BUILDARGS} -o bin/upload-url/upload-url ./cmd/upload-url
	${BUILDARGS} -o bin/resize-img/resize-img ./cmd/resize-img

test:
	go test -v ./...

deploy:
	sam deploy --no-confirm-changeset
