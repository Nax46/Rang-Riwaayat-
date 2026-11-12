# Production Deployment Guide — Rang & Riwaayat

## 1. Prerequisites
- Node.js >= 18.17 (Node 20+ or 22+ recommended)
- MongoDB Atlas cluster or self-hosted MongoDB 6.0+

## 2. Environment Variables Configuration
Set the following environment variables in your production host (e.g. Vercel, Railway, Render, AWS ECS, or DigitalOcean):

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://rangriwaayat.in

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/rang_riwaayat?retryWrites=true&w=majority

# Security
ADMIN_JWT_SECRET=<long-random-cryptographic-secret>
INITIAL_ADMIN_EMAIL=admin@rangriwaayat.in
INITIAL_ADMIN_NAME="Chief Editor"
INITIAL_ADMIN_PASSWORD=<strong-unique-production-password>

# Monetization (Activate only after publisher approval)
NEXT_PUBLIC_ADS_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
```

## 3. Build & Execution
```bash
# Production Build
npm run build

# Start Production Server with Realtime WebSocket Engine
npm run start
```

