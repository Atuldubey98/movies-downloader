import { useContext, useState } from "react";
import { SearchContext } from "../SearchContext";
import Movie from "../components/Movie";
import MovieModal from "../components/MovieModal";
import { IMovie } from "../interfaces";
import Nofavourites from "./Nofavourites";

export default function FavouritePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function onSetMovie(movie: IMovie) {
    setMovie(movie);
    toggleModal();
  }
  const { favourites } = useContext(SearchContext);
  if (Object.values(favourites).length === 0) {
    return <Nofavourites  />;
  }
  return (
    <main>
      <div className="movies">
        {Object.values(favourites).map((movie) => (
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
