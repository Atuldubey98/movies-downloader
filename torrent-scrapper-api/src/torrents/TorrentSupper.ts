import axios, { Axios } from "axios";
import { CheerioAPI, load } from "cheerio";
import { logger } from "../logger";

type Provider = "x1337" | "yts" | "pirateBay";

class TorrentSupper {
  public url: string;
  public axiosInstance!: Axios;

  private provider: Provider;
  private mirrorIndex = 0;

  private urlMap: Record<Provider, string[]> = {
    x1337: [
      "https://1337x.to",
      "https://1337x.st",
      "https://1337x.so",
      "https://1337x.pro",
    ],
    yts: [
      "https://yts.mx",
      "https://www.yts-official.cc",
    ],
    pirateBay: [
      "https://thepiratebay.org",
      "https://tpb.party",
      "https://thepibay.online",
    ],
  };

  constructor(provider: Provider) {
    this.provider = provider;
  }

  /** Call this once before scraping */
  public async init(): Promise<void> {
    this.url = await this.resolveWorkingBaseURL();
    logger.info(`Using ${this.url} for provider ${this.provider}`);
    this.createAxiosInstance(this.url);
  }

  private createAxiosInstance(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 8000,
    });
  }

  private async resolveWorkingBaseURL(): Promise<string> {
    const mirrors = this.urlMap[this.provider];

    let failures = 0;

    return new Promise<string>((resolve, reject) => {
      mirrors.forEach(mirror => {
        axios.get(mirror, {
          timeout: 3000,
          validateStatus: s => s >= 200 && s < 400,
        })
          .then(() => resolve(mirror))
          .catch(() => {
            failures++;
            if (failures === mirrors.length) {
              reject(new Error(`No working mirrors found for ${this.provider}`));
            }
          });
      });
    });
  }



  private async rotateDomain(): Promise<void> {
    const mirrors = this.urlMap[this.provider];

    this.mirrorIndex = (this.mirrorIndex + 1) % mirrors.length;
    this.url = mirrors[this.mirrorIndex];
    this.createAxiosInstance(this.url);
  }

  public async getPageContent(path: string): Promise<CheerioAPI> {
    try {
      const response = await this.axiosInstance.get(path);
      return load(response.data);
    } catch {
      await this.rotateDomain();
      const response = await this.axiosInstance.get(path);
      return load(response.data);
    }
  }
}

export default TorrentSupper;
