FROM node:10-alpine

RUN mkdir -p /srv/app/client

WORKDIR /srv/app/client

COPY package*.json /srv/app/client/

RUN npm install

COPY . /srv/app/client/

EXPOSE 3000

CMD ["npm", "start"]