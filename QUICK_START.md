# 🚀 Quick Start Guide

Get your Appliance Aid Hub up and running in 5 minutes!

---

## ⚡ Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works!)
- Git installed

---

## 📋 Step-by-Step Setup

### 1️⃣ Clone & Navigate

```bash
git clone <your-repo-url>
cd appliance-aid-hub
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password
```

Seed the database:
```bash
npm run seed
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_your_key
```

### 4️⃣ Run the Application

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

### 5️⃣ Access the App

- 🌐 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:5000

---

## 🎯 Test Credentials

After seeding, you can login with:

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**Regular User:**
- Email: `user@example.com`
- Password: `user123`

---

## 🔧 Common Issues

### MongoDB Connection Failed
- Check your MongoDB URI
- Verify network access in MongoDB Atlas
- Ensure IP whitelist includes your IP

### Port Already in Use
```bash
# Kill port 5000
npx kill-port 5000

# Kill port 5173
npx kill-port 5173
```

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

1. ✅ Explore the admin dashboard at `/admin`
2. ✅ Browse services and products
3. ✅ Test the booking flow
4. ✅ Try the payment integration
5. ✅ Check email notifications

---

## 🎉 You're All Set!

Your application is now running. Check out the full `README.md` for more details.

**Happy coding! 🚀**
