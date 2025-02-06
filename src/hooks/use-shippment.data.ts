"use client";

import { useState, useEffect } from "react";
import type { Shipment } from "../types/shipment";
import { generateMockLagosShipments } from "@/lib/mockItemsData";

export function useShipmentData() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      try {
   
        setTimeout(() => {
          if (shipments.length === 0) {
            const mockData = generateMockLagosShipments(10);
            setShipments(mockData);
          } else {
           
            setShipments((prevShipments) => {
              return prevShipments.map((shipment) => {
               
                const newIndex = (shipment.currentRouteIndex + 1) % shipment.route.length;
                const newLocation = shipment.route[newIndex];

                return {
                  ...shipment,
                  currentRouteIndex: newIndex,
                  currentLocation: {
                    lat: newLocation[0],
                    lng: newLocation[1],
                    address: "Updated Location, Lagos",
                  },
                  status: {
                    ...shipment.status,
                    status: newIndex === shipment.route.length - 1 ? "delivered" : "in_transit",
                    description: newIndex === shipment.route.length - 1 ? "Shipment delivered" : "Shipment in transit",
                  },
                };
              });
            });
          }
          setIsLoading(false);
          setError(null);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch shipment data");
        setIsLoading(false);
      }
    };

    fetchData();


    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [shipments.length]);

  return { shipments, isLoading, error };
}
