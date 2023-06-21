FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install
COPY . .
EXPOSE 9999

CMD [ "./scripts/startup.sh" ]
