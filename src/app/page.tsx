"use client";

import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import { useShipmentData } from "@/hooks/use-shippment.data";
import { ShipmentCard } from "@/views/shipment-card";
import { ShipmentMap } from "@/views/shipment-map";
import { Input } from "@/components/input";
import { Alert, AlertDescription } from "@/components/alert";
import type { Shipment } from "@/types/shipment";

export default function TrackingPage() {
  const { shipments, isLoading, error } = useShipmentData();
  const [selectedShipment, setSelectedShipment] = useState<Shipment | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    setFilteredShipments(
      shipments.filter((shipment) => shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (!selectedShipment && shipments.length > 0) {
      setSelectedShipment(shipments[0]);
    }
  }, [shipments, searchQuery, selectedShipment]);

  useEffect(() => {
    if (selectedShipment) {
      const updatedSelectedShipment = shipments.find((s) => s.id === selectedShipment.id);
      if (updatedSelectedShipment) {
        setSelectedShipment(updatedSelectedShipment);
      }
    }
  }, [shipments, selectedShipment]);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-semibold">Lagos Vehicle Tracking</h1>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search shipments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 p-4 border-r overflow-y-auto">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading && (
            <Alert className="mb-4">
              <AlertDescription>Loading shipment data...</AlertDescription>
            </Alert>
          )}
          {filteredShipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              isSelected={selectedShipment?.id === shipment.id}
              onSelect={setSelectedShipment}
            />
          ))}
        </div>
        <div className="flex-1 p-4">{selectedShipment && <ShipmentMap shipment={selectedShipment} />}</div>
      </div>
    </div>
  );
}
