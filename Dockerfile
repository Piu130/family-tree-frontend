FROM node:5.11

RUN groupadd -r app && useradd -m -r -g app app

RUN mkdir -p /usr/src/app
RUN chown app:app /usr/src/app
WORKDIR /usr/src/app

CMD [ "npm", "start" ]
