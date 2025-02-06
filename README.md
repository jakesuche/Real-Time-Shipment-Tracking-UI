This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


# Lagos Vehicle Tracking System

This project is a real-time vehicle tracking system for Lagos, Nigeria. It provides a user interface for tracking multiple shipments, displaying their routes on a map, and showing detailed information about each shipment.

## UI Reference

This project's UI reference [Tracking Dashboard](https://dribbble.com/shots/25487768-Zhippes-Tracking-Dashboard) by Pixelab Studio.

![Tracking Dashboard](https://cdn.dribbble.com/userupload/18498219/file/original-15f85920b53a73cc13b44d5d904f5ed4.png?resize=1024x762&vertical=center)

## Features

- Real-time tracking of multiple shipments
- Interactive map display using Leaflet.js
- Detailed shipment information cards with timeline view
- Search functionality for shipments
- Simulated data updates every 5 seconds
- Modern, clean UI design with status indicators

## Tech Stack

- Next.js 15 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Leaflet.js for maps
- Lucide React for icons


## Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       └── input.tsx
├── hooks/
│   ├── use-shipment-socket.ts
│   └── use-shippment.data.ts
├── lib/
│   ├── mockItemsData.ts
│   ├── mockShipmentData.ts
│   └── utils.ts
├── types/
└── views/
    ├── shipment-card.tsx
    └── shipment-map.tsx

config/
├── .gitignore
├── eslint.config.mjs
├── next
```