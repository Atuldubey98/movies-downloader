import { useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../instance";
import { IMovieSingle } from "../interfaces";
import useFetch from "./useFetch";
import axios from "axios";

export default function useSingleMovieTv() {
  const params = useParams();
  const { dispatch, loading, error, data } = useFetch<IMovieSingle>();
  const id: number =
    params.id && params.id.length > 0 && !isNaN(Number(params.id))
      ? Number(params.id)
      : 0;
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "request" });
        const [responseMovie, responseVideos] = await axios.all([
          instance.get(`movie/${id}`),
          instance.get(`movie/${id}/videos`),
        ]);
        const movie = responseMovie.data;
        const youtubes = responseVideos.data.results;
        dispatch({ type: "success", result: { ...movie, youtubes } });
      } catch (error) {
        dispatch({ type: "failure", error: "Movie Not found !" });
      }
    })();
  }, []);
  return {
    loading,
    data,
    error,
  };
}
