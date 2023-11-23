FROM node:20.10-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
