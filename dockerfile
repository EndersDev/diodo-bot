FROM node:10-alpine

RUN mkdir -p /src

COPY package.json src/package.json

WORKDIR /src

RUN npm install --only=prod --quiet

COPY . /src

CMD npm start