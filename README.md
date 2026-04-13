# Vendor Management Portal (ERP Module)

This project implements a functional Vendor Management Portal with Admin and Vendor modules using React + Vite. The project is implemented with the following concrete features (as present in the codebase):

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

**Quick Start**

- Install:

```bash
npm install
```

- Run (dev):

```bash
npm run dev
```

**Implemented Features**

- Vendor onboarding and signup form ([src/pages/Vendor/Signup.jsx](src/pages/Vendor/Signup.jsx#L1)). New vendors are created with `status: 'Pending'`.
- Admin pages for managing vendors, approving invoices, product catalog, purchase orders, and shipments ([src/pages/Admin/**](src/pages/Admin)).
- Vendor-facing pages: Dashboard, Login, Signup, Product list, Purchase Orders, Invoice Submission, Shipments ([src/pages/Vendor/**](src/pages/Vendor)).
- Product CRUD: add, update, delete products via context helpers in [src/context/AppContext.jsx](src/context/AppContext.jsx#L1).
- Purchase order creation and updates (PO objects stored in app state).
- Invoice submission and update workflow.
- Shipment and payment recording helpers.
- Barcode display component present in [src/components/BarcodeDisplay.jsx](src/components/BarcodeDisplay.jsx#L1).

**Data & persistence (implemented)**

- App state is kept in memory and persisted to `localStorage` under the key `vmp_data` (see [src/context/AppContext.jsx](src/context/AppContext.jsx#L1)).
- Mock initial data is provided in [src/mock/seed.js](src/mock/seed.js#L1).

**How uploaded documents are currently handled (implemented)**

- The signup form's `handleFile` converts selected `File` objects into metadata objects containing only `name` and `size` and stores them in `form.docs` ([src/pages/Vendor/Signup.jsx](src/pages/Vendor/Signup.jsx#L1)).
- When `addVendor(form)` is called, that metadata is saved with the vendor into the app state and persisted to `localStorage`. The actual file bytes are not uploaded or stored.

**ID generation (implemented)**

- IDs are generated in [src/context/AppContext.jsx](src/context/AppContext.jsx#L1) by concatenating a short prefix and `Date.now()` (e.g., `v` + timestamp for vendors). This is the current behavior in the code.

**Files to inspect for behavior**

- App context & persistence: [src/context/AppContext.jsx](src/context/AppContext.jsx#L1)
- Vendor signup: [src/pages/Vendor/Signup.jsx](src/pages/Vendor/Signup.jsx#L1)
- Mock data: [src/mock/seed.js](src/mock/seed.js#L1)
- Components: [src/components](src/components)


