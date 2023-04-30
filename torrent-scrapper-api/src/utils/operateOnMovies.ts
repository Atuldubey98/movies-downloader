import ITorrentMovie from "../interfaces/ITorrentMovie";

export function sortMoviesOnSeeds(
  movie1: ITorrentMovie,
  movie2: ITorrentMovie
): number {
  const seed1 = isNaN(Number(movie1?.seeders)) ? 0 : Number(movie1.seeders);
  const seed2 = isNaN(Number(movie2?.seeders)) ? 0 : Number(movie2.seeders);
  return seed2 - seed1;
}
