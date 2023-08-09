import { MovieResponse } from "@/types/movieResponse";

export const API_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
  },
};

export const getAllMovies = async (): Promise<MovieResponse> => {
  const res = await fetch(`${API_URL}/trending/movie/day`, options);
  const movies = await res.json();
  return movies;
};

interface RateCreate {
  rated: number;
  review: string;
  date: Date;
  contains_spoiler: boolean;

  userId: string;
  movieId: number;
}

export const createRateMovie = async (rate: RateCreate) => {
  return fetch(`/api/rated`, {
    method: "POST",
    body: JSON.stringify(rate),
  });
};
