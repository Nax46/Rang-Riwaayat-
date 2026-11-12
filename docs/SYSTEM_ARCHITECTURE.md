# System Architecture — Rang & Riwaayat

## 1. System Topology
The platform combines Next.js 14 App Router (SSR, SSG, and ISR) with a co-located WebSocket engine (`Socket.IO`) running on Node.js:

```
[ Client Browser ]
      |
      +---> HTTP (SSR Pages / JSON APIs) ---> Next.js 14 App Router
      |                                              |
      |                                              v
      |                                     [ Hybrid Data Store ]
      |                                     (MongoDB / Verified Seeds)
      |
      +---> WSS (WebSockets / Socket.IO) ----> Authoritative Room Engine
                                                     |
                                                     v
                                            [ Ephemeral State Store ]
```

## 2. Server-Authoritative Game State Machine
The multiplayer engine manages ephemeral room state in memory:
- `LOBBY`: Host manages room settings, players join with nickname/avatar, players toggle ready.
- `PLAYING`: Server emits sanitized questions without answer keys. Server runs authoritative 15s timer ticks.
- `ROUND_RESULT`: Server validates answers, calculates points based on time decay, reveals explanations, and updates leaderboard.
- `FINISHED`: Server broadcasts final podium and enables rematch or graceful room closure.

## 3. Data Tier Resilience
The application uses a hybrid data abstraction:
- When remote MongoDB Atlas is connected, Mongoose reads and persists records.
- When running in local development or offline without MongoDB, the repository seamlessly switches to verified in-memory seed records, ensuring 100% operational uptime and zero 500 crashes.

