import axios, { Axios } from "axios";
import { CheerioAPI, load } from "cheerio";

class TorrentSupper {
  public url: string;
  public axiosInstance: Axios;
  private urlMap: { [key: string]: string } = {
    x1337: "https://1337x.pro",
    yts: "https://www.yts-official.cc",
    pirateBay: "https://thepibay.online",
  };
  constructor(filename: string) {
    this.url = this.urlMap[filename];
    this.axiosInstance = axios.create({
      baseURL: this.url,
    });
  }
  public async getPageContent(url: string): Promise<CheerioAPI> {
    const response = await this.axiosInstance.get(url);
    return load(response.data);
  }
}

export default TorrentSupper;
