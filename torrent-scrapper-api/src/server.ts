import app from "./app";
import { createServer } from "http";
const server = createServer(app);
const PORT: number = Number(process.env.PORT) || 8080;

server.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
