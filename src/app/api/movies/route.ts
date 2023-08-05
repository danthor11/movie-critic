import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getErrorResponse } from "@/lib/helpers";

export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json({ movies });
}

interface MovieRequest {
  title: string;
  plot: string;
  directedBy: string[];
  poster: string;
  genre: string[];
  releaseDate: string;
  mainActors: string[];
}

export async function POST(req: NextRequest) {
  const { directedBy, genre, plot, poster, releaseDate, title, mainActors } =
    (await req.json()) as MovieRequest;

  try {
    if (!title || !plot)
      return getErrorResponse(400, "Title or plot are required");

    const movieCreated = await prisma.movie.create({
      data: {
        directedBy,
        genre,
        plot,
        poster,
        releaseDate: new Date(Date.parse(releaseDate)).toJSON(),
        title,
        mainActors,
      },
    });

    return NextResponse.json(movieCreated, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something bad happened" },
      { status: 400 }
    );
  }
}
