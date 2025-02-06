"use client";

import { Package, ChevronUp, ChevronDown, Phone, MessageSquare } from "lucide-react";
import type { Shipment } from "@/types/shipment";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";

interface ShipmentCardProps {
  shipment: Shipment;
  isSelected: boolean;
  onSelect: (shipment: Shipment) => void;
}

export function ShipmentCard({ shipment, isSelected, onSelect }: ShipmentCardProps) {
  return (
    <div
      className={cn(
        "p-4 border rounded-lg mb-4 cursor-pointer transition-colors",
        isSelected ? "border-primary bg-muted/50" : "hover:bg-muted/30"
      )}
      onClick={() => onSelect(shipment)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-semibold">{shipment.trackingNumber}</div>
            <div className="text-sm text-muted-foreground">Shipment ID</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={shipment.status.status === "delivered" ? "default" : "secondary"}>
            {shipment.status.status.replace("_", " ")}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isSelected ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isSelected && (
        <div className="space-y-6">
          <div className="relative pl-6 space-y-6">
            {/* Timeline line */}
            <div className="absolute left-[9px] top-[10px] bottom-[10px] w-[2px] bg-border" />

            {shipment.timeline.map((item) => (
              <div key={item.status} className="relative">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 mt-1",
                      item.current
                        ? "bg-primary border-primary"
                        : item.completed
                        ? "bg-primary/20 border-primary/20"
                        : "bg-background border-muted-foreground/20"
                    )}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.timeRange}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shipment.driver && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-3">
                <img
                  src={shipment.driver.avatar}
                  alt={shipment.driver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{shipment.driver.name}</p>
                  <p className="text-sm text-muted-foreground">Driver</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="secondary">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
