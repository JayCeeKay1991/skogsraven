# Use the official Node.js image as the base image for the build stage
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory inside the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory inside the container
COPY . .

# Build the React app
RUN npm run build

# Use an nginx image to serve the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
