FROM node:8 as builder

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node

RUN npm install

FROM builder as proxy

EXPOSE 3666

ENTRYPOINT "node"
CMD ["server/proxy-server.js"]
