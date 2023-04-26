import { CheerioAPI, load } from "cheerio";
import TorrentSupper from "./TorrentSupper";
import ITorrentMovie, { ITorrentsEntity } from "../interfaces/ITorrentMovie";
import sanitizeText from "../utils/sanitizeText";

class Yts extends TorrentSupper {
  constructor() {
    super("yts");
  }
  public async generateSearch(
    search: string,
    page: number = 1
  ): Promise<ITorrentMovie[]> {
    try {
      const $: CheerioAPI = await super.getPageContent(
        `/browse-movies/${search}/all/all/1/latest/1/all?page=${page}`
      );

      const ytsDiv = $(
        "body > div.main-content > div.browse-content > div > section > div > div.browse-movie-wrap"
      );

      let movies: ITorrentMovie[] = [];
      ytsDiv.each((_, element) => {
        const url = $(element).find("a").attr("href");
        const name = $(element).find("div.browse-movie-bottom > a").text();
        const year = $(element).find("div.browse-movie-year").text();
        movies.push({ name, url, year });
      });
      return movies;
    } catch (error) {
      throw error;
    }
  }
  /**
   * async
   */
  public async getSingleTorrent(url: string) {
    try {
      const $: CheerioAPI = await super.getPageContent(url);
      const torrents: ITorrentsEntity[] = [];
      const description: string = $(
        "#synopsis > p.hidden-sm.hidden-md.hidden-lg"
      )
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
    } catch (error) {
      throw error;
    }
  }
  /**
   * async generateResults for torrent
   */
  public async generateResults(
    search: string,
    page: number
  ): Promise<ITorrentMovie[]> {
    try {
      let movies: ITorrentMovie[] = await this.generateSearch(search, page);
      const responses = await Promise.allSettled(
        movies.map((movie) => this.getSingleTorrent(movie.url))
      );
      const others = responses.map((response) =>
        response.status === "fulfilled" ? response.value : {}
      );
      movies = movies.map((movie, index) => {
        return { ...movie, ...others[index] };
      });
      return movies;
    } catch (error) {
      throw error;
    }
  }
}

export default Yts;
