import ITorrentMovie from "./ITorrentMovie";

export default interface IResultResponse {
  movies: ITorrentMovie[];
  totalPages: number;
}
