FROM node

WORKDIR /developer/flights_service

COPY . .

RUN npm ci

CMD [ "npm","run","dev" ]