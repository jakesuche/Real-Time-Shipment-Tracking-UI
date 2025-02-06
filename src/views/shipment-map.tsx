"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Shipment } from "@/types/shipment";

interface ShipmentMapProps {
  shipment: Shipment;
}

export function ShipmentMap({ shipment }: ShipmentMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const routeRef = useRef<L.Polyline | null>(null);
  const originMarkerRef = useRef<L.Marker | null>(null);
  const destinationMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([6.5244, 3.3792], 12); // Center on Lagos
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing elements
    if (markerRef.current) markerRef.current.remove();
    if (routeRef.current) routeRef.current.remove();
    if (originMarkerRef.current) originMarkerRef.current.remove();
    if (destinationMarkerRef.current) destinationMarkerRef.current.remove();

    // Add route
    routeRef.current = L.polyline(shipment.route, { color: "blue", weight: 3 }).addTo(mapRef.current);

    // Add vehicle marker
    const { lat, lng } = shipment.currentLocation;
    const vehicleIcon = L.divIcon({
      className: "vehicle-icon",
      html: "🚚",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
    markerRef.current = L.marker([lat, lng], { icon: vehicleIcon }).addTo(mapRef.current);
    markerRef.current.bindPopup(`Shipment: ${shipment.trackingNumber}`);

    // Add origin and destination markers
    const originIcon = L.divIcon({ className: "origin-icon", html: "🏠", iconSize: [30, 30], iconAnchor: [15, 15] });
    const destinationIcon = L.divIcon({
      className: "destination-icon",
      html: "🏁",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
    originMarkerRef.current = L.marker(shipment.route[0], { icon: originIcon }).addTo(mapRef.current);
    destinationMarkerRef.current = L.marker(shipment.route[shipment.route.length - 1], { icon: destinationIcon }).addTo(
      mapRef.current
    );

    // Fit map to show the entire route
    const bounds = L.latLngBounds(shipment.route);
    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
  }, [shipment]);

  return <div id="map" className="w-full h-full min-h-[600px] rounded-lg" />;
}
