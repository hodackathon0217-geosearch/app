FROM node:7.6.0

RUN npm i -g yarn

WORKDIR /app

COPY . .

RUN yarn install \
  && yarn run build \
  && yarn install --production --ignore-scripts --prefer-offline \
  && yarn cache clean

CMD ["yarn", "start"]
