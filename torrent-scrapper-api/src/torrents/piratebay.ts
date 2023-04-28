import ITorrentMovie from "../interfaces/ITorrentMovie";
import TorrentSupper from "./TorrentSupper";
import { CheerioAPI } from "cheerio";

class PirateBay extends TorrentSupper {
  constructor() {
    super("pirateBay");
  }
  public async generateResults(
    search: string,
    page = 1
  ): Promise<ITorrentMovie[]> {
    const $: CheerioAPI = await super.getPageContent(
      `/search/${search}/1/99/${page}`
    );
    const movies: ITorrentMovie[] = [];

    $("#searchResult > tbody > tr").each((_, tr) => {
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
    return movies;
  }
}
export default PirateBay;
