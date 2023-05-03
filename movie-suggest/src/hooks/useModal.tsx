import React, { useState } from "react";
import { IMovie } from "../interfaces";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie>();
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function onSetMovie(movie: IMovie) {
    setMovie(movie);
    toggleModal();
  }
  return {
    toggleModal,
    onSetMovie,
    movie,
    isModalOpen
  };
}
