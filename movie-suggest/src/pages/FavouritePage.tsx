import { useContext } from "react";
import { SearchContext } from "../SearchContext";
import Container from "../components/Container";
import Movie from "../components/Movie";
import useModal from "../hooks/useModal";
import Nofavourites from "./Nofavourites";

export default function FavouritePage() {
  const { favourites } = useContext(SearchContext);
  if (Object.values(favourites).length === 0) {
    return <Nofavourites />;
  }
  const { movie, toggleModal, isModalOpen, onSetMovie } = useModal();

  return (
    <Container
      movie={movie}
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
    >
      <div className="movies">
        {Object.values(favourites).map((movie) => (
          <Movie movie={movie} key={movie.id} onSetMovie={onSetMovie} />
        ))}
      </div>
    </Container>
  );
}
