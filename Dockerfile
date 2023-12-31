FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install
COPY . .
EXPOSE 9999

# CMD [ "./scripts/startup.sh" ]
# CMD ["/bin/sh", "-c", "./scripts/startup.sh"]
CMD ["/bin/sh", "-c", "npx prisma generate;npx prisma migrate dev --name init --preview-feature;npm run runstart"]
