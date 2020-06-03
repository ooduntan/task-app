FROM node:12.14.0-alpine3.9

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install npm@latest -g --silent

# WORKDIR /opt/app

COPY package*.json /opt/app/
RUN npm install --no-optional && npm cache clean --force

ENV PATH /opt/app/node_modules/.bin:$PATH
ENV PATH=$PATH:/home/node/.npm-global/bin
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT


COPY . .

CMD ["npm", "run", "seedStart"]