# Database Configuration

This project uses **MongoDB** as the database.

## Local Development Setup

### Option 1: MongoDB Local Installation

1. **Install MongoDB Community Edition**
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB Service**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Verify Connection**
   ```bash
   mongosh
   ```

4. **Update Backend .env**
   ```
   MONGODB_URI=mongodb://localhost:27017/home-services
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Free Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Setup Database Access**
   - Database Access → Add New Database User
   - Create username and password
   - Grant read/write permissions

4. **Setup Network Access**
   - Network Access → Add IP Address
   - Add your current IP or allow from anywhere (0.0.0.0/0) for development

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database user password

6. **Update Backend .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/home-services?retryWrites=true&w=majority
   ```

### Option 3: Docker

1. **Run MongoDB Container**
   ```bash
   docker run -d \
     --name mongodb \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password \
     -v mongodb_data:/data/db \
     mongo:latest
   ```

2. **Update Backend .env**
   ```
   MONGODB_URI=mongodb://admin:password@localhost:27017/home-services?authSource=admin
   ```

## Database Schema

### Collections

#### Users
- email (unique, indexed)
- name
- passwordHash
- role (user, admin, technician)
- emailVerified
- timestamps

#### Services
- title (unique, indexed)
- description
- price
- duration
- rating
- popular (indexed)
- imageUrl
- timestamps

#### Products
- name (unique, indexed)
- brand (indexed)
- price
- originalPrice
- rating
- reviews
- imageUrl
- inStock
- bestseller (indexed)
- timestamps

#### Orders
- itemsJson
- subtotal
- paymentMethod
- status (indexed)
- customer details (name, email, phone, address)
- timestamps (indexed)

#### Bookings
- status (indexed)
- serviceId (ref to Services, indexed)
- preferredDate
- preferredTimeSlot
- customer details (name, email, phone, address)
- notes
- timestamps (indexed)

#### RefreshTokens
- userId (ref to Users, indexed)
- tokenHash (unique, indexed)
- revokedAt
- expiresAt (TTL index)
- timestamps

## Seeding Database

```bash
cd backend
npm run seed
```

This will create:
- 6 sample services
- 4 sample products
- Admin user (admin@homeservices.com / admin123)
- Test user (user@test.com / user123)

## Backup & Restore

### Backup
```bash
mongodump --uri="mongodb://localhost:27017/home-services" --out=./backup
```

### Restore
```bash
mongorestore --uri="mongodb://localhost:27017/home-services" ./backup/home-services
```

## Monitoring

### MongoDB Compass (GUI)
- Download: https://www.mongodb.com/products/compass
- Connect using your MONGODB_URI

### Command Line
```bash
mongosh "mongodb://localhost:27017/home-services"

# Show collections
show collections

# Count documents
db.users.countDocuments()
db.services.countDocuments()
db.products.countDocuments()

# Find documents
db.users.find().pretty()
db.services.find({ popular: true }).pretty()
```

## Indexes

All indexes are automatically created by Mongoose schemas:
- User: email
- Service: title, popular + rating
- Product: name, brand, bestseller + rating
- Order: customerEmail, status, createdAt
- Booking: customerEmail, status, serviceId, createdAt
- RefreshToken: userId, tokenHash, expiresAt (TTL)

## Performance Tips

1. **Use indexes** for frequently queried fields
2. **Limit results** using `.limit()` for large collections
3. **Use projections** to fetch only needed fields
4. **Enable connection pooling** (already configured)
5. **Monitor slow queries** using MongoDB Atlas or Compass
