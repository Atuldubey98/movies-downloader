import app from "./app";
import { createServer } from "http";
const server = createServer(app);
const PORT: number = Number(process.env.PORT) || 8080;
process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.debug("HTTP server closed");
  });
});

process.on('SIGINT',()=>{
  console.log('Close');
})
server.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
