FROM node:13.5

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY *.js ./

CMD ["node", "index.js"]
