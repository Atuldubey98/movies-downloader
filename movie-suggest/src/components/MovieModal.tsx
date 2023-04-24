import { useContext } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineStar,
  AiTwotoneStar,
} from "react-icons/ai";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import { imageUrl } from "../instance";
import { IMovie } from "../interfaces";
import utorrentimg from "../assets/utorrent.svg";
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
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "0.5rem",
      backgroundColor: "#404040",
      color: "white",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const { favourites, saveToLocalStorage, removeFromLocalStorage } =
    useContext(SearchContext);
  return (
    <ReactModal
      style={customStyles}
      isOpen={modalIsOpen}
      contentLabel={"Movie Name"}
    >
      <div className="movie__modal">
        <div className="d-flex-end">
          <h2 className="name">{movie.title || movie.original_name}</h2>
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
                className="add__favour d-flex-center"
              >
                <AiOutlineStar />
                Add to favourites
              </span>
            )}
            <Link className="d-flex-center get__torrent" to={`/torrents?search=${movie.title || movie.original_name}`}>
              <img src={utorrentimg} alt="torrent" /> Get Torrent
            </Link>
            <AiOutlineCloseCircle
              className="hover__icon"
              color="white"
              cursor={"pointer"}
              role="button"
              onClick={toggleModal}
            />
          </div>
        </div>
        <div className="movie__content">
          <div className="modal__img">
            <img
              loading="lazy"
              src={imageUrl + `${movie.backdrop_path || movie.poster_path}`}
              alt="Loading Image"
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
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
