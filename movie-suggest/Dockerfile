FROM node:14-slim
#specify working directory
WORKDIR /usr/src/app

# Copy the package json file
COPY ./package*.json ./

RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]