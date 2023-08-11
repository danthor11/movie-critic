import { MovieDataDetails, getMovieDetailById } from "@/services/movies";
import React, { useEffect, useState } from "react";

export const useMovieDetail = (id: number) => {
  const [movie, setMovie] = useState<MovieDataDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        const movie = await getMovieDetailById(id);
        setMovie(movie);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [id]);

  return {
    movie,
    isLoading,
  };
};
