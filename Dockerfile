FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY yarn.lock ./

COPY tsconfig.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Copying private_key to docker image
COPY ./src/middlewares/private_key.pem ./public/middlewares/private_key.pem

EXPOSE 8080
CMD [ "node", "./public/index.js" ]