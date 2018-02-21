install:
	npm install
build:
	npm run build
test:
	npm test
lint:
	npm run eslint ./src/**
startd:
	DEBUG="todoManager:*" npm run nodemon -- --watch . --ext js,pug --exec npm run start:dev:server
start:
	DEBUG="todoManager:*" npm run start
hot:
	npm run start:dev:client
