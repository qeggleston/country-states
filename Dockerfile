FROM node:8-alpine

WORKDIR /code

EXPOSE 4200

CMD npm run ng serve -- --host 0.0.0.0