import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import nomovie from "../assets/noimage.svg";
import LoadingIndi from "../components/LoadingIndi";
import PosterBackDropSingle from "../components/PosterBackDropSingle";
import YoutubeVideos from "../components/YoutubeVideos";
import useFetch from "../hooks/useFetch";
import instance, { imageUrl } from "../instance";
import { ITvSingle } from "../interfaces";
import "./SingleTv.css";

export default function SingleTv() {
  const { loading, data, dispatch } = useFetch<ITvSingle>();
  const [filter, setFilter] = useState<boolean>(false);
  const params = useParams();
  const id: number =
    params.id && params.id.length > 0 && !isNaN(Number(params.id))
      ? Number(params.id)
      : 0;
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "request" });
        const [responseMovie, responseVideos] = await axios.all([
          instance.get(`tv/${id}`),
          instance.get(`tv/${id}/videos`),
        ]);
        const tv = responseMovie.data;
        const youtubes = responseVideos.data.results;
        dispatch({ type: "success", result: { ...tv, youtubes } });
      } catch (error) {
        dispatch({ type: "failure", error: "Movie Not found !" });
      }
    })();
  }, []);
  if (loading) {
    return <LoadingIndi loading={loading} />;
  }
  const imageToRender =
    data?.backdrop_path || data?.poster_path
      ? imageUrl + `${data.backdrop_path || data?.poster_path}`
      : nomovie;
  return data ? (
    <main className="single">
      <PosterBackDropSingle
        posterBack={{
          backdrop_path: data.backdrop_path,
          poster_path: data.poster_path,
          original_name: data.original_name,
          name: data.name,
          genres: data.genres || [],
          first_air_date: data.first_air_date,
          tagline: data.tagline,
          overview: data.overview,
          spoken_languages: data.spoken_languages || [],
          vote_average: data.vote_average,
          number_of_seasons: data.number_of_seasons,
          number_of_episodes: data.number_of_episodes,
          original_language: data.original_language,
        }}
      />
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
                  <img
                    src={imageToRender}
                    alt="Alternative text"
                    width={"100%"}
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
      {data.youtubes.length > 0 ? (
        <div className="single__youtubes">
          <h1>Videos</h1>
          <YoutubeVideos youtubes={data.youtubes} />
        </div>
      ) : null}
    </main>
  ) : null;
}
