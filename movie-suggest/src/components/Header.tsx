import { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Header.css";
import banner from "../assets/banner.svg";
import { BsFillStarFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import useQuery from "../hooks/useQuery";
export default function Header() {
  const query = useQuery();
  const [search, setSearch] = useState<string>("");
  const { resetMovies } = useContext(SearchContext);
  const navigate = useNavigate();
  function onSubmit(e: any) {
    e.preventDefault();
    const storageSearch = localStorage.getItem("query")
      ? localStorage.getItem("query")!.toLowerCase()
      : "";

    if (search.toLowerCase() !== storageSearch) {
      resetMovies();
      navigate(`/search?query=${search}`, {
        replace: true,
      });
    }
  }
  useEffect(() => {
    setSearch(query.get("query") || query.get("search") || "");
  }, [query.get("query"), query.get("search")]);
  return (
    <header>
      <div className="header__top">
        <div className="d-flex-center banner">
          <Link to={"/"}>
            <h1>Moviesss</h1>
          </Link>
          <img src={banner} alt="banner" />
        </div>
        <div className="search__form">
          <form onSubmit={onSubmit}>
            <div className="d-flex-center search__div">
              <input
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                type="text"
                placeholder="Search"
              />
              <FiSearch size={32} color="black" type="submit" />
            </div>
          </form>
        </div>
        <Link className="d-flex-center" to={"/favourite"}>
          <BsFillStarFill color="yellow" />
          <span>Favourties</span>
        </Link>
      </div>
    </header>
  );
}
