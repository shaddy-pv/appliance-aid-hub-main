#!/bin/bash

# Production Deployment Script for Appliance Aid Hub
# This script builds and deploys both frontend and backend

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Environment check
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from example..."
    if [ -f "env.production.example" ]; then
        cp env.production.example .env
        print_warning "Please update .env file with your production values"
    else
        print_error "No environment example file found. Please create .env file manually."
        exit 1
    fi
fi

# Backend deployment
print_status "Building backend server..."

cd server

# Install dependencies
print_status "Installing backend dependencies..."
npm ci --only=production

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate

# Run database migrations
print_status "Running database migrations..."
npx prisma migrate deploy

# Seed database if needed
if [ "$1" = "--seed" ]; then
    print_status "Seeding database..."
    npm run seed
fi

# Build backend
print_status "Building backend TypeScript..."
npm run build

print_success "Backend build completed"

cd ..

# Frontend deployment
print_status "Building frontend application..."

# Install dependencies
print_status "Installing frontend dependencies..."
npm ci

# Build frontend
print_status "Building frontend for production..."
npm run build

print_success "Frontend build completed"

# Create production directory structure
print_status "Creating production directory structure..."
mkdir -p production/{frontend,backend}

# Copy backend files
print_status "Copying backend files..."
cp -r server/dist production/backend/
cp server/package.json production/backend/
cp server/prisma production/backend/ -r
cp server/.env production/backend/ 2>/dev/null || print_warning "No .env file found in server directory"

# Copy frontend files
print_status "Copying frontend files..."
cp -r dist/* production/frontend/

# Create production startup scripts
print_status "Creating production startup scripts..."

# Backend startup script
cat > production/backend/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Appliance Aid Hub Backend Server..."
export NODE_ENV=production
node dist/index.js
EOF

chmod +x production/backend/start.sh

# Frontend serve script (using serve package)
cat > production/frontend/serve.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Appliance Aid Hub Frontend Server..."
npx serve -s . -l 8080
EOF

chmod +x production/frontend/serve.sh

# Create docker-compose file for easy deployment
cat > production/docker-compose.yml << 'EOF'
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./dev.db
    volumes:
      - ./backend/prisma:/app/prisma
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "8080:8080"
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
EOF

# Create nginx configuration
cat > production/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:4000;
    }

    upstream frontend {
        server frontend:8080;
    }

    server {
        listen 80;
        server_name _;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Backend API
        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF

# Create Dockerfiles
cat > production/backend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY prisma ./prisma

EXPOSE 4000

CMD ["node", "dist/index.js"]
EOF

cat > production/frontend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY . .

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]
EOF

# Create README for production
cat > production/README.md << 'EOF'
# Appliance Aid Hub - Production Deployment

## Quick Start

### Option 1: Direct Node.js Deployment

1. **Start Backend:**
   ```bash
   cd backend
   ./start.sh
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   ./serve.sh
   ```

### Option 2: Docker Deployment

```bash
docker-compose up -d
```

## Environment Variables

Make sure to set the following environment variables:

### Backend (.env)
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV=production`
- `PORT=4000`

### Frontend
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_GEMINI_API_KEY` - Gemini AI API key

## Health Checks

- Frontend: http://localhost:8080
- Backend: http://localhost:4000/health
- API: http://localhost:4000/api

## Monitoring

Check logs:
```bash
# Backend logs
docker-compose logs backend

# Frontend logs
docker-compose logs frontend

# All logs
docker-compose logs
```

## Database

The application uses SQLite by default. For production, consider using PostgreSQL:

1. Update `DATABASE_URL` in backend/.env
2. Run migrations: `npx prisma migrate deploy`
3. Seed data: `npm run seed`

## Security

- Change default JWT secret
- Use HTTPS in production
- Configure proper CORS origins
- Set up rate limiting
- Use environment variables for secrets
EOF

print_success "Production deployment package created in ./production directory"

# Display summary
echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
print_status "Production files are ready in: ./production"
print_status "Backend: ./production/backend"
print_status "Frontend: ./production/frontend"
echo ""
print_status "To start the application:"
print_status "1. cd production/backend && ./start.sh"
print_status "2. cd production/frontend && ./serve.sh"
echo ""
print_status "Or use Docker: cd production && docker-compose up -d"
echo ""
print_warning "Don't forget to:"
print_warning "- Update environment variables"
print_warning "- Configure your domain and SSL certificates"
print_warning "- Set up monitoring and logging"
print_warning "- Configure database backups"
