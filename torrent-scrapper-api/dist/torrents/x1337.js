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
class OneThreeThreeSeven extends TorrentSupper_1.default {
    constructor() {
        super("x1337");
    }
    /**
     * async
     */
    generateSearch(page = 1, search) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!search) {
                throw new Error("Search is not a string");
            }
            try {
                const $ = yield this.getPageContent(`search/${search}/${page}`);
                return $;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * getting the Page Content
     */
    /**
     * getSingleTorrent
     */
    getSingleTorrent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield this.getPageContent(url);
                const torrentsDiv = $(".no-top-radius > div > ul > li");
                const magnet = $(torrentsDiv).find("a").attr("href");
                const torrents = [];
                $(torrentsDiv)
                    .find("ul")
                    .find("li")
                    .each((index, element) => {
                    if (index > 1) {
                        torrents.push($(element).find("a").attr("href"));
                    }
                });
                const uploader = $(torrentsDiv).find("span").find("a").text().trim();
                const posterSrc = $("div.torrent-image").find("img").attr("src");
                const poster = posterSrc.startsWith("/")
                    ? this.url + posterSrc
                    : posterSrc.startsWith("//")
                        ? `https:${posterSrc}`
                        : posterSrc;
                const description = $("#description > p.align-center").text();
                const screenshot = [];
                $("#description > p.align-center > a > img").each((_, element) => {
                    screenshot.push($(element).attr("src"));
                });
                return {
                    torrent: torrents.length === 0 ? "" : torrents[torrents.length - 1],
                    uploader,
                    magnet,
                    description,
                    poster,
                    screenshot,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateResults(page = 1, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield this.generateSearch(page, search);
                const searchResultsTable = $("body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr");
                const total = searchResultsTable.length;
                let movies = [];
                searchResultsTable.each((index, element) => {
                    const name = $(element)
                        .find("td")
                        .filter(".name")
                        .text()
                        .trim();
                    const url = this.url +
                        $(element).find("td.coll-1.name > a:nth-child(2)").attr("href");
                    const seeders = $(element)
                        .find("td")
                        .filter(".seeds")
                        .text()
                        .trim();
                    const leechers = $(element)
                        .find("td")
                        .filter(".leeches")
                        .text()
                        .trim();
                    const size = $(element)
                        .find("td")
                        .filter(".size")
                        .text()
                        .trim();
                    movies.push({ name, url, seeders, leechers, size });
                });
                const responses = yield Promise.allSettled(movies.map(({ url }) => this.getSingleTorrent(url)));
                const other = responses.map((response) => response.status === "fulfilled"
                    ? response === null || response === void 0 ? void 0 : response.value
                    : { torrents: [], uploader: "", magnet: "" });
                movies = movies.map((movie, index) => (Object.assign(Object.assign({}, movie), other[index])));
                return movies;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = OneThreeThreeSeven;
//# sourceMappingURL=x1337.js.map