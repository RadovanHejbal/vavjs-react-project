# Choose the Image which has Node installed already
FROM node:16

WORKDIR /client/

# COPY all the files from Current Directory into the Container
COPY package*.json ./

# Install the Project Dependencies like Express Framework
RUN npm install
RUN npm install axios

COPY . .

# Tell that this image is going to Open a Port 
EXPOSE 8080

# Default Command to launch the Application
CMD ["npm", "start"]