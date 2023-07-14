import { LegacyRef, forwardRef, memo } from "react";
import { SiImdb } from "react-icons/si";
import TextTruncate from "react-text-truncate";
import like from "../assets/like.svg";
import noimage from "../assets/noimage.svg";
import { imageUrl } from "../instance";
import { IMovie } from "../interfaces";
import "./Movie.css";
type MovieProps = {
  movie: IMovie;
  onSetMovie?: (paramMovie: IMovie) => void;
};

const Movie = forwardRef(
  (props: MovieProps, ref: LegacyRef<HTMLDivElement>) => {
    const { onSetMovie, movie } = props;
    const imageToRender =
      movie.backdrop_path || movie.poster_path
        ? imageUrl + `${movie.backdrop_path || movie.poster_path}`
        : noimage;

    return (
      <div
        ref={ref}
        onClick={() => {
          if (onSetMovie) {
            onSetMovie(movie);
          }
        }}
        className="movie"
      >
        <div className="movie__img">
          <img src={imageToRender} alt="Alternative text" width={"100%"} />
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
              <img width={30} height={30} src={like} alt="like" />{" "}
              {movie.vote_count}
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
  }
);
export default memo(Movie);
