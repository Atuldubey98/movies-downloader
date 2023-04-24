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
const TorrentSupper_1 = __importDefault(require("./TorrentSupper"));
class Yts extends TorrentSupper_1.default {
    constructor() {
        super("yts");
    }
    generateSearch(search, page = 1) {
        const _super = Object.create(null, {
            getPageContent: { get: () => super.getPageContent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield _super.getPageContent.call(this, `/browse-movies/${search}/all/all/1/latest/1/all?page=${page}`);
                const ytsDiv = $("body > div.main-content > div.browse-content > div > section > div > div.browse-movie-wrap");
                const length = ytsDiv.children().length;
                let movies = new Array(length);
                ytsDiv.each((index, element) => {
                    const url = $(element).find("a").attr("href");
                    const name = $(element).find("div.browse-movie-bottom > a").text();
                    const year = $(element).find("div.browse-movie-year").text();
                    movies[index] = { name, url, year };
                });
                return movies;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Yts;
//# sourceMappingURL=Yts.js.map