FROM node:10-alpine

RUN mkdir -p /srv/app/server

WORKDIR /srv/app/server

COPY package*.json /srv/app/server/

RUN npm install

COPY . /srv/app/server/

EXPOSE 8000
EXPOSE 27017

CMD ["npm", "run", "dev"]