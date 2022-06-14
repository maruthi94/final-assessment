FROM node:16

WORKDIR /usr/src/app

ENV NODE_ENV="production"

COPY dist/package*.json .

RUN npm install --omit=dev

COPY dist .


EXPOSE 8080

CMD ["node","index.js"]

