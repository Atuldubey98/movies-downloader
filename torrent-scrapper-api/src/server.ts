import { createServer } from "http";
import app from "./app";
const PORT: number = Number(process.env.VITE_API_PORT) || 9000;
 const server = createServer(app);
  const pid = process.pid;
  server.listen(PORT, "0.0.0.0", () => {
    console.log("App is running on ", PORT, "for pid ", pid);
  });