import React, { useState } from "react";
import MovieModal from "./MovieModal";
import { IMovie } from "../interfaces";
interface ContainerProps {
  children: React.ReactNode;
  movie?: IMovie;
  isModalOpen: boolean;
  toggleModal: () => void;
}
export default function Container({
  children,
  movie,
  isModalOpen,
  toggleModal,
}: ContainerProps) {
  return (
    <>
      {children}
      {movie ? (
        <MovieModal
          movie={movie}
          modalIsOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      ) : null}
    </>
  );
}
