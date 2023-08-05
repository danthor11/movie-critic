import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rated = await prisma.movieRated.findMany();
  return NextResponse.json(rated);
}

interface RatedRequest {
  movieId: number;
  profileId: number;
  rated: number;
  review: string;
  date: string;
  contains_spoiler: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { contains_spoiler, date, movieId, profileId, rated, review } =
      (await req.json()) as RatedRequest;

    if (!date) return getErrorResponse(400, "Date is required");
    if (!profileId) return getErrorResponse(400, "Profile is required");
    if (!movieId) return getErrorResponse(400, "Movie is required");
    if (!rated) return getErrorResponse(400, "Rate is required");
    if (!review) return getErrorResponse(400, "Review is required");

    const profile = await prisma.profile.findFirst({
      where: { id: profileId },
    });
    if (!profile) return getErrorResponse(400, "Profile doesnt exists");
    const movie = await prisma.movie.findFirst({ where: { id: movieId } });
    if (!movie) return getErrorResponse(400, "Movie doesnt exists");

    const newRated = await prisma.movieRated.create({
      data: {
        date: new Date(Date.parse(date)).toJSON(),
        movieId,
        profileId,
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
