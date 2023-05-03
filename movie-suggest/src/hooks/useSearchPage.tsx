import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext";
import instance, { searchUrl } from "../instance";
import useQuery from "./useQuery";
import useScrollPage from "./useScrollPage";

export default function useSearchPage() {
  const { onSetMovies, movies } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const { page, togglePageToOne } = useScrollPage();
  const query = useQuery();
  const [totalPages, setTotalPages] = useState<number>(0);
  const search = query.get("query") || "";

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

  return {
    loading,
    movies,
  };
}
