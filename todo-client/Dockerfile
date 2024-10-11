FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json ./
# RUN npm install

# Copy the rest of the files
COPY . .

# Start the Next.js development server
CMD ["npm", "run", "dev"]

# Expose port 3000
EXPOSE 3000
