FROM node:current-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN chmod +x index.js && yarn && yarn link && RUN crontab ./crontab && touch cron.log
CMD crond -f