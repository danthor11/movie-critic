import { getErrorResponse } from "@/lib/helpers";
import { MovieCredits, PersonInfo } from "@/types/crewResponse";
import { NextRequest, NextResponse } from "next/server";

const { API_URL } = process.env;
export async function GET(res: NextRequest) {
  try {
    await fetch(`${API_URL}/person/trending`, {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM0ODMyMGU2ZjJmOWM0NzYxYTFkYTBiZTkyOGEzMiIsInN1YiI6IjYyMjkwMDFkYmIxMDU3MDAxYmFhNTE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0oWCQ94kPSoIo905iqGsi-3Yj3pbGPLi4-Y5xbB42T8",
      },
    });
  } catch (error) {
    if (error instanceof Error) return getErrorResponse(400, error.message);
  }
}
