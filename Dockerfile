FROM node:14.8.0-stretch

RUN apt update -y \
    && apt install nginx -y \
    && apt-get install software-properties-common -y \
    && apt-get install certbot -y \    
    && apt-get install python-certbot-nginx -y \
    && apt-get clean

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm install

ADD . /usr/node/app

RUN npm run build

EXPOSE 3040

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]

# CMD [ "node", "build/index" ]
# Observation: remove # and this line if you dont work with docker-compose
