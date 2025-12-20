import { logger } from "../logger";
import IResultResponse from "../interfaces/IResultResponse";
import ITorrentMovie from "../interfaces/ITorrentMovie";
import TorrentSupper from "./TorrentSupper";
import { CheerioAPI } from "cheerio";

class PirateBay extends TorrentSupper {
  constructor() {
    super("pirateBay");
    this.init()
  }
  public async generateResults(
    search: string,
    page = 1
  ): Promise<IResultResponse> {
    const $: CheerioAPI = await super.getPageContent(
      `/search/${search}/1/99/0`
    );
    const table = $("#searchResult > tbody > tr");
    const totalPagesDiv = $(
      `#searchResult > tbody > tr:nth-child(${table.length - 1}) > td`
    )
      .text()
      .trim()
      .split(" ");
    const totalPages =
      totalPagesDiv.length > 0
        ? Number(totalPagesDiv[totalPagesDiv.length - 1])
        : 0;
    if (totalPages < page) {
      return {
        movies: [],
        totalPages,
      };
    }
    const movies: ITorrentMovie[] = [];

    $(table).each((_, tr) => {
      const category = $(tr).find("td > center > a").text().trim();
      const name = $(tr).find("td > .detName > a").text();
      const url = $(tr).find("td > .detName > a").attr("href");
      const magnet = $(tr).find("td > a").attr("href");
      let seeders = "";
      let leechers = "";
      $(tr)
        .find("td")
        .each((index, td) => {
          seeders = index === 2 ? $(td).text() : seeders;
          leechers = index === 3 ? $(td).text() : leechers;
        });
      if (url && name) {
        movies.push({ name, url, magnet, category, leechers, seeders });
      }
    });
    logger.info(`Found ${movies.length} movies for search: ${search} on page: ${page} pirateBay`);

    return { totalPages, movies };
  }
}
export default PirateBay;
