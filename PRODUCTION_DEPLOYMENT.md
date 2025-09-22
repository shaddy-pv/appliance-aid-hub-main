# Production Deployment Guide

## Overview
This guide covers deploying the Appliance Aid Hub application to production.

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or SQLite for development)
- Domain name and SSL certificate
- Environment variables configured

## Environment Setup

### Frontend (.env.production)
```bash
VITE_API_BASE_URL=https://your-api-domain.com
VITE_GEMINI_API_KEY=your-production-gemini-api-key
NODE_ENV=production
```

### Backend (.env)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/appliance_aid_hub?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
ACCESS_TOKEN_TTL_MINUTES=15
REFRESH_TOKEN_TTL_DAYS=14
PORT=4000
NODE_ENV=production
COOKIE_DOMAIN=your-domain.com
```

## Database Setup

### PostgreSQL (Production)
1. Create database:
```sql
CREATE DATABASE appliance_aid_hub;
```

2. Run migrations:
```bash
cd server
npx prisma migrate deploy
```

3. Seed data:
```bash
npm run seed
```

## Build and Deploy

### Frontend
```bash
cd Home-Service/appliance-aid-hub-main
npm install
npm run build
```

### Backend
```bash
cd server
npm install
npm run build
npm start
```

## Production Optimizations

### Frontend
- Code splitting implemented
- Bundle size optimized
- Error boundaries added
- Loading states implemented
- TypeScript strict mode enabled

### Backend
- Helmet for security headers
- CORS configured
- Rate limiting (recommended)
- Database connection pooling
- Error handling and logging

## Security Considerations

1. **Environment Variables**: Never commit .env files
2. **JWT Secret**: Use a strong, random secret
3. **Database**: Use strong passwords and restrict access
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure CORS for your domain only
6. **Rate Limiting**: Implement rate limiting for API endpoints

## Monitoring

### Recommended Tools
- Application monitoring (e.g., Sentry)
- Database monitoring
- Server monitoring (e.g., PM2)
- Log aggregation

### Health Checks
- Frontend: `/health` endpoint
- Backend: `/health` endpoint

## Deployment Options

### Option 1: Traditional VPS
1. Set up Ubuntu/CentOS server
2. Install Node.js, PostgreSQL, Nginx
3. Deploy using PM2 for process management
4. Configure Nginx as reverse proxy

### Option 2: Docker
1. Create Dockerfile for frontend and backend
2. Use docker-compose for orchestration
3. Deploy to any Docker-compatible platform

### Option 3: Cloud Platforms
- **Vercel/Netlify**: Frontend deployment
- **Railway/Render**: Full-stack deployment
- **AWS/GCP/Azure**: Enterprise deployment

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement service worker for caching
- Optimize images

### Backend
- Database indexing
- Query optimization
- Caching layer (Redis)
- Load balancing

## Backup Strategy

1. **Database**: Regular automated backups
2. **Files**: Backup uploaded files
3. **Configuration**: Version control all configs
4. **Monitoring**: Set up backup monitoring

## Troubleshooting

### Common Issues
1. **CORS errors**: Check CORS configuration
2. **Database connection**: Verify DATABASE_URL
3. **JWT errors**: Check JWT_SECRET
4. **Build failures**: Check Node.js version

### Logs
- Frontend: Browser console + network tab
- Backend: Application logs + database logs
- Server: System logs

## Maintenance

### Regular Tasks
1. Update dependencies
2. Monitor performance
3. Check security updates
4. Backup verification
5. Log rotation

### Updates
1. Test in staging environment
2. Deploy during low-traffic periods
3. Monitor after deployment
4. Rollback plan ready

## Support

For issues and questions:
- Check logs first
- Review this documentation
- Contact development team
- Create issue in repository
