import { FcCancel } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import nomovie from "../assets/noimage.svg";
import utorrentimg from "../assets/utorrent.svg";
import DataNotFound from "../components/DataNotFound";
import LoadingIndi from "../components/LoadingIndi";
import useSingleMovieTv from "../hooks/useSingleMovieTv";
import { imageUrl } from "../instance";
import "./SingleMovie.css";
import YoutubeVideos from "../components/YoutubeVideos";

export default function SingleMovie() {
  const { loading, error, data } = useSingleMovieTv();

  function calculate(votes: number) {
    return (votes / 10) * 100;
  }
  if (loading) {
    return <LoadingIndi loading={loading} />;
  }
  if (error) {
    return (
      <DataNotFound
        size={150}
        color="red"
        Icon={FcCancel}
        content="No Movies found !"
      />
    );
  }
  return data ? (
    <main className="single">
      <div
        style={{
          background: `url("${imageUrl}${
            data?.backdrop_path || data?.poster_path
          }")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="single__background"
      >
        <section>
          <Link
            target="_blank"
            to={data.homepage || "#"}
            className="single__poster"
          >
            <LazyLoadImage
              effect="blur"
              placeholderSrc={nomovie}
              src={imageUrl + `${data?.poster_path || data?.backdrop_path}`}
              alt={data?.title || data?.original_title}
            />
          </Link>
          <div className="single__posterDescription">
            {data?.original_title || data?.title ? (
              <h1>
                {data?.original_title || data?.title}
                {`(${data?.release_date.substring(0, 4)})`}
              </h1>
            ) : null}
            <div className="single__about">
              {data?.release_date ? <span>{data?.release_date} </span> : null}
              {data?.genres && data.genres.length > 0 ? (
                <span>
                  {" . "}
                  {data?.genres?.map((genre) => genre.name).join(", ")}
                </span>
              ) : null}
              {data?.runtime ? (
                <span>
                  {" "}
                  {" . "}
                  {`${toHoursAndMinutes(data.runtime).hours} hr ${
                    toHoursAndMinutes(data.runtime).minutes
                  } mins`}
                </span>
              ) : null}
            </div>
            {data?.tagline ? <p className="tagline">{data.tagline}</p> : null}
            <div className="single__overview">
              {data?.overview && data.overview.length > 0 ? (
                <div className="overview">
                  <h3>Overview</h3>
                  <p>{data?.overview}</p>
                </div>
              ) : null}
            </div>

            <div className="single__btns">
              <div
                style={{
                  background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(black ${calculate(
                    data.vote_average || 0
                  )}%, white 0)`,
                }}
                className="single__voteCount"
              >
                <span>{data?.vote_average.toFixed(2)}</span>
                <progress value="25">75%</progress>
              </div>
            </div>

            {data?.spoken_languages ? (
              <div className="single__languages">
                <h3>Languages Available :</h3>
                <ul className="languages__list">
                  {data.spoken_languages.map((language) => (
                    <li key={language.iso_639_1} className="language">
                      <p>{language.english_name}</p>
                      <p>{language.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {data?.revenue ? (
              <div>
                <h3>Revenue Genereated : </h3>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data.revenue)}
                </p>
              </div>
            ) : null}
            {data?.original_language ? (
              <div>
                <h3>Original Language: </h3>
                <p>{`${data?.original_language}`}</p>
              </div>
            ) : null}
            <div className="single__btns around">
              <Link
                className="btn d-flex-center get__torrent"
                to={`/torrents?search=${data.title || data.original_title}`}
              >
                <img src={utorrentimg} alt="torrent" /> Get Torrent
              </Link>
            </div>
          </div>
        </section>
      </div>
      {data.youtubes.length > 0 ? (
        <div className="single__youtubes">
          <h1>Videos</h1>
          <YoutubeVideos youtubes={data.youtubes} />
        </div>
      ) : null}
    </main>
  ) : null;
}
function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}
