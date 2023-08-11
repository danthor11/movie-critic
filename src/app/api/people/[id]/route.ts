import { getErrorResponse } from "@/lib/helpers";
import { MovieCredits, PersonInfo } from "@/types/crewResponse";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

const { API_URL } = process.env;

export async function GET(req: NextResponse, { params }: Params) {
  try {
    const { id } = params;
    if (!id) throw Error("Id is invalid");

    const responses = await Promise.all([
      fetch(`${API_URL}/person/${id}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
        },
      }),
      fetch(`${API_URL}/person/${id}/movie_credits`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
        },
      }),
    ]);

    const [info, movies] = (await Promise.all(
      responses.map((res) => res.json())
    )) as [PersonInfo, MovieCredits];

    return NextResponse.json({ person_info: info, movie_credits: movies });
  } catch (error) {
    if (error instanceof Error) return getErrorResponse(400, error.message);
  }
}
