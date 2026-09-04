# Step 1: Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ARG VITE_BACKEND_REST_URL
ENV VITE_BACKEND_REST_URL=$VITE_BACKEND_REST_URL
RUN npm run build

# Step 2: Production stage
FROM nginx:1.27-alpine AS runner
# Add custom Nginx config to handle React Router client-side routes safely
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
