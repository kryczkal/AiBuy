# Use the official Node.js 16 as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app (uncomment this if you decide to use a build step)
# RUN npm run build

# Inform Docker that the container is listening on port 80
EXPOSE 80

# Run the app when the container launches
CMD ["npm", "start", "--", "--port", "80", "--host", "0.0.0.0"]

