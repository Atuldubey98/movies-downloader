import { useContext } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineStar,
  AiTwotoneStar,
} from "react-icons/ai";
import { SiImdb } from "react-icons/si";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import noimage from "../assets/noimage.svg";
import utorrentimg from "../assets/utorrent.svg";
import { imageUrl } from "../instance";
import { IMovie } from "../interfaces";
import "./MovieModal.css";
export default function MovieModal({
  movie,
  toggleModal,
  modalIsOpen,
}: {
  movie: IMovie;
  toggleModal: () => void;
  modalIsOpen: boolean;
}) {
  const { favourites, saveToLocalStorage, removeFromLocalStorage } =
    useContext(SearchContext);
  const media_type =
    localStorage.getItem("movie") &&
    Boolean(localStorage.getItem("movie")) === false
      ? "tv"
      : "movie";
  const imageToRender =
    movie.backdrop_path || movie.poster_path
      ? imageUrl + `${movie.poster_path || movie.backdrop_path}`
      : noimage;

  return (
    <ReactModal
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          borderRadius: "0.5rem",
          maxHeight: "95svh",
          overflow: "auto",
          backgroundColor: "#404040",
          color: "white",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      isOpen={modalIsOpen}
      contentLabel={"Movie Name"}
    >
      <div className="movie__modal">
        <div className="d-flex-end">
          <div className="movie__close">
            <Link to={`/${movie.media_type || media_type}/${movie.id}`}>
              <h2 className="name">{movie.title || movie.original_name} </h2>
            </Link>
            <AiOutlineCloseCircle
              className="hover__icon"
              color="white"
              size={30}
              cursor={"pointer"}
              role="button"
              onClick={toggleModal}
            />
          </div>
          <div className="d-flex-end modal__btns">
            {favourites[movie.id] ? (
              <span
                onClick={() => removeFromLocalStorage(movie.id)}
                className="add__favour d-flex-center"
              >
                <AiTwotoneStar />
                Remove
              </span>
            ) : (
              <span
                onClick={() => saveToLocalStorage(movie)}
                className="btn add__favour d-flex-center"
              >
                <AiOutlineStar />
                Add to favourites
              </span>
            )}
            <Link
              className="btn d-flex-center get__torrent"
              to={`/torrents?search=${movie.title || movie.original_name}`}
            >
              <img src={utorrentimg} alt="torrent" /> Get Torrent
            </Link>
          </div>
        </div>
        <div className="movie__content">
          <div className="modal__img">
            <img
              src={imageToRender}
              alt="Alternative text"
             
              height={280}
            />
          </div>
          <div className="movie__details">
            <div className="detail">
              <span className="field">Release Date : </span>
              <span className="name">
                {movie.first_air_date || movie.release_date}
              </span>
            </div>
            <div className="detail">
              <span className="field">Movie Overview : </span>
              <span className="name">{movie.overview}</span>
            </div>
            <div className="detail">
              <span className="field">Adult : </span>
              <span className="name">
                {movie.adult ? "A Rated" : "R Rated"}
              </span>
            </div>
            <div className="detail">
              <span className="field">Vote Count : </span>
              <span className="name">{movie.vote_count}</span>
            </div>
            <div className="detail">
              <span className="field">Vote Popularity : </span>
              <span className="name">{movie.popularity}</span>
            </div>
            {movie.vote_average ? (
              <div className="detail">
                <span className="field">
                  <SiImdb size={20} color="white" />
                  Imdb rating :
                </span>
                <span className="name"> {movie.vote_average.toFixed(2)}</span>
              </div>
            ) : null}
            {movie.media_type ? (
              <div className="detail">
                <span className="field">Type :</span>
                <span className="media__type name"> {movie.media_type}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
