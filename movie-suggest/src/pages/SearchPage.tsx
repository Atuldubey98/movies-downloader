import "./SearchPage.css";

import Movie from "../components/Movie";
import MovieModal from "../components/MovieModal";

import { FcCancel } from "react-icons/fc";
import LoadingIndi from "../components/LoadingIndi";
import useSearchPage from "../hooks/useSearchPage";
export default function SearchPage() {
  const { loading, movies, onSetMovie, toggleModal, movie, isModalOpen } =
    useSearchPage();

  return (
    <main>
      {loading ? (
        <LoadingIndi loading={loading} />
      ) : movies.length === 0 ? (
        <div className="loading ">
          <div className="d-flex-center">
            <FcCancel size={150} color="red" />
          </div>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            No movies found !
          </h2>
        </div>
      ) : null}
      <div className="movies">
        {movies.map((movie) => (
          <Movie movie={movie} key={movie.id} onSetMovie={onSetMovie} />
        ))}
      </div>

      {movie ? (
        <MovieModal
          movie={movie}
          modalIsOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      ) : null}
    </main>
  );
}
