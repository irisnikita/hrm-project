# syntax=docker/dockerfile:1.4
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

# Leverage BuildKit caching for dependencies
# Use 'mount=type=cache' to cache yarn cache folder
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --network-timeout 1000000

# Cache .next build artifacts
COPY . .
RUN --mount=type=cache,target=.next/cache yarn build

# Stage 2: Create the production image
FROM node:20-alpine AS runner

WORKDIR /app

# Install PM2 globally
RUN yarn global add pm2

# Copy necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env* ./
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
# CMD ["yarn", "start"]
CMD ["pm2-runtime", "start", "node_modules/.bin/next", "--name", "compily-fe", "--", "start"]
