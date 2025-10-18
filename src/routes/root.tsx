import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect } from "react";
import Header from "../components/core/Header";

const Root = () => {
  useEffect(() => {
    console.log("Root.useEffect.ws");
    const socket = new WebSocket("ws://localhost:8000");
    socket.addEventListener("open", (event) => {
      console.log("websocket connected", event);
      socket.send("Hello Server!");
    });
    // socket.onmessage = (event) => {
    //   console.log("websocket", event);
    // };
    // socket.send("oi mundo!");
  }, []);

  return (
    <ProtectedRoute>
      <Header />
      <main className="max-w-7xl mx-auto py-8 space-y-8">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
};
export default Root;
