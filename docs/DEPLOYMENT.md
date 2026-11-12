# Rang & Riwaayat — Production Deployment & AdSense Guide

This document provides step-by-step instructions for deploying **Rang & Riwaayat** to **Vercel** and **Render**, along with complete instructions for **Google AdSense** verification and policy compliance.

---

## 1. Architecture Overview

Rang & Riwaayat supports two first-class deployment targets:

| Platform | Best For | Architecture | Multiplayer Socket Engine |
| :--- | :--- | :--- | :--- |
| **Vercel** | Global Edge CDN, sub-second TTFB, serverless auto-scaling | Next.js Serverless Functions | Polling HTTP fallback (or connected to dedicated Render backend) |
| **Render** | Full long-running Node.js process, cost-effective, persistent WebSockets | `node server.js` with persistent Socket.IO | Direct persistent WebSockets (`0.0.0.0`) |
| **Hybrid** | Enterprise grade: Vercel frontend + Render realtime microservice | Next.js on Vercel + WebSocket server on Render | Full WebSockets via `NEXT_PUBLIC_SOCKET_URL` |

---

## 2. Deploying to Vercel (Recommended for Content & SEO)

### Option A: One-Click Git Deployment (Recommended)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and select the repository.
3. Vercel automatically detects **Next.js**.
4. In **Environment Variables**, add:
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   USE_FILE_DATA_STORE_FALLBACK=true
   ADMIN_JWT_SECRET=your-64-character-random-secret
   NEXT_PUBLIC_ADS_ENABLED=false
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_PUB_ID=pub-XXXXXXXXXXXXXXXX
   ```
5. Click **Deploy**. Vercel will build the project (`npm run build`) and provision 88+ static pages instantly across its global edge network.

### Option B: Deploying via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

The bundled `vercel.json` automatically configures:
- Proper security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- 1-year immutable caching for static assets in `/_next/static/`
- Direct plain-text delivery of `/ads.txt` with correct cache control

---

## 3. Deploying to Render (Recommended for Realtime Multiplayer)

The repository includes a ready-to-use `render.yaml` Blueprint.

### Option A: Render Blueprint (Infrastructure-as-Code)
1. Push your code to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com/), click **New +** → **Blueprint**.
3. Select your repository. Render will automatically parse `render.yaml` and configure:
   - **Environment:** Node
   - **Region:** Singapore (`singapore` for lowest latency in India)
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node server.js`
   - **Health Check Path:** `/api/health`
4. Click **Apply**. Render will build and deploy your application with zero downtime.

### Option B: Manual Web Service Setup
- **Name:** `rang-and-riwaayat`
- **Region:** Singapore or Frankfurt
- **Branch:** `main`
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node server.js`
- **Health Check Path:** `/api/health`
- **Environment Variables:**
  - `NODE_ENV`: `production`
  - `PORT`: `10000`
  - `HOST`: `0.0.0.0`
  - `USE_FILE_DATA_STORE_FALLBACK`: `true`
  - `ADMIN_JWT_SECRET`: *(generate a random 64-char string)*
  - `NEXT_PUBLIC_SITE_URL`: `https://your-service.onrender.com`

---

## 4. Google AdSense Setup & Policy Compliance Checklist

Rang & Riwaayat is built strictly following **Google Publisher Policies** and **Core Web Vitals** guidelines.

### Verification Steps
1. **Apply for Google AdSense:**
   - Go to [google.com/adsense](https://www.google.com/adsense/) and submit your site domain (e.g. `rangriwaayat.in`).
2. **Configure `ads.txt`:**
   - Google requires an `ads.txt` file at the root: `https://yourdomain.com/ads.txt`.
   - Update `public/ads.txt` with your 16-digit publisher ID:
     ```text
     google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
     ```
   - Alternatively, set the environment variable `NEXT_PUBLIC_ADSENSE_PUB_ID=pub-XXXXXXXXXXXXXXXX`. The dynamic handler in `app/ads.txt/route.ts` will serve it automatically.
3. **Connect AdSense Script:**
   - In your production environment settings, set:
     ```env
     NEXT_PUBLIC_ADS_ENABLED=true
     NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_PUB_ID=pub-XXXXXXXXXXXXXXXX
     ```
   - The `<GoogleAdSense />` component in `components/GoogleAdSense.tsx` will automatically inject the official Google AdSense library asynchronously (`strategy="afterInteractive"`).
4. **Cumulative Layout Shift (CLS) Safeguards:**
   - Every `<RRAdSlot />` component uses explicit reserved minimum heights (`min-h-[100px]` or `min-h-[280px]`) and includes the mandated policy label `"ADVERTISEMENT / SPONSORED"` to prevent accidental clicks.

---

## 5. Health Check & Monitoring

The platform includes an automated zero-downtime health check probe at `/api/health`:

```bash
curl https://your-domain.com/api/health
```

Expected response (`HTTP 200 OK`):
```json
{
  "status": "healthy",
  "service": "Rang & Riwaayat Platform",
  "uptimeSeconds": 420,
  "timestamp": "2026-11-08T10:10:00.000Z",
  "nodeEnv": "production",
  "currentYear": 2026
}
```
Use this URL for uptime monitors (e.g., BetterStack, UptimeRobot, Render Health Check).

