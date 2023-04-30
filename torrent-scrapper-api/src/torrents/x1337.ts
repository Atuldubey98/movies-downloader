import { CheerioAPI } from "cheerio";
import ITorrentMovie from "../interfaces/ITorrentMovie";
import TorrentSupper from "./TorrentSupper";
import IResultResponse from "../interfaces/IResultResponse";
class OneThreeThreeSeven extends TorrentSupper {
  constructor() {
    super("x1337");
  }
  /**
   * async
   */
  public async generateSearch(page = 1, search: string): Promise<CheerioAPI> {
    if (!search) {
      throw new Error("Search is not a string");
    }
    const $: CheerioAPI = await this.getPageContent(`search/${search}/${page}`);
    return $;
  }
  /**
   * getting the Page Content
   */

  /**
   * getSingleTorrent
   */
  public async getSingleTorrent(url: string) {
    const $: CheerioAPI = await this.getPageContent(url);
    const torrentsDiv = $(".no-top-radius > div > ul > li");
    const magnet = $(".no-top-radius > div > ul:nth-child(1) > li:nth-child(1)")
      .find("a")
      .attr("href");

    const torrents: string[] = [];
    $(torrentsDiv)
      .find("ul")
      .find("li")
      .each((index, element) => {
        if (index > 1) {
          torrents.push($(element).find("a").attr("href"));
        }
      });
    const uploader = $(torrentsDiv).find("span").find("a").text().trim();

    const description = $("#description > p.align-center").text().trim();

    const screenshot: string[] = [];
    $("#description > p.align-center > a > img").each((_, element) => {
      screenshot.push($(element).attr("src"));
    });
    return {
      torrent: torrents.length === 0 ? "" : torrents[torrents.length - 1],
      uploader,
      magnet,
      description,
      screenshot,
    };
  }
  public async generateResults(
    search: string,
    page = 1
  ): Promise<IResultResponse> {
    const $: CheerioAPI = await this.generateSearch(page, search);
    const searchResultsTable = $(
      "body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr"
    );
    const totalPagesLi = $("div.pagination > ul > li");
    const totalPagesStrCheck1 = $(
      `body > main > div > div > div > div.box-info-detail.inner-table > div.pagination > ul > li:nth-child(${totalPagesLi.length}) > a`
    ).text();
    const totalPagesStrCheck2 = $(
      `body > main > div > div > div > div.box-info-detail.inner-table > div.pagination > ul > li:nth-child(${
        totalPagesLi.length - 1
      }) > a`
    ).text();
    let totalPagesStr = isNaN(Number(totalPagesStrCheck1))
      ? NaN
      : Number(totalPagesStrCheck1);
    totalPagesStr = isNaN(totalPagesStr)
      ? Number(totalPagesStrCheck2)
      : totalPagesStr;

    if (isNaN(Number(totalPagesStr)) || page > Number(totalPagesStr)) {
      return { movies: [], totalPages: Number(totalPagesStr) };
    }

    const totalPages = Number(totalPagesStr);
    let movies: ITorrentMovie[] = [];
    searchResultsTable.each((_, element) => {
      const name: string = $(element).find("td").filter(".name").text().trim();
      const url: string =
        this.url +
        $(element).find("td.coll-1.name > a:nth-child(2)").attr("href");
      const seeders: string = $(element)
        .find("td")
        .filter(".seeds")
        .text()
        .trim();
      const leechers: string = $(element)
        .find("td")
        .filter(".leeches")
        .text()
        .trim();
      const size: string = $(element).find("td").filter(".size").text().trim();
      movies.push({ name, url, seeders, leechers, size });
    });
    const responses = await Promise.allSettled(
      movies.map(({ url }) => this.getSingleTorrent(url))
    );
    const other = responses.map((response) => {
      if (response.status === "fulfilled") {
        return response.value;
      }
    });
    movies = movies.map((movie, index) => ({ ...movie, ...other[index] }));
    return { totalPages, movies };
  }
}

export default OneThreeThreeSeven;
