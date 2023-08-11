"use client";
import { useMovieDetail } from "@/hook/useMovieDetail";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Loading } from "./Loading";
import Link from "next/link";

export const MovieDetail = ({ id }: { id: number }) => {
  const { isLoading, movie } = useMovieDetail(id);
  const { status } = useSession();

  if (isLoading)
    return (
      <div className="min-h-[45vh] py-10">
        <Loading />
      </div>
    );

  return (
    <div className="relative">
      {movie && (
        <>
          <div
            className={`relative -z-10 bg-shadow-inside w-full bg-contain overflow-hidden `}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              className="object-cover w-full h-[75vh] "
              width={800}
              height={300}
              placeholder="empty"
              quality={60}
              priority
            />
          </div>
          <div
            className="flex flex-col md:flex-row -translate-y-[300px] md:-translate-y-[100px]
         max-w-4xl mx-auto gap-8 justify-between p-8 md:p-4"
          >
            <div className="max-w-[230px] mx-auto min-w-[200px]">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="mx-auto rounded-sm border border-[rgba(236,234,234,0.22)] shadow-md"
                width={230}
                height={340}
                placeholder="empty"
              />
              {/* cuantos reviews posee cuantos likes posee */}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                <h1 className=" text-4xl text-s drop-shadow-md font-semibold">
                  {movie.title}
                </h1>
                <h3
                  className="self-end  font-light text-gray-200 text-xl underline 
              underline-offset-[4px] decoration-gray-300"
                >
                  {new Date(movie.release_date).getFullYear()}
                </h3>
                <h3 className="self-end  font-light text-gray-200 text-xl">
                  Directed by{" "}
                  {movie.directedBy.map((dir) => (
                    <span
                      key={dir.id}
                      className="mx-1 text-gray-200 underline underline-offset-[4px]"
                    >
                      {dir.name}
                    </span>
                  ))}
                  .
                </h3>
              </div>

              <div className="flex flex-col md:flex-row gap-7">
                <div>
                  <p className="tracking-wide text-lg text-justify md:text-left my-4">
                    {movie.overview}
                  </p>
                  <div className="mt-2">
                    <h2 className="text-2xl font-medium text-gray-200 mb-2 ">
                      Main cast
                    </h2>
                    <ul
                      className="flex flex-wrap gap-2 text-sm
                ul-with-colors justify-evenly md:justify-start
              "
                    >
                      {movie.mainActors.map((actor) => (
                        <li key={actor.id} className="p-2 rounded-sm  w-fit">
                          <Link href={`/actor/${actor.id}`}>{actor.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {movie.genres.length > 0 ? (
                    <div className="mt-2">
                      <h2 className="text-2xl font-medium text-gray-200 mb-2 ">
                        Genres
                      </h2>
                      <ul className="flex justify-evenly  md:justify-start flex-wrap gap-2 text-sm ul-with-colors-secondary">
                        {movie.genres.map((genre) => (
                          <li key={genre.id} className="p-2 rounded-sm w-fit">
                            {genre.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="self-center md:self-start w-full max-w-[230px] min-w-[200px]">
                  {status === "authenticated" ? (
                    <button className="px-4 py-1 bg-blue-500 rounded w-full text-center">
                      Make a review
                    </button>
                  ) : (
                    <button className="px-4 py-1 bg-blue-500 rounded w-full text-center">
                      Sign in to make a review.
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
