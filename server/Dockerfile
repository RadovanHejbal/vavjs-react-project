# Choose the Image which has Node installed already
FROM node:16

ADD index.js /server/

WORKDIR /usr/src

# COPY all the files from Current Directory into the Container
COPY package*.json ./

COPY . .

# Tell that this image is going to Open a Port 
EXPOSE 3001

# Default Command to launch the Application
CMD ["node", "index.js"]