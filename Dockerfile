# Use Alpine Linux as base image
FROM alpine:latest

# Set environment variables
ENV NODE_VERSION=20.0.0

# Install dependencies
RUN apk add --no-cache nodejs npm

# Verify installation
RUN node --version
RUN npm --version
# Set the working directory inside the container
WORKDIR /srtider_server

# Copy package.json and package-lock.json (if available) to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app using Nest CLI
CMD ["npm", "run", "start:dev"]
