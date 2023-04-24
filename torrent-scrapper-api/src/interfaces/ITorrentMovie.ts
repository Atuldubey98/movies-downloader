export default interface ITorrentMovie {
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
  site?: "";
  rating?: string | null;
  description?: string | null;
  runtime?: string | null;
  torrents?: ITorrentsEntity[] | null;
}

export interface ITorrentsEntity {
  quality?: string;
  type?: string;
  size?: string;
  torrent: string;
  magnet?: string;
  hash?: string;
}
