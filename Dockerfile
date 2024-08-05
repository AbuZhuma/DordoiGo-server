FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

WORKDIR /app/src

EXPOSE 3001

CMD ["node", "server.js"]
