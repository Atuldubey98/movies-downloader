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
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
class TorrentSupper {
    constructor(filename) {
        this.urlMap = {
            x1337: "https://www.1337xx.to",
            yts: "https://yts.mx",
            pirateBay: "https://thepiratebay10.org",
        };
        this.url = this.urlMap[filename];
        this.axiosInstance = axios_1.default.create({
            baseURL: this.url,
        });
    }
    getPageContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.axiosInstance.get(url);
                return (0, cheerio_1.load)(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TorrentSupper;
//# sourceMappingURL=TorrentSupper.js.map