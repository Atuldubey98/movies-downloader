import { Ref, forwardRef, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TextTruncate from "react-text-truncate";
import like from "../assets/like.svg";
import noimage from "../assets/noimage.svg";
import { imageUrl } from "../instance";
import { IMovie } from "../interfaces";
import "./Movie.css";
import { SiImdb } from "react-icons/si";
type MovieProps = {
  movie: IMovie;
  onSetMovie?: (paramMovie: IMovie) => void;
};

const Movie = (props: MovieProps) => {
  const { onSetMovie, movie } = props;
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
          <LazyLoadImage
            effect="blur"
            src={imageUrl + `${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title || movie.original_name}
          />
        ) : (
          <img loading="lazy" src={noimage} alt="Loading" />
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
          <span className="d-flex-center">
            <img src={like} alt="like" /> {movie.vote_count}
          </span>
          <div className="d-flex-center movie__statsIcons">
            <span>{movie.release_date}</span>
            {movie.vote_average ? (
              <span className="d-flex-center">
                <SiImdb size={20} color="white" />
                {movie.vote_average.toFixed(2)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Movie);
