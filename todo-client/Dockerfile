# Use the official Bun image for faster builds and development
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies using Bun
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install
RUN bun run build

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js development server using Bun
CMD ["bun", "run", "start"]
