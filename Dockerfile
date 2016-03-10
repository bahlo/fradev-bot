FROM node:latest
MAINTAINER Arne Bahlo <hallo@arne.me>

COPY . /bot
RUN cd /bot && npm install
WORKDIR /bot

ENTRYPOINT ["npm", "start"]
