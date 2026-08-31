# ==========================================
# Stage 1: Build the React TypeScript App
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package management files to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies (including TypeScript devDependencies)
RUN npm ci

# Copy the rest of your application source code
COPY . .

# Compile TypeScript and build production-ready static assets
RUN npm run build

# ==========================================
# Stage 2: Serve assets using Nginx
# ==========================================
FROM nginx:1.27-alpine AS runner

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built static assets from the builder stage
# Note: Vite outputs to 'dist'. If using Create React App, change 'dist' to 'build'
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
