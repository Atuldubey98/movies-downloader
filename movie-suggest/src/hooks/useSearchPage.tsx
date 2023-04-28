import React, { useContext, useEffect, useState } from "react";
import { IMovie } from "../interfaces";
import instance, { searchUrl } from "../instance";
import { SearchContext } from "../SearchContext";
import useQuery from "./useQuery";
import useScrollPage from "./useScrollPage";

export default function useSearchPage() {
  const { onSetMovies, movies } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const { page, togglePageToOne } = useScrollPage();
  const query = useQuery();
  const [totalPages, setTotalPages] = useState<number>(0);
  const search = query.get("query") || "";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  useEffect(() => {
    if (totalPages > 0 && totalPages < page) {
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(searchUrl, {
          params: {
            query: search,
            page,
          },
        });
        setTotalPages(data.total_pages);
        onSetMovies(data.results);
        localStorage.setItem("query", search.toLowerCase());
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [page, search]);
  useEffect(() => {
    onSetMovies([]);
    setTotalPages(0);
    togglePageToOne();
  }, [search]);
  function onSetMovie(movie: IMovie) {
    setMovie(movie);
    toggleModal();
  }
  return {
    loading,
    movies,
    onSetMovie,
    toggleModal,
    movie,
    isModalOpen,
  };
}
