import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { IMovie } from "../interfaces";
import Movie from "../components/Movie";
import useScrollPage from "../hooks/useScrollPage";
import instance from "../instance";
import MovieModal from "../components/MovieModal";
import HeaderLinks from "../components/HeaderLinks";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { page, togglePageToOne } = useScrollPage();
  const [url, setUrl] = useState("/trending/all/week?language=en-US");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function onSetMovie(movie: IMovie) {
    setMovie(movie);
    toggleModal();
  }
  const toggleUrl = (changedUrl: string) => {
    setUrl(changedUrl);
    setMovies([]);
    togglePageToOne();
    setTotalPages(0);
  };
  useEffect(() => {
    if (totalPages == 0 || page < totalPages) {
      (async () => {
        try {
          setLoading(true);
          const { data } = await instance.get(url, {
            params: {
              page,
            },
          });
          setTotalPages(data.total_pages);
          setMovies([...movies, ...data.results]);
        } catch (error) {
          setError("Some error loading !");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [url, page]);
  return (
    <>
      <HeaderLinks toggleUrl={toggleUrl} url={url} />
      <main>
        <div className="movies">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} onSetMovie={onSetMovie} />
          ))}
        </div>
        <div className="d-flex-center loading">
          <BounceLoader loading={loading} color="white" />
        </div>
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
