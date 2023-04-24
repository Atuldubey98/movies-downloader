"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const x1337_1 = __importDefault(require("./torrents/x1337"));
const yts_1 = __importDefault(require("./torrents/yts"));
const piratebay_1 = __importDefault(require("./torrents/piratebay"));
const oneThreeThreeSeven = new x1337_1.default();
const yts = new yts_1.default();
const pirateBay = new piratebay_1.default();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (_, res) => {
    return res.status(200).send("Server is healthy");
});
app.get("/api/v1/all/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const initialTime = performance.now();
    const search = typeof req.query.query === "string" ? req.query.query : "";
    const page = typeof req.query.page === "string" && !isNaN(Number(req.query.page))
        ? Number(req.query.page)
        : 1;
    try {
        if (!search) {
            next((0, http_errors_1.default)(404, "NOT_FOUND"));
        }
        const responses = yield Promise.allSettled([
            pirateBay.generateResults(search, page),
            yts.generateResults(search, page),
            oneThreeThreeSeven.generateResults(page, search),
        ]);
        const totalMovies = responses.map((response) => response.status === "fulfilled" ? response.value : []);
        const movies = [];
        totalMovies.forEach((m) => movies.push(...m));
        const time = (performance.now() - initialTime) / 1000;
        return res
            .status(200)
            .send({ time, data: movies, total: movies.length, page });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = app;
//# sourceMappingURL=app.js.map