import { io } from "socket.io-client";

// ✅ Make sure the port matches your backend
//const socket = io("http://localhost:5000");

const socket = io(import.meta.env.VITE_BACKEND_URL);


socket.on("connect", () => {
  console.log("✅ Connected to socket:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket");
});

export default socket;
