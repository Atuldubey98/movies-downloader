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
                let movies = [];
                ytsDiv.each((_, element) => {
                    const url = $(element).find("a").attr("href");
                    const name = $(element).find("div.browse-movie-bottom > a").text();
                    const year = $(element).find("div.browse-movie-year").text();
                    movies.push({ name, url, year });
                });
                return movies;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * async
     */
    getSingleTorrent(url) {
        const _super = Object.create(null, {
            getPageContent: { get: () => super.getPageContent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield _super.getPageContent.call(this, url);
                const torrents = [];
                const description = $("#synopsis > p.hidden-sm.hidden-md.hidden-lg").text();
                const rating = $("#movie-info > div.bottom-info > div:nth-child(3) > span:nth-child(2)").text();
                $("#movie-info > p > a").each((_, element) => {
                    const torrent = $(element).attr("href");
                    const quality = $(element).text();
                    torrents.push({ torrent, quality });
                });
                const screenshot = [];
                $("#screenshots > div").each((_, element) => {
                    screenshot.push($(element).find("a").attr("href"));
                });
                return { torrents, description, rating, screenshot };
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * async generateResults for torrent
     */
    generateResults(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let movies = yield this.generateSearch(search, page);
                const responses = yield Promise.allSettled(movies.map((movie) => this.getSingleTorrent(movie.url)));
                const others = responses.map((response) => response.status === "fulfilled" ? response.value : {});
                movies = movies.map((movie, index) => {
                    return Object.assign(Object.assign({}, movie), others[index]);
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
//# sourceMappingURL=yts.js.map