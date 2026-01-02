# Stage 1: Build
FROM node:22-alpine AS build
# Install system dependencies for native modules (sharp, sqlite3, etc.)
RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev vips-dev

WORKDIR /app
COPY package.json package-lock.json ./
# Use 'npm ci' for a clean, repeatable install based on the lockfile
RUN npm ci --only=production

COPY . .
RUN npm run build

# Stage 2: Hardened Runtime
FROM node:22-alpine
RUN apk add --no-cache vips-dev
WORKDIR /app

# Copy only compiled code and production dependencies
COPY --from=build /app ./

# Create necessary folders for persistence and temp cache
# We set ownership to 'node' user (UID 1000) immediately
RUN mkdir -p /app/sqlite-db /app/public/uploads /app/.cache \
    && chown -R node:node /app

# Switch to non-root user for execution
USER node

EXPOSE 1337
ENV NODE_ENV=production

CMD ["npm", "run", "start"]