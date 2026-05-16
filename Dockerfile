# ==========================================
# Stage 1: Build & Dependency Resolution
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies for potential asset building)
RUN npm ci

# Copy the rest of your application code
COPY . .

# Prune development dependencies to keep the production layer slim
RUN npm prune --production

# ==========================================
# Stage 2: Final Production Runtime Environment
# ==========================================
FROM node:20-alpine AS runner

# Set production environment variables
ENV NODE_ENV=production \
    PORT=3001 \
    NODE_OPTIONS="--openssl-legacy-provider"

WORKDIR /usr/src/app

# Copy only the pruned node_modules and built source assets from Stage 1
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .

# Expose the internal container port to the docker network bridge
EXPOSE 3001

# Drop root privileges and enforce execution under an unprivileged user profile
USER node

# Initialize the runtime container entrypoint process
CMD ["node", "app.js"]
