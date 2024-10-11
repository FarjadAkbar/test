FROM node:21-alpine

# Set working directory
WORKDIR /app

# Set npm config options
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Start the Next.js development server
CMD ["npm", "run", "dev"]

# Expose port 3000
EXPOSE 3000
