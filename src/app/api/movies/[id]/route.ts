import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const deleted = await prisma.movie.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(deleted ? true : false);
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
}

interface PutRequest {
  title: string;
  plot: string;
  directedBy: string[];
  poster: string;
  genre: string[];
  releaseDate: string;
  mainActors: string[];
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { directedBy, genre, mainActors, plot, poster, releaseDate, title } =
      (await req.json()) as PutRequest;

    const newData = {} as PutRequest;

    if (directedBy?.length > 0) newData.directedBy = directedBy;
    if (genre) newData.genre = genre;
    if (mainActors?.length > 0) newData.mainActors = mainActors;
    if (plot) newData.plot = plot;
    if (poster) newData.poster = poster;
    if (releaseDate)
      newData.releaseDate = new Date(Date.parse(releaseDate)).toJSON();
    if (title) newData.title = title;

    const movieUpdated = await prisma.movie.update({
      where: { id: parseInt(params.id) },
      data: newData,
    });

    return NextResponse.json({ result: "ok", movie: movieUpdated });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
}
