import { createContext, useEffect, useState } from "react";
import { IMovie } from "./interfaces";
import useLocalStorage from "./hooks/useLocalStorage";
const defaultContext: {
  onSetMovies: (params: IMovie[]) => void;

  movies: IMovie[];
  removeFromLocalStorage: (paramMovieId: number) => void;
  saveToLocalStorage: (paramMovie: IMovie) => boolean;
  favourites: { [key: string]: IMovie };
  resetMovies: () => void;
} = {
  onSetMovies: function (paramMovies: IMovie[]) {
    () => {};
  },
  movies: [],
  favourites: {},
  removeFromLocalStorage: function (movieId: number) {},
  saveToLocalStorage: function (paramsMovie: IMovie): boolean {
    return false;
  },
  resetMovies: function () {},
};
export const SearchContext = createContext(defaultContext);

export default function SearchContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { favourites, saveToLocalStorage, removeFromLocalStorage } =
    useLocalStorage();
  function onSetMovies(paramMovies: IMovie[]) {
    setMovies([...movies, ...paramMovies]);
  }

  function resetMovies() {
    setMovies([]);
  }
  return (
    <SearchContext.Provider
      value={{
        onSetMovies,
        movies,
        resetMovies,
        saveToLocalStorage,
        removeFromLocalStorage,
        favourites,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
