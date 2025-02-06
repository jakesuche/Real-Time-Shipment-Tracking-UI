export interface ShipmentLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface ShipmentDriver {
  id: string;
  name: string;
  avatar: string;
}

export interface TimelineItem {
  status: "pending_pickup" | "at_facility" | "out_for_delivery" | "delivered";
  title: string;
  description: string;
  timeRange: string;
  completed: boolean;
  current: boolean;
}

export interface ShipmentStatus {
  status: "pending" | "in_transit" | "delivered" | "canceled";
  timestamp: string;
  location: string;
  description: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  currentLocation: ShipmentLocation;
  route: [number, number][];
  currentRouteIndex: number;
  estimatedDelivery: string;
  lastUpdate: string;
  driver: ShipmentDriver;
  timeline: TimelineItem[];
}
