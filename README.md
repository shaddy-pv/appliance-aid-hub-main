# 🏠 Appliance Aid Hub

A modern, full-stack web application for home appliance repair services and spare parts sales. Built with React, TypeScript, Node.js, and Prisma.

## ✨ Features

### 🛠️ **Core Services**
- **AC Service & Repair** - Complete maintenance, gas refilling, and repair
- **Washing Machine Repair** - Expert repair for all brands
- **Microwave Repair** - Quick repair and maintenance services
- **Electrical Repair** - Safe and reliable electrical services
- **Refrigerator Service** - Comprehensive fridge maintenance
- **Geyser Repair** - Water heater repair and maintenance

### 🛒 **E-commerce Features**
- **Spare Parts Store** - Genuine parts for all major brands
- **Shopping Cart** - Add products and services to cart
- **Order Management** - Track orders and booking status
- **Payment Integration** - COD, Card, and UPI support

### 🤖 **AI-Powered Support**
- **Smart Chatbot** - Powered by Google Gemini AI
- **Diagnostic Tool** - AI-assisted appliance troubleshooting
- **24/7 Support** - Instant help and guidance

### 🔐 **User Management**
- **Authentication** - Secure login and registration
- **User Profiles** - Manage personal information
- **Order History** - Track all your orders and bookings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd appliance-aid-hub-main
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Environment Setup

**Frontend (.env):**
```bash
VITE_API_BASE_URL=http://localhost:4000
VITE_GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=development
```

**Backend (server/.env):**
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret"
NODE_ENV=development
PORT=4000
```

### 4. Database Setup
```bash
cd server
npx prisma generate
npx prisma migrate deploy
npm run seed
```

### 5. Start Development Servers

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Frontend (Terminal 2):**
```bash
npm run dev
```

### 6. Access the Application
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:4000
- **Health Check:** http://localhost:4000/health

## 🏗️ Project Structure

```
appliance-aid-hub-main/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components
│   │   └── ...                  # Feature components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities and API clients
│   ├── contexts/                # React contexts
│   └── assets/                  # Static assets
├── server/                      # Backend source code
│   ├── src/                     # Server source code
│   │   ├── routes/              # API routes
│   │   └── index.ts             # Main server file
│   ├── prisma/                  # Database schema and migrations
│   └── package.json             # Backend dependencies
├── public/                      # Static public files
├── dist/                        # Built frontend files
└── production/                  # Production deployment files
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Firebase** - Authentication and analytics

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM
- **SQLite/PostgreSQL** - Database
- **JWT** - Authentication
- **Argon2** - Password hashing
- **Zod** - Schema validation

### AI & External Services
- **Google Gemini AI** - Chatbot intelligence
- **Firebase** - Authentication and analytics

## 📦 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run type-check   # Run TypeScript type checking
```

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start            # Start production server
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate # Run database migrations
npm run seed         # Seed database with sample data
```

## 🚀 Production Deployment

### Option 1: Automated Deployment
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

1. **Build the application:**
   ```bash
   # Frontend
   npm run build
   
   # Backend
   cd server
   npm run build
   ```

2. **Set up production environment:**
   - Configure environment variables
   - Set up production database
   - Configure reverse proxy (Nginx)

3. **Deploy using Docker:**
   ```bash
   cd production
   docker-compose up -d
   ```

### Option 3: Cloud Deployment

**Frontend (Vercel/Netlify):**
- Connect your repository
- Set build command: `npm run build`
- Set output directory: `dist`

**Backend (Railway/Render):**
- Connect your repository
- Set build command: `cd server && npm run build`
- Set start command: `cd server && npm start`

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:4000
VITE_GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=development
```

#### Backend (server/.env)
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
ACCESS_TOKEN_TTL_MINUTES=15
REFRESH_TOKEN_TTL_DAYS=14
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080,http://localhost:3000
```

### Database Configuration

The application supports both SQLite (development) and PostgreSQL (production):

**SQLite (Default):**
```bash
DATABASE_URL="file:./dev.db"
```

**PostgreSQL:**
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/appliance_aid_hub?schema=public"
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests once
npm run test:run
```

### Test Structure
```
src/
├── test/
│   └── setup.ts              # Test setup
├── components/
│   └── __tests__/            # Component tests
├── pages/
│   └── __tests__/            # Page tests
└── lib/
    └── __tests__/            # Utility tests
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Argon2id encryption
- **CORS Protection** - Configured origins
- **Rate Limiting** - API request limiting
- **Input Validation** - Zod schema validation
- **Security Headers** - Helmet.js protection
- **Environment Variables** - Secure configuration

## 📊 Performance Optimizations

- **Code Splitting** - Lazy loading of components
- **Bundle Optimization** - Manual chunk splitting
- **Image Optimization** - Responsive images
- **Caching** - React Query caching
- **Tree Shaking** - Dead code elimination
- **Minification** - Production build optimization

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill process on port 4000
   npx kill-port 4000
   
   # Kill process on port 8080
   npx kill-port 8080
   ```

2. **Database connection issues:**
   ```bash
   cd server
   npx prisma generate
   npx prisma migrate reset
   npm run seed
   ```

3. **Build failures:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript errors:**
   ```bash
   npm run type-check
   ```

### Getting Help

- Check the [Issues](../../issues) page
- Review the [Documentation](./docs/)
- Contact the development team

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [Prisma](https://www.prisma.io/) - Database ORM
- [Google Gemini](https://ai.google.dev/) - AI capabilities

## 📞 Support

For support and questions:
- **Email:** support@applianceaidhub.com
- **Phone:** +91 98765 43210
- **Website:** https://applianceaidhub.com

---

**Built with ❤️ for better home appliance care**