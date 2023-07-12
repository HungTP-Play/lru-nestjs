FROM node:20.4-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]