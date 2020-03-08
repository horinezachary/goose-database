FROM node:10.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js .

CMD ["node", "index.js"]
