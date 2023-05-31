import "./SearchPage.css";

import Movie from "../components/Movie";
import MovieModal from "../components/MovieModal";

import { FcCancel } from "react-icons/fc";
import Container from "../components/Container";
import DataNotFound from "../components/DataNotFound";
import LoadingIndi from "../components/LoadingIndi";
import useModal from "../hooks/useModal";
import useSearchPage from "../hooks/useSearchPage";
export default function SearchPage() {
  const { loading, movies, setElement } = useSearchPage();
  const { movie, toggleModal, isModalOpen, onSetMovie } = useModal();
  return (
    <Container
      toggleModal={toggleModal}
      movie={movie}
      isModalOpen={isModalOpen}
    >
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
        {movies.map((movie, index) =>
          index === movies.length - 1 ? (
            <Movie
              ref={setElement}
              movie={movie}
              key={movie.id}
              onSetMovie={onSetMovie}
            />
          ) : (
            <Movie movie={movie} key={movie.id} onSetMovie={onSetMovie} />
          )
        )}
      </div>
    </Container>
  );
}
