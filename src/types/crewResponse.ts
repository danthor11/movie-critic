export interface PersonInfo {
  adult?: boolean;
  also_known_as?: string[];
  biography?: string;
  birthday: Date;
  deathday?: any;
  gender: number;
  homepage?: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path?: string;
}

export interface MovieCredits {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

export interface Cast {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export interface TrendingPeople {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface KnownFor {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: Date;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}
