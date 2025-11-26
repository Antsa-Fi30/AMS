import { useEffect, useRef } from "react";

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    if (user && user.role === "doctor") {
      // Utilisez l'URL de votre backend Django directement
      const backendHost = "localhost:8000";
      const socketUrl = `ws://${backendHost}/ws/notifications/doctor_${user.id}/`;

      console.log("🔗 Connecting to WebSocket:", socketUrl);

      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log("✅ WebSocket CONNECTED successfully");
      };

      socket.onmessage = (event) => {
        console.log("📨 RAW WebSocket message received:", event.data);

        try {
          const data = JSON.parse(event.data);
          console.log("📨 PARSED WebSocket data:", data);

          if (data.notification) {
            console.log("🎯 NOTIFICATION PROCESSED:", data.notification);

            // Notification système
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification("Nouvelle notification", {
                body: data.notification.message,
                icon: "/icon.png",
              });
            }
          }
        } catch (error) {
          console.error("❌ Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = (event) => {
        console.log("🔌 WebSocket DISCONNECTED:", event.code, event.reason);
      };

      socket.onerror = (error) => {
        console.error("❌ WebSocket ERROR:", error);
      };

      ws.current = socket;

      return () => {
        console.log("🧹 Cleaning up WebSocket");
        if (socket.readyState === WebSocket.OPEN) {
          socket.close(1000, "Component unmount");
        }
      };
    }
  }, [user]);

  return ws;
};
