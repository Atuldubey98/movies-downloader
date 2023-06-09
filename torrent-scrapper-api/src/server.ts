import app from "./app";
import cluster from "cluster";
import os from "os";
import { createServer } from "http";
const PORT: number = Number(process.env.PORT) || 9000;

if (cluster.isPrimary) {
  const noOfCpus = os.cpus().length;
  for (let i = 0; i < noOfCpus; i++) cluster.fork();
} else {
  const server = createServer(app);
  const pid = process.pid;
  server.listen(PORT, "0.0.0.0", () => {
    console.log("App is running on ", PORT, "for pid ", pid);
  });
}
