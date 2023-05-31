import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext";
import instance, { searchUrl } from "../instance";
import useInfiniteScroll from "./useInfiniteScroll";
import useQuery from "./useQuery";

export default function useSearchPage() {
  const { onSetMovies, movies } = useContext(SearchContext);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const { page, setElement, togglePagToOne } = useInfiniteScroll(hasNext);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const search = query.get("query") || "";
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(searchUrl, {
          params: {
            query: search,
            page,
          },
        });
        onSetMovies(data.results);
        setHasNext(data.total_pages > page);
        localStorage.setItem("query", search.toLowerCase());
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [page, search]);
  useEffect(() => {
    onSetMovies([]);
    togglePagToOne();
  }, [search]);

  return {
    loading,
    movies,
    setElement,
  };
}
