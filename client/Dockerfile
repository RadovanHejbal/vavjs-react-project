# Choose the Image which has Node installed already
FROM node:16

WORKDIR /app

# COPY all the files from Current Directory into the Container
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i
RUN npm install axios

# Default Command to launch the Application
CMD ["npm", "start"]