"use client";

import { useEffect, useRef, useState } from "react";
import type { Shipment } from "../types/shipment";

export function useShipmentSocket(url: string) {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const connect = () => {
      try {
      
        const secureUrl = url.replace("ws://", "wss://");
        const ws = new WebSocket(secureUrl);

        ws.onopen = () => {
          console.log("Connected to WebSocket");
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setShipments(data);
          } catch (e) {
            console.error("Failed to parse WebSocket message:", e);
          }
        };

        ws.onclose = (event) => {
          console.log("Disconnected from WebSocket:", event.code, event.reason);
          setIsConnected(false);
          
          reconnectTimeoutRef.current = setTimeout(connect, 5000);
        };

        ws.onerror = (event) => {
          console.error("WebSocket error:", event);
          setError("Failed to connect to tracking server");
          ws.close();
        };

        wsRef.current = ws;
      } catch (err) {
        console.error("Failed to create WebSocket connection:", err);
        setError("Failed to connect to tracking server");
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      }
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url]);

  return { shipments, isConnected, error };
}
