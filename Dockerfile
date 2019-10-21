FROM node:current-alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . .
RUN CHMOD +x index.js
RUN yarn link
RUN speedtest-process
