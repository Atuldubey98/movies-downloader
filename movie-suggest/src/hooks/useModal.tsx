import React, { useCallback, useEffect, useState } from "react";
import { IMovie } from "../interfaces";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const onSetMovie = useCallback((mo: IMovie) => {
    setMovie(mo);
  }, []);
  useEffect(() => {
    if (movie) {
      toggleModal();
    }
  }, [movie]);
  return {
    toggleModal,
    onSetMovie,
    movie,
    isModalOpen,
  };
}
