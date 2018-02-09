install:
	npm install
build:
	npm run build
test:
	npm test
lint:
	npm run eslint ./src/**
start:
	DEBUG="todoManager:*" npm run nodemon -- --watch . --ext js,jsx,pug --exec  babel-node -- 'src/server/bin/todoManager.js'
