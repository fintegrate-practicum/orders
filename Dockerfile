FROM node:lts-alpine

WORKDIR /app


COPY package*.json ./


RUN npm install



EXPOSE 8787

CMD [ "npm", "run","start:dev" ]