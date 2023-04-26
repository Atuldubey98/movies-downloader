import { useContext, useEffect, useState } from "react";
import "./SearchPage.css";

import Movie from "../components/Movie";
import MovieModal from "../components/MovieModal";
import useQuery from "../hooks/useQuery";
import useScrollPage from "../hooks/useScrollPage";
import instance, { searchUrl } from "../instance";

import { FcCancel } from "react-icons/fc";
import { BounceLoader } from "react-spinners";
import { SearchContext } from "../SearchContext";
import { IMovie } from "../interfaces";
export default function SearchPage() {
  const { onSetMovies, movies } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const { page, togglePageToOne } = useScrollPage();
  const query = useQuery();
  const [last, setLast] = useState<boolean>(false);
  const search = query.get("query") || "";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  useEffect(() => {
    if (
      localStorage.getItem("search") &&
      localStorage.getItem("search")?.toLowerCase() !== search.toLowerCase()
    ) {
      togglePageToOne();
      setLast(false);
    }
    if (!search || last || loading) return;
    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(searchUrl, {
          params: {
            query: search,
            page,
          },
        });
        localStorage.setItem("search", search.toLowerCase());
        onSetMovies(data.results);
        setLast(data.total_pages <= page);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [search, page]);
  function onSetMovie(movie: IMovie) {
    setMovie(movie);
    toggleModal();
  }
  return (
    <main>
      {loading ? (
        <div className="d-flex-center">
          <BounceLoader loading={loading} color="white" />
        </div>
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
