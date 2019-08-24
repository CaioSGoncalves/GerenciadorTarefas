FROM node:alpine

WORKDIR /work

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
