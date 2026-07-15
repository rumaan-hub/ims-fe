## Dentistry 99 — Procurement & Inventory Management System (IMS)

Dentistry 99 IMS is a subscription-based procurement and inventory platform built for dental offices. Practices purchase a membership to centralize procurement, streamline purchasing workflows, and collaborate with Dentistry 99’s operations team to manage vendors, pricing, approvals, and replenishment — all in one place.

### Key Capabilities
- **Membership & Billing**: Subscription-based access with plan selection, checkout, and automated renewals.
- **Centralized Procurement**: Standardized catalogs, vendor management, negotiated pricing, and purchase order generation.


### Tech Stack
- **Framework**: Next.js (App Router) + TypeScript
- **UI**: Tailwind CSS and component primitives
- **State/Utilities**: Lightweight hooks and utilities within `src`

### Project Structure (high level)
- `src/app/` — App Router pages (e.g., `login`, `register`, `home`, `checkout`)
- `src/globalComponents/` — Reusable UI: navbar, footer, sections, cards, inputs, modals
- `src/components/ui/` — UI primitives (accordion, select, radio group, stepper)
- `src/__Api__/` — API call manager and client-side helpers
- `src/store/` — Client-side state stores
- `src/lib/` — Utilities and mock data
- `public/` — Static assets (icons, images, sounds)

---

## Getting Started (Development)

Prerequisites:
- Node.js 18+
- npm (or yarn/pnpm/bun)

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Environment variables (if applicable):
- Create a `.env.local` in the project root for any secrets (API keys, endpoints, etc.).

---

## Subscription Model (Product Overview)

Dentistry offices subscribe to a membership that unlocks procurement and inventory features, with tiered plans that can include:
- **Core**: Catalog access, PO creation, and basic inventory tracking.
- **Plus**: Approval workflows, spend analytics, and vendor performance reporting.
- **Enterprise**: Multi-location support, custom integrations, and co-managed procurement by Dentistry 99.

Billing and plan management are handled directly in-app through secure checkout and account settings.

---

## Core User Flows
- **Onboarding**: Register, select a plan, complete checkout, and set up locations and users.
- **Procurement**: Create requisitions, route approvals, issue POs, and track fulfillment.
- **Inventory**: Configure par levels, receive stock, and monitor consumption with low-stock alerts.
- **Administration**: Manage teams, roles/permissions, and subscription details.

---

## Scripts
Common scripts are defined in `package.json`:
- `dev` — Run the local development server
- `build` — Create a production build
- `start` — Start the production server after building
- `lint` — Run linters (if configured)

```bash
npm run build
npm run start
```

---

## Contributing
We welcome issues and suggestions. For larger changes, please open an issue first to discuss what you would like to change. Follow conventional commit messages and ensure the app builds and runs locally before opening a PR.

---

## License
Copyright © Dentistry 99. All rights reserved.

