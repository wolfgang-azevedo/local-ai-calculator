# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Create required directories
RUN mkdir -p src/styles public/data && \
    touch src/styles/globals.css

# Copy styles and data files
COPY src/styles/globals.css src/styles/
COPY src/data/gpu_db.csv public/data/

# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create data directory and copy data files from builder stage
RUN mkdir -p /usr/share/nginx/html/data
COPY --from=builder /app/public/data/gpu_db.csv /usr/share/nginx/html/data/

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]