import type { Shipment, ShipmentStatus, TimelineItem } from "../types/shipment";

const statuses: ShipmentStatus["status"][] = ["pending", "in_transit", "delivered", "canceled"];

// Lagos bounds
const LAT_MIN = 6.393834;
const LAT_MAX = 6.663834;
const LNG_MIN = 3.1575;
const LNG_MAX = 3.4275;

function randomCoordinate(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRoute(start: [number, number], end: [number, number], numPoints: number): [number, number][] {
  const route: [number, number][] = [start];
  for (let i = 1; i < numPoints - 1; i++) {
    const ratio = i / numPoints;
    const lat = start[0] + (end[0] - start[0]) * ratio + (Math.random() - 0.5) * 0.01;
    const lng = start[1] + (end[1] - start[1]) * ratio + (Math.random() - 0.5) * 0.01;
    route.push([lat, lng]);
  }
  route.push(end);
  return route;
}

function generateTimeline(): TimelineItem[] {
  const now = new Date();
  const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0);

  return [
    {
      status: "pending_pickup",
      title: "Pending Pickup",
      description: "Shipment scheduled for pickup",
      timeRange: "09:02 - 10:30",
      completed: true,
      current: false,
    },
    {
      status: "at_facility",
      title: "At Sorting Facility",
      description: "Shipment Lagos sorting center",
      timeRange: "10:30 - 11:30",
      completed: true,
      current: false,
    },
    {
      status: "out_for_delivery",
      title: "Out for Delivery",
      description: "Shipment delivery from Lagos",
      timeRange: "12:30 - 13:30",
      completed: false,
      current: true,
    },
    {
      status: "delivered",
      title: "Delivered",
      description: "Shipment delivered to the recipient",
      timeRange: "13:30 - 14:30",
      completed: false,
      current: false,
    },
  ];
}

export function generateMockLagosShipments(count: number): Shipment[] {
  return Array.from({ length: count }, (_, i) => {
    const origin: [number, number] = [randomCoordinate(LAT_MIN, LAT_MAX), randomCoordinate(LNG_MIN, LNG_MAX)];
    const destination: [number, number] = [randomCoordinate(LAT_MIN, LAT_MAX), randomCoordinate(LNG_MIN, LNG_MAX)];
    const route = generateRoute(origin, destination, 10);
    const currentIndex = Math.floor(Math.random() * route.length);

    return {
      id: `SHIP${i + 1}`,
      trackingNumber: `LGS${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: {
        status: "in_transit",
        timestamp: new Date().toISOString(),
        location: "Lagos, Nigeria",
        description: "Shipment in progress",
      },
      origin: {
        lat: origin[0],
        lng: origin[1],
        address: "Origin Address, Lagos",
      },
      destination: {
        lat: destination[0],
        lng: destination[1],
        address: "Destination Address, Lagos",
      },
      currentLocation: {
        lat: route[currentIndex][0],
        lng: route[currentIndex][1],
        address: "Current Location, Lagos",
      },
      route: route,
      currentRouteIndex: currentIndex,
      estimatedDelivery: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdate: new Date().toISOString(),
      driver: {
        id: `DRV${i + 1}`,
        name: `Kevin Hartanto`,
        avatar: `/avarta.svg`,
      },
      timeline: generateTimeline(),
    };
  });
}
