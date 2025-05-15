# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Disable ESLint during build
ENV NEXT_LINT=false

# Build the Next.js application with --no-lint flag to explicitly skip linting
RUN npx next build --no-lint

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/resources ./resources

# Next.js collects anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
