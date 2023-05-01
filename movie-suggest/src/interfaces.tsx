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
export interface ITorrentSite {
  label: string;
  url: string;
}
export interface ITorrentResult {
  data: IDataEntity[];
  time: number;
  total: number;
  totalPages?: number;
  page: number;
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
export interface IStreamLinkProps {
  file: TorrentFile;
  index: number;
  magnetUrl: string;
}

export interface IMovieSingle {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres?: IGenresEntity[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: IProductionCompaniesEntity[] | null;
  production_countries?: IProductionCountriesEntity[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: ISpokenLanguagesEntity[] | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface IGenresEntity {
  id: number;
  name: string;
}
export interface IProductionCompaniesEntity {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export interface IProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface ISpokenLanguagesEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface ITvSingle {
  adult: boolean;
  backdrop_path: string;
  created_by?: (ICreatedByEntity)[] | null;
  episode_run_time?: (number)[] | null;
  first_air_date: string;
  genres?: (GenresEntity)[] | null;
  homepage: string;
  id: number;
  in_production: boolean;
  languages?: (string)[] | null;
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air?: null;
  networks?: (INetworksEntityOrProductionCompaniesEntity)[] | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country?: (string)[] | null;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: (INetworksEntityOrProductionCompaniesEntity)[] | null;
  production_countries?: (IProductionCountriesEntity)[] | null;
  seasons?: (ISeasonsEntity)[] | null;
  spoken_languages?: (ISpokenLanguagesEntity)[] | null;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
export interface ICreatedByEntity {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
export interface GenresEntity {
  id: number;
  name: string;
}
export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}
export interface INetworksEntityOrProductionCompaniesEntity {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ISeasonsEntity {
  air_date?: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
