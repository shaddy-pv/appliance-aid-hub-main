# 🛠️ Appliance Aid Hub

A modern, full-stack appliance service booking platform built with React, Node.js, Express, and MongoDB.

## 🏗️ Project Structure

```
appliance-aid-hub/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   └── package.json
├── shared/            # Shared TypeScript types
│   └── types/
├── database/          # MongoDB schemas & documentation
│   └── README.md
├── .env.example       # Environment variables template
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd appliance-aid-hub
```

### 2. Setup Environment Variables

```bash
# Copy example env files
cp .env.example frontend/.env
cp .env.example backend/.env
```

Edit the `.env` files with your actual values:

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### 3. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Seed the Database (Optional)

```bash
cd backend
npm run seed
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Routing
- **Axios** - HTTP client
- **Zustand** - State management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Argon2** - Password hashing
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service

## 🔑 Key Features

- ✅ User authentication (register, login, JWT)
- ✅ Service browsing and booking
- ✅ Product catalog with cart
- ✅ Razorpay payment integration
- ✅ Admin dashboard
- ✅ Order management
- ✅ Email notifications
- ✅ Responsive design
- ✅ MongoDB database

## 📝 Available Scripts

### Backend

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🗄️ Database

This project uses **MongoDB** with **Mongoose ODM**.

### Models:
- **User** - User accounts and authentication
- **Service** - Available services
- **Product** - Products for sale
- **Order** - Customer orders
- **Booking** - Service bookings
- **RefreshToken** - JWT refresh tokens

See `database/README.md` for detailed schema documentation.

## 🔐 Authentication

- JWT-based authentication
- Access tokens (15min expiry)
- Refresh tokens (7 days expiry)
- Secure password hashing with Argon2
- Protected routes with middleware

## 💳 Payment Integration

Razorpay payment gateway integration:
- Secure payment processing
- Order verification
- Payment status tracking

## 📧 Email Service

Nodemailer integration for:
- Order confirmations
- Booking confirmations
- Password reset emails

## 🛡️ Security Features

- Password hashing with Argon2
- JWT token authentication
- HTTP-only cookies for refresh tokens
- CORS configuration
- Rate limiting
- Helmet.js security headers
- Input validation

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `POST /api/orders/verify` - Verify payment

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings

### Admin (Protected)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/orders` - All orders
- `GET /api/admin/bookings` - All bookings
- `PATCH /api/admin/orders/:id` - Update order status
- `PATCH /api/admin/bookings/:id` - Update booking status

## 🎨 UI Components

Built with shadcn/ui components:
- Button, Card, Input, Label
- Dialog, Sheet, Tabs
- Toast notifications
- Skeleton loaders
- And more...

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🚧 Development

### Code Structure

**Frontend:**
```
frontend/src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── lib/            # Utilities and API
└── assets/         # Images and static files
```

**Backend:**
```
backend/src/
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
├── config/         # Configuration
└── index.ts        # Entry point
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI in `.env`
- Check network access in MongoDB Atlas
- Ensure IP whitelist is configured

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**React, Node.js, and MongoDB**
