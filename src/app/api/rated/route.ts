import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { CreditDetail, MovieDetail } from "@/types/movieDetailResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rated = await prisma.movieRated.findMany();
  return NextResponse.json(rated);
}

interface RatedRequest {
  movieId: number;
  userId: string;
  rated: number;
  review: string;
  date: string;
  contains_spoiler: boolean;
}

const { API_URL } = process.env;

export async function POST(req: NextRequest) {
  try {
    const { contains_spoiler, date, movieId, userId, rated, review } =
      (await req.json()) as RatedRequest;

    if (!date) return getErrorResponse(400, "Date is required");
    if (!userId) return getErrorResponse(400, "Profile is required");
    if (!movieId) return getErrorResponse(400, "Movie is required");
    if (!rated) return getErrorResponse(400, "Rate is required");
    if (!review) return getErrorResponse(400, "Review is required");

    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        Profile: { select: { id: true } },
      },
    });

    if (!user?.Profile?.id)
      return getErrorResponse(400, "Profile doesnt exists");

    const res = await Promise.all([
      fetch(`${API_URL}/movie/${movieId}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
        },
      }),
      fetch(`${API_URL}/movie/${movieId}/credits?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
        },
      }),
    ]);

    const [movieInfo, creditDetail] = (await Promise.all(
      res.map((r) => r.json())
    )) as [MovieDetail, CreditDetail];

    const directedBy = creditDetail.crew
      .filter((crew) => crew.job === "Director")
      .map((el) => el.name);

    const mainActors = creditDetail.cast.map((cast) => cast.name).slice(0, 6);

    const newMovie = {
      plot: movieInfo.overview,
      poster: movieInfo.poster_path,
      releaseDate: new Date(movieInfo.release_date),
      title: movieInfo.title,
      original_title: movieInfo.original_title,
      genre: movieInfo.genres.map((genre) => genre.name),
      directedBy,
      mainActors,
    };

    const isMovieExists = await prisma.movie.findFirst({
      where: {
        OR: [
          { title: newMovie.title },
          { original_title: newMovie.original_title },
        ],
      },
    });

    let movieRef: string;

    if (!isMovieExists) {
      //Si no exite la pelicula dentro de la base de datos
      const createMovie = await prisma.movie.create({
        data: newMovie,
      });
      movieRef = createMovie.id;
    } else {
      movieRef = isMovieExists.id;
    }

    //Si existe, me traigo la info de la base de datos

    const newRated = await prisma.movieRated.create({
      data: {
        date: new Date(Date.parse(date)).toJSON(),
        movieId: movieRef,
        profileId: user.Profile.id,
        rated,
        review,
        contains_spoiler,
      },
    });

    return NextResponse.json(newRated, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
}
