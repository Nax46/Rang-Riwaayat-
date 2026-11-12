# Testing & Quality Assurance Guide — Rang & Riwaayat

## 1. Technical Test Matrix
- **Type Checking:** Run `npx tsc --noEmit` to verify 100% strict TypeScript compliance.
- **Production Compilation:** Run `npm run build` to verify Next.js SSR/SSG route generation, metadata validation, and asset bundling.
- **Realtime WebSocket Testing:**
  - Room creation and PIN generation.
  - Joining room with nickname and duplicate check.
  - Password-protected rooms.
  - Authoritative 15s round countdown synchronisation.
  - Anti-cheat server answer validation and time-decay scoring.
  - Final podium and rematch resets.
- **Client-Side Card Designer:**
  - Canvas high-res 1200x1200px export to PNG.
  - Indic font fallback and text wrapping.
  - Undo and redo history stack operations.
- **Recipe Serving Scaler & Cooking Timers:**
  - Scaler buttons (4, 8, 12, 16, 24) dynamically recalculate ingredient amounts.
  - Interactive timer pause, resume, and countdown.

