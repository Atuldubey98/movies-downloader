import React, { useEffect, useState } from "react";
import { IMovie } from "../interfaces";
import instance from "../instance";
import useScrollPage from "./useScrollPage";
import useFetch from "./useFetch";

export default function useMovies() {
  const { loading, error, data, dispatch } = useFetch<IMovie[]>();
  const { page, togglePageToOne } = useScrollPage();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  const [url, setUrl] = useState("/trending/all/week?language=en-US");
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function onSetMovie(movie: IMovie) {
    setMovie(movie);
    toggleModal();
  }
  const toggleUrl = (changedUrl: string) => {
    setUrl(changedUrl);
    dispatch({ type: "success", result: [] });
    setTotalPages(0);
    togglePageToOne();
  };
  const controller = new AbortController();
  useEffect(() => {
    (async () => {
      try {
        if (totalPages > 0 && totalPages === page) {
          return;
        }
        dispatch({ type: "request" });
        const response = await instance.get(url, {
          params: {
            page,
          },
          signal: controller.signal,
        });
        setTotalPages(response.data.total_pages);
        if (Array.isArray(data)) {
          dispatch({
            type: "success",
            result: [...data, ...response.data.results],
          });
        } else {
          dispatch({ type: "success", result: response.data.results });
        }
        localStorage.setItem(
          "movie",
          String(url.startsWith("/discover/movie"))
        );
      } catch (error) {
        dispatch({ type: "failure", error: "Some error occured" });
      } finally {
        controller.abort();
      }
    })();
  }, [page, url]);
  return {
    loading,
    error,
    movies: data,
    movie,
    toggleModal,
    toggleUrl,
    onSetMovie,
    isModalOpen,
    url,
  };
}
