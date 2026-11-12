# Private Admin Guide — Rang & Riwaayat

## 1. Accessing the Portal
Navigate to `/admin/login`.
- **Default SuperAdmin Email:** `admin@rangriwaayat.in`
- **Initial Password:** Configured via `INITIAL_ADMIN_PASSWORD` in `.env.local` (default: `Riwaayat@2025Verified`).

## 2. Managing Community Corrections
1. In the sidebar, select **Community Corrections**.
2. Review the user's observation, proposed amendment, and source citation.
3. To approve: enter verification notes and click **Accept & Verify**.
4. To reject: provide reason and click **Reject**.

## 3. Controlling Monetization & Ads
Navigate to **Settings** → **Monetization**. Advertising components (`RRAdSlot`) will not render unless `NEXT_PUBLIC_ADS_ENABLED=true` is set alongside a valid publisher ID in the production environment.

