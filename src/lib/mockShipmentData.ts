import type { Shipment, ShipmentStatus } from "../types/shipment";

const statuses: ShipmentStatus["status"][] = ["pending", "in_transit", "delivered", "canceled"];

function randomCoordinate(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateMockShipments(count: number): any[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `SHIP${i + 1}`,
    trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    status: {
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date().toISOString(),
      location: "Current City",
      description: "Shipment in progress",
    },
    origin: {
      lat: randomCoordinate(-90, 90),
      lng: randomCoordinate(-180, 180),
      address: "Origin Address",
    },
    destination: {
      lat: randomCoordinate(-90, 90),
      lng: randomCoordinate(-180, 180),
      address: "Destination Address",
    },
    currentLocation: {
      lat: randomCoordinate(-90, 90),
      lng: randomCoordinate(-180, 180),
      address: "Current Location",
    },
    estimatedDelivery: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdate: new Date().toISOString(),
    driver:
      Math.random() > 0.5
        ? {
            id: `DRV${i + 1}`,
            name: `Driver ${i + 1}`,
            avatar: `/placeholder.svg?height=40&width=40`,
          }
        : undefined,
    timeline: [],
  }));
}
