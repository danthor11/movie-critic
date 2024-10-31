"use client";
import { useMovie } from "@/hook/useMovie";
import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export const TrendingMovies = () => {
  const { movies } = useMovie();

  return (
    <div className="flex justify-center overflow-hidden gap-x-2">
      {movies?.slice(0, 6).map((movie) => (
        <Link
          className="inline-block overflow-hidden relative group"
          key={movie.id}
          href={`/movies/${movie.id}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={"dsa"}
            className=" block rounded-[4px] w-36 h-auto transition-all p-0 outline-0 -outline-offset-0 outline-transparent  group-hover:outline-2 group-hover:-outline-offset-2 group-hover:outline-blue-600 group-hover:outline "
          />
          <div className="absolute flex p-8  text-lg flex-col bg-[rgba(0,0,0,0.75)] rounded-[4px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  items-center justify-center bg-[rgba(0, 0, 0, 0.7)] opacity-0 transition-opacity group-hover:opacity-100">
            <div className="text-center">
              <IoEyeSharp className="mx-auto text-blue-600" size={"32px"} />
              <h6>656</h6>
            </div>
            <div className="text-center">
              <FaHeart className="mx-auto  text-yellow-400" size={"32px"} />
              <h6>656</h6>
            </div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="relative bg-black text-white text-sm rounded-lg px-3 py-2">
              {movie.title}
              <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-black"></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
