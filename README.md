# RANG & RIWAAYAT
### Celebrate Every Tradition.

> India's premier multilingual digital destination for discovering, understanding, preparing for, and celebrating diverse festivals, regional rituals, cultural arts, and culinary traditions.

---

## 🌟 Core Features

- **Multilingual Architecture:** Full native localization in **English** (`/en`), **Hindi (Devanagari)** (`/hi`), and **Gujarati** (`/gu`) with localized URLs, canonical metadata, and hreflang links.
- **Editorial Accuracy & Cultural Parity:** Balanced coverage across Hindu, Muslim, Sikh, Christian, Jain, Buddhist, Parsi, and Tribal traditions verified against the Rashtriya Panchang, Sangeet Natak Akademi, and IGNCA.
- **Celebration Studio:** Client-side HTML5 Canvas Greeting Card Maker with custom Indian motifs (Diyas, Mandalas), bilingual typography, and instant high-res PNG download with 100% user privacy.
- **Interactive Pan-Bharat Map & Culture Explorer:** Explore traditions across all 28 States & 8 Union Territories with a digital **Culture Passport** achievement system.
- **Multiplayer Fun Zone:** Real-time authoritative WebSocket game engine (powered by Socket.IO) supporting private rooms, PIN invites, host controls, synchronized timers, and games like *Festival Battle*, *Guess the Festival*, and *Food Detective*.
- **Interactive Recipe Experience:** Festival sweets and prasad with dynamic serving multipliers (auto-scaled ingredients), checklists, and live step-by-step cooking timers.
- **Verified Festival Calendar:** Month-by-month and community filtering, regional variance indicators, Google Calendar integration, and RFC 5545 `.ics` downloads.
- **Private Admin Dashboard:** Secure JWT/bcrypt authentication, multi-tier editorial governance workflow, translation review, source citation tracking, and community corrections management.
- **SEO & Monetization Ready:** Dynamic XML sitemaps, robots.txt, OpenGraph previews, and non-intrusive configurable AdSense slots.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript (Strict Mode), Tailwind CSS.
- **Realtime Multiplayer Engine:** Node.js, Socket.IO, Server-Authoritative State Machine.
- **Data Layer:** Hybrid Mongoose / MongoDB Atlas schema with graceful fallback to verified offline seed database.
- **Icons & Graphics:** Lucide Icons & handcrafted SVG motifs (Diyas, Mandalas, Kalash, Crescent, Lotus).

---

## 🚀 Getting Started

### 1. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Portal Access
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email:** `admin@rangriwaayat.in`
- **Default Password:** `Riwaayat@2025Verified` *(configured in `.env.example`)*

---

## 📚 Documentation Suite

Comprehensive architecture, schema, governance, and deployment guides are available in `/docs`:
- [`PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md)
- [`PRODUCT_REQUIREMENTS.md`](docs/PRODUCT_REQUIREMENTS.md)
- [`SYSTEM_ARCHITECTURE.md`](docs/SYSTEM_ARCHITECTURE.md)
- [`DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md)
- [`API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md)
- [`BRAND_GUIDELINES.md`](docs/BRAND_GUIDELINES.md)
- [`EDITORIAL_GOVERNANCE.md`](docs/EDITORIAL_GOVERNANCE.md)
- [`SEO_STRATEGY.md`](docs/SEO_STRATEGY.md)
- [`ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md)
- [`DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md)
- [`TESTING_GUIDE.md`](docs/TESTING_GUIDE.md)

