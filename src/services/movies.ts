import { Cast, MovieDetail } from "@/types/movieDetailResponse";
import { MovieResponse } from "@/types/movieResponse";

export const API_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsIm5iZiI6MTcyNDE3OTU5MC43NjI3NTksInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q91GPam5UZQMkrXxfDSFyOqGKNNj29RVVgr70Ah22Qs",
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

export interface MovieDataDetails extends MovieDetail {
  directedBy: Cast[];
  mainActors: Cast[];
}

export const getMovieDetailById = (id: number): Promise<MovieDataDetails> => {
  return fetch(`/api/movies/detail/${id}`)
    .then((res) => res.json())
    .catch((err) => err);
};
