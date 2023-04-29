import { CheerioAPI } from "cheerio";
import ITorrentMovie, { ITorrentsEntity } from "../interfaces/ITorrentMovie";
import TorrentSupper from "./TorrentSupper";
import IResultResponse from "../interfaces/IResultResponse";

class Yts extends TorrentSupper {
  constructor() {
    super("yts");
  }
  public async generateSearch(
    search: string,
    page = 1
  ): Promise<ITorrentMovie[]> {
    const $: CheerioAPI = await super.getPageContent(
      `/browse-movies/${search}/all/all/1/latest/0/all`
    );

    const ytsDiv = $(
      "body > div.main-content > div.browse-content > div > section > div > div.browse-movie-wrap"
    );

    const movies: ITorrentMovie[] = [];
    ytsDiv.each((_, element) => {
      const url = $(element).find("a").attr("href");
      const poster = $(element).find("a > figure > img").attr("src");
      const name = $(element).find("div.browse-movie-bottom > a").text();
      const year = $(element).find("div.browse-movie-year").text();
      movies.push({ name, url, year, poster });
    });
    return movies;
  }
  /**
   * async
   */
  public async getSingleTorrent(url: string) {
    const $: CheerioAPI = await super.getPageContent(url);
    const torrents: ITorrentsEntity[] = [];
    const description: string = $("#synopsis > p.hidden-sm.hidden-md.hidden-lg")
      .text()
      .trim();
    const rating: string = $(
      "#movie-info > div.bottom-info > div:nth-child(3) > span:nth-child(2)"
    ).text();
    $("#movie-info > p > a").each((_, element) => {
      const torrent = $(element).attr("href");
      const quality = $(element).text();
      torrents.push({ torrent, quality });
    });

    const screenshot: string[] = [];
    $("#screenshots > div").each((_, element) => {
      screenshot.push($(element).find("a").attr("href"));
    });
    return { torrents, description, rating, screenshot };
  }
  /**
   * async generateResults for torrent
   */
  public async generateResults(
    search: string,
    page: number
  ): Promise<IResultResponse> {
    let movies: ITorrentMovie[] = await this.generateSearch(search, page);
    if (page > 1) {
      return { movies: [], totalPages: 1 };
    }
    const responses = await Promise.allSettled(
      movies.map((movie) => this.getSingleTorrent(movie.url))
    );
    const others = responses.map((response) =>
      response.status === "fulfilled" ? response.value : {}
    );
    movies = movies.map((movie, index) => {
      return { ...movie, ...others[index] };
    });
    return { movies, totalPages: 1 };
  }
}

export default Yts;
