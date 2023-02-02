#-------------DEVLOP ENVIRONMENT------------------
FROM node:16-alpine as development
VOLUME ["/usr/src/app"]

WORKDIR /usr/src/app

RUN npm i --location=global npm

COPY . .

ENTRYPOINT [ "/bin/sh","-c","npm i && npm run start:debug" ]


#-------------PRODUCTION ENVIRONMENT BUILDER---------------------

FROM node:16-alpine as builder

LABEL stage=builder

WORKDIR /usr/src/app

COPY . .

RUN ls -la

RUN npm i --location=global npm

RUN npm ci

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

COPY --from=builder /usr/src/app/dist ./dist

RUN npm ci --production

RUN ls -la

CMD ["node", "dist/main.js"]
