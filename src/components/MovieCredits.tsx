import { MovieCredits as MovieCreditsTyping } from "@/types/crewResponse";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
interface Props {
  movie_credits: MovieCreditsTyping;
}

export const MovieCredits = ({ movie_credits }: Props) => {
  return (
    <>
      {movie_credits.cast.map((movie) => (
        <div key={movie.id} className="w-[100px] sm:w-[150px]  overflow-hidden">
          <Link
            href={`/movies/${movie.id}`}
            className="relative transition-all mini-poster-hover"
          >
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full   z-0 
                
                transition-all h-auto border border-gray-700 rounded "
                width={150}
                height={250}
                placeholder="empty"
              />
            ) : (
              <div
                className="h-full  w-full text-center border
               border-gray-700 rounded grid place-content-center bg-gray-700 transition-all"
              >
                {movie.title}
              </div>
            )}
          </Link>
        </div>
      ))}
    </>
  );
};
