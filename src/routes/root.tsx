import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect } from "react";
import Header from "../components/core/Header";

const Root = () => {
  useEffect(() => {
    console.log("Root.useEffect.ws");
    const socket = new WebSocket("ws://localhost:8000");
    socket.addEventListener("open", (event) => {
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
      <div className="p-6">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};
export default Root;
