FROM node:latest
MAINTAINER Arne Bahlo <hallo@arne.me>

COPY . /bot
WORKDIR /bot

ENTRYPOINT ["npm", "start"]
