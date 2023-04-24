import "./Movie.css";
import { imageUrl } from "../instance";
import { IMovie } from "../interfaces";
import "./Movie.css";
import like from "../assets/like.svg";
import TextTruncate from "react-text-truncate";
import noimage from "../assets/noimage.svg";
export default function Movie({
  movie,
  onSetMovie,
}: {
  movie: IMovie;
  onSetMovie?: (paramMovie: IMovie) => void;
}) {
  return (
    <div
      onClick={() => {
        if (onSetMovie) {
          onSetMovie(movie);
        }
      }}
      className="movie"
    >
      <div className="movie__img">
        {movie.backdrop_path || movie.poster_path ? (
          <img
            loading="lazy"
            src={imageUrl + `${movie.backdrop_path || movie.poster_path}`}
            alt="Loading Image"
          />
        ) : (
          <img src={noimage} alt="Loading" />
        )}
      </div>
      <div className="movie__about">
        <TextTruncate
          line={2}
          containerClassName="movie__name"
          element="span"
          truncateText="..."
          text={movie.title || movie.original_name}
        />
        <div className="movie__stats">
          <span>
            <img src={like} alt="like" /> {movie.vote_count}
          </span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
}
