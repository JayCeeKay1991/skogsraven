FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Clean up node_modules and package-lock.json
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build the application
RUN npm run build

EXPOSE 4173

# Serve the application
CMD ["npm", "run", "serve"]
