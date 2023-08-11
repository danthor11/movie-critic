export interface Review {
  id: string;
  rated: number;
  profileId: string;
  movieId: string;
  contains_spoiler: boolean;
  date: Date;
  review: string;
  already_watched: boolean;
  liked: boolean;
  movie: Movie;
  Profile: Profile;
}

export interface Profile {
  id: string;
  name: string;
  location: string;
  bio: string;
  avatar: string;
  userId: string;
}

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  plot: string;
  directedBy: string[];
  poster: string;
  genre: string[];
  mainActors: string[];
  releaseDate: Date;
}

export const getAllReviews = (): Promise<Review[]> => {
  return fetch("/api/rated")
    .then((res) => res.json())
    .catch((err) => err);
};
