import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { CreditDetail, MovieDetail } from "@/types/movieDetailResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rated = await prisma.movieRated.findMany({
    orderBy: { liked: "asc" },
    include: {
      movie: true,
      Profile: true,
    },
  });
  return NextResponse.json(rated);
}
