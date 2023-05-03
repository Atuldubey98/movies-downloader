import Container from "../components/Container";
import HeaderLinks from "../components/HeaderLinks";
import LoadingIndi from "../components/LoadingIndi";
import Movie from "../components/Movie";
import useModal from "../hooks/useModal";
import useMovies from "../hooks/useMovies";

export default function HomePage() {
  const { loading, movies, toggleUrl, url } = useMovies();
  const { movie, toggleModal, isModalOpen, onSetMovie } = useModal();
  return (
    <Container
      movie={movie}
      toggleModal={toggleModal}
      isModalOpen={isModalOpen}
    >
      <HeaderLinks toggleUrl={toggleUrl} url={url} />
      <main>
        <div className="movies">
          {movies?.map((movie) => (
            <Movie key={movie.id} movie={movie} onSetMovie={onSetMovie} />
          ))}
        </div>
        <LoadingIndi loading={loading} />
      </main>
    </Container>
  );
}
