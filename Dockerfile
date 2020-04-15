FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN groupadd -g 999 appuser && useradd -r -u 999 -g appuser appuser


RUN chown appuser -R /usr/src/app

COPY . ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000

ENV MONGO_HOST "host.docker.internal"

CMD [ "npm", "run", "start" ]


