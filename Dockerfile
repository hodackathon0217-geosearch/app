FROM node:7.6.0

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "start"]
