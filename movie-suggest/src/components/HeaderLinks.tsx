import { useEffect, useState } from "react";
import useMouseScroll from "../hooks/useMouseScroll";
import instance from "../instance";

export default function HeaderLinks({
  url,
  toggleUrl,
}: {
  url: string;
  toggleUrl: (paramUrl: string) => void;
}) {
  const divRef = useMouseScroll();
  const [headerLinks, setHeaderLinks] = useState<
    {
      name: string;
      id: number;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(false);
      try {
        const { data } = await instance.get("/genre/movie/list");
        setHeaderLinks(data.genres);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ul ref={divRef} className="header__links">
      <li
        onClick={() => toggleUrl(`/trending/all/week?language=en-US`)}
        className={
          url === `/trending/all/week?language=en-US`
            ? "header__link selected"
            : "header__link"
        }
      >
        Trending
      </li>
      <li
        onClick={() => toggleUrl(`/movie/top_rated`)}
        className={
          url === `/movie/top_rated` ? "header__link selected" : "header__link"
        }
      >
        Top Rated
      </li>
      {loading
        ? null
        : headerLinks.map((headerLink, index: number) => (
            <li
              onClick={() =>
                toggleUrl(`/discover/movie?with_genres=${headerLink.id}`)
              }
              key={index}
              className={
                url === `/discover/movie?with_genres=${headerLink.id}`
                  ? "header__link selected"
                  : "header__link"
              }
            >
              {headerLink.name}
            </li>
          ))}
    </ul>
  );
}
