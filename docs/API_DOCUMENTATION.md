# API Documentation — Rang & Riwaayat

## 1. Public REST Endpoints

### 1.1 Community Corrections
- **POST `/api/corrections`**
  - **Payload:**
    ```json
    {
      "contentCategory": "Festival Date",
      "targetSlug": "diwali",
      "userEmail": "scholar@institute.org",
      "proposedCorrection": "Detailed observation text...",
      "sourceCitationProvided": "Rashtriya Panchang 2025"
    }
    ```
  - **Response:** `201 Created` with saved report.

- **GET `/api/corrections`**
  - **Response:** Returns list of all submitted community corrections.

---

## 2. Private Admin Endpoints

### 2.1 Admin Authentication
- **POST `/api/admin/login`**
  - **Payload:** `{ "email": "admin@rangriwaayat.in", "password": "..." }`
  - **Response:** Sets HTTP-only secure cookie `rr_admin_token` and returns `{ success: true, user: { ... } }`.

- **POST `/api/admin/logout`**
  - **Response:** Clears session cookie.

### 2.2 Corrections Governance
- **PATCH `/api/admin/corrections`**
  - **Headers:** Authorized session required.
  - **Payload:** `{ "id": "corr-001", "status": "Accepted", "adminNotes": "Verified in gazette" }`

---

## 3. Realtime Socket.IO Events (`/api/socketio`)

| Event Name | Direction | Payload | Description |
|---|---|---|---|
| `create_room` | Client → Server | `{ hostName, avatar, gameMode, password }` | Creates new game room with 6-char PIN |
| `join_room` | Client → Server | `{ roomCode, nickname, avatar, password }` | Joins existing game room |
| `toggle_ready` | Client → Server | `{}` | Toggles player readiness |
| `start_game` | Client → Server | `{}` | Host triggers game commencement |
| `new_question` | Server → Client | `{ id, index, total, question, options }` | Broadcasts question without answers |
| `timer_tick` | Server → Client | `{ secondsLeft }` | Authoritative 1-second interval |
| `submit_answer` | Client → Server | `{ optionIndex, clientTimeSubmitted }` | Submits player answer for verification |
| `round_revealed` | Server → Client | `{ correctIndex, explanation, leaderboard }` | Reveals round results |
| `game_over` | Server → Client | `{ finalLeaderboard }` | Concludes match with podium scores |
| `rematch` | Client → Server | `{}` | Host resets room for rematch |

