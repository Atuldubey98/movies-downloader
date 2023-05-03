import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import nomovie from "../assets/noimage.svg";
import utorrentimg from "../assets/utorrent.svg";
import { imageUrl } from "../instance";
import { IGenresEntity, ISpokenLanguagesEntity } from "../interfaces";

interface IPosterBackSingleProps {
  backdrop_path?: string;
  poster_path?: string;
  original_name?: string;
  name?: string;
  genres: IGenresEntity[];
  first_air_date: string;
  tagline: string;
  overview?: string;
  spoken_languages: ISpokenLanguagesEntity[];
  vote_average: number;
  original_language?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  runtime?: number;
}
export default function PosterBackDropSingle({
  posterBack,
}: {
  posterBack: IPosterBackSingleProps;
}) {
  const {
    backdrop_path,
    poster_path,
    original_name,
    name,
    genres,
    first_air_date,
    tagline,
    overview,
    spoken_languages,
    vote_average,
    number_of_seasons,
    number_of_episodes,
    original_language,
    runtime,
  } = posterBack;
  return (
    <div
      style={{
        background: `url("${imageUrl}${backdrop_path || poster_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="single__background"
    >
      <section>
        <div className="single__poster">
          <LazyLoadImage
            effect="blur"
            placeholderSrc={nomovie}
            src={imageUrl + `${poster_path || backdrop_path}`}
            alt={original_name || name}
          />
        </div>
        <div className="single__posterDescription">
          {original_name || name ? (
            <h1>
              {original_name || name}
              {`(${first_air_date.substring(0, 4)})`}
            </h1>
          ) : null}
          <div className="single__about">
            {first_air_date ? <span>{first_air_date} </span> : null}
            {genres && genres.length > 0 ? (
              <span>
                {" . "}
                {genres?.map((genre) => genre.name).join(", ")}
              </span>
            ) : null}
            {runtime ? (
              <span>
                {" "}
                {" . "}
                {`${toHoursAndMinutes(runtime).hours} hr ${
                  toHoursAndMinutes(runtime).minutes
                } mins`}
              </span>
            ) : null}
          </div>
          {tagline ? <p className="tagline">{tagline}</p> : null}
          <div className="single__overview">
            {overview && overview.length > 0 ? (
              <div className="overview">
                <h3>Overview</h3>
                <p>{overview}</p>
              </div>
            ) : null}
          </div>

          <div className="single__btns">
            <div
              style={{
                background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(black ${calculate(
                  vote_average || 0
                )}%, white 0)`,
              }}
              className="single__voteCount"
            >
              <span>{vote_average.toFixed(2)}</span>
              <progress value="25">75%</progress>
            </div>
          </div>
          <div className="single__meta">
            {spoken_languages ? (
              <div className="single__languages">
                <h3>Languages Available :</h3>
                <ul className="languages__list">
                  {spoken_languages.map((language) => (
                    <li key={language.iso_639_1} className="language">
                      <p>{language.english_name}</p>
                      <p>{language.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {original_language ? (
              <div>
                <h3>Original Language: </h3>
                <p>{`${original_language}`}</p>
              </div>
            ) : null}
            {number_of_seasons ? (
              <div>
                <h3>No of seasons : </h3>
                <p>{`${number_of_seasons}`}</p>
              </div>
            ) : null}
            {number_of_episodes ? (
              <div>
                <h3>No of episodes : </h3>
                <p>{`${number_of_episodes}`}</p>
              </div>
            ) : null}
          </div>
          <div className="single__btns around">
            <Link
              className="btn d-flex-center get__torrent"
              to={`/torrents?search=${name || original_name}`}
            >
              <img src={utorrentimg} alt="torrent" /> Get Torrent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
function calculate(votes: number) {
  return (votes / 10) * 100;
}
function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}
