FROM node:16.20.1

WORKDIR /app

# Copy the package.json and package-lock.json files for the service
COPY inventory-service/package*.json ./

# Copy the common directory's package.json and package-lock.json files
COPY common/package*.json ./common/

# Install dependencies for both the service and common directory
RUN npm install

# Copy the rest of the service files
COPY inventory-service ./

# Copy the rest of the common directory files
COPY common ./common

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

EXPOSE 3006

CMD ["node", "dist/index.js"]

