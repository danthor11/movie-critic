"use client";
import { getAllMovies } from "@/services/movies";
import { Movie, MovieResponse } from "@/types/movieResponse";
import React, { useEffect, useState } from "react";

export const useMovie = () => {
  const [movies, setMovies] = useState<MovieResponse>();

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  return {
    movies: movies?.results,
    page: movies?.page,
    total_page: movies?.total_pages,
    total_results: movies?.total_results,
  };
};
