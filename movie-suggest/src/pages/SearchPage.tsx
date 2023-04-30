import "./SearchPage.css";

import Movie from "../components/Movie";
import MovieModal from "../components/MovieModal";

import { FcCancel } from "react-icons/fc";
import LoadingIndi from "../components/LoadingIndi";
import useSearchPage from "../hooks/useSearchPage";
import DataNotFound from "../components/DataNotFound";
export default function SearchPage() {
  const { loading, movies, onSetMovie, toggleModal, movie, isModalOpen} =
    useSearchPage();

  return (
    <main>
      {loading ? (
        <LoadingIndi loading={loading} />
      ) : movies.length === 0 ? (
        <DataNotFound
          size={150}
          color="red"
          Icon={FcCancel}
          content="No Movies found !"
        />
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
