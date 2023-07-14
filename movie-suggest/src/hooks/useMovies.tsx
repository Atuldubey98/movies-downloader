import { useEffect, useState } from "react";
import instance from "../instance";
import { IMovie } from "../interfaces";
import useFetch from "./useFetch";
import useScrollPage from "./useScrollPage";
import useInfiniteScroll from "./useInfiniteScroll";

export default function useMovies() {
  const { loading, error, data, dispatch } = useFetch<IMovie[]>();
  const [hasNext, setHasNext] = useState(true);
  const { page, setElement, togglePagToOne } = useInfiniteScroll(hasNext);
  const [url, setUrl] = useState("/trending/all/week?language=en-US");

  const toggleUrl = (changedUrl: string) => {
    setUrl(changedUrl);
    dispatch({ type: "success", result: [] });
    togglePagToOne();
  };
  const controller = new AbortController();
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "request" });
        const response = await instance.get(url, {
          params: {
            page,
          },
          signal: controller.signal,
        });

        if (Array.isArray(data)) {
          dispatch({
            type: "success",
            result: [...data, ...response.data.results],
          });
        } else {
          dispatch({ type: "success", result: response.data.results });
        }
        setHasNext(response.data.total_pages > page);
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
    toggleUrl,
    url,
    setElement,
  };
}
