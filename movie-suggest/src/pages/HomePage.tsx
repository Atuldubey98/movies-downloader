import HeaderLinks from "../components/HeaderLinks";
import LoadingIndi from "../components/LoadingIndi";
import Movie from "../components/Movie";
import MovieModal from "../components/MovieModal";
import useMovies from "../hooks/useMovies";

export default function HomePage() {
  const {
    loading,
    movies,
    movie,
    toggleModal,
    toggleUrl,
    isModalOpen,
    onSetMovie,
    url,
  } = useMovies();

  return (
    <>
      <HeaderLinks toggleUrl={toggleUrl} url={url} />
      <main>
        <div className="movies">
          {movies?.map((movie) => (
            <Movie key={movie.id} movie={movie} onSetMovie={onSetMovie} />
          ))}
        </div>
        <LoadingIndi loading={loading} />
        {movie ? (
          <MovieModal
            movie={movie}
            modalIsOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        ) : null}
      </main>
    </>
  );
}
