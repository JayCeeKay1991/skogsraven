FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

EXPOSE 3005

CMD ["node", "dist/index.js"]