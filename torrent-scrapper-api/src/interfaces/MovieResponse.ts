import ITorrentMovie from "./ITorrentMovie";

export default interface MoviesResponse {
  total: number;
  data: ITorrentMovie[];
  time: number;
  page: number;
}
