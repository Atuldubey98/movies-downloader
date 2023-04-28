export interface IMovie {
  backdrop_path: string;
  poster_path: string;
  overview: string;
  original_name: string;
  title: string;
  media_type: string;
  release_date: string;
  first_air_date: string;
  vote_count: string;
  id: number;
  vote_average?: number;
  adult: boolean;
  popularity: number;
}

export interface ITorrentResult {
  data?: IDataEntity[] | null;
  time: number;
  total: number;
}
export interface IDataEntity {
  name: string;
  size?: string | null;
  date?: string | null;
  seeders?: string | null;
  leechers?: string | null;
  url: string;
  uploader?: string | null;
  category?: string | null;
  files?: string[] | null;
  poster?: string | null;
  magnet?: string | null;
  hash?: string | null;
  torrent?: string | null;
  screenshot?: string[] | null;
  id?: string | null;
  authors?: string[] | null;
  publisher?: string | null;
  year?: string | null;
  pages?: string | null;
  language?: string | null;
  extension?: string | null;
  genre?: string[] | null;
  rating?: string | null;
  description?: string | null;
  runtime?: string | null;
  torrents?: ITorrentsEntity[] | null;
}
export interface IDropDownPropsTorrent {
  open: boolean;
  torrentNumber: number;
}

export interface ITorrentsEntity {
  quality: string;
  type: string;
  size: string;
  torrent: string;
  magnet: string;
  hash: string;
}

export interface TorrentFile {
  name: string;
  path: string;
  length: string;
}
export interface IStreamResponse {
  files: TorrentFile[];
  totalLength: string;
}
