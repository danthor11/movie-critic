import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getErrorResponse } from "@/lib/helpers";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface UserRequest {
  password: string;
  username: string;
  email: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { email, username, password } = (await req.json()) as UserRequest;

    if (!email) return getErrorResponse(400, "Fields cannot be empty");

    const isError = await prisma.user.findMany({
      where: { OR: [{ username }, { email }] },
    });

    if (isError.length > 1)
      return getErrorResponse(400, "Email or username already exists.");

    const newData = {} as UserRequest;

    if (email) newData.email = email;
    if (password) newData.password = await bcrypt.hash(password, 10);
    if (username) newData.username = username;

    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        ...newData,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Usernam" }, { status: 410 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await prisma.user.findFirstOrThrow({
      where: { id },
      select: {
        email: true,
        username: true,
        Profile: true,
      },
    });

    return NextResponse.json(user, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Permitir todos los orígenes (ajusta esto según tus necesidades)
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 410 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deleted ? true : false);
  } catch (error) {
    return NextResponse.json({ error: "Occur an error" }, { status: 410 });
  }
}
