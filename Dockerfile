FROM node:11

# Make folder and move into it
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bring package.json and its lock file over
ADD package*.json ./

# Install all the modules
RUN yarn

# Move the project over
ADD . .

# Expose 3000 for the API server calls
EXPOSE 3000

EXPOSE 5000
CMD ["yarn", "start:dev"]