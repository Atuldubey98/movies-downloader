import { LazyLoadImage } from "react-lazy-load-image-component";
import nomovie from "../assets/noimage.svg";
import LoadingIndi from "../components/LoadingIndi";
import useFetch from "../hooks/useFetch";
import instance, { imageUrl } from "../instance";
import { ITvSingle } from "../interfaces";
import "./SingleTv.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import utorrentimg from "../assets/utorrent.svg";

export default function SingleTv() {
  const { loading, error, data, dispatch } = useFetch<ITvSingle>();
  const [filter, setFilter] = useState<boolean>(false);
  function calculate(votes: number) {
    return (votes / 10) * 100;
  }
  const params = useParams();
  const id: number =
    params.id && params.id.length > 0 && !isNaN(Number(params.id))
      ? Number(params.id)
      : 0;
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "request" });
        const { data } = await instance.get(`tv/${id}`);
        dispatch({ type: "success", result: data });
      } catch (error) {
        dispatch({ type: "failure", error: "Movie Not found !" });
      }
    })();
  }, []);
  if (loading) {
    return <LoadingIndi loading={loading} />;
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
          <div className="single__poster">
            <LazyLoadImage
              effect="blur"
              placeholderSrc={nomovie}
              src={imageUrl + `${data?.poster_path || data?.backdrop_path}`}
              alt={data?.original_name || data?.name}
            />
          </div>
          <div className="single__posterDescription">
            {data?.original_name || data?.name ? (
              <h1>
                {data?.original_name || data?.name}
                {`(${data?.first_air_date.substring(0, 4)})`}
              </h1>
            ) : null}
            <div className="single__about">
              {data?.first_air_date ? (
                <span>{data?.first_air_date} </span>
              ) : null}
              {data?.genres && data.genres.length > 0 ? (
                <span>
                  {" . "}
                  {data?.genres?.map((genre) => genre.name).join(", ")}
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
            <div className="single__meta">
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

              {data?.original_language ? (
                <div>
                  <h3>Original Language: </h3>
                  <p>{`${data?.original_language}`}</p>
                </div>
              ) : null}
              {data?.number_of_seasons ? (
                <div>
                  <h3>No of seasons : </h3>
                  <p>{`${data?.number_of_seasons}`}</p>
                </div>
              ) : null}
              {data?.number_of_episodes ? (
                <div>
                  <h3>No of episodes : </h3>
                  <p>{`${data?.number_of_episodes}`}</p>
                </div>
              ) : null}
            </div>
            <div className="single__btns around">
              <Link
                className="btn d-flex-center get__torrent"
                to={`/torrents?search=${data.name || data.original_name}`}
              >
                <img src={utorrentimg} alt="torrent" /> Get Torrent
              </Link>
            </div>
          </div>
        </section>
      </div>
      {Array.isArray(data.seasons) ? (
        <section className="single__seasons">
          <h2>Seasons </h2>
          <ul className="seasons">
            {data.seasons
              .filter((_, index) =>
                filter || data.seasons?.length === 1 ? true : index === 0
              )
              .map((season, index) => (
                <li key={index}>
                  <LazyLoadImage
                    placeholderSrc={nomovie}
                    src={imageUrl + season.poster_path}
                    alt={season.name}
                  />

                  <div className="season__description">
                    <h3>{season.name || ""}</h3>
                    <p>
                      <span>
                        {season.air_date ? season.air_date.substring(0, 4) : ""}
                      </span>

                      <span>{` | ${season.episode_count} Episodes`}</span>
                    </p>
                    <p className="season__overview">{season.overview}</p>
                  </div>
                </li>
              ))}
          </ul>
          <div className="d-flex-center show__more">
            {Array.isArray(data.seasons) && data.seasons.length > 1 ? (
              <button className="btn" onClick={() => setFilter(!filter)}>
                Show {filter ? "less" : "more"}
              </button>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  ) : null;
}
function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}
