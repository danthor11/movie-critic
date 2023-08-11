import { CreditDetail, MovieDetail } from "@/types/movieDetailResponse";
import { NextRequest, NextResponse } from "next/server";

const { API_URL } = process.env;

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const responses = await Promise.all([
      await fetch(`${API_URL}/movie/${params.id}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
        },
      }),
      fetch(`${API_URL}/movie/${params.id}/credits?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
        },
      }),
    ]);

    const [movie, cast] = (await Promise.all(
      responses.map((res) => res.json())
    )) as [MovieDetail, CreditDetail];

    const directedBy = cast.crew
      .filter((crew) => crew.job === "Director")
      .map((el) => el);

    const mainActors = cast.cast.map((cast) => cast).slice(0, 8);

    return NextResponse.json({
      ...movie,
      directedBy,
      mainActors,
    });
  } catch (error) {}
}
