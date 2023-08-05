"use client";
import { useMovie } from "@/hook/useMovie";
import { API_URL } from "@/services/movies";
import Image from "next/image";
import React, { useState } from "react";
import { Rate } from "./Rate";
import { Movie } from "@/types/movieResponse";
import Modal from "./Modal";
import RateForm from "./RateForm";

interface ModalRate {
  isOpen: boolean;
  movie?: {
    profileId: number;
    movie: number;
    title: string;
    poster: string;
    year: string;
  };
}

export const MovieList = () => {
  const [modal, setModal] = useState<ModalRate>({ isOpen: false });
  const { movies, page } = useMovie();

  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };

  return (
    <>
      <div className="w-full py-5 mx-auto px-10 text-center">
        <h2 className="text-4xl text-white font-semibold tracking-wide">
          Movies and Series trending
        </h2>
      </div>
      <div className="w-full gap-x-4 justify-center md:w-5/6 py-10 mx-auto flex flex-wrap gap-y-4 md:gap-5">
        {movies?.map((movie) => (
          <Movie key={movie.id} movie={movie} setModal={setModal} />
        ))}
      </div>

      {modal.movie && (
        <Modal modal={modal.isOpen} toggleModal={toggleModal}>
          <RateForm
            year={modal.movie.year}
            movie={modal.movie.movie}
            poster={modal.movie.poster}
            profileId={1}
            title={modal.movie.title}
          />
        </Modal>
      )}
    </>
  );
};

interface MovieProps {
  movie: Movie;
  setModal: React.Dispatch<React.SetStateAction<ModalRate>>;
}

const Movie = ({ movie, setModal }: MovieProps) => {
  return (
    <div className="flex  flex-col items-center w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <Image
          className="p-4 rounded-t-lg w-full h-auto"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title || movie.name || ""}
          width="0"
          height="0"
          quality={40}
          sizes="100vh"
          loading="lazy"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute bottom-0 translate-x-6 right-[50%] w-12 flex justify-center items-center h-12 rounded-full">
          <Rate rate={Math.round(movie.vote_average * 10)} />
        </div>
      </div>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {movie.title || movie.name}
          </h5>
          <h6 className="text-sm text-gray-600">
            {movie.original_title || movie.original_name} -{" "}
            {movie.release_date?.split("-")[0] ||
              movie.first_air_date?.split("-")[0]}
            .
          </h6>
        </a>
        <div className="flex items-center mt-2.5 mb-5"></div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <button
            onClick={() => {
              setModal({
                isOpen: true,
                movie: {
                  movie: movie.id,
                  profileId: 10,
                  poster: movie.poster_path,
                  title: movie.title || movie.name || "",
                  year: movie.release_date?.split("-")[0] || "",
                },
              });
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};
