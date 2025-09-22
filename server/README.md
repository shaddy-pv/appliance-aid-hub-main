# Appliance Aid Hub API (Express + Prisma + PostgreSQL)

## Prerequisites
- Node.js 18+
- PostgreSQL 14+

## Environment
Create `.env` in `server/`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/appliance_aid_hub?schema=public"
PORT=4000
```

## Install
```sh
cd server
npm install
```

## Database
```sh
# create database (example for psql)
psql -U postgres -c "CREATE DATABASE appliance_aid_hub;"

# generate client
npm run prisma:generate

# apply schema
npm run prisma:migrate -- --name init

# seed data
npm run seed
```

## Run
```sh
# dev
npm run dev
# API will be at http://localhost:4000

# production build
npm run build && npm start
```

## API Endpoints
- GET `/api/services`
- GET `/api/products`
- POST `/api/orders`
- GET `/api/bookings`
- POST `/api/bookings`

## Frontend Dev
In `Home-Service/vite.config.ts` a proxy forwards `/api` to `http://localhost:4000` during dev. Start both:
```sh
# terminal 1
cd server && npm run dev
# terminal 2
cd ../Home-Service && npm run dev
```


