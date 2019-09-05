FROM node:8 as builder

RUN mkdir -p /usr/src
WORKDIR /usr/src/

ADD package.json /usr/src/
ADD package-lock.json /usr/src/

RUN chown -R node:node .

USER node

RUN npm install

COPY ./ .

FROM builder as proxy

EXPOSE 3666

CMD ["node", "server/proxy-server.js"]
