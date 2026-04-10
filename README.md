# Vendor Management Portal (ERP Module)

This project implements a functional Vendor Management Portal with Admin and Vendor modules using React + Vite. It uses localStorage as a mock API backend and includes core functionality required by the assignment (vendor onboarding, product catalog + barcode, purchase orders, invoice workflow, shipment and payment tracking).

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Notes
- UI is intentionally minimal — focus is on functionality and workflows.
- Data is persisted in `localStorage` under `vmp_data` key. You can reset data by clearing localStorage or editing `src/mock/seed.js`.
