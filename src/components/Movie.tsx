import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Movie as MovieModal } from "./MovieList";
import { Movie as MovieType } from "@/types/movieResponse";
import { Rate } from "./Rate";

interface MovieProps {
  movie: MovieType;
  profileId: string;
  setModal: (body?: MovieModal) => void;
}

export const Movie = ({ movie, profileId, setModal }: MovieProps) => {
  return (
    <div className="flex flex-col h-fit  items-center w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative ">
        <div className="overflow-hidden border border-gray-200  border-b-0 dark:border-gray-700 rounded-t-lg   w-[250px]">
          <Image
            className="opacity-0 duration-700   rounded-t-lg object-cover -full h-full hover:scale-110  transition-all"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title || movie.name || ""}
            width="248"
            height="350"
            quality={40}
            sizes="100vh"
            loading="lazy"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
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
        <Link href={`/movies/${movie.id}`}>
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
                movie: movie.id,
                profileId,
                poster: movie.poster_path,
                title: movie.title || movie.name || "",
                year: movie.release_date?.split("-")[0] || "",
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
