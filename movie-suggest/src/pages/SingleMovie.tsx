import { FcCancel } from "react-icons/fc";
import DataNotFound from "../components/DataNotFound";
import LoadingIndi from "../components/LoadingIndi";
import PosterBackDropSingle from "../components/PosterBackDropSingle";
import YoutubeVideos from "../components/YoutubeVideos";
import useSingleMovieTv from "../hooks/useSingleMovieTv";
import "./SingleMovie.css";

export default function SingleMovie() {
  const { loading, error, data } = useSingleMovieTv();
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
      <PosterBackDropSingle
        posterBack={{
          runtime: data?.runtime,
          backdrop_path: data.backdrop_path,
          poster_path: data.poster_path,
          original_name: data.original_title,
          name: data.title,
          genres: data.genres || [],
          first_air_date: data.release_date,
          tagline: data.tagline,
          overview: data.overview,
          spoken_languages: data.spoken_languages || [],
          vote_average: data.vote_average,
          original_language: data.original_language,
        }}
      />
      {data.youtubes.length > 0 ? (
        <div className="single__youtubes">
          <h1>Videos</h1>
          <YoutubeVideos youtubes={data.youtubes} />
        </div>
      ) : null}
    </main>
  ) : null;
}
