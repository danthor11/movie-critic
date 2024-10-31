import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

interface UpdateRequest {
  review: string;
  date: string;
  rated: number;
  contains_spoiler: boolean;
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { contains_spoiler, date, rated, review } =
      (await req.json()) as UpdateRequest;

    const data = {} as UpdateRequest;

    if (contains_spoiler) data.contains_spoiler = contains_spoiler;
    if (date) data.date = new Date(Date.parse(date)).toJSON();
    if (rated) data.rated = rated;
    if (review) data.review = review;

    const newRated = await prisma.movieRated.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(newRated);
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const result = await prisma.movieRated.delete({
      where: { id: params.id },
    });
    return NextResponse.json(result ? true : false);
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
}
