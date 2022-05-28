FROM node:lts-alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Bundle app source
COPY . ./

RUN chown -R node:node /app/node_modules

EXPOSE 3000

# start app
CMD ["npm", "start"]
