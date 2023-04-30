import { useState } from "react";
import { IMovie } from "../interfaces";

export default function useLocalStorage() {
  const favourDefault: { [key: string]: IMovie } = localStorage.getItem(
    "favourites"
  )
    ? JSON.parse(localStorage.getItem("favourites") || "{}")
    : {};

  const [favourites, setFavourites] = useState<{ [key: string]: IMovie }>(
    favourDefault
  );
  function saveToLocalStorage(movie: IMovie) {
    favourites[movie.id] = movie;
    const favStr = JSON.stringify(favourites);
    localStorage.setItem("favourites", favStr);
    setFavourites({ ...favourites, [movie.id]: movie });
    return true;
  }
  function removeFromLocalStorage(movieId: number) {
    if (movieId in favourites) {
      delete favourites[movieId];
    }
    const favStr = JSON.stringify(favourites);
    localStorage.setItem("favourites", favStr);
    setFavourites((current) => {
      const { movieId, ...other } = current;
      return other;
    });
  }

  return { favourites, saveToLocalStorage, removeFromLocalStorage };
}
