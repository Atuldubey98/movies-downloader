import React, { useEffect, useState } from "react";
import { IMovie } from "../interfaces";
import instance from "../instance";
import useScrollPage from "./useScrollPage";

export default function useMovies() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [movies, setMovies] = useState<IMovie[]>([]);
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
    setMovies([]);
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
        setLoading(true);
        setError("");
        const { data } = await instance.get(url, {
          params: {
            page,
          },
          signal: controller.signal,
        });
        setTotalPages(data.total_pages);
        setMovies([...movies, ...data.results]);
      } catch (error) {
        setError("Some error loading !");
      } finally {
        setLoading(false);
        controller.abort();
      }
    })();
  }, [page, url]);
  return {
    loading,
    error,
    movies,
    movie,
    toggleModal,
    toggleUrl,
    onSetMovie,
    isModalOpen,
    url,
  };
}
