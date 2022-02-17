FROM node:14.8.0-stretch

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm install

ADD . /usr/node/app

RUN npm run build

EXPOSE 3040

# CMD [ "node", "build/index" ]
# Observation: remove # and this line if you dont work with docker-compose
