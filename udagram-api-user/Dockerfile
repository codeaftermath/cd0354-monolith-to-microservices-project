FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci -f

EXPOSE 8080

CMD ["npm", "run", "prod"]