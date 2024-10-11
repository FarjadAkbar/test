FROM node:21-alpine

# Set working directory
WORKDIR /app

# Set npm config options
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Yarn using the official installation script
RUN apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    ln -s /root/.yarn/bin/yarn /usr/local/bin/yarn

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the files
COPY . .

# Start the Next.js development server
CMD ["npm", "run", "dev"]

# Expose port 3000
EXPOSE 3000
