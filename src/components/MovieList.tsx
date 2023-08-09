"use client";
import { useMovie } from "@/hook/useMovie";
import Image from "next/image";
import React, { useState } from "react";
import { Rate } from "./Rate";
import { Movie } from "@/types/movieResponse";
import Modal from "./Modal";
import RateForm from "./RateForm";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ModalRate {
  isOpen: boolean;
  movie?: {
    profileId: string;
    movie: number;
    title: string;
    poster: string;
    year: string;
  };
}

export const MovieList = () => {
  const [modal, setModal] = useState<ModalRate>({ isOpen: false });
  const { movies } = useMovie();
  const { status, data } = useSession();

  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };

  return (
    <>
      <div className="w-full gap-x-4 justify-center md:w-5/6 py-10 mx-auto flex flex-wrap gap-y-4 md:gap-5">
        {movies?.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            profileId={data?.user.id!}
            setModal={setModal}
          />
        ))}
      </div>

      {modal.movie && (
        <Modal modal={modal.isOpen} toggleModal={toggleModal}>
          <>
            {status === "authenticated" ? (
              <RateForm
                year={modal.movie.year}
                movie={modal.movie.movie}
                poster={modal.movie.poster}
                profileId={data.user.id}
                title={modal.movie.title}
              />
            ) : (
              ""
            )}

            {status === "unauthenticated" ? (
              <div className="mx-auto ">
                <div className={`relative bg-login-modal `}>
                  <img
                    src={`http://image.tmdb.org/t/p/w500/ueO9MYIOHO7M1PiMUeX74uf8fB9.jpg`}
                    alt=""
                    className="max-h-80 object-cover w-full rounded-t "
                  />
                  <div className="text-center mb-8 absolute bottom-0 left-0 right-0 z-30 lef">
                    <h1 className="text-lg text-white text-shadow  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]	  font-medium">
                      To make a review you have to be logged in first.
                    </h1>
                    <div className="p-4">
                      <p className="text-md text-gray-100 mt-4 text-center">
                        Go to the{" "}
                        <Link
                          href={"/login"}
                          className="text-gray-400 underline-offset-1 underline"
                        >
                          login
                        </Link>{" "}
                        page first.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        </Modal>
      )}
    </>
  );
};

interface MovieProps {
  movie: Movie;
  profileId: string;
  setModal: React.Dispatch<React.SetStateAction<ModalRate>>;
}

const Movie = ({ movie, profileId, setModal }: MovieProps) => {
  return (
    <div className="flex flex-col h-fit  items-center w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative ">
        <div className="overflow-hidden border border-gray-200  border-b-0 dark:border-gray-700 rounded-t-lg   w-[250px]">
          <Image
            className=" rounded-t-lg object-cover w-full h-full hover:scale-110  transition-transform"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title || movie.name || ""}
            width="0"
            height="0"
            quality={40}
            sizes="100vh"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 translate-y-[50%] translate-x-6 right-[50%] w-12 flex justify-center items-center h-12 rounded-full">
          <Rate rate={Math.round(movie.vote_average * 10)} />
        </div>
        <div className="group transition absolute top-0 right-0 mt-4 mr-4 bg-[rgba(0,0,0,0.1)] p-1 rounded-2xl hover:bg-[rgba(0,0,0,0.5)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
            className="fill-slate-400 group-hover:fill-yellow-400"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
            className="fill-yellow-400 group-hover:fill-slate-400"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg> */}
        </div>
      </div>
      <div className="px-5 py-6">
        <Link href="#">
          <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">
            {movie.title || movie.name}
          </h5>
        </Link>
        <h6 className="text-sm text-gray-600 text-center">
          {movie.original_title || movie.original_name}.
        </h6>

        <div className="flex flex-col items-center justify-between">
          <h3 className="text-lg text-gray-200">
            {movie.release_date?.split("-")[0] ||
              movie.first_air_date?.split("-")[0]}
          </h3>

          <button
            onClick={() => {
              setModal({
                isOpen: true,
                movie: {
                  movie: movie.id,
                  profileId,
                  poster: movie.poster_path,
                  title: movie.title || movie.name || "",
                  year: movie.release_date?.split("-")[0] || "",
                },
              });
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};
