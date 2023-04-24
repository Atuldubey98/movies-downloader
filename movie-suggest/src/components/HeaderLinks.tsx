import useMouseScroll from "../hooks/useMouseScroll";

export default function HeaderLinks({
  url,
  toggleUrl,
}: {
  url: string;
  toggleUrl: (paramUrl: string) => void;
}) {
  const divRef = useMouseScroll();
  const headerLinks: { label: string; url: string }[] = [
    {
      label: "Top Trending",
      url: "/trending/all/week?language=en-US",
    },
    {
      label: "Top Rated",
      url: "/movie/top_rated?language=en-US",
    },
    {
      label: "Action Movies",
      url: "/discover/movie?with_genres=28",
    },
    {
      label: "Romantic Movies",
      url: "/discover/movie?with_genres=27",
    },
    {
      label: "Mystery",
      url: "/discover/movie?with_genres=10749",
    },
    {
      label: "Scify",
      url: "/discover/movie?with_genres=9648",
    },
    {
      label: "Western",
      url: "/discover/movie?with_genres=878",
    },
    {
      label: "Animation",
      url: "/discover/movie?with_genres=37",
    },
    {
      label: "TV",
      url: "/discover/movie?with_genres=10770",
    },
  ];
  return (
    <ul ref={divRef} className="header__links">
      {headerLinks.map((headerLink, index: number) => (
        <li
          onClick={() => toggleUrl(headerLink.url)}
          key={index}
          className={
            url === headerLink.url ? "header__link selected" : "header__link"
          }
        >
          {headerLink.label}
        </li>
      ))}
    </ul>
  );
}
