import ITorrentMovie from "./ITorrentMovie";

export default interface IMoviesResponse {
  total: number;
  data: ITorrentMovie[];
  time: number;
  page: number;
  totalPages: number;
}
