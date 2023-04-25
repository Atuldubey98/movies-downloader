"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const server = (0, http_1.createServer)(app_1.default);
const PORT = Number(process.env.PORT) || 8080;
process.on("SIGTERM", () => {
    console.debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        console.debug("HTTP server closed");
    });
});
server.listen(PORT, () => {
    console.log("App is running on ", PORT);
});
//# sourceMappingURL=server.js.map