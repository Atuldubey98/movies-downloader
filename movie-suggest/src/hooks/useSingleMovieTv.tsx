import { useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../instance";
import { IMovieSingle } from "../interfaces";
import useFetch from "./useFetch";

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
        const { data } = await instance.get(`movie/${id}`);
        dispatch({ type: "success", result: data });
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
