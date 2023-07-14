import React from "react";
import { IMovie } from "../interfaces";
import MovieModal from "./MovieModal";
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
