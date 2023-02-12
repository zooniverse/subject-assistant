FROM node:18-slim as builder

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN mkdir -p /usr/src
WORKDIR /usr/src/

ADD package.json /usr/src/
ADD package-lock.json /usr/src/

RUN chown -R node:node .

USER node

RUN npm ci

COPY ./ .

FROM builder as proxy

EXPOSE 3666

CMD ["node", "server/proxy-server.js"]
