FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json ./

COPY apps ./apps
COPY packages ./packages

RUN yarn install
RUN yarn db:generate
RUN yarn build

CMD ["yarn", "dev"]